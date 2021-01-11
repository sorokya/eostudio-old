import utils from './utils';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FileUpload from './FileUpload';

function FileImporter(props) {
  const [fileCount, setFileCount] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [files, setFiles] = useState([]);

  const loading = () => fileCount > 0 && fileCount !== loadedCount;

  const getPubFromFileContent = (pubType, fileContent) => {
    import('../pkg').then(eo => {
      const arrayBuffer = fileContent;
      const array = new Uint8Array(arrayBuffer);
      const file = eo[`get_${pubType}_file`](array);
      setFiles(files => {
        files.push({
          pubType: pubType,
          file: file
        });
        return files;
      });
      setLoadedCount(count => count + 1);
    });
  };

  const onFilesSelected = (files) => {
    setFileCount(files.length);
    setLoadedCount(0);
    for (let i = 0; i < files.length; ++i) {
      const pubType = utils.getPubType(files[i].name);
      const reader = new FileReader();
      reader.onload = function () {
        getPubFromFileContent(pubType, this.result);
      };
      reader.readAsArrayBuffer(files[i]);
    };
  };

  useEffect(() => {
    if (fileCount && loadedCount === fileCount) {
      props.onFilesImported(files);
    }
  }, [loadedCount]);

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Import Data</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!loading() &&
          <FileUpload onFilesSelected={onFilesSelected} />}
        {loading() &&
          <div className="file-loading-indicator"><i className="fa fa-spinner fa-spin"></i></div>}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={props.onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FileImporter;
