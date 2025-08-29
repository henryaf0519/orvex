declare module "*.svg" {
  const content: string;
  export default content;
}

declare namespace JSX {
  interface IntrinsicElements {
    'wistia-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'media-id'?: string;
    };
  }
}