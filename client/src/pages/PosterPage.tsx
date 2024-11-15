import FileUpload from '@/components/fileupload';
import { useState, useEffect } from 'react';

function PosterPage() {
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/param/POSTER_HINT', { credentials: 'same-origin' })
      .then(response => response.json())
      .then(({ value }) => value)
      .then(value => setHint(value));
  }, []);

  return <FileUpload type="poster" hint={hint} />;
}

export default PosterPage;
