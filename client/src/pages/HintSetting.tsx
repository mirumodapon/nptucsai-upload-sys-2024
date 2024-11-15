import useToast from '@/hooks/useToast';
import { useEffect, useState, BaseSyntheticEvent } from 'react';

function HintSetting() {
  const toast = useToast();
  const [book, setBook] = useState<string>('');
  const [demo, setDemo] = useState<string>('');
  const [poster, setPoster] = useState<string>('');

  useEffect(() => {
    fetch('/api/param?key=BOOK_HINT,DEMO_HINT,POSTER_HINT', { credentials: 'same-origin' })
      .then(response => response.json())
      .then((data) => {
        for (const { key, value } of data) {
          switch (key) {
            case 'BOOK_HINT':
              setBook(value);
              break;
            case 'DEMO_HINT':
              setDemo(value);
              break;
            case 'POSTER_HINT':
              setPoster(value);
              break;
          }
        }
      });
  }, []);

  const onBookChange = (e: BaseSyntheticEvent) => {
    setBook(e.target.value);
  };

  const onDemoChange = (e: BaseSyntheticEvent) => {
    setDemo(e.target.value);
  };

  const onPosterChange = (e: BaseSyntheticEvent) => {
    setPoster(e.target.value);
  };

  const saveBook = async () => {
    const result = await fetch('/api/param', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'BOOK_HINT', value: book })
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

  const saveDemo = async () => {
    const result = await fetch('/api/param', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'DEMO_HINT', value: demo })
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

  const savePoster = async () => {
    const result = await fetch('/api/param', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'POSTER_HINT', value: poster })
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
    <div className="w-full p-5 flex flex-col gap-y-5">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">報告書</span>
        </div>
        <div className="flex gap-x-3">
          <input value={book} onChange={onBookChange} type="text" placeholder="Type here" className="input input-primary input-bordered w-full max-w-lg" />
          <button onClick={saveBook} className="btn btn-primary">送出</button>
        </div>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">海報</span>
        </div>
        <div className="flex gap-x-3">
          <input value={poster} onChange={onPosterChange} type="text" placeholder="Type here" className="input input-secondary input-bordered w-full max-w-lg" />
          <button onClick={savePoster} className="btn btn-secondary">送出</button>
        </div>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">PPT</span>
        </div>
        <div className="flex gap-x-3">
          <input value={demo} onChange={onDemoChange} type="text" placeholder="Type here" className="input input-accent input-bordered w-full max-w-lg" />
          <button onClick={saveDemo} className="btn btn-accent">送出</button>
        </div>
      </label>

    </div>
  );
}

export default HintSetting;
