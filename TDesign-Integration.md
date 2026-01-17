# TDesign 小程序组件库集成指南

## ✅ 已完成的配置

1. **安装 TDesign**
   ```bash
   cd miniprogram
   npm install tdesign-miniprogram --save
   ```

2. **配置 project.config.json**
   - 已启用 npm 模块支持
   - 已配置 npm 构建路径

3. **全局引入常用组件**
   在 `miniprogram/app.json` 中已引入：
   - `t-button` - 按钮
   - `t-input` - 输入框
   - `t-cell` - 单元格
   - `t-cell-group` - 单元格组
   - `t-icon` - 图标
   - `t-loading` - 加载
   - `t-picker` - 选择器
   - 等等...

## 🎨 使用 TDesign 组件

### 按钮组件
```html
<t-button theme="primary" size="large" bind:tap="handleClick">主要按钮</t-button>
<t-button theme="success" variant="outline">成功按钮</t-button>
<t-button theme="light">浅色按钮</t-button>
```

### 输入框组件
```html
<t-input placeholder="请输入内容" bind:change="onInput" />
```

### 单元格组件
```html
<t-cell-group title="表单">
  <t-cell title="标题" note="副标题" />
  <t-cell title="带图标">
    <t-icon slot="left-icon" name="home" />
  </t-cell>
</t-cell-group>
```

### 图标组件
```html
<t-icon name="home" size="40rpx" color="#0052D9" />
<t-icon name="check-circle" theme="success" />
```

### 加载组件
```html
<t-loading theme="circular" size="60rpx" />
```

## 📦 已更新的页面

### 1. pages/store/store（添加店铺）
- 使用 `t-cell-group` 和 `t-cell` 替代原有布局
- 使用 `t-input` 替代原生 `input`
- 使用 `t-picker` 替代原生 `picker`
- 使用 `t-button` 替代原生 `button`

### 2. pages/shake/shake（摇一摇）
- 使用 `t-icon` 显示图标
- 使用 `t-button` 替代反馈按钮
- 使用 `t-loading` 显示加载动画

## 🚀 下一步操作

### 1. 构建 npm（重要！）
在微信开发者工具中：
1. 点击顶部菜单 **"工具"** → **"构建 npm"**
2. 等待构建完成
3. 重新编译项目

### 2. 验证安装
在任意页面中使用 TDesign 组件，如果显示正常，说明安装成功。

### 3. 更多组件
访问 [TDesign 小程序官方文档](https://tdesign.tencent.com/miniprogram) 查看所有组件和详细用法。

## 🔗 相关链接

- TDesign 小程序官网：https://tdesign.tencent.com/miniprogram
- 组件文档：https://tdesign.tencent.com/miniprogram/components
- 图标库：https://tdesign.tencent.com/miniprogram/components/icon

## 💡 注意事项

1. **必须先构建 npm**，否则组件无法使用
2. **组件事件绑定**使用 `bind:change` 而不是 `bindchange`
3. **组件插槽**使用 `slot` 而不是微信的 slot
4. **样式隔离**：TDesign 组件有自己的样式类名，可能需要调整原有样式

## 📝 示例：在页面中引入组件

如果需要页面级别的组件引入，在页面的 `.json` 文件中：

```json
{
  "usingComponents": {
    "t-button": "tdesign-miniprogram/button/button",
    "t-input": "tdesign-miniprogram/input/input"
  }
}
```

或者在 `app.json` 中全局引入（已配置），所有页面都可以直接使用。
