import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ItemRecord from './ItemRecord';
import ClassRecord from './ClassRecord';
import NPCRecord from './NPCRecord';

function RecordEditor(props) {
  const pubType = props.pubType;
  const record = props.record;
  const classFile = props.classFile;

  const getRecord = () => {
    switch (pubType) {
      case 'class':
        return <ClassRecord record={record} file={classFile} />;
      case 'item':
        return <ItemRecord record={record} classFile={classFile} />;
      case 'npc':
        return <NPCRecord record={record} />
    }
  };

  const onSubmit = () => {

  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {pubType}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {getRecord()}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="default" onClick={props.onClose}>Close</Button>
        <Button variant="primary" onClick={onSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecordEditor;
