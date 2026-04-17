# QWeather JWT Debugger

[English](#english)

这是一个适用于[和风天气开发者服务](https://dev.qweather.com/)的 JWT 调试工具，支持生成 Ed25519 密钥和创建 JWT。本工具基于 [Web Cryptography API](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API) 实现，所有处理均在本地浏览器中完成，无任何网络请求，输入及生成的数据不会被上传或存储，仅在本地可见。

直接访问 👉 **<https://jwt-debugger.qweather.com>**

## 🌐 浏览器支持

Chrome 137+，Edge 137+，Firefox 129+，Safari 17+

## ⚠️ 注意事项

- 使用之前务必阅读[身份认证文档](https://dev.qweather.com/docs/configuration/authentication/)以便了解如何在和风天气中使用 JWT。
- 本工具不能代替代码实现，在你的项目中应该自行编码或使用三方库生成 JWT。
- 本工具仅进行格式校验，生成的JWT不确保会被服务端接受。
- 验证 JWT 是否匹配你的帐号，登录控制台使用[验证工具](https://console.qweather.com/support/jwt-validation)。

## 💻 本地运行

本项目在 Node.js v20+ 环境下开发，其他版本未测试。

### 克隆项目

```bash
git clone https://github.com/qwd/jwt-debugger.git
```

### 安装依赖

```bash
npm install
```

### 运行

```bash
npm start
```

在浏览器打开 `http://localhost:2323` 

### 编译

```bash
npm run build
```

编译文件存放在 `dist/qw-jwt-debugger.html`

# English

This is a JWT debugging tool for [QWeather Developer Services](https://dev.qweather.com/en/). It supports generating Ed25519 key and creating JWT. The tool is built on the [Web Cryptography API](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API) and runs entirely in the browser, with no network requests. All inputs and generated data remain local and are not transmitted or stored.

Go 👉 **<https://jwt-debugger.qweather.com>**

## 🌐 Browser Support

Chrome 137+，Edge 137+，Firefox 129+，Safari 17+

## ⚠️ Notes

- Refer to the [Authentication documentation](https://dev.qweather.com/en/docs/configuration/authentication/) to understand how JWT is used in QWeather.  
- This tool is for debugging and testing only. Generate JWT in your project using application code or third-party libraries.
- This tool performs local validation only and does not guarantee server-side acceptance.  
- To verify if the JWT matches your account, log in to the Console and use the [Validation Tool](https://console.qweather.com/support).


## 💻 Local Run

This project is developed in Node.js v20+, and other versions are not tested.

### Clone

```bash
git clone https://github.com/qwd/jwt-debugger.git
```

### Install Dependencies

```bash
npm install
```

### Run

```bash
npm start
```

Open `http://localhost:2323` in the browser.

### Build

```bash
npm run build
```

Compiled files are stored in `dist/qw-jwt-debugger.html`



