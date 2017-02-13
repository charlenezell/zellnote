let MultiImageUploadWidget = require("./widget/MultiImageUploadWidget.es6");
$.fn.multiImageUploadWidget = function ({
    uploaderOption
}) {
    this.each(function (k, v) {
        let instance = new MultiImageUploadWidget({
            uploaderOption:{
                pick: $(this),
                ...uploaderOption
            }
        })
        $(this).data("multiImageUploadWidgetInstance", instance)
    })
}
module.exports = {
    MultiImageUploadWidget: MultiImageUploadWidget
}