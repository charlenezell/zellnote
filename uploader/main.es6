let MultiImageUploadWidget = require("./widget/MultiImageUploadWidget.es6");
$.fn.multiImageUploadWidget = function (option) {
    this.each(function (k, v) {
        let instance = new MultiImageUploadWidget({
            container:$(this),
            ...option
        })
        $(this).data("multiImageUploadWidgetInstance", instance)
    })
}
module.exports = {
    MultiImageUploadWidget: MultiImageUploadWidget
}