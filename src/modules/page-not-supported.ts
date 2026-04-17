import { translate } from '@/translate/translate';
const browserList = [
  {
    name: 'Chrome',
    version: '137+',
  },
  {
    name: 'Edge',
    version: '137+',
  },
  {
    name: 'Firefox',
    version: '129+',
  },
  {
    name: 'Safari',
    version: '17+',
  },
];
export const initPageNotSupported = (app: HTMLElement) => {
  const desc = document.createElement('h1');
  desc.className = 'q-txt line-24 weight-700 color-text-qGray text-center';
  desc.innerHTML = translate.desc.txt4;
  app.appendChild(desc);

  const browserBox = document.createElement('div');
  browserBox.className = 'q-margin top-60 q-flex q-justify-content-between q-align-items-start';
  browserBox.style.maxWidth = '300px';
  browserBox.style.marginLeft = 'auto';
  browserBox.style.marginRight = 'auto';
  app.appendChild(browserBox);
  browserList.forEach(browser => {
    const browserItem = document.createElement('p');
    browserItem.style.flex = '0 0 60px';
    browserItem.style.width = '0';
    browserItem.style.textAlign = 'center';
    const textClassName = 'q-txt font-14 line-20 color-text-qGray text-center';
    const browserItemTitle = document.createElement('h2');
    browserItemTitle.className = `${textClassName} weight-700`;
    browserItemTitle.innerHTML = browser.name;
    const browserItemDesc = document.createElement('p');
    browserItemDesc.className = textClassName;
    browserItemDesc.innerHTML = browser.version;

    browserItem.appendChild(browserItemTitle);
    browserItem.appendChild(browserItemDesc);

    browserBox.appendChild(browserItem);
  });

  const reportDescBox = document.createElement('p');
  reportDescBox.className = 'q-margin top-60';
  reportDescBox.style.textAlign = 'center';
  app.appendChild(reportDescBox);
  const reportDesc = document.createElement('a');
  reportDesc.target = '_blank';
  reportDesc.href = 'https://github.com/qwd/jwt-debugger/issues';
  reportDesc.className = 'q-txt font-14 line-20 weight-300 color-text-qGray underline';
  reportDesc.innerHTML = translate.desc.txt5;
  reportDescBox.appendChild(reportDesc);
};
