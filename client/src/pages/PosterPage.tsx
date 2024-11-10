import useFile from '@/service/useFile';

function PosterPage() {
  const { data } = useFile({ type: 'book' });

  return (
    <div className="w-full p-5">
      <form className="p-3 mb-8" encType="multipart/form-data" method="post" action="/api/files/book">
        <input name="file" type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
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

export default PosterPage;
