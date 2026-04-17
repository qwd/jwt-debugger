import { translate } from '@/translate/translate';

export const initPageDesc = (app: HTMLElement) => {
  const h2 = document.createElement('h2');
  h2.className = 'q-txt font-32 weight-700 line-1 color-text-title';
  h2.textContent = translate.title.txt1;
  app.appendChild(h2);

  const desc1 = document.createElement('p');
  desc1.className = 'q-margin top-20 q-txt font-14 line-20';
  desc1.innerHTML = translate.desc.txt1;
  app.appendChild(desc1);

  const desc2 = document.createElement('p');
  desc2.className = 'q-margin top-10 q-txt font-14 line-20';
  desc2.innerHTML = translate.desc.txt3;
  app.appendChild(desc2);
};
