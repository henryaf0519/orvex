// src/hooks/usePageTitle.ts
import { useEffect } from 'react';

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
    console.log(`Page title set to: ${title}`);
  }, [title]);
};