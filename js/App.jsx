import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import FileTable from './FileTable';
import FileImporter from './FileImporter';
import RecordEditor from './RecordEditor';

function App() {
  const [files, setFiles] = useState([]);
  const [showFileImporter, setShowFileImporter] = useState(false);
  const [showRecordEditor, setShowRecordEditor] = useState(false);
  const [tab, setTab] = useState('#class');
  const [record, setRecord] = useState(undefined);

  const handleImportDataClick = () => setShowFileImporter(true);
  const onImportDataClose = () => setShowFileImporter(false);
  const onRecordEditorClose = () => setShowRecordEditor(false);
  const onTabSelect = (selectedTab) => setTab(selectedTab);
  const getPubType = () => tab.substr(1);

  const onFilesImported = (importedFiles) => {
    setShowFileImporter(false);
    setFiles(importedFiles);
  };

  const onRecordSelect = (selectedRecord) => {
    setRecord(selectedRecord);
    setShowRecordEditor(true);
  };

  const getPubFile = (type) => {
    const result = files.filter((file) => file.pubType === type);
    if (result && result.length) {
      return result[0].file;
    }

    return { records: [] };
  };

  const getFileTable = () => {
    const pubType = getPubType();
    const file = getPubFile(pubType);
    const npcFile = getPubFile('npc');
    return (
      <FileTable
        pubType={pubType}
        file={file}
        npcFile={npcFile}
        onRecordSelect={onRecordSelect}
      />
    );
  };

  const getRecordEditor = () => {
    const pubType = getPubType();
    const classFile = getPubFile('class');
    const dropFile = getPubFile('drop');
    const npcFile = getPubFile('npc');
    const itemFile = getPubFile('item');
    return (
      <RecordEditor
        pubType={pubType}
        record={record}
        classFile={classFile}
        dropFile={dropFile}
        itemFile={itemFile}
        npcFile={npcFile}
        show={showRecordEditor}
        onClose={onRecordEditorClose}
      />
    );
  };

  return (
    <Container>
      <header>
        <h1>
          <img src="img/logo.png" alt="logo" />
          EO Studio
        </h1>
        <Button variant="primary" onClick={handleImportDataClick}>
          <i className="fa fa-file-import" />
          &nbsp;Import Data
        </Button>
        &nbsp;
        <Button variant="success">
          <i className="fa fa-file-export" />
          &nbsp;Export Data
        </Button>
      </header>
      <Nav variant="tabs" defaultActiveKey="#class" onSelect={onTabSelect}>
        <Nav.Item>
          <Nav.Link href="#class">Classes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#drop">Drops</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#inn">Inns</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#item">Items</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#master">Skill Masters</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#npc">NPCs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#shop">Shops</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#spell">Spells</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#talk">Talk</Nav.Link>
        </Nav.Item>
      </Nav>
      {getFileTable()}
      {showRecordEditor && getRecordEditor()}
      <FileImporter
        show={showFileImporter}
        onFilesImported={onFilesImported}
        onClose={onImportDataClose}
      />
    </Container>
  );
}

export default App;
