# Fusion Components

[![Build Status](https://app.travis-ci.com/iahu/fusion-components.svg?branch=master)](https://app.travis-ci.com/iahu/fusion-components)
[![codecov](https://codecov.io/gh/iahu/fusion-components/branch/master/graph/badge.svg?token=HS4SFMZVJR)](https://codecov.io/gh/iahu/fusion-components)

a suit of UI components, which are build with Web Component.

**几个特点：**

- 原生组件，无需运行时依赖，可与原生 HTML 一样在其它类库中使用
- 高可配置性
  - 丰富的 slot 模块，方便插入自定义元素
  - 全局的 CSS 变量，方便修改组件内部样式
- 原生支持在 React 中使用，无需转换
  - React 能原生捕获组件内部 `onChange` 事件
- 可用性高
  - 很好地支持了键盘操作
  - 较好地实现了 a11y 规范
  - 支持 `form-associated`，与原生输入组件表现一致

[Visit Storybook 🤌](https://iahu.github.io/fusion-components)

## How to use

### Install

`npm install @egret/fusion-components`

`yarn add @egret/fusion-components`

### use in HTML

```html
<html>
  <head>
    <!-- 引入依赖，注意必须使用 esModule 的方式，且应该放在 `<body>` 前面 -->
    <script src="/path/to/dist/fusion-components-min.js" type="module"></script>
  </head>
  <body>
    <fc-select id="fc-select">
      <fc-list-option value="1">1</fc-list-option>
      <fc-list-option value="2">2</fc-list-option>
      <fc-list-option value="3">3</fc-list-option>
    </fc-select>

    <script>
      // listen to events
      document.querySelector('#fc-select').addEventListener('change', console.log)
    </script>
  </body>
</html>
```

### use in React Application

Firstly, we should import this lib on entry file.

```ts
import '@egret/fusion-components'
// 使用 TypeScript 需要引入针对 React 的类型声明文件，也可以通过 tsconfig.json 引入
import '@egret/fusion-components/types/fc-react.d.ts'
```

then we can use all components likewise normal HTML

**Notice**: we should use `class` instead of `className` on web component tags

```ts
export const MyComponent = props => {
  return (
    <fc-select class="my-fc-select" onChange={() => console.log('react onChange', e)}
      <fc-list-option value="1">1</fc-list-option>
      <fc-list-option value="2">2</fc-list-option>
      <fc-list-option value="3">3</fc-list-option>
    </fc-select>
  )
}
```

fusion-components 内部尝试模拟了 React 的 `onChange` 事件，所以有 `change` 事件的组件应该可以正常使用 `onChange` 事件回调。
同时有 `change` 事件的组件也会发送 `input` 事件，所以也可以使用 React 的 `onInput` 事件回调。

### CSS 主题

fusion-components 充分利用了 CSS 自定义变量，所有组件都尽量使用统一的全局配色方案，所以通过修改全局变量来快速修改主题配色方案。
所有的 CSS 变量，可以查看[这里](./src/styles/global.css)

<details>
  <summary>比如这套亮色方案：</summary>

```css
  :root,
  :defined,
  slot :defined {
    --body-background: #fff;
    --box-background: #f6f6f6;
    --background: #d4d4d4;
    --background-hover: #e2e2e2;
    --background-active: #f2f2f2;
    --background-selected: rgb(20 150 255 / 30%); /*#f2f2f2*/
    --background-disabled: #f6f6f6;
    --background-selected-hover: var(--background-selected);
    --foreground: #424242;
    --foreground-selected: #333;
    --foreground-hover: #333;
    --accent-color: rgb(20, 150, 255);
    --accent-color-hover: var(--accent-color);
    --outline-color: #dc9120;

    --border-width: var(--fc-unit-size);
    --border-color: #ddd; /*#2260bf;*/
    --border-color-active: #aaa; /*#2260bf;*/
    --border-color-hover: #aaa; /*#2260bf;*/
    --border-color-disabled: #ccc; /*#2260bf;*/

    --outline-color: #2260bf;

    --fc-unit-size: 1px;
    --border-radius: 0;
    --font-size: 12px;

    --padding-t: calc(var(--fc-unit-size) * 1);
    --padding-b: calc(var(--fc-unit-size) * 1);
    --padding-l: calc(var(--fc-unit-size) * 4);
    --padding-r: calc(var(--fc-unit-size) * 4);
    --padding: var(--padding-t) var(--padding-r) var(--padding-b) var(--padding-l);

    --stroke-width: calc(var(--fc-unit-size) * 1);
    --stroke-color: #ddd;
    --stroke: 0 0 0 var(--stroke-width) var(--stroke-color);*/

    --box-shadow-color: rgba(0, 0, 0, 0.15);
    --box-shadow-offset-blur: calc(var(--fc-unit-size) * 8);
    --box-shadow-offset-x: 0;
    --box-shadow-offset-y: 0;
    --box-shadow-offset-blur: calc(var(--fc-unit-size) * 5);
    --box-shadow-offset-spread: 0;
    --box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y) var(--box-shadow-offset-blur) var(--box-shadow-offset-spread)
      var(--box-shadow-color);
  }
```

</details>

## License

MIT
