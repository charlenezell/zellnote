
this is *italic* and this is **bold** .  another _italic_ and another __bold__

this is `important` text. and percentage signs : % and `%`

cross some words~~hello~~.


## Indentation
> Here is some indented text
>> even more indented
>>> sdfdf
>>>>>>>> sadfj


# Big title (h1)
## Middle title (h2)
### Smaller title (h3)
#### and so on (hX)
##### and so on (hX)
###### and so on (hX)

标题一
===

标题而
---


说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么
***
说什么说什么说什么说
___
什么说什么说什么说什么说什么说什么说
* * *
什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么说什么
 - bullets can be `-`, `+`, or `*`
 - bullet list 1
 - bullet list 2
    - sub item 1
    - sub item

        with indented text inside

 - bullet list 3
 + bullet list 4
 * bullet list 5


This is an [example inline link](http://lmgtfy.com/) and [another one with a title](http://lmgtfy.com/ "Hello, world").

Links can also be reference based : [reference 1][ref1] or [reference 2 with title][ref2].

 [ref1]: http://revolunet.com
 [ref2]: http://revolunet.com "rich web apps"

![revolunet logo](http://www.revolunet.com/static/parisjs8/img/logo-revolunet-carre.jpg "revolunet logo")

![revolunet logo][revolunet-logo]

[revolunet-logo]: http://www.revolunet.com/static/parisjs8/img/logo-revolunet-carre.jpg "revolunet logo"


```
console.log("hello")
```


$$F(\omega) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} f(t) \, e^{ - i \omega t}dt$$




```python
import random

class CardGame(object):
    """ a sample python class """
    NB_CARDS = 32
    def __init__(self, cards=5):
        self.cards = random.sample(range(self.NB_CARDS), 5)
        print 'ready to play'
```

Some Javascript code :

```js
var config = {
    duration: 5,
    comment: 'WTF'
}
// callbacks beauty un action
async_call('/path/to/api', function(json) {
    another_call(json, function(result2) {
        another_another_call(result2, function(result3) {
            another_another_another_call(result3, function(result4) {
                alert('And if all went well, i got my result :)');
            });
        });
    });
})
```



| Year | Temperature (low) | Temperature (high) |
| ---- | ----------------- | -------------------|
| 1900 |               -10 |                 25 |
| 1910 |               -15 |                 30 |
| 1920 |               -10 |                 32 |



| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| `git status`   | git status     | git status    |
| `git diff`     | git diff       | git diff      |


