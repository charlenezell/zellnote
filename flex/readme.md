# flex layout module and responsive tips

## calc

    ```css
    .container{
        width:calc( 100% - 20px );
    }
    ```

## flex
    1. container

        ```css
        div{
            display:flex;
            justify-content:flex-start;
            align-items:stretch ;
            align-content:stretch ;
            flex-direction:row;
            flex-wrap:nowrap;
            flex-flow:row nowrap;
        }
        ```

    1. child

        ```css
        div{
            flex-basis:20px;
            width:20px;
            flex-grow:0;
            flex-shrink:1;
            order:0;
            flex:0 1 20px;
            align-self:stretch;
        }
        ```

## note

* calc might the space between the operator

* grow is about remain space sharing

* shrink is about overflow nagatibe space sharing

* basis and width is about geo. before cal sharing spacing



