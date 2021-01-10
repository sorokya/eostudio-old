import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function Editor(props) {
  const pubType = props.pubType;

  const getPubFile = (type) => {
    const result = props.files.filter(file => file.pubType === type);
    if (result && result.length) {
      return result[0].file;
    }
  };

  const file = getPubFile(pubType);
  const npc_file = getPubFile('npc');
  const item_file = getPubFile('item');

  const getHeaderRow = () => {
    if (['item', 'class', 'npc', 'spell'].includes(pubType)) {
      return (
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      );
    } else if (['shop', 'master', 'inn'].includes(pubType)) {
      return (
        <tr>
          <th>Vendor ID</th>
          <th>Name</th>
        </tr>
      );
    } else if (['drop', 'talk'].includes(pubType)) {
      return (
        <tr>
          <th>NPC ID</th>
          {npc_file && <th>Name</th>}
        </tr>
      )
    }
  };

  const getTableRows = () => {
    const rows = [];

    file.records.forEach((record, index) => {
      if (['item', 'class', 'npc', 'spell'].includes(pubType)) {
        rows.push(
          <tr key={record.id}>
            <td>{record.id}</td>
            <td>{record.name}</td>
          </tr>
        );
      } else if (['shop', 'master', 'inn'].includes(pubType)) {
        rows.push(
          <tr key={record.vendor_id}>
            <td>{record.vendor_id}</td>
            <td>{record.name}</td>
          </tr>
        );
      } else if (['drop', 'talk'].includes(pubType)) {
        let name = '';
        if (npc_file) {
          const result = npc_file.records.filter((npc) => npc.id === record.npc_id);
          if (result && result.length) {
            name = result[0].name;
          }
        }
        rows.push(
          <tr key={record.npc_id}>
            <td>{record.npc_id}</td>
            {npc_file && <td>{name}</td>}
          </tr>
        );
      }
    });

    return rows;
  };

  return (
    <div>
      <Button variant="primary">Save</Button>
      <Button variant="default" onClick={props.onCancel}>Cancel</Button>
      <Table className="edit-table" striped bordered hover>
        <thead>
          {getHeaderRow()}
        </thead>
        <tbody>
          {getTableRows()}
        </tbody>
      </Table>
    </div>
  );
}

export default Editor;
