let WebUploader=require("webuploader");
function sureHandler(){
    console.log("sure");
}
function cancelHandler(){
    console.log("cancel");
}
function MultiImageUploadWidget(option){
    let {
        uploaderOption
    }=option;
    this.mc=$({});
    this.uploader=new WebUploader.Uploader(uploaderOption);
    this.uploaderOption=uploaderOption;
    this.sureHandler=option.sureHandler||sureHandler;
    this.cancelHandler=option.cancelHandler||cancelHandler;
    this.root=$(this.uploaderOption.pick);//TODO
    this.init();
}
$.extend(MultiImageUploadWidget.prototype,{
    init:function(){
        console.log("init");
        this.insertFrameHtml();
        this.bindEvt();
    },
    insertFrameHtml:function(){
        this.root.html(`
            <div class="multiImageUploadWidget">
                <div class="multiImageUploadWidget__header">
                    插入图片
                </div>
                <div class="multiImageUploadWidget__preview">
                </div>
                <div class="multiImageUploadWidget__ctrls">
                    <input class="multiImageUploadWidget__ctrls__sure" type="button" value="确定" /><input type="button" value="取消" class="multiImageUploadWidget__ctrls__cancel"/>
                </div>
            </div>
        `);
    },
    bindEvt:function(){
        this.mc.on("multiImageUploadWidget_sure",()=>{
            this.sureHandler();
        });
        this.mc.on("multiImageUploadWidget_cancel",()=>{
            this.cancelHandler();
        });
        this.root.on("click",".multiImageUploadWidget__ctrls__sure",()=>{
            this.mc.trigger("multiImageUploadWidget_sure");
        });
        this.root.on("click",".multiImageUploadWidget__ctrls__cancel",()=>{
            this.mc.trigger("multiImageUploadWidget_cancel");
        })
    }
});
module.exports=MultiImageUploadWidget;