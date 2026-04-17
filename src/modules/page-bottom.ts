export const initPageBottom = (app: HTMLElement) => {
  const bottomBox = document.createElement('div');
  bottomBox.className = 'q-margin top-40 q-flex q-align-items-center';
  app.appendChild(bottomBox);

  const className = 'q-txt font-14 line-20';
  const span1 = document.createElement('span');
  span1.className = className;
  span1.innerHTML = '©&nbsp;';
  bottomBox.appendChild(span1);

  const a1 = document.createElement('a');
  a1.className = `${className} underline`;
  a1.innerHTML = 'QWeather';
  a1.target = '_blank';
  a1.href = 'https://dev.qweather.com/';
  bottomBox.appendChild(a1);

  const span2 = document.createElement('span');
  span2.className = className;
  span2.innerHTML = '&nbsp;·&nbsp;MIT&nbsp;license&nbsp;·&nbsp;';
  bottomBox.appendChild(span2);

  const a2 = document.createElement('a');
  a2.className = `${className} underline`;
  a2.innerHTML = 'Github repo';
  a2.target = '_blank';
  a2.href = 'https://github.com/qwd/jwt-debugger';
  bottomBox.appendChild(a2);
};
