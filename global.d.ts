declare module '*.css';
// Added declaration for CKEditor CSS side-effect import
declare module 'ckeditor5/ckeditor5.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';

interface CSSModuleClasses {
  readonly [key: string]: string;
}

declare const styles: CSSModuleClasses;
export default styles;
