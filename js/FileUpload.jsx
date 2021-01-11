import React from 'react';

const accept = '.ecf, .eif, .eid, .esf, .emf, .edf, .enf, .etf';

function FileUpload(props) {
  const processFiles = files => {
    if (files && files.length) {
      props.onFilesSelected(files);
    }
  };

  const preventDefault = event => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onFileSelect = event => {
    processFiles(event.target.files);
  };

  const onDrop = event => {
    preventDefault(event);
    processFiles(event.dataTransfer.files);
  };

  const onClick = () => {
    const upload = document.getElementById('file-upload-manual');
    upload.click();
  };

  return (
    <div className="file-upload" onDragEnter={preventDefault} onDrop={onDrop} onDragOver={preventDefault} onClick={onClick}>
      <p>
        Drag and Drop one or more pub files here to import!<br />(or click to choose files)
      </p>
      <input id="file-upload-manual" type="file" onChange={onFileSelect} accept={accept} multiple />
    </div>
  )
}

export default FileUpload;
