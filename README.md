# xWindow

基于[Vue@3.3+][vue]的函数式弹窗组件库。

> `xWindow`使用了诸如`expose`、`.prop`之类的api, **请确保你的`Vue`版本不低于3.2.0**。

## 安装

```bash
# npm
npm i @dongls/xwindow

# pnpm
pnpm i @dongls/xwindow
```

组件的使用可以参照[在线文档][doc]。

## 兼容性

`xWindow`使用了诸如`Proxy`、`Reflect`之类的新特性，因此需要浏览器至少实现了`ES2015`标准。需要注意的是，`xWindow`**不支持IE浏览器，也没有相关的支持计划**。

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2023-present dongls

[vue]: https://github.com/vuejs/core
[doc]: https://dongls.github.io/xWindow/
