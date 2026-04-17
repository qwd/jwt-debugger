export const en = {
  title: {
    txt1: 'QWeather JWT Debugger',
    txt2: '🔑 Generate Ed25519 key',
    txt3: 'Download',
    txt4: '↻ Re-generate',
    txt5: '🛠️ Generate JWT',
  },
  desc: {
    txt1: 'An open-source JWT debugging tool for <a target="_blank" href="https://dev.qweather.com/en/">QWeather Developer Services</a>. It works entirely offline in the browser, with no network requests or data collection. You can also <a target="_blank" href="https://github.com/qwd/jwt-debugger">download the source code</a> and run it locally.',
    txt2: 'Click on the <strong class="weight-700 warning">orange text</strong> and replace it with your kid (credential ID), sub (project ID), iat (start time) and exp (expiration time), and paste your private key in PEM format.',
    txt3: '⚠️ See <a target="_blank" href="https://dev.qweather.com/en/docs/configuration/authentication/">QWeather JWT Authentication</a> before use. This tool cannot replace JWT generation in code. To validate a JWT against your account, use the <a target="_blank" href="https://console.qweather.com/support/jwt-validation?lang=en">JWT Validation Tool</a> in the Console.',
    txt4: '⬆️ A browser update is required to run this tool',
    txt5: 'Report issues on Github',
    txt6: 'Ed25519 private key in PEM format.',
  },
  result: {
    success: {
      txt1: 'Success 🎉 ',
      txt2: 'Note: The generated JWT only passes local validation against QWeather specifications. It does not guarantee that the token will be accepted or authenticated by the server.',
    },
    error: {
      txt1: '❌ Incorrect Private KEY, unable to sign.',
      txt2: '❌ kid should be a 10-character capital letters and numbers string.',
      txt3: '❌ sub should be a 10-character capital letters and numbers string.',
      txt4: '❌ iat must be in Unix timestamp format.',
      txt5: '❌ exp must be in Unix timestamp format.',
      txt6: '❌ exp must be later than the current time.',
      txt7: '❌ exp must be later than iat.',
      txt8: '❌ The JWT expiration time cannot be longer than 24 hours.',
      txt9: '❌ An unexpected error has occurred.',
    },
  },
};
