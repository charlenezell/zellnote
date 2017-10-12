# nginx location config

<table cellspacing="0"> <tbody><tr> <th> Syntax: </th> <td> <code><strong>location</strong> [<br/>
    <code>=</code> |<br/>
    <code>~</code> |<br/>
    <code>~*</code> |<br/>
    <code>^~</code><br/>
    ] <code><i>uri</i></code> { ... }</code><br><code><strong>location</strong> <code>@</code><code><i>name</i></code> { ... }</code><br> </td> </tr> <tr> <th> Default: </th> <td> — </td> </tr> <tr> <th> Context: </th> <td> <code>server</code>, <code>location</code><br> </td> </tr> </tbody></table>

1. 处理对象是decode后的url和处理问相对路径后和合并并列的//为一个/后的标准url
1. 可以使用的表达表达式类型有
    1. 前缀 string
    1. 正则
        1. 大小写敏感 ~ regex
        1. 大小写不敏感 ~* regex
1. 逻辑
    ```mermaid
    graph TB
    c1{逐一匹配prefix string规则}
    c2{按顺序逐一匹配正则表达式}
    c3{是否有记录的prefix记录}
    c4{最长匹配前缀表达式是否带停止匹配正则符号}
    c5{匹配前缀表达式是否带全等符号}
    start1(开始)
    end1(结束)
    record(记录最长匹配)

    start1==>c1
    c1==匹配==>c5
    c5==是==>end1
    c5==否==>c1
    c1==匹配完毕==>record
    record==>c4
    c4==是==>end1
    c4==否==>c2
    c1==无一匹配==>c2
    c2==一旦匹配到其中一个==>end1
    c2==都不能匹配==>c3
    c3==有==>end1
    c3==无==>end1
    ```
1. location direct 可以嵌套



> Sets configuration depending on a request URI.
>
> The matching is performed against a normalized URI, after decoding the text encoded in the “%XX” form, resolving references to relative path components “.” and “..”, and possible compression of two or more adjacent slashes into a single slash.
>
> A location can either be defined by a prefix string, or by a regular expression. Regular expressions are specified with the preceding “~*” modifier (for case-insensitive matching), or the “~” modifier (for case-sensitive matching). To find location matching a given request, nginx first checks locations defined using the prefix strings (prefix locations). Among them, the location with the longest matching prefix is selected and remembered. Then regular expressions are checked, in the order of their appearance in the configuration file. The search of regular expressions terminates on the first match, and the corresponding configuration is used. If no match with a regular expression is found then the configuration of the prefix location remembered earlier is used.
>
> location blocks can be nested, with some exceptions mentioned below.
>
> For case-insensitive operating systems such as macOS and Cygwin, matching with prefix strings ignores a case (0.7.7). However, comparison is limited to one-byte locales.
>
> Regular expressions can contain captures (0.7.40) that can later be used in other directives.
>
> If the longest matching prefix location has the “^~” modifier then regular expressions are not checked.
>
> Also, using the “=” modifier it is possible to define an exact match of URI and location. If an exact match is found, the search terminates. For example, if a “/” request happens frequently, defining “location = /” will speed up the processing of these requests, as search terminates right after the first comparison. Such a location cannot obviously contain nested locations.

