/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
var vscode = require('vscode');
var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var vscode_extension_telemetry_1 = require('vscode-extension-telemetry');
var _coreClrDebugDir;
var _debugAdapterDir;
var _channel;
var _installLog;
var _reporter; // Telemetry reporter
var _completionFileName = 'install.complete';
function installCoreClrDebug(context) {
    _coreClrDebugDir = path.join(context.extensionPath, 'coreclr-debug');
    _debugAdapterDir = path.join(_coreClrDebugDir, 'debugAdapters');
    if (existsSync(path.join(_debugAdapterDir, _completionFileName))) {
        console.log('.NET Core Debugger tools already installed');
        return;
    }
    if (!isOnPath('dotnet')) {
        // TODO: In a future release, this should be an error. For this release, we will let it go
        console.log("The .NET CLI tools are not installed. .NET Core debugging will not be enabled.");
        return;
    }
    initializeTelemetry(context);
    _channel = vscode.window.createOutputChannel('coreclr-debug');
    // Create our log file and override _channel.append to also outpu to the log
    _installLog = fs.createWriteStream(path.join(_coreClrDebugDir, 'install.log'));
    (function () {
        var proxied = _channel.append;
        _channel.append = function (val) {
            _installLog.write(val);
            proxied.apply(this, arguments);
        };
    })();
    _channel.appendLine("Downloading and configuring the .NET Core Debugger...");
    _channel.show(vscode.ViewColumn.Three);
    var installStage = 'dotnet restore';
    var installError = '';
    spawnChildProcess('dotnet', ['--verbose', 'restore', '--configfile', 'NuGet.config'], _channel, _coreClrDebugDir)
        .then(function () {
        installStage = "dotnet publish";
        return spawnChildProcess('dotnet', ['--verbose', 'publish', '-o', _debugAdapterDir], _channel, _coreClrDebugDir);
    }).then(function () {
        installStage = "ensureAd7";
        return ensureAd7EngineExists(_channel, _debugAdapterDir);
    }).then(function () {
        installStage = "additionalTasks";
        var promises = [];
        promises.push(renameDummyEntrypoint());
        promises.push(removeLibCoreClrTraceProvider());
        return Promise.all(promises);
    }).then(function () {
        installStage = "writeCompletionFile";
        return writeCompletionFile();
    }).then(function () {
        installStage = "completeSuccess";
        _channel.appendLine('Succesfully installed .NET Core Debugger.');
    })
        .catch(function (error) {
        _channel.appendLine('Error while installing .NET Core Debugger.');
        installError = error.toString();
        console.log(error);
    }).then(function () {
        // log telemetry
        logTelemetry('Acquisition', { installStage: installStage, installError: installError });
    });
}
exports.installCoreClrDebug = installCoreClrDebug;
function initializeTelemetry(context) {
    // parse our own package.json into json
    var packageJson = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'package.json')).toString());
    var extensionId = packageJson["publisher"] + "." + packageJson["name"];
    var extensionVersion = packageJson["version"];
    var aiKey = packageJson.contributes.debuggers[0]["aiKey"];
    _reporter = new vscode_extension_telemetry_1.default(extensionId, extensionVersion, aiKey);
}
function logTelemetry(eventName, properties) {
    if (_reporter) {
        _reporter.sendTelemetryEvent('coreclr-debug/' + eventName, properties);
    }
}
function writeCompletionFile() {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path.join(_debugAdapterDir, _completionFileName), '', function (err) {
            if (err) {
                reject(err.code);
            }
            else {
                resolve();
            }
        });
    });
}
function renameDummyEntrypoint() {
    var src = path.join(_debugAdapterDir, 'dummy');
    var dest = path.join(_debugAdapterDir, 'OpenDebugAD7');
    src += getPlatformExeExtension();
    dest += getPlatformExeExtension();
    var promise = new Promise(function (resolve, reject) {
        fs.rename(src, dest, function (err) {
            if (err) {
                reject(err.code);
            }
            else {
                resolve();
            }
        });
    });
    return promise;
}
function removeLibCoreClrTraceProvider() {
    var filePath = path.join(_debugAdapterDir, 'libcoreclrtraceptprovider' + getPlatformLibExtension());
    if (!existsSync(filePath)) {
        return Promise.resolve();
    }
    else {
        return new Promise(function (resolve, reject) {
            fs.unlink(filePath, function (err) {
                if (err) {
                    reject(err.code);
                }
                else {
                    _channel.appendLine('Succesfully deleted ' + filePath);
                    resolve();
                }
            });
        });
    }
}
function existsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK);
        return true;
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        else {
            throw Error(err.code);
        }
    }
}
function getPlatformExeExtension() {
    if (process.platform === 'win32') {
        return '.exe';
    }
    return '';
}
function getPlatformLibExtension() {
    switch (process.platform) {
        case 'win32':
            return '.dll';
        case 'darwin':
            return '.dylib';
        case 'linux':
            return '.so';
        default:
            throw Error('Unsupported platform ' + process.platform);
    }
}
// Determines if the specified command is in one of the directories in the PATH environment variable.
function isOnPath(command) {
    var pathValue = process.env['PATH'];
    if (!pathValue) {
        return false;
    }
    var fileName = command;
    var seperatorChar = ':';
    if (process.platform == 'win32') {
        // on Windows, add a '.exe', and the path is semi-colon seperatode
        fileName = fileName + ".exe";
        seperatorChar = ';';
    }
    var pathSegments = pathValue.split(seperatorChar);
    for (var _i = 0, pathSegments_1 = pathSegments; _i < pathSegments_1.length; _i++) {
        var segment = pathSegments_1[_i];
        if (segment.length === 0 || !path.isAbsolute(segment)) {
            continue;
        }
        var segmentPath = path.join(segment, fileName);
        if (existsSync(segmentPath)) {
            return true;
        }
    }
    return false;
}
function ensureAd7EngineExists(channel, outputDirectory) {
    var filePath = path.join(outputDirectory, "coreclr.ad7Engine.json");
    return new Promise(function (resolve, reject) {
        fs.exists(filePath, function (exists) {
            if (exists) {
                return resolve();
            }
            else {
                channel.appendLine(filePath + " does not exist.");
                channel.appendLine('');
                // NOTE: The minimum build number is actually less than 1584, but this is the minimum
                // build that I have tested.
                channel.appendLine("Error: The .NET CLI did not correctly restore debugger files. Ensure that you have .NET CLI version 1.0.0 build #001584 or newer. You can check your .NET CLI version using 'dotnet --version'.");
                return reject("The .NET CLI did not correctly restore debugger files.");
            }
        });
    });
}
function spawnChildProcess(process, args, channel, workingDirectory) {
    var promise = new Promise(function (resolve, reject) {
        var child = child_process.spawn(process, args, { cwd: workingDirectory });
        child.stdout.on('data', function (data) {
            channel.append("" + data);
        });
        child.stderr.on('data', function (data) {
            channel.appendLine("Error: " + data);
        });
        child.on('close', function (code) {
            if (code != 0) {
                channel.appendLine(process + " exited with error code " + code);
                reject(new Error(code.toString()));
            }
            else {
                resolve();
            }
        });
    });
    return promise;
}
//# sourceMappingURL=coreclr-debug.js.map