import { useEffect, useState } from 'react';
import MarkdownEditor from '@uiw/react-md-editor';
import useToast from '@/hooks/useToast';

function IndexSettingPage() {
  const [value, setValue] = useState<string>();
  const toast = useToast();

  useEffect(() => {
    fetch('/api/param/INDEX_MD', { credentials: 'same-origin' })
      .then(response => response.json())
      .then((data) => {
        setValue(data.value);
      });
  }, []);

  const onSave = async () => {
    const result = await fetch('/api/param', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'INDEX_MD', value: `${value}` })
    });

    if (result.status === 200) {
      return toast.addToast({
        key: `SAVE_PARAM_${Date.now()}`,
        type: 'success',
        message: '儲存成功',
        during: 3000
      });
    }

    const body = await result.json();

    toast.addToast({
      key: `SAVE_PARAM_${Date.now()}`,
      type: 'error',
      message: body.message ?? '儲存失敗',
      during: 3000

    });
  };

  return (
    <div className="p-2 w-full" data-color-mode="light">
      <MarkdownEditor height="500px" value={value} onChange={setValue} />

      <button className="m-3 btn btn-secondary" onClick={onSave}>儲存</button>
    </div>
  );
}

export default IndexSettingPage;
