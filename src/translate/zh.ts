export const zh = {
  title: {
    txt1: 'QWeather JWT 调试工具',
    txt2: '🔑 生成 Ed25519 密钥',
    txt3: '下载',
    txt4: '↻ 重新生成',
    txt5: '🛠️ 生成JWT',
  },
  desc: {
    txt1: '适用于<a target="_blank" href="https://dev.qweather.com/">和风天气开发者服务</a>的 JWT 开源调试工具，仅在浏览器离线处理，无网络请求或数据收集，也可<a target="_blank" href="https://github.com/qwd/jwt-debugger">下载源代码</a>在本地运行。',
    txt2: '点击 <strong class="weight-700 warning">橙色文字</strong> 修改你的kid（凭据ID）、sub（项目ID）、iat（开始时间）和exp（失效时间），并粘贴你的私钥。',
    txt3: '⚠️ 用前必看<a target="_blank" href="https://dev.qweather.com/docs/configuration/authentication/">和风天气 JWT 身份认证</a>。本工具无法代替生成 JWT 的代码。控制台提供了<a target="_blank" href="https://console.qweather.com/support/jwt-validation">JWT验证工具</a>。',
    txt4: '⬆️ 需要升级浏览器才能运行这个工具',
    txt5: '在 Github 报告问题',
  },
  result: {
    success: {
      txt1: '成功 🎉 ',
      txt2: '请注意：当前生成的 JWT 仅符合和风天气的基本规范，不代表一定会被服务端接受。',
    },
    error: {
      txt1: '❌ 错误的Private KEY，无法签名',
      txt2: '❌ kid 应为10位大写字母和数字',
      txt3: '❌ sub 应为10位大写字母和数字',
      txt4: '❌ iat 必须是Unix时间戳格式',
      txt5: '❌ exp 必须是Unix时间戳格式',
      txt6: '❌ exp 必须晚于当前时间',
      txt7: '❌ exp 必须晚于签发时间',
      txt8: '❌ JWT 的有效期不能超过24小时',
      txt9: '❌ 发生未知错误',
    },
  },
};
