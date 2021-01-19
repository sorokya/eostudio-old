import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import utils from './utils';
import FileUpload from './FileUpload';
import Gfx from './Gfx';
import GfxType from './GfxType';

function FileImporter(props) {
  const { show, onClose, onFilesImported } = props;
  const [fileCount, setFileCount] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [files, setFiles] = useState([]);
  const [atlasUrl, setAtlasUrl] = useState('atlas2');

  const onAtlasUrlChange = (e) => setAtlasUrl(e.target.value);

  const loading = () => fileCount > 0 && fileCount !== loadedCount;

  const getPubFromFileContent = (pubType, fileContent) => {
    import('../pkg').then((eo) => {
      const arrayBuffer = fileContent;
      const array = new Uint8Array(arrayBuffer);
      const file = eo[`get_${pubType}_file`](array);
      setFiles((oldFiles) => {
        const existingFile = oldFiles.filter((f) => f.pubType === pubType);
        if (existingFile && existingFile.length) {
          const fileIndex = oldFiles.indexOf(existingFile[0]);
          oldFiles.splice(fileIndex, 1);
        }

        if (['item', 'npc', 'spell'].includes(pubType) && atlasUrl) {
          const gfx = new Gfx(atlasUrl);
          for (let i = 0; i < file.records.length; ++i) {
            if (file.records[i].graphic_id) {
              let gfxId = file.records[i].graphic_id;
              let gfxType;
              switch (pubType) {
                case 'item':
                  gfxId *= 2;
                  gfxType = GfxType.ItemSprites;
                  break;
                case 'npc':
                  gfxId = (gfxId - 1) * 40 + 1;
                  gfxType = GfxType.NpcSprites;
                  break;
                case 'spell':
                  gfxId = file.records[i].icon_id;
                  gfxType = GfxType.SpellIcons;
                  break;
                default:
                  break;
              }
              gfx.getImage(gfxType, gfxId).then((image) => {
                if (image) {
                  file.records[i].imageUrl = image.path;
                  file.records[i].imageOffset = image.x_offset;
                  file.records[i].imageWidth = image.width;
                  file.records[i].imageHeight = image.height;
                }
              });
            }
          }
        }

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
      setFileCount(0);
      setLoadedCount(0);
      onFilesImported(files, atlasUrl);
    }
  }, [fileCount, files, loadedCount, onFilesImported, atlasUrl]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Import Data</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!loading() && (
          <>
            <FileUpload onFilesSelected={onFilesSelected} />
            <br />
            <Form.Group controlId="name">
              <Form.Label>Atlas URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Atlas URL"
                value={atlasUrl}
                onChange={onAtlasUrlChange}
              />
            </Form.Group>
          </>
        )}
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
