/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
var proto = require('../protocol');
var launchTargetFinder_1 = require('../launchTargetFinder');
var pathHelpers = require('../pathHelpers');
var run_in_terminal_1 = require('run-in-terminal');
var fs = require('fs');
var path = require('path');
var vscode = require('vscode');
var isWin = /^win/.test(process.platform);
function registerCommands(server, extensionPath) {
    var d1 = vscode.commands.registerCommand('o.restart', function () { return server.restart(); });
    var d2 = vscode.commands.registerCommand('o.pickProjectAndStart', function () { return pickProjectAndStart(server); });
    var d3 = vscode.commands.registerCommand('o.restore', function () { return dnxRestoreForAll(server); });
    var d4 = vscode.commands.registerCommand('o.execute', function () { return dnxExecuteCommand(server); });
    var d5 = vscode.commands.registerCommand('o.execute-last-command', function () { return dnxExecuteLastCommand(server); });
    var d6 = vscode.commands.registerCommand('o.showOutput', function () { return server.getChannel().show(vscode.ViewColumn.Three); });
    var d7 = vscode.commands.registerCommand('dotnet.restore', function () { return dotnetRestore(server); });
    var d8 = vscode.commands.registerCommand('csharp.addTasksJson', function () { return addTasksJson(server, extensionPath); });
    return vscode.Disposable.from(d1, d2, d3, d4, d5, d6, d7, d8);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerCommands;
function pickProjectAndStart(server) {
    return launchTargetFinder_1.default().then(function (targets) {
        var currentPath = server.getSolutionPathOrFolder();
        if (currentPath) {
            for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                var target = targets_1[_i];
                if (target.target.fsPath === currentPath) {
                    target.label = "\u2713 " + target.label;
                }
            }
        }
        return vscode.window.showQuickPick(targets, {
            matchOnDescription: true,
            placeHolder: "Select 1 of " + targets.length + " projects"
        }).then(function (target) {
            if (target) {
                return server.restart(target.target.fsPath);
            }
        });
    });
}
var lastCommand;
function dnxExecuteLastCommand(server) {
    if (lastCommand) {
        lastCommand.execute();
    }
    else {
        dnxExecuteCommand(server);
    }
}
function dnxExecuteCommand(server) {
    if (!server.isRunning()) {
        return Promise.reject('OmniSharp server is not running.');
    }
    return server.makeRequest(proto.Projects).then(function (info) {
        var commands = [];
        info.Dnx.Projects.forEach(function (project) {
            Object.keys(project.Commands).forEach(function (key) {
                commands.push({
                    label: "dnx " + key + " - (" + (project.Name || path.basename(project.Path)) + ")",
                    description: path.dirname(project.Path),
                    execute: function () {
                        lastCommand = this;
                        var command = path.join(info.Dnx.RuntimePath, 'bin/dnx');
                        var args = [key];
                        // dnx-beta[1-6] needs a leading dot, like 'dnx . run'
                        if (/-beta[1-6]/.test(info.Dnx.RuntimePath)) {
                            args.unshift('.');
                        }
                        if (isWin) {
                            command += '.exe';
                        }
                        return run_in_terminal_1.runInTerminal(command, args, {
                            cwd: path.dirname(project.Path),
                            env: {}
                        });
                    }
                });
            });
        });
        return vscode.window.showQuickPick(commands).then(function (command) {
            if (command) {
                return command.execute();
            }
        });
    });
}
function dnxRestoreForAll(server) {
    if (!server.isRunning()) {
        return Promise.reject('OmniSharp server is not running.');
    }
    return server.makeRequest(proto.Projects).then(function (info) {
        var commands = [];
        info.Dnx.Projects.forEach(function (project) {
            commands.push({
                label: "dnu restore - (" + (project.Name || path.basename(project.Path)) + ")",
                description: path.dirname(project.Path),
                execute: function () {
                    var command = path.join(info.Dnx.RuntimePath, 'bin/dnu');
                    if (isWin) {
                        command += '.cmd';
                    }
                    return run_in_terminal_1.runInTerminal(command, ['restore'], {
                        cwd: path.dirname(project.Path)
                    });
                }
            });
        });
        return vscode.window.showQuickPick(commands).then(function (command) {
            if (command) {
                return command.execute();
            }
        });
    });
}
exports.dnxRestoreForAll = dnxRestoreForAll;
function dnxRestoreForProject(server, fileName) {
    return server.makeRequest(proto.Projects).then(function (info) {
        for (var _i = 0, _a = info.Dnx.Projects; _i < _a.length; _i++) {
            var project = _a[_i];
            if (project.Path === fileName) {
                var command = path.join(info.Dnx.RuntimePath, 'bin/dnu');
                if (isWin) {
                    command += '.cmd';
                }
                return run_in_terminal_1.runInTerminal(command, ['restore'], {
                    cwd: path.dirname(project.Path)
                });
            }
        }
        return Promise.reject("Failed to execute restore, try to run 'dnu restore' manually for " + fileName + ".");
    });
}
exports.dnxRestoreForProject = dnxRestoreForProject;
function dotnetRestore(server) {
    if (!server.isRunning()) {
        return Promise.reject('OmniSharp server is not running.');
    }
    var solutionPathOrFolder = server.getSolutionPathOrFolder();
    if (!solutionPathOrFolder) {
        return Promise.reject('No solution or folder open.');
    }
    pathHelpers.getPathKind(solutionPathOrFolder).then(function (kind) {
        if (kind === pathHelpers.PathKind.File) {
            return path.dirname(solutionPathOrFolder);
        }
        else {
            return solutionPathOrFolder;
        }
    }).then(function (solutionDirectory) {
        return run_in_terminal_1.runInTerminal('dotnet', ['restore'], {
            cwd: solutionPathOrFolder
        });
    });
}
function ensureDirectoryCreated(directoryPath) {
    return pathHelpers.exists(directoryPath).then(function (e) {
        if (e) {
            return true;
        }
        else {
            return pathHelpers.mkdir(directoryPath);
        }
    });
}
function getExpectedVsCodeFolderPath(solutionPathOrFolder) {
    return pathHelpers.getPathKind(solutionPathOrFolder).then(function (kind) {
        if (kind === pathHelpers.PathKind.File) {
            return path.join(path.dirname(solutionPathOrFolder), '.vscode');
        }
        else {
            return path.join(solutionPathOrFolder, '.vscode');
        }
    });
}
function addTasksJson(server, extensionPath) {
    return new Promise(function (resolve, reject) {
        if (!server.isRunning()) {
            return reject('OmniSharp is not running.');
        }
        var solutionPathOrFolder = server.getSolutionPathOrFolder();
        if (!solutionPathOrFolder) {
            return reject('No solution or folder open.');
        }
        return getExpectedVsCodeFolderPath(solutionPathOrFolder).then(function (vscodeFolderPath) {
            var tasksJsonPath = path.join(vscodeFolderPath, 'tasks.json');
            return pathHelpers.exists(tasksJsonPath).then(function (e) {
                if (e) {
                    return vscode.window.showInformationMessage(tasksJsonPath + " already exists.").then(function (_) {
                        return resolve(tasksJsonPath);
                    });
                }
                else {
                    var templatePath_1 = path.join(extensionPath, 'template-tasks.json');
                    return pathHelpers.exists(templatePath_1).then(function (e) {
                        if (!e) {
                            return reject('Could not find template-tasks.json file in extension.');
                        }
                        return ensureDirectoryCreated(vscodeFolderPath).then(function (ok) {
                            if (ok) {
                                var oldFile = fs.createReadStream(templatePath_1);
                                var newFile = fs.createWriteStream(tasksJsonPath);
                                oldFile.pipe(newFile);
                                return resolve(tasksJsonPath);
                            }
                            else {
                                return reject("Could not create " + vscodeFolderPath + " directory.");
                            }
                        });
                    });
                }
            });
        });
    });
}
exports.addTasksJson = addTasksJson;
//# sourceMappingURL=commands.js.map