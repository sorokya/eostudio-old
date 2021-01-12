/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const accept = '.ecf, .eif, .eid, .esf, .emf, .edf, .enf, .etf';

function FileUpload(props) {
  const processFiles = (files) => {
    if (files && files.length) {
      props.onFilesSelected(files);
    }
  };

  const preventDefault = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onFileSelect = (event) => {
    processFiles(event.target.files);
  };

  const onDrop = (event) => {
    preventDefault(event);
    processFiles(event.dataTransfer.files);
  };

  const onClick = () => {
    const upload = document.getElementById('file-upload-manual');
    upload.click();
  };

  return (
    <div
      className="file-upload"
      onDragEnter={preventDefault}
      onDrop={onDrop}
      onDragOver={preventDefault}
      onClick={onClick}
    >
      <p>
        Drag and Drop one or more pub files here to import!
        <br />
        (or click to choose files)
      </p>
      <input
        id="file-upload-manual"
        type="file"
        onChange={onFileSelect}
        accept={accept}
        multiple
      />
    </div>
  );
}

FileUpload.propTypes = {
  onFilesSelected: PropTypes.func.isRequired,
};

export default FileUpload;
