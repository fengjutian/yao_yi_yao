# 使用 TDesign 组件的店铺管理页面

## 🚀 必须先构建 npm

在微信开发者工具中：
1. 点击顶部菜单 **"工具"** → **"构建 npm"**
2. 等待构建完成
3. 重新编译项目

构建完成后，告诉我，我会帮您启用以下 TDesign 组件。

---

## 🎨 将要使用的 TDesign 组件

### 页面组件
- `t-modal` - 弹出式添加店铺模态框
- `t-button` - 添加、编辑、删除按钮
- `t-input` - 店铺名称、地址输入
- `t-cell-group` / `t-cell` - 店铺列表卡片
- `t-picker` - 分类选择器
- `t-icon` - 图标（上传照片、编辑、删除）
- `t-loading` - 加载状态
- `t-toast` - 提示消息
- `t-image` - 图片显示

### 交互流程
1. 点击"添加店铺"按钮 → 弹出模态框
2. 模态框中填写信息 → 上传照片
3. 点击"确定" → 保存并关闭模态框
4. 点击"取消" → 关闭模态框

---

## 📝 模态框添加店铺的优势

### ✅ 用户体验更好
- 不跳转页面，保持上下文
- 快速添加，无需离开列表
- 适合快速录入多个店铺

### ✅ 界面更简洁
- 列表和表单分离
- 模态框聚焦当前操作
- 避免页面来回切换

---

## 🔒 模态框内容

```html
<t-modal
  visible="{{showModal}}"
  title="{{editingId ? '编辑店铺' : '添加店铺'}}"
  bind:confirm="saveStore"
  bind:cancel="closeModal"
>
  <!-- 店铺名称 -->
  <t-input
    label="店铺名称"
    placeholder="请输入店铺名称"
    value="{{name}}"
    bind:change="onNameInput"
  />

  <!-- 店铺地址 -->
  <t-input
    label="店铺地址"
    placeholder="请输入店铺地址"
    value="{{address}}"
    bind:change="onAddressInput"
  />

  <!-- 分类选择 -->
  <t-picker
    label="分类"
    value="{{category}}"
    range="{{categories}}"
    bind:change="onCategoryChange"
  />

  <!-- 照片上传 -->
  <view class="photo-upload">
    <image
      wx:if="{{photoUrl}}"
      src="{{photoUrl}}"
      bind:tap="previewPhoto"
    />
    <t-icon wx:else name="add" bind:tap="choosePhoto" />
  </view>
</t-modal>
```

---

## 📱 页面布局

### 顶部固定操作
```html
<view class="header-actions">
  <t-button
    theme="primary"
    size="large"
    bind:tap="openAddModal"
  >
    <t-icon name="add" />
    添加店铺
  </t-button>
</view>
```

### 店铺列表
```html
<t-cell-group>
  <t-cell
    wx:for="{{list}}"
    wx:key="_id"
    title="{{item.name}}"
    note="{{item.category}}"
    left-icon="{{item.photoUrl}}"
  >
    <view slot="note">
      <text>{{item.category}}</text>
      <text wx:if="{{item.address}}">{{item.address}}</text>
    </view>
    <view slot="right-icon">
      <t-icon name="edit" bind:tap="editStore" />
      <t-icon name="delete" bind:tap="deleteStore" />
    </view>
  </t-cell>
</t-cell-group>
```

---

## 🎯 完成后的效果

1. ✅ 列表使用 TDesign 的卡片样式
2. ✅ 点击"添加店铺"弹出模态框
3. ✅ 模态框内完成添加/编辑
4. ✅ 所有交互使用 TDesign 组件
5. ✅ 统一的视觉风格

---

## 💡 TDesign 组件特点

### t-modal（模态框）
- 支持确定/取消按钮
- 可自定义内容区域
- 遮罩层背景
- 平滑的动画效果

### t-cell-group / t-cell（列表）
- 卡片式列表项
- 支持左图标（照片）
- 支持右图标（操作按钮）
- 支持副标题（地址）

### t-button（按钮）
- 多种主题色
- 多种尺寸
- 支持图标
- 圆角设计

---

## 📋 构建完成后

请在微信开发者工具中完成 npm 构建后，告诉我，我会立即：
1. ✅ 启用 TDesign 组件引用
2. ✅ 重构 store 页面使用所有 TDesign 组件
3. ✅ 添加模态框式添加功能
4. ✅ 美化所有交互界面
