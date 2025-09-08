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

interface Window {
  // Para las vistas de página
  gtag(
    command: 'config',
    trackingId: string,
    config: {
      page_path: string;
    }
  ): void;

  // Para los eventos de clic
  gtag(
    command: 'event',
    action: string,
    params: {
      event_category: string;
      event_label: string;
      value?: number;
    }
  ): void;
}