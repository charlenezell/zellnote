/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
var fs = require('fs');
(function (PathKind) {
    PathKind[PathKind["File"] = 0] = "File";
    PathKind[PathKind["Directory"] = 1] = "Directory";
})(exports.PathKind || (exports.PathKind = {}));
var PathKind = exports.PathKind;
function getPathKind(path) {
    return new Promise(function (resolve, reject) {
        fs.lstat(path, function (err, stats) {
            if (err) {
                reject(err);
            }
            else if (stats.isFile()) {
                resolve(PathKind.File);
            }
            else if (stats.isDirectory()) {
                resolve(PathKind.Directory);
            }
            else {
                reject(Error("Path is not file or directory: " + path));
            }
        });
    });
}
exports.getPathKind = getPathKind;
function exists(path) {
    return new Promise(function (resolve, reject) {
        fs.exists(path, function (exists) {
            if (exists) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
}
exports.exists = exists;
function mkdir(directoryPath) {
    return new Promise(function (resolve, reject) {
        fs.mkdir(directoryPath, function (err) {
            if (!err) {
                resolve(true);
            }
            else {
                reject(err);
            }
        });
    });
}
exports.mkdir = mkdir;
//# sourceMappingURL=pathHelpers.js.map