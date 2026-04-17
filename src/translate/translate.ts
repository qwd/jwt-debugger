import { zh } from './zh';
import { en } from './en';

export enum Language {
  Zh = 'zh',
  En = 'en',
}
export let lang = Language.Zh;
export let translate: typeof zh | typeof en;

export const initLang = () => {
  lang = navigator.language.indexOf(Language.Zh) === -1 ? Language.En : Language.Zh;
  translate = lang === Language.Zh ? zh : en;
  document.title =
    lang === Language.Zh ? 'JWT调试工具 | 和风天气开发者服务' : 'JWT Debugger | QWeather developer services';
};
