declare module 'react' {
  const React: any;
  export = React;
  export as namespace React;
}

declare module 'react-dom' {
  const ReactDOM: any;
  export = ReactDOM;
  export as namespace ReactDOM;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare namespace JSX {
  interface Element extends React.ReactElement<any, any> { }
  interface ElementClass extends React.Component<any> {
    render(): React.ReactNode;
  }
  interface ElementAttributesProperty { props: {}; }
  interface ElementChildrenAttribute { children: {}; }

  interface IntrinsicAttributes extends React.Attributes { }
  interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }

  interface IntrinsicElements {
    // HTML
    a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
    h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h4: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h5: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h6: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
    button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
    label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
    textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
    select: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
    option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
    img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
    br: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
    hr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
    ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
    ol: React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
    li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
    section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    header: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    footer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    title: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
    meta: React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
    [elemName: string]: any;
  }
}

// Basic React types
declare namespace React {
  type ReactNode = string | number | boolean | ReactElement | ReactFragment | ReactPortal | null | undefined;
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }
  type ReactFragment = {} | ReactNodeArray;
  interface ReactPortal extends ReactElement {
    key: Key | null;
    children: ReactNode;
  }
  type ReactNodeArray = Array<ReactNode>;
  type Key = string | number;
  type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>);
  
  interface Attributes {
    key?: Key | null | undefined;
  }
  interface ClassAttributes<T> extends Attributes {
    ref?: Ref<T> | undefined;
  }
  type Ref<T> = ((instance: T | null) => void) | RefObject<T> | null;
  interface RefObject<T> {
    readonly current: T | null;
  }
  
  class Component<P = {}, S = {}> {
    constructor(props: P);
    render(): ReactNode;
    props: P;
    state: S;
  }
  
  // Common HTML attributes
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string | undefined;
    id?: string | undefined;
    style?: CSSProperties | undefined;
    title?: string | undefined;
    role?: string | undefined;
    tabIndex?: number | undefined;
    'data-testid'?: string | undefined;
    [key: string]: any;
  }
  
  interface AriaAttributes {
    'aria-label'?: string | undefined;
    'aria-labelledby'?: string | undefined;
    'aria-describedby'?: string | undefined;
    'aria-hidden'?: boolean | 'false' | 'true' | undefined;
    [key: string]: any;
  }
  
  interface DOMAttributes<T> {
    onClick?: MouseEventHandler<T> | undefined;
    onSubmit?: FormEventHandler<T> | undefined;
    onChange?: ChangeEventHandler<T> | undefined;
    onFocus?: FocusEventHandler<T> | undefined;
    onBlur?: FocusEventHandler<T> | undefined;
    [key: string]: any;
  }
  
  interface CSSProperties {
    [key: string]: any;
  }
  
  type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
  type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
  type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
  type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
  type EventHandler<E extends SyntheticEvent<any>> = (event: E) => void;
  
  interface SyntheticEvent<T = Element> {
    currentTarget: T;
    target: EventTarget & T;
    preventDefault(): void;
    stopPropagation(): void;
    [key: string]: any;
  }
  
  interface MouseEvent<T = Element> extends SyntheticEvent<T> {
    button: number;
    clientX: number;
    clientY: number;
    [key: string]: any;
  }
  
  interface FormEvent<T = Element> extends SyntheticEvent<T> {}
  
  interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }
  
  interface FocusEvent<T = Element> extends SyntheticEvent<T> {}
  
  // Form-specific attributes
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: 'submit' | 'reset' | 'button' | undefined;
    disabled?: boolean | undefined;
  }
  
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string | undefined;
    value?: string | number | undefined;
    placeholder?: string | undefined;
    disabled?: boolean | undefined;
    required?: boolean | undefined;
    name?: string | undefined;
  }
  
  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    action?: string | undefined;
    method?: string | undefined;
  }
  
  interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    htmlFor?: string | undefined;
  }
  
  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | undefined;
    placeholder?: string | undefined;
    disabled?: boolean | undefined;
    required?: boolean | undefined;
    name?: string | undefined;
    rows?: number | undefined;
    cols?: number | undefined;
  }
  
  interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | undefined;
    disabled?: boolean | undefined;
    required?: boolean | undefined;
    name?: string | undefined;
    multiple?: boolean | undefined;
  }
  
  interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | number | undefined;
    selected?: boolean | undefined;
    disabled?: boolean | undefined;
  }
  
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    src?: string | undefined;
    alt?: string | undefined;
    width?: number | string | undefined;
    height?: number | string | undefined;
  }
  
  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string | undefined;
    target?: string | undefined;
    rel?: string | undefined;
  }
  
  interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string | undefined;
    content?: string | undefined;
  }
  
  interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
    start?: number | undefined;
  }
  
  interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | number | undefined;
  }
  
  interface DetailedHTMLProps<E, T> {
    ref?: Ref<T> | undefined;
  }
}