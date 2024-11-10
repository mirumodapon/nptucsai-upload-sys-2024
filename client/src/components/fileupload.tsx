import { useRef, BaseSyntheticEvent } from 'react';
import useToast from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import useFile from '@/service/useFile';
import ky from 'ky';

type Props = {

  type: string;
};

function FileUpload({ type }: Props) {
  const { data } = useFile({ type });
  const fileInput = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const query = useQueryClient();

  const handleUploadFile = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const [file] = fileInput.current?.files ?? [];

    const formData = new FormData();
    formData.append('file', file);

    try {
      await ky.post('/api/files/' + type, {
        body: formData
      });

      toast.addToast({
        key: `UPLOAD_FILE_SUCCESS${Date.now()}`,
        type: 'success',
        message: '上傳成功',
        during: 3000
      });

      query.invalidateQueries({ queryKey: ['file', type], refetchType: 'all' });
    }
    catch (error) {
      // @ts-expect-error no idea
      const { message } = await error.response.json();
      toast.addToast({
        key: `UPLOAD_FILE_FAILED${Date.now()}`,
        type: 'error',
        message: message ?? '上傳失敗',
        during: 3000
      });
    }
  };

  return (
    <div className="w-full p-5">
      <form className="p-3 mb-8" onSubmit={handleUploadFile}>
        <input ref={fileInput} type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
        <button className="btn">送出</button>
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
    </div>
  );
}

export default FileUpload;
