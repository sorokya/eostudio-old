import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import utils from './utils';
import FileUpload from './FileUpload';

function FileImporter(props) {
  const { show, onClose, onFilesImported } = props;
  const [fileCount, setFileCount] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [files, setFiles] = useState([]);

  const loading = () => fileCount > 0 && fileCount !== loadedCount;

  const getPubFromFileContent = (pubType, fileContent) => {
    import('../pkg').then((eo) => {
      const arrayBuffer = fileContent;
      const array = new Uint8Array(arrayBuffer);
      const file = eo[`get_${pubType}_file`](array);
      setFiles((oldFiles) => {
        oldFiles.push({
          pubType,
          file,
        });
        return oldFiles;
      });
      setLoadedCount((count) => count + 1);
    });
  };

  const onFilesSelected = (selectedFiles) => {
    setFileCount(selectedFiles.length);
    setLoadedCount(0);
    for (let i = 0; i < selectedFiles.length; ++i) {
      const pubType = utils.getPubType(selectedFiles[i].name);
      const reader = new FileReader();
      reader.onload = function onLoad() {
        // eslint-disable-next-line react/no-this-in-sfc
        getPubFromFileContent(pubType, this.result);
      };
      reader.readAsArrayBuffer(selectedFiles[i]);
    }
  };

  useEffect(() => {
    if (fileCount && loadedCount === fileCount) {
      onFilesImported(files);
    }
  }, [fileCount, files, loadedCount, onFilesImported]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Import Data</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!loading() && <FileUpload onFilesSelected={onFilesSelected} />}
        {loading() && (
          <div className="file-loading-indicator">
            <i className="fa fa-spinner fa-spin" />
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

FileImporter.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilesImported: PropTypes.func.isRequired,
};

export default FileImporter;
