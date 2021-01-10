import React from 'react';

function FileUpload(props) {
  const onChange = event => {
    if (event.target.files && event.target.files.length) {
      props.onFileSelected(event.target.files[0]);
    }
  };
  return (
    <div className="file-upload">
      <p>{props.message}</p>
      <input type="file" onChange={onChange} accept={props.accept} />
    </div>
  )
}

export default FileUpload;
