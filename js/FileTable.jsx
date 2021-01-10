import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function FileTable(props) {
  const pubType = props.pubType;
  const file = props.file;
  const npc_file = props.npc_file;
  const scrollY = props.scrollY;

  const onRecordClick = (event) => {
    const index = event.target.parentElement.getAttribute('data-index');
    const record = file.records[parseInt(index, 10)];
    props.onRecordSelect(record, window.scrollY);
  };

  useEffect(() => {
    if (scrollY) {
      window.scrollTo(0, scrollY);
    }
  });

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
        if (npc_file) {
          const result = npc_file.records.filter((npc) => npc.id === record.npc_id);
          if (result && result.length) {
            name = result[0].name;
          }
        }

        rows.push(buildRow(index, (<>
          <td>{record.npc_id}</td>
          {npc_file && <td>{name}</td>}
        </>)));
      }
    });

    return rows;
  };

  return (
    <Table className="edit-table" striped bordered hover>
      <thead>
        {getHeaderRow()}
      </thead>
      <tbody>
        {getTableRows()}
      </tbody>
    </Table>
  )
}

export default FileTable;
