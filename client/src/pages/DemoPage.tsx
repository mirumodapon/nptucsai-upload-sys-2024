import FileUpload from '@/components/fileupload';
import { useState, useEffect } from 'react';

function DemoPage() {
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/param/DEMO_HINT', { credentials: 'same-origin' })
      .then(response => response.json())
      .then(({ value }) => value)
      .then(value => setHint(value));
  }, []);
  return <FileUpload type="ppt" hint={hint} />;
}

export default DemoPage;
