# iosWebapp配置文档

1. 图标格式
    + png
1. 图标影响范围
    + 全站，放根目录一个apple-touch-icon.png
    + 页面
    ```html
    <link rel="apple-touch-icon" href="/custom_icon.png">
    ```
    + 为多设备指定
    ```html
    <link rel="apple-touch-icon" href="touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
    ```
    最适合的会被使用到，如果没指定sizes的话会使用60x60的图标。

    如果没有图标适合那个尺寸的设备的话配置中大于设备的最佳值中的图标最小的会被使用，如果没有大于最佳值的图标的话最大的图标会被使用。

    > The icon that is the most appropriate size for the device is used. If no sizes attribute is set, the element’s size defaults to 60 x 60.
    If there is no icon that matches the recommended size for the device, the smallest icon larger than the recommended size is used. If there are no icons larger than the recommended size, the largest icon is used.

    其中最佳尺寸如下:

    + iPhone 6s Plus/iPhone 6 Plus  => 180px

    + iPhone 6s/iPhone 6/iPhone SE  => 120px by 120px

    + iPad Pro  => 167px by 167px

    + iPad/iPad mini  => 152px by 152px

[参考资料1](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html#//apple_ref/doc/uid/TP40002051-CH3-SW3)

[参考资料2](https://developer.apple.com/ios/human-interface-guidelines/graphics/app-icon/#//apple_ref/doc/uid/TP40006556-CH27)


# 另外
可以指定一个启动图标,而在iPhone/iPod touch图片必须是320 x 480 pixels且是竖屏的。
```html
<link rel="apple-touch-startup-image" href="/startup.png">
```
全屏模式指定与全屏工具栏的样式控制，两个标签必须配合使用
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<!--black-translucent/black/default-->
```
>This meta tag has no effect unless you first specify full-screen mode as described in apple-apple-mobile-web-app-capable.
If content is set to default, the status bar appears normal. If set to black, the status bar has a black background. If set to black-translucent, the status bar is black and translucent. If set to default or black, the web content is displayed below the status bar. If set to black-translucent, the web content is displayed on the entire screen, partially obscured by the status bar. The default value is default.

