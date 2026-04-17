import './scss/main.scss';
import { initTheme } from './utils/theme';
import { initLang } from './translate/translate';
import { initPageDesc } from './modules/page-desc';
import { initPem } from './modules/create-pem';
import { initJwt } from './modules/create-jwt';
import { initPageBottom } from './modules/page-bottom';
import { initPemKey } from './utils/jwt';
import { initPageNotSupported } from './modules/page-not-supported';

const init = async () => {
  const app = document.getElementById('app');
  if (!app) {
    return;
  }
  initTheme();
  initLang();
  app.classList.add('q-main');
  initPemKey()
    .then(async keyPair => {
      initPageDesc(app);
      await initPem(app, keyPair);
      await initJwt(app, keyPair);
      initPageBottom(app);
    })
    .catch(() => {
      initPageNotSupported(app);
    });
};

document.addEventListener('DOMContentLoaded', init);
