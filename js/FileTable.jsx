import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function FileTable(props) {
  const pubType = props.pubType;
  const file = props.file;
  const npcFile = props.npcFile;

  const onRecordClick = (event) => {
    const index = event.target.parentElement.getAttribute('data-index');
    const record = file.records[parseInt(index, 10)];
    props.onRecordSelect(record);
  };

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
          {npcFile && <th>Name</th>}
        </tr>
      )
    }
  };

  const getTableRows = () => {
    const rows = [];

    const buildRow = (index, columns) => {
      return <tr key={index} data-index={index} onClick={onRecordClick}>{columns}</tr>;
    }

    file.records.forEach((record, index) => {
      if (['item', 'class', 'npc', 'spell'].includes(pubType)) {
        rows.push(buildRow(index, (<>
          <td>{record.id}</td>
          <td>{record.name}</td>
        </>)));
      } else if (['shop', 'master', 'inn'].includes(pubType)) {
        rows.push(buildRow(index, (<>
          <td>{record.vendor_id}</td>
          <td>{record.name}</td>
        </>)));
      } else if (['drop', 'talk'].includes(pubType)) {
        let name = '';
        if (npcFile) {
          const result = npcFile.records.filter((npc) => npc.id === record.npc_id);
          if (result && result.length) {
            name = result[0].name;
          }
        }

        rows.push(buildRow(index, (<>
          <td>{record.npc_id}</td>
          {npcFile && <td>{name}</td>}
        </>)));
      }
    });

    return rows;
  };

  return (
    <>
      <Button variant="success"><i className="fa fa-plus"></i>&nbsp;Add Record</Button>
      {!!file.records.length &&
        <Table className="edit-table" striped bordered hover>
          <thead>
            {getHeaderRow()}
          </thead>
          <tbody>
            {getTableRows()}
          </tbody>
        </Table>
      }
      {!file.records.length &&
        <p className="no-records">
          There aren&apos;t any {pubType} records yet. Click &quot;Add Record&quot; to add one,
          or click &quot;Import Data&quot; to import an existing {pubType} files.
        </p>
      }
    </>
  )
}

export default FileTable;
