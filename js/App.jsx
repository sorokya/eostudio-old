import utils from './utils';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Welcome from './Welcome';
import Editor from './Editor';

function App() {
  const [editPubType, setEditPubType] = useState('');
  const [appState, setAppState] = useState('welcome');
  const [fileCount, setFileCount] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [files, setFiles] = useState([]);

  const [itemFile, setItemFile] = useState(undefined);
  const [classFile, setClassFile] = useState(undefined);
  const [npcFile, setNpcFile] = useState(undefined);
  const [spellFile, setSpellFile] = useState(undefined);
  const [shopFile, setShopFile] = useState(undefined);
  const [masterFile, setMasterFile] = useState(undefined);
  const [innFile, setInnFile] = useState(undefined);
  const [talkFile, setTalkFile] = useState(undefined);
  const [dropFile, setDropFile] = useState(undefined);

  useEffect(() => {
    if (fileCount && loadedCount === fileCount) {
      setAppState('editing');
    }
  }, [loadedCount]);

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

  const onWelcomeSubmit = (files) => {
    setFileCount(files.length);
    files.forEach((file, i) => {
      const pubType = utils.getPubType(file.name);
      const reader = new FileReader();
      reader.onload = function () {
        getPubFromFileContent(pubType, this.result);
      };
      reader.readAsArrayBuffer(file);
      if (i === 0) setEditPubType(pubType);
    });
  };

  const onEditCancel = () => {
    setFileCount(0);
    setLoadedCount(0);
    setAppState('welcome');
  }

  return (
    <Container>
      <h1>EO Studio</h1>
      {appState === 'welcome' &&
        <Welcome onSubmit={onWelcomeSubmit} />}
      {appState === 'editing' &&
        <Editor pubType={editPubType}
          files={files}
          onCancel={onEditCancel} />}
    </Container>
  );
}

export default App;
