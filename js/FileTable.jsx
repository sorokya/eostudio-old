import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ImageCanvas(props) {
  const { url, width, height, offset } = props;
  const canvasRef = useRef(null);

  const findImage = () => document.querySelector(`img[src="${url}"]`);
  const createImage = (onLoad) => {
    const image = document.createElement('img');
    image.onload = onLoad;
    image.style.display = 'none';
    image.src = url;
    document.body.appendChild(image);
    return image;
  };

  const renderImage = () => {
    const context = canvasRef.current.getContext('2d');
    const image = findImage();
    context.drawImage(image, offset, 0, width, height, 0, 0, width, height);
  };

  React.useEffect(() => {
    const image = findImage();
    if (image) {
      if (image.complete) {
        renderImage();
      } else {
        setTimeout(renderImage, 1000);
      }
    } else {
      createImage(renderImage);
    }
  }, [canvasRef, height, offset, url, width]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}

ImageCanvas.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
};

function FileTable(props) {
  const { pubType, file, npcFile, onRecordSelect } = props;
  const [filter, setFilter] = useState('');
  const haveNpcFile = () => npcFile && npcFile.records.length > 0;

  useEffect(() => {
    setFilter('');
  }, [file]);

  const onRecordClick = (event) => {
    const index = event.target.parentElement.getAttribute('data-index');
    const record = file.records[parseInt(index, 10)];
    onRecordSelect(record);
  };

  const onFilterChange = (event) => setFilter(event.target.value);

  const getFilteredRecords = () => {
    if (filter) {
      return file.records.filter((record) =>
        JSON.stringify(record).toLowerCase().includes(filter)
      );
    }

    return file.records;
  };

  const haveGfx = () => file.records.filter((r) => r.imageUrl).length > 0;

  const getHeaderRow = () => {
    if (['item', 'class', 'npc', 'spell'].includes(pubType)) {
      return (
        <tr>
          {haveGfx() && <th>&nbsp;</th>}
          <th>ID</th>
          <th>Name</th>
        </tr>
      );
    }
    if (['shop', 'master', 'inn'].includes(pubType)) {
      return (
        <tr>
          <th>Vendor ID</th>
          <th>Name</th>
        </tr>
      );
    }
    if (['drop', 'talk'].includes(pubType)) {
      return (
        <tr>
          <th>NPC ID</th>
          {haveNpcFile() && <th>Name</th>}
        </tr>
      );
    }
    throw new Error('No header row found');
  };

  const getTableRows = () => {
    const rows = [];

    const buildRow = (index, columns) => {
      return (
        <tr key={index} data-index={index} onClick={onRecordClick}>
          {columns}
        </tr>
      );
    };

    const records = getFilteredRecords();

    records.forEach((record) => {
      const index = file.records.indexOf(record);
      if (['item', 'class', 'npc', 'spell'].includes(pubType)) {
        rows.push(
          buildRow(
            index,
            <>
              {haveGfx() && (
                <td>
                  {record.imageUrl && (
                    <ImageCanvas
                      url={record.imageUrl}
                      width={record.imageWidth}
                      height={record.imageHeight}
                      offset={record.imageOffset}
                    />
                  )}
                </td>
              )}
              <td>{record.id}</td>
              <td>{record.name}</td>
            </>
          )
        );
      } else if (['shop', 'master', 'inn'].includes(pubType)) {
        rows.push(
          buildRow(
            index,
            <>
              <td>{record.vendor_id}</td>
              <td>{record.name}</td>
            </>
          )
        );
      } else if (['drop', 'talk'].includes(pubType)) {
        let name = '';
        if (haveNpcFile()) {
          const result = npcFile.records.filter(
            (npc) => npc.id === record.npc_id
          );
          if (result && result.length) {
            name = result[0].name;
          }
        }

        rows.push(
          buildRow(
            index,
            <>
              <td>{record.npc_id}</td>
              {haveNpcFile() && <td>{name}</td>}
            </>
          )
        );
      }
    });

    return rows;
  };

  return (
    <>
      <div id="table-tools">
        <Button variant="success">
          <i className="fa fa-plus" />
          &nbsp;Add Record
        </Button>
        <div id="table-filter">
          <i className="fa fa-search" />
          &nbsp;
          <Form.Control
            type="text"
            value={filter}
            onChange={onFilterChange}
            placeholder="Filter"
          />
        </div>
      </div>
      {!!file.records.length && (
        <Table className="edit-table" striped bordered hover>
          <thead>{getHeaderRow()}</thead>
          <tbody>{getTableRows()}</tbody>
        </Table>
      )}
      {!file.records.length && (
        <p className="no-records">
          There aren&apos;t any
          {pubType}
          records yet. Click &quot;Add Record&quot; to add one, or click
          &quot;Import Data&quot; to import an existing
          {pubType}
          files.
        </p>
      )}
    </>
  );
}

FileTable.propTypes = {
  pubType: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired,
  npcFile: PropTypes.object,
  onRecordSelect: PropTypes.func.isRequired,
};

FileTable.defaultProps = {
  npcFile: undefined,
};

export default FileTable;
