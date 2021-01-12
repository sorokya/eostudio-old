import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ItemRecord from './ItemRecord';
import ClassRecord from './ClassRecord';
import NPCRecord from './NPCRecord';

function RecordEditor(props) {
  const { pubType, record, classFile, show, onClose } = props;

  const getRecord = () => {
    switch (pubType) {
      case 'class':
        return <ClassRecord record={record} file={classFile} />;
      case 'item':
        return <ItemRecord record={record} classFile={classFile} />;
      case 'npc':
        return <NPCRecord record={record} />;
      default:
        throw new Error(`No record type found for ${pubType}`);
    }
  };

  const onSubmit = () => {};

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Edit
          {pubType}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>{getRecord()}</Modal.Body>

      <Modal.Footer>
        <Button variant="default" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

RecordEditor.propTypes = {
  pubType: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  classFile: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RecordEditor;
