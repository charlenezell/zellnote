// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode_1 = require('vscode');
var fs = require('fs');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(ctx) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "read-only-indicator" is now active!');
    // create a new read only indicator
    var readOnlyIndicator = new ReadOnlyIndicator();
    var controller = new ReadOnlyIndicatorController(readOnlyIndicator);
    // add to a list of disposables which are disposed when this extension
    // is deactivated again.
    ctx.subscriptions.push(controller);
    ctx.subscriptions.push(readOnlyIndicator);
}
exports.activate = activate;
var ReadOnlyIndicator = (function () {
    function ReadOnlyIndicator() {
    }
    ReadOnlyIndicator.prototype.dispose = function () {
        this.hideReadOnly();
    };
    ReadOnlyIndicator.prototype.updateReadOnly = function () {
        // Create as needed
        if (!this.statusBarItem) {
            this.statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        }
        // Get the current text editor
        var editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            this.statusBarItem.hide();
            return;
        }
        var doc = editor.document;
        // Only update status if an MD file
        if (!doc.isUntitled) {
            var readOnly = this.isReadOnly(doc);
            // Update the status bar
            this.statusBarItem.text = !readOnly ? '$(pencil) [RW]' : '$(circle-slash) [RO]';
            this.statusBarItem.tooltip = !readOnly ? 'The file is writeable' : 'The file is read only';
            this.statusBarItem.show();
        }
        else {
            this.statusBarItem.hide();
        }
    };
    ReadOnlyIndicator.prototype.isReadOnly = function (doc) {
        var filePath = doc.fileName;
        try {
            fs.accessSync(filePath, fs.W_OK);
            return false;
        }
        catch (error) {
            return true;
        }
    };
    ReadOnlyIndicator.prototype.hideReadOnly = function () {
        if (this.statusBarItem) {
            this.statusBarItem.dispose();
        }
    };
    return ReadOnlyIndicator;
})();
exports.ReadOnlyIndicator = ReadOnlyIndicator;
var ReadOnlyIndicatorController = (function () {
    function ReadOnlyIndicatorController(wordCounter) {
        this.readOnlyIndicator = wordCounter;
        this.readOnlyIndicator.updateReadOnly();
        // subscribe to selection change and editor activation events
        var subscriptions = [];
        vscode_1.window.onDidChangeTextEditorSelection(this.onEvent, this, subscriptions);
        vscode_1.window.onDidChangeActiveTextEditor(this.onEvent, this, subscriptions);
        // create a combined disposable from both event subscriptions
        this.disposable = vscode_1.Disposable.from.apply(vscode_1.Disposable, subscriptions);
    }
    ReadOnlyIndicatorController.prototype.dispose = function () {
        this.disposable.dispose();
    };
    ReadOnlyIndicatorController.prototype.onEvent = function () {
        this.readOnlyIndicator.updateReadOnly();
    };
    return ReadOnlyIndicatorController;
})();
//# sourceMappingURL=extension.js.map