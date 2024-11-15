import FileUpload from '@/components/fileupload';
import { useEffect, useState } from 'react';

function BookPage() {
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/param/BOOK_HINT', { credentials: 'same-origin' })
      .then(response => response.json())
      .then(({ value }) => value)
      .then(value => setHint(value));
  }, []);

  return <FileUpload type="book" hint={hint} />;
}

export default BookPage;
