import { useEffect, useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

function DashboardIndx() {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    fetch('/api/param/INDEX_MD', { credentials: 'same-origin' })
      .then(response => response.json())
      .then((data) => {
        setValue(data.value);
      });
  }, []);

  return (
    <div className="py-5 px-10" data-color-mode="light">
      <MarkdownPreview source={value} />
    </div>
  );
}

export default DashboardIndx;
