function FileUpload() {
  return (
    <form action="/api/files/book" encType="multipart/form-data" method="POST">
      <input type="file" name="file" />
      <input type="submit" />
    </form>
  );
}

export default FileUpload;
