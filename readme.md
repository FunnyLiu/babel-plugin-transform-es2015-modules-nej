# 将es6的模块语法转换为nej的模块语法
## nej和es6对照

1. 输出结果集空间

```javascript
export {xxx, xxx, xxx}
```
2. 其他注入参数(不建议使用)
在es6中，引入的对象为只读对象，因此使用时必须将对象复制出来使用
```javascript
import {o, f, r} form 'nej';
let obj = o, func = f, arr = r;
```
## 3. 资源后缀
- 对于javascript资源，是否需要文件扩展名，保持和nej语法一致
- 对于css，html，json资源，无需添加前缀标识
- 不支持regular!前缀标识