import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ClassRecord from './Records/Class';
import DropRecord from './Records/Drop';
import ItemRecord from './Records/Item';
import NPCRecord from './Records/NPC';
import SpellRecord from './Records/Spell';

function RecordEditor(props) {
  const {
    pubType,
    record,
    classFile,
    npcFile,
    itemFile,
    dropFile,
    show,
    onClose,
  } = props;

  const getRecord = () => {
    switch (pubType) {
      case 'class':
        return <ClassRecord record={record} file={classFile} />;
      case 'item':
        return <ItemRecord record={record} classFile={classFile} />;
      case 'npc':
        return <NPCRecord record={record} />;
      case 'spell':
        return <SpellRecord record={record} />;
      case 'drop':
        return (
          <DropRecord
            record={record}
            dropFile={dropFile}
            npcFile={npcFile}
            itemFile={itemFile}
          />
        );
      default:
        return <div>&nbsp;</div>;
    }
  };

  const onSubmit = () => {};

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Edit&nbsp;
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
  dropFile: PropTypes.object.isRequired,
  itemFile: PropTypes.object.isRequired,
  npcFile: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RecordEditor;
