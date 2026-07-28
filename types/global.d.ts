declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.pcss';
declare module 'ckeditor5/ckeditor5.css';

interface CSSModuleClasses {
  readonly [key: string]: string;
}

declare const styles: CSSModuleClasses;
export default styles;
