# act template

## process

```mermaid
sequenceDiagram
    美术->>界面开发:提交psd
    界面开发->>下游功能人员:psd转化为html+css+动画
```

## optimize point

1. 对图位置应该交给美术
1. 动画调节应该交给美术

## problems

* [ ] ~~一次成型的设计?~~
* [X] 可以二次开发的半成品导出?

## product

* [ ] chrome extension (对图位置，动画调节=>标准化数据导出)

## new process

```mermaid
sequenceDiagram
    美术->>界面开发:1.提交psd
    界面开发->>美术:2.提交静态界面url*1
    note right of 美术:*1集成了已经带需要位置调整和动画调整标记的
    美术->>界面开发:3.标准化数据格式*2
    note right of 美术:*2通过chromExtension导出
    界面开发->>下游功能人员:4.标准化数据格式转化为css+动画
```