# Dome01

> 一个非常简单的Excel（完全没有样式的那种）

功能：表格展示数据，排序，编辑

###   引入react.js 式开发

​	**模式: development/production**

​		==tip==: 模式之间的切换是通过导入不同的版本的js实现

```html
  <!-- development -->
  <script src="../react.development.js"></script>
  <script src="../react-dom.development.js"></script>
  <script src="../prop-types.js"></script>

  <!-- production -->
  <script src="../react.production.min.js"></script>
  <script src="../react-dom.production.min.js"></script>
  <script src="../prop-types.min.js"></script>
```

### [非受控组件](https://react.docschina.org/docs/uncontrolled-components.html)

​	==tip==: **在一个受控组件中，表单数据是由 React 组件来管理的。非受控组件中表单数据将交由 DOM 节点来处理**。简单来说： 受控组件中的***表单数据只受表单value绑定的变量影响***，你在表单中输入任意内容表单的value（你在输入框所看到内容）都不会变，只有当修改value绑定的变量改变时value才会修改，所以一般会在监听事件处修改如onChange等。***非受控组件则和原来html中所用到的一样，表单数据由DOM控制***。

​	

​	**区分 受控/非受控组件**

​	非受控组件props通过defaultValue进行初始化

​	受控组件props通过value进行初始化

```javascript
// index.js 101L
// 非受控组件
React.createElement('input', {
    type: 'text',
    defaultValue: content
})
// 受控组件
React.createElement('input', {
    type: 'text',
    value: content
})
```



	# 踩坑

propTypes 只有在production模式下生效

<u>==引入的prop-type必须是prop-type.js 引入prop-type.min.js无效==</u>

