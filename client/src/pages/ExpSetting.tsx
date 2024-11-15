import { useState, useEffect, BaseSyntheticEvent } from 'react';
import useToast from '@/hooks/useToast';

function ExpSetting() {
  const toast = useToast();
  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  const [bookExp, setBookExp] = useState<number>(0);
  const [demoExp, setDemoExp] = useState<number>(0);
  const [posterExp, setPosterExp] = useState<number>(0);

  useEffect(() => {
    fetch('/api/param?key=BOOK_EXP,DEMO_EXP,POSTER_EXP', { credentials: 'same-origin' })
      .then(response => response.json())
      .then((data) => {
        for (const { key, value } of data) {
          switch (key) {
            case 'BOOK_EXP':
              setBookExp(parseInt(value) ?? 0);
              break;
            case 'DEMO_EXP':
              setDemoExp(parseInt(value) ?? 0);
              break;
            case 'POSTER_EXP':
              setPosterExp(parseInt(value) ?? 0);
              break;
          }
        }
      });
  }, []);

  const onBookExpChange = (e: BaseSyntheticEvent) => {
    const date = new Date(e.target.value);
    const value = date.valueOf();

    setBookExp(value);
  };

  const onDemoExpChange = (e: BaseSyntheticEvent) => {
    const date = new Date(e.target.value);
    const value = date.valueOf();

    setDemoExp(value);
  };

  const onPosterExpChange = (e: BaseSyntheticEvent) => {
    const date = new Date(e.target.value);
    const value = date.valueOf();

    setPosterExp(value);
  };

  const saveBookExp = async () => {
    const result = await fetch('/api/param', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'BOOK_EXP', value: `${bookExp}` })
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

  const saveDemoExp = async () => {
    const result = await fetch('/api/param', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'DEMO_EXP', value: `${demoExp}` })
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

  const savePosterExp = async () => {
    const result = await fetch('/api/param', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'POSTER_EXP', value: `${posterExp}` })
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
    <div className="p-5 flex flex-col gap-y-3">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">報告書期限</span>
        </div>
        <input
          value={new Date(bookExp - tzoffset).toISOString().slice(0, 19)}
          onChange={onBookExpChange}
          type="datetime-local"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <button className="my-2 btn btn-primary" onClick={saveBookExp}>儲存</button>
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">海報期限</span>
        </div>
        <input
          value={new Date(posterExp - tzoffset).toISOString().slice(0, 19)}
          onChange={onPosterExpChange}
          type="datetime-local"
          placeholder="Type here"
          className="input input-bordered input-secondary w-full max-w-xs"
        />
        <button className="my-2 btn btn-secondary" onClick={savePosterExp}>儲存</button>
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">PPT 期限</span>
        </div>
        <input
          value={new Date(demoExp - tzoffset).toISOString().slice(0, 19)}
          onChange={onDemoExpChange}
          type="datetime-local"
          placeholder="Type here"
          className="input input-bordered input-accent w-full max-w-xs"
        />
        <button className="my-2 btn btn-accent" onClick={saveDemoExp}>儲存</button>
      </label>
    </div>
  );
}

export default ExpSetting;
