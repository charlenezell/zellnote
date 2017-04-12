# CRP

<!-- TOC -->

- [CRP](#crp)
    - [what is CRP](#what-is-crp)
    - [*OM(DOM/CSSOM)](#omdomcssom)
    - [stages to see things (Render Tree => Layout => Print)](#stages-to-see-things-render-tree--layout--print)
    - [Perpose Summary](#perpose-summary)
    - [Render Blocking CSS (should know about CSS)](#render-blocking-css-should-know-about-css)
    - [Adding Interactivity with JavaScript](#adding-interactivity-with-javascript)
    - [”_**You can't optimize what you can't measure.**_“](#_you-cant-optimize-what-you-cant-measure_)
    - [example](#example)
    - [summary](#summary)

<!-- /TOC -->

## what is CRP

Optimizing for performance is all about understanding what happens in these intermediate steps between receiving the HTML, CSS, and JavaScript bytes and the required processing to turn them into rendered pixels - that's the critical rendering path.
![difference](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/progressive-rendering.png)

## *OM(DOM/CSSOM)

Bytes → characters → tokens → nodes → object model.
![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/full-process.png)

Every time the browser processes HTML markup, it goes through all of the steps above: convert bytes to characters, identify tokens, convert tokens to nodes, and build the DOM tree. This entire process can take some time, especially if we have a large amount of HTML to process.

1. HTML

    ![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/dom-tree.png)

1. CSS

    ![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-tree.png)

Reflect to TimeLine Panel/ Performance Panel Event : Parse HTML / Recalculate Style

## stages to see things (Render Tree => Layout => Print)

1. Render Tree

    ![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/render-tree-construction.png)

    To construct the render tree, the browser roughly does the following:

    1. Starting at the root of the DOM tree, traverse each visible node.

        1. Some nodes are not visible (for example, script tags, meta tags, and so on), and are omitted since they are not reflected in the rendered output.
        1. Some nodes are hidden via CSS and are also omitted from the render tree; for example, the span node---in the example above---is missing from the render tree because we have an explicit rule that sets the "display: none" property on it.
    1. For each visible node, find the appropriate matching CSSOM rules and apply them.
    1. Emit visible nodes with content and their computed styles.

1. Layout (Layout Event in PerfPanel)

    With the render tree in place, we can proceed to the "layout" stage.

    Up to this point we've calculated which nodes should be visible and their computed styles, but we have not calculated their exact position and size within the viewport of the device---that's the "layout" stage, also known as "reflow."

    ![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/layout-viewport.png)

1. Painting (Paint Event in PerfPanel)

    Finally, now that we know which nodes are visible, and their computed styles and geometry, we can pass this information to the final stage, which converts each node in the render tree to actual pixels on the screen. This step is often referred to as "painting" or "rasterizing."


## Perpose Summary

Here's a quick recap of the browser's steps:

1. Process HTML markup and build the DOM tree.
1. Process CSS markup and build the CSSOM tree.
1. Combine the DOM and CSSOM into a render tree.
1. Run layout on the render tree to compute geometry of each node.
1. Paint the individual nodes to the screen.

Optimizing the critical rendering path is the process of minimizing the total amount of time spent performing steps 1 through 5 in the above sequence.

## Render Blocking CSS (should know about CSS)

By default, CSS is treated as a render blocking resource, which means that the browser
won't render any processed content until the CSSOM is constructed.What would happen if we try to render a typical page without blocking rendering on CSS?

1. Media types and media queries allow us to mark **some** CSS resources as non-render blocking.
1. Finally, note that "render blocking" only refers to whether the browser has to hold the initial rendering of the page on that resource. In either case, the browser still downloads the CSS asset, albeit with a **lower priority** for non-blocking resources.

## Adding Interactivity with JavaScript

JavaScript can also block DOM construction and delay when the page is rendered. To deliver optimal performance, make your JavaScript async and eliminate any unnecessary JavaScript from the critical rendering path.

script is executed at the exact point where it is inserted in the document.When the HTML parser encounters a script tag, it **pauses** its process of constructing the DOM and yields control to the JavaScript engine; after the JavaScript engine finishes running, the browser then picks up where it left off and **resumes** DOM construction.

the browser delays script execution and DOM construction until it has finished downloading and constructing the CSSOM, and if the script is an external js file then should the fetching time of that resource additionally.

In short, JavaScript introduces a lot of new dependencies **between the DOM, the CSSOM, and JavaScript execution**. This can cause the browser significant delays in processing and rendering the page on the screen

1. make it async

## ”_**You can't optimize what you can't measure.**_“

1. lighthouse (rapidly test, iterate, and improve its performance)

1. Navigation Timing API (real user interactions)

## example

[example Link](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp)

1. warm up

    try to minify DOMContentLoaded time async jsfile that that event wait for which also wait for cssom ready for js to manipulating ?

    before

    ![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/waterfall-dom-css-js.png)

    after async the js

    ![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/waterfall-dom-css-js-async.png)

    after inline css and js

    ![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/waterfall-dom-css-inline-js-inline.png)

    **scriptTag loading machanism**

    ![](http://www.growingwiththeweb.com/images/2014/02/26/legend.svg)

    1. normal

    ![](http://www.growingwiththeweb.com/images/2014/02/26/script.svg)

    1. async

    ![](http://www.growingwiththeweb.com/images/2014/02/26/script-async.svg)

    1. defer
    
    downloads the file during HTML parsing and will only execute it after the parser has completed. defer scripts are also guarenteed to execute in the order that they appear in the document.

    ![](http://www.growingwiththeweb.com/images/2014/02/26/script-defer.svg)
    
    > Here are some general rules to follow:
    > - If the script is modular and does not rely on any scripts then use async.
    > - If the script relies upon or is relied upon by another script then use defer.
    > - If the script is small and is relied upon by an async script then use an inline script with no attributes placed above the async scripts.
    >
    > IE9 and below have some pretty bad bugs in their implementation of defer such that the execution order isn’t guarenteed. If you need to support <= IE9 I recommend not using defer at all and include your scripts with no attribute if the execution order matters. [Read the specifics here](https://github.com/h5bp/lazyweb-requests/issues/42).

1. performance patterns

![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/analysis-dom.png)

| critical resource (CR) | cretical path (CP) | cretical bytes (CB) |
| ---------------------- | ------------------ | ------------------- |
| 1                      | 1                  | 5k                  |

![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/analysis-dom-css.png)


| critical resource (CR) | cretical path (CP) | cretical bytes (CB) |
| ---------------------- | ------------------ | ------------------- |
| 2                      | 2                  | 9k                  |

![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/analysis-dom-css-js.png)

| critical resource (CR) | cretical path (CP) | cretical bytes (CB) |
| ---------------------- | ------------------ | ------------------- |
| 3                      | 2(parallel js/css) | 11k                 |

## summary
1. propose 

    **_to elminate CR / CB / CP_**

1. Eliminate render-blocking JavaScript and CSS 
    1. asynchronous JavaScript resources
    1. Avoid synchronous server calls
    1. Avoid long running JavaScript
    1. Put CSS in the document head
    1. Avoid CSS imports
    1. Inline render-blocking CSS