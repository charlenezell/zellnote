# cookieSupport

```javscript
    function supportCookie(){
        if (navigator.cookieEnabled) return true;
        // Create cookie
        document.cookie = "cookietest=1";
        var ret = document.cookie.indexOf("cookietest=") != -1;
        // Delete cookie
        document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
        return ret;
    }
```

# screenInfo

```javscript
    function getScreenInfo(){
        return {
            colorDepth,
            availableWidth,
            availableHeight,
            height,
            width
        }=Screen;
    }
```