import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FileTable from './FileTable';
import ItemRecord from './ItemRecord';
import ClassRecord from './ClassRecord';

function Editor(props) {
  const pubType = props.pubType;
  const [editorState, setEditorState] = useState('file');
  const [record, setRecord] = useState(undefined);
  const [tableScrollY, setTableScrollY] = useState(0);

  const getPubFile = (type) => {
    const result = props.files.filter(file => file.pubType === type);
    if (result && result.length) {
      return result[0].file;
    }
  };

  const file = getPubFile(pubType);
  const npc_file = getPubFile('npc');
  const item_file = getPubFile('item');

  const getRecord = () => {
    switch (pubType) {
      case 'class':
        return <ClassRecord record={record} file={file} />;
      case 'item':
        return <ItemRecord record={record} />;
    }
  };

  const onRecordSelect = (record, scrollY) => {
    setRecord(record);
    setTableScrollY(scrollY);
    setEditorState('record');
  };

  const onCancel = () => {
    if (editorState === 'record') {
      setEditorState('file');
    } else {
      props.onCancel();
    }
  };

  return (
    <div className="editor">
      <Button variant="primary">Save</Button>
      {editorState === 'record' &&
        <Button variant="danger">Remove</Button>}
      <Button variant="default" onClick={onCancel}>Cancel</Button>
      {editorState === 'file' &&
        <FileTable pubType={pubType} file={file} npc_file={npc_file}
          onRecordSelect={onRecordSelect} scrollY={tableScrollY} />}
      {editorState === 'record' && getRecord()}
    </div>
  );
}

export default Editor;
