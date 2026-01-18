# 吃什么 🍜

一款智能选择餐厅的微信小程序，通过摇一摇功能帮你决定今天吃什么！

## ✨ 功能特性

### 🎯 核心功能
- **摇一摇选店** - 轻轻摇晃手机，智能推荐店铺
- **店铺管理** - 添加、编辑、删除你的收藏店铺
- **智能算法** - 根据历史记录和权重智能推荐
- **反馈机制** - 满意/不满意反馈，优化推荐结果

### 🎨 界面设计
- **现代化 UI** - 采用 TDesign 企业级设计系统
- **流畅动画** - 丰富的交互动画和过渡效果
- **礼花庆祝** - 选中结果时播放礼花特效
- **声音震动** - 沉浸式音效和触感反馈

### 💾 数据管理
- **云数据库** - 安全可靠的数据存储
- **云存储** - 店铺照片云端管理
- **实时同步** - 数据实时更新

## 🛠 技术栈

- **前端框架** - 微信小程序原生开发
- **UI 组件库** - [TDesign MiniProgram](https://tdesign.tencent.com/miniprogram/overview)
- **后端服务** - 微信云开发
  - 云数据库
  - 云存储
  - 云函数
- **构建工具** - npm 构建

## 📱 功能演示

### 摇一摇页面
1. 打开小程序，进入"摇一摇"标签
2. 摇晃手机或点击手机图标
3. 自动从你的店铺列表中随机推荐
4. 点击"满意"记录偏好，或"不满意"重新选择

### 店铺管理页面
1. 点击"添加店铺"按钮
2. 填写店铺信息：名称、地址、分类、照片
3. 点击"编辑"修改店铺信息
4. 点击"删除"移除不需要的店铺

## 🚀 快速开始

### 环境要求
- 微信开发者工具（最新版本）
- Node.js 14+
- 微信小程序账号（已开通云开发）

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/yao_yi_yao.git
cd yao_yi_yao
```

2. **安装依赖**
```bash
npm install
```

3. **配置云开发**
- 在微信开发者工具中打开项目
- 点击"云开发"按钮
- 创建云环境
- 记录环境 ID

4. **配置项目**
在 `project.config.json` 中配置云环境 ID：
```json
{
  "cloudbaseRoot": "./cloudfunctions/",
  "cloudfunctionRoot": "./cloudfunctions/",
  "miniprogramRoot": "./miniprogram/",
  "setting": {
    "urlCheck": false,
    "es6": true,
    "postcss": true,
    "minified": true
  }
}
```

5. **构建 npm**
在微信开发者工具中：
- 菜单栏 → 工具 → 构建 npm

6. **上传云函数**
- 右键 `cloudfunctions/login` 文件夹
- 选择"上传并部署：云端安装依赖"

7. **运行项目**
点击"编译"按钮，在模拟器中预览

## 📂 项目结构

```
yao_yi_yao/
├── miniprogram/              # 小程序前端代码
│   ├── pages/              # 页面目录
│   │   ├── index/          # 首页
│   │   ├── shake/          # 摇一摇页面
│   │   └── store/         # 店铺管理页面
│   ├── utils/             # 工具函数
│   │   ├── shakeAlgorithm.js  # 摇一摇算法
│   │   └── storage.js        # 本地存储
│   ├── audio/             # 音频文件
│   │   ├── shake.mp3       # 摇动音效
│   │   └── success.mp3     # 成功音效
│   ├── app.js             # 小程序入口
│   ├── app.json           # 全局配置
│   └── app.wxss           # 全局样式
├── cloudfunctions/         # 云函数
│   └── login/            # 登录云函数
├── node_modules/         # npm 依赖
├── package.json          # 项目配置
└── README.md           # 项目说明
```

## 🎨 TDesign 组件使用

项目中使用了以下 TDesign 组件：

- `t-button` - 按钮组件
- `t-input` - 输入框组件
- `t-cell` / `t-cell-group` - 列表卡片组件
- `t-dialog` - 对话框组件
- `t-picker` - 选择器组件
- `t-icon` - 图标组件
- `t-tag` - 标签组件
- `t-loading` - 加载组件
- `t-toast` - 提示组件

## 🔧 开发指南

### 添加新页面
1. 在 `miniprogram/pages/` 下创建新页面目录
2. 在 `miniprogram/app.json` 中注册页面路径

### 云函数开发
1. 在 `cloudfunctions/` 下创建新目录
2. 编写 `index.js` 入口文件
3. 右键上传并部署

### 样式规范
- 使用 TDesign 主题色：`#0052D9`
- 遵循 BEM 命名规范
- 优先使用 rpx 单位适配不同屏幕

## 📊 数据结构

### restaurants 集合
```json
{
  "_id": "店铺ID",
  "userId": "用户ID",
  "name": "店铺名称",
  "address": "店铺地址",
  "category": "分类",
  "photoUrl": "照片URL",
  "weight": 1.0,
  "lastPickedAt": 1234567890,
  "createdAt": 1234567890
}
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 开源协议

MIT License

## 🔗 参考资源

- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [TDesign 组件库](https://tdesign.tencent.com/miniprogram/overview)
- [微信云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 💬 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 提交 [Issue](https://github.com/your-username/yao_yi_yao/issues)
- 发送邮件：your-email@example.com

---

**今天吃什么？摇一摇就知道！** 🎉


