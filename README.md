# 将es6的模块语法转换为nej的模块语法

## import

### 1. 注入参数 
在es6中，引入的对象为只读对象，因此使用时必须将对象复制出来使用。这个版本暂时删掉了，因为感觉没啥用。
```javascript
import {o, f, r} from 'nej';
let obj = o, func = f, arr = r;
```

### 2. 输出结果集空间
不需要额外引入，直接写export即可

### 3. 资源后缀
- 对于javascript资源，是否需要文件扩展名，保持和nej语法一致
- 对于css，html，json资源，无需添加前缀标识
- 不支持regular!前缀标识

## export

ES6的export语法中，支持其中常用的两种写法，需要支持其它写法，欢迎反馈
```javascript
export { name1, name2, …, nameN }; //支持
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN;
export let name1 = …, name2 = …, …, nameN;

export default expression; //支持
export default function (…) { … }
export default function name1(…) { … }
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
```
