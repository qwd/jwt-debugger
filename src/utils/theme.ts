let isDarkMode = false;
const darkClass = 'qweather-theme--dark';
const lightClass = 'qweather-theme--light';

const changeTheme = () => {
  if (isDarkMode) {
    document.body.setAttribute('arco-theme', 'dark');
    if (document.body.classList.contains(lightClass)) {
      document.body.classList.remove(lightClass);
    }
    if (!document.body.classList.contains(darkClass)) {
      document.body.classList.add(darkClass);
    }
  } else {
    document.body.removeAttribute('arco-theme');
    if (document.body.classList.contains(darkClass)) {
      document.body.classList.remove(darkClass);
    }
    if (!document.body.classList.contains(lightClass)) {
      document.body.classList.add(lightClass);
    }
  }
};

export const initTheme = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  isDarkMode = mediaQuery.matches;
  changeTheme();

  mediaQuery.addEventListener('change', e => {
    if (e.matches !== isDarkMode) {
      isDarkMode = e.matches;
      changeTheme();
    }
  });
};
