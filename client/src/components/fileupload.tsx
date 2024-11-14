import { useState, useRef, BaseSyntheticEvent, useMemo } from 'react';
import useToast from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import useFile from '@/service/useFile';

type Props = {

  type: string;
  hint?: string;
};

function FileUpload({ type, hint }: Props) {
  const { data } = useFile({ type });
  const [progress, setProgress] = useState<number>(100);
  const fileInput = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const query = useQueryClient();
  const xhr = useMemo(() => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentComplete = Math.floor((event.loaded / event.total) * 1000) / 10;
        setProgress(percentComplete);
      }
    };

    xhr.upload.onload = function () {
      query.invalidateQueries({ queryKey: ['file', type], refetchType: 'all' });
    };

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        query.invalidateQueries({ queryKey: ['file', type], refetchType: 'all' });
        return toast.addToast({
          key: `UPLOAD_FILE_SUCCESS${Date.now()}`,
          type: 'success',
          message: '上傳成功',
          during: 3000
        });
      }

      if (xhr.readyState === 4) {
        toast.addToast({
          key: `UPLOAD_FILE_FAILED${Date.now()}`,
          type: 'error',
          message: xhr.responseText.trim() === '' ? xhr.responseText.trim() : '上傳失敗',
          during: 3000
        });
      }
    };

    return xhr;
  }, []);

  const handleUploadFile = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const [file] = fileInput.current?.files ?? [];

    const formData = new FormData();
    formData.append('file', file);

    setProgress(0);
    xhr.open('POST', '/api/files/' + type);
    xhr.send(formData);
  };

  const abort = () => {
    setProgress(100);
    xhr.abort();
  };

  return (
    <div className="w-full p-5">
      { hint && (
        <div role="alert" className="alert alert-warning my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{hint}</span>
        </div>
      )}
      <form className="flex gap-3 p-3 mb-8" onSubmit={handleUploadFile}>
        <input ref={fileInput} type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
        <button className="btn btn-ghost bg-green-400 hover:bg-green-500">送出</button>
      </form>
      <div className="divider divider-start divider-default">上傳紀錄</div>
      <div>

        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>檔案名稱</th>
                <th>上傳者</th>
                <th>上傳日期</th>
              </tr>
            </thead>
            <tbody>
              {
                data?.map((d, i) => (

                  <tr key={d.file_id}>
                    <th>{i + 1}</th>
                    <td>{d.filename}</td>
                    <td>{d.UserModel.username}</td>
                    <td>{d.createdAt.slice(0, 19).replace('T', ' ')}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" checked={progress !== 100} readOnly />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <p className="py-4">上傳中</p>
          <div className="flex justify-center">
            <div className="radial-progress text-primary" style={{ '--value': progress }} role="progressbar">
              {progress}
              %
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn" onClick={abort}>取消</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
