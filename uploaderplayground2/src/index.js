let MultiImageUploadWidget = require("./MultiImageUploadWidget");
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