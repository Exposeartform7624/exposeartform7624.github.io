import { useEffect } from 'react';

export default function Seo({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute('name', 'description');
        document.head.appendChild(m);
      }
      m.setAttribute('content', description);
      let og = document.querySelector('meta[property="og:title"]');
      if (og) og.setAttribute('content', title);
      og = document.querySelector('meta[property="og:description"]');
      if (og) og.setAttribute('content', description);
    }
  }, [title, description]);
  return null;
}
