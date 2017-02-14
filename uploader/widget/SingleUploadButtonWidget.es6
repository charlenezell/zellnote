let WebUploader = require("webuploader");

function SingleUploadButtonWidget(option) {
    let {
        uploaderOption
    } = option;
    this.mc = $({});
    let wlist = [
        "maxItemNumber", "container", "word"
    ];

    $.each(wlist, (k, v) => {
        if (v !== "uploadOption") {
            this[v] = option[v];
        }
    });
    debugger;
    this.uploaderOption = {
        fileNumLimit: this.maxItemNumber,
        ...uploaderOption
    };
    this.init();
}
$.extend(SingleUploadButtonWidget.prototype, {
    init: function () {
        console.log("init");
        this.insertFrameHtml();
        // this.bindEvt();
        this.initUploader();
    },
    initUploader: function () {
        let opt={
            ...this.uploaderOption,
            pick: this.container.find(".SingleUploadButtonWidget__addBtn")
        };
        this.uploader = new WebUploader.create(opt);
        $.extend(this.uploader,{
            onUploadProgress: $.proxy(this.uploadProgress, this),
            onUploadFinished: $.proxy(this.uploadFinished, this),
            onUploadSuccess: $.proxy(this.uploadSuccess, this),
            onUploadError: $.proxy(this.uploadError, this),
            onUploadComplete: $.proxy(this.uploadComplete, this),
            onUploadStart: $.proxy(this.uploadStart, this)
        })
    },
    insertFrameHtml: function () {
        this.container.html(`
        <div class="SingleUploadButtonWidget">
            <div class="SingleUploadButtonWidget__addBtn"></div>
            <div>${this.word}</div>
        </div>
        `);
    },
    bindEvt: function () {

    },
    uploadStart: function () {
        console.log("uploadStart")

    },

    uploadFinished: function () {
        console.log("uploadFinished")

    },

    uploadComplete: function (file) {
        console.log("uploadComplete")

    },

    uploadSuccess: function (file) {
        console.log("uploadSuccess")

    },

    uploadError: function (file) {
        console.log("uploadError")

    },

    uploadProgress: function (file, percentage) {
        console.log("uploadProgress")

    }
});
module.exports = SingleUploadButtonWidget;