let WebUploader = require("webuploader");
let defaultObj = {
    cancelHandler: function () {
        console.log("cancel");
    },
    closeHandler: function () {
        console.log("close");
    },
    sureHandler: function (data) {
        console.log("sure", data);
    }
}

function MultiImageUploadWidget(option) {
    let {
        uploaderOption
    } = option;

    this.mc = $({});
    this.uploaderOption = uploaderOption;
    let wlist = [
        "sureHandler", "cancelHandler", "closeHandler", "container", , "maxItems"
    ];
    this.maxItems = 3;
    this.fileCount = 0;
    $.each(wlist, (k, v) => {
        if (v !== "uploadOption") {
            this[v] = option[v] || defaultObj[v];
        }
    });
    this.init();
}
$.extend(MultiImageUploadWidget.prototype, {
    insertCSS: function () {
        $("head").append(`
        <style>
        .multiImageUploadWidget {
            border: 1px solid #ccc;
            padding: 5px;
            width: 650px;
        }

        .multiImageUploadWidget__header {
            background-color: #3399CC;
            color: #fff;
            font-size: 18px;
            line-height: 30px;
            padding: 0 10px;
            position: relative;
        }

        .multiImageUploadWidget__header__closebtn {
            cursor: pointer;
            position: absolute;
            right: 5px;
            top: 0;
            font-size: 32px;
            font-family: "Arial";
        }

        .multiImageUploadWidget__ctrls {
            text-align: center;
            font-size: 0;
        }

        .multiImageUploadWidget__ctrls input {
            display: inline-block;
            font-size: 14px;
            margin: 0 10px;
        }

        .multiImageUploadWidget__preview {
            margin: 5px 0;
            overflow: hidden;
            text-align: center;
        }

        .multiImageUploadWidget__item {
            margin: 0 4px 8px;
            float: left;
            border: 1px solid #D7D7D7;
            background-color: #F7F7F7;
            width: 120px;
            height: 120px;
            position: relative;
        }
        .multiImageUploadWidget__item__table{
            width:120px;
            height:120px;
        }
        .multiImageUploadWidget__item__table td{
            border:0;
        }
        .multiImageUploadWidget__items__closebtn {
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
            width: 20px;
            height: 20px;
            background: #3399CC;
            color: #fff;
            font-family: "Arial";
        }

        .multiImageUploadWidget__item img {
            display: inline-block;
            max-width: 120px;
            max-height: 120px;
            _width: 120px;
            _height: 120px;
        }

        .multiImageUploadWidget__uploadBtn {
            background-image: url(../widget/resource/icon01.png);
            background-repeat: no-repeat;
            background-position: center 20%;
            overflow: hidden;
            position: relative;
        }

        .multiImageUploadWidget__uploadCtrl__info {
            padding-top: 50%;
            font-size: 14px;
            text-align: center;
        }

        .multiImageUploadWidget__uploadBtnState__n {
            color: #FD4D4D;
            font-family: "Arial";
        }

        .multiImageUploadWidget__uploadCtrl {
            position: absolute;
            width: 100%;
            height: 100%;
            left:0;top:0;
        }

        .multiImageUploadWidget__item--normal {}

        .multiImageUploadWidget__itemTips {
            position: absolute;
            bottom: 0;
            left: 0;
            color: #fff;
            text-align: center;
            width: 100%;
        }

        .multiImageUploadWidget__itemTips--info {
            background:black;
            background: rgba(0, 0, 0, 0.5);
        }

        .multiImageUploadWidget__itemTips--error {
            background:red;
            background: rgba(255, 0, 0, 0.5);
        }

        .multiImageUploadWidget__itemTips--success {
            background:green;
            background: rgba(0, 255, 0, 0.5);
        }

        .webuploader-pick {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: none;
            padding: 0;
        }
        </style>
        `)
    },
    init: function () {
        this.insertCSS();
        this.insertFrameHtml();
        this.bindEvt();
    },
    itemShowError: function (container, info) {
        $(container).find(".multiImageUploadWidget__itemTips").hide().filter(".multiImageUploadWidget__itemTips--error").show().text(info);
    },
    itemShowInfo: function (container, info) {
        $(container).find(".multiImageUploadWidget__itemTips").hide().filter(".multiImageUploadWidget__itemTips--info").show().text(info);
    },
    itemShowSuccess: function (container, info) {
        $(container).find(".multiImageUploadWidget__itemTips").hide().filter(".multiImageUploadWidget__itemTips--success").show().text(info);
    },
    initUploader: function () {
        this.uploader = WebUploader.create({
            auto: true,
            pick: $(".multiImageUploadWidget__uploadCtrl", this.$addBtn),
            fileNumLimit: this.maxItems,
            ...this.uploaderOption
        });

        this.uploader.onUploadProgress = () => {
            // console.log("onUploadProgress");
        }
        this.uploader.onUploadFinished = () => {
            // console.log("onUploadFinished");
        }
        this.uploader.onUploadSuccess = (file, response) => {
            this.fileCount++;
            this.updateAddBtnState();
            this.addFile(file, response).then((dom) => {
                this.itemShowSuccess(dom, '上传成功');
                dom.data("fileurl", response.url);
                // file.on('statuschange', (cur, prev) => {
                //     if (cur === 'error' || cur === 'invalid') {
                //         this.itemShowError(dom, file.statusText);
                //     } else if (cur === 'interrupt') {
                //         this.itemShowError(dom, 'interrupt');
                //     } else if (cur === 'queued') {
                //         this.itemShowInfo(dom, '等待上传');
                //     } else if (cur === 'progress') {
                //         this.itemShowInfo(dom, '上传中');
                //     } else if (cur === 'complete') {
                //         this.itemShowSuccess(dom, '上传成功');
                //     }
                // });
            });
            // console.log("onUploadSuccess");


        }
        this.uploader.onUploadError = () => {
            // console.log("onUploadError");
        }
        this.uploader.onUploadComplete = () => {
            // console.log("onUploadComplete");
        }
        this.uploader.onUploadStart = () => {
            // console.log("onUploadStart");
        }
        this.updateAddBtnState();
    },

    singleFileUploadSuccess: function (...arg) {
        console.log(arg);
    },
    initSingleUploadButtonWidgetList: function () {
        this.$listContainer.find(".multiImageUploadWidget__item--normal").remove();
        this.$addBtn = $(".multiImageUploadWidget__uploadBtn", this.$listContainer);
        this.$addBtnState = $(".multiImageUploadWidget__uploadBtnState", this.$listContainer);
        this.initUploader();
    },
    addFile: function (file, {
        url
    }) {
        let d = $.Deferred();
        // this.uploader.makeThumb(file, (err, ret) => {
        let ins;
        ins = $(`
                 <span class="multiImageUploadWidget__item multiImageUploadWidget__item--normal" data-fileid="${file.id}">
                    <table class="multiImageUploadWidget__item__table"><tr><td><img src="${url}" id="" /></td></tr></table>
                    <span class="multiImageUploadWidget__items__closebtn">×</span>
                    <span class="multiImageUploadWidget__itemTips multiImageUploadWidget__itemTips--error"></span>
                    <span class="multiImageUploadWidget__itemTips  multiImageUploadWidget__itemTips--success"></span>
                    <span class="multiImageUploadWidget__itemTips multiImageUploadWidget__itemTips--info">等待上传</span>
                </span>
                `);
        this.$listContainer.prepend(ins);
        ins.data("multiImageUploadWidget_file", file);
        d.resolve(ins);
        // },120,120);
        return d;
    },
    judgeAddBtnState: function () {
        if (this.fileCount < this.maxItems) {
            this.$addBtn.removeClass("webuploader-element-invisible")
        } else {
            this.$addBtn.addClass("webuploader-element-invisible")
        }
    },
    getAddBtn: function () {
        return `<div class="multiImageUploadWidget__item multiImageUploadWidget__uploadBtn">
        <div class="multiImageUploadWidget__uploadCtrl"></div>
        <div class="multiImageUploadWidget__uploadCtrl__info">添加图片<br/>
        <span class="multiImageUploadWidget__uploadBtnState"></span></div>
        </div>`;
    },
    updateAddBtnState: function () {
        this.$addBtnState.html(`还可以上传<span class="multiImageUploadWidget__uploadBtnState__n">${this.maxItems-this.fileCount}</span>个`);
        this.judgeAddBtnState();
    },
    removeItem: function () {},
    addItem: function () {},
    insertFrameHtml: function () {
        this.container.html(`
            <div class="multiImageUploadWidget">
                <div class="multiImageUploadWidget__header">
                    插入图片 <span class="multiImageUploadWidget__header__closebtn">×</span>
                </div>
                <div class="multiImageUploadWidget__preview">
                    ${this.getAddBtn()}
                </div>
                <div class="multiImageUploadWidget__ctrls">
                    <input class="multiImageUploadWidget__ctrls__sure" type="button" value="确定" /><input type="button" value="取消" class="multiImageUploadWidget__ctrls__cancel"/>
                </div>
            </div>
        `);
        this.$listContainer = $(".multiImageUploadWidget__preview", this.container);
        this.initSingleUploadButtonWidgetList();
    },
    _sureHandler: function () {
        if (this.sureHandler) {
            this.sureHandler($.map(this.$listContainer.find(".multiImageUploadWidget__item").filter((k, v) => {
                return $(v).data("fileurl") ? true : false;
            }), function (v, k) {
                return $(v).data("fileurl");
            }));
        }
    },
    bindEvt: function () {
        //componentEvent
        this.mc.on("multiImageUploadWidget_sure", () => {
            this._sureHandler();
        });
        this.mc.on("multiImageUploadWidget_cancel", () => {
            this.cancelHandler();
        });
        this.mc.on("multiImageUploadWidget_close", () => {
            this.closeHandler();
        });
        this.mc.on("multiImageUploadWidget_upload", () => {
            this.uploader.upload();
        });
        this.mc.on("multiImageUploadWidget_removeItem", (e, targetItem) => {
            let file = $(targetItem).data("multiImageUploadWidget_file");
            this.uploader.removeFile(file);
            $(targetItem).remove();
            this.fileCount--;
            this.updateAddBtnState();
        });
        //domEvent
        this.container.on("click", ".multiImageUploadWidget__header__closebtn", () => {
            this.mc.trigger("multiImageUploadWidget_close");
        });
        this.container.on("click", ".multiImageUploadWidget__ctrls__sure", () => {
            this.mc.trigger("multiImageUploadWidget_sure");
        });
        this.container.on("click", ".multiImageUploadWidget__ctrls__cancel", () => {
            this.mc.trigger("multiImageUploadWidget_cancel");
        });
        this.container.on("click", ".multiImageUploadWidget__ctrls__upload", () => {
            this.mc.trigger("multiImageUploadWidget_upload");
        });
        this.container.on("click", ".multiImageUploadWidget__items__closebtn", (e) => {
            this.mc.trigger("multiImageUploadWidget_removeItem", $(e.target).closest(".multiImageUploadWidget__item"));
        })
    }
});
module.exports = MultiImageUploadWidget;