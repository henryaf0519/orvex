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
  gtag: (
    event: 'config',
    trackingId: string,
    config: {
      page_path: string;
    }
  ) => void;

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