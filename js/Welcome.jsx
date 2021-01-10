import utils from './utils';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import FileUpload from './FileUpload';

const pubTypesNeedingEcf = ['item'];
const pubTypesNeedingEif = ['drop', 'shop'];
const pubTypesNeedingEnf = ['drop', 'talk'];
const pubTypesNeedingEsf = ['master'];

function Welcome(props) {
  const [valid, setValid] = useState(false);
  const [file, setFile] = useState(undefined);
  const [file2, setFile2] = useState(undefined);
  const [file3, setFile3] = useState(undefined);
  const [needEcf, setNeedEcf] = useState(false);
  const [needEif, setNeedEif] = useState(false);
  const [needEnf, setNeedEnf] = useState(false);
  const [needEsf, setNeedEsf] = useState(false);

  useEffect(() => {
    if (file) {
      let pubType = utils.getPubType(file.name);
      setNeedEcf(pubTypesNeedingEcf.includes(pubType));
      setNeedEif(pubTypesNeedingEif.includes(pubType));
      setNeedEnf(pubTypesNeedingEnf.includes(pubType));
      setNeedEsf(pubTypesNeedingEsf.includes(pubType));
      setValid(true);
    } else {
      setValid(false);
    }
  }, [file, file2, file3]);

  const onMainSelected = file => {
    setFile(file);
    setFile2(undefined);
    setFile3(undefined);
  };

  const onSecondarySelected = file => {
    if (!file2) {
      setFile2(file);
    } else if (!file3) {
      setFile3(file);
    }
  };

  const onSubmit = () => {
    let files = [file];
    if (file2) files.push(file2);
    if (file3) files.push(file3);
    props.onSubmit(files);
  };

  return (
    <div className="welcome">
      <FileUpload
        message="To get things started please select the pub file you would like to modify"
        accept=".ecf, .eif, .eid, .esf, .emf, .edf, .enf, .etf"
        onFileSelected={onMainSelected} />
      {needEcf &&
        <FileUpload
          message="It looks like the file you're trying to edit contains references
        to a class (ecf) file. If you want the class names to show up please
        upload this file below."
          accept=".ecf"
          onFileSelected={onSecondarySelected} />}
      {needEif &&
        <FileUpload
          message="It looks like the file you're trying to edit contains references
        to an item (eif) file. If you want the item names to show up please
        upload this file below."
          accept=".eif"
          onFileSelected={onSecondarySelected} />}
      {needEnf &&
        <FileUpload
          message="It looks like the file you're trying to edit contains references
          to an npc (enf) file. If you want the npc names to show up please
        upload this file below."
          accept=".enf"
          onFileSelected={onSecondarySelected} />}
      {needEsf &&
        <FileUpload
          message="It looks like the file you're trying to edit contains references
          to a spell (esf) file. If you want the spell names to show up please
        upload this file below."
          accept=".esf"
          onFileSelected={onSecondarySelected} />}

      <Button variant="primary" disabled={!valid} onClick={onSubmit}>Submit</Button>
    </div>
  );
}

export default Welcome;
