# Fusion Components <sup>Beta</sup>

一套面向类桌面应用的沉浸式风格 Web Components UI 库

[Storybook👨🏻‍💻](https://iahu.github.io/fusion-components)

## how to use

**暂未发布到 npm**

因为 web components 组件不需要额外的库就可以运行，所以在项目中可以直接使用

### 在 html 中使用

```html
<fc-select id="fc-select">
  <fc-list-option value="1">1</fc-list-option>
  <fc-list-option value="2">2</fc-list-option>
  <fc-list-option value="3">3</fc-list-option>
</fc-select>
```

绑定事件

```js
document.querySelector('#fc-select').addEventListener('change', console.log)
```

### 在 React 中使用

首先在入口文件一次性引入依赖，比如 index.tsx

```ts
import '@egret/fusion-components'
// 使用 TypeScript 需要引入针对 React 的类型声明文件，也可以通过 tsconfig.json 引入
import '@egret/fusion-components/types/fc-react.d.ts'
```

```ts
export const MyComponent = props => {
  return (
    <fc-select onChange={() => console.log('react onChange', e)}
      <fc-list-option value="1">1</fc-list-option>
      <fc-list-option value="2">2</fc-list-option>
      <fc-list-option value="3">3</fc-list-option>
    </fc-select>
  )
}
```

fusion-components 内部尝试模拟了 React 的 `onChange` 事件，所以有 `change` 事件的组件应该可以正常使用 `onChange` 事件回调。
同时有 `change` 事件的组件也会发送 `input` 事件，所以也可以使用 React 的 `onInput` 事件回调。
