import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function DropTable(props) {
  const { records, itemFile } = props;

  const haveItemFile = () => itemFile && itemFile.records.length > 0;

  const [drops, dispatch] = useReducer((currentDrops, { type, value }) => {
    switch (type) {
      case 'add':
        return [...currentDrops, value];
      case 'update':
        return currentDrops.map((d) =>
          d.item_id === value.item_id ? value : d
        );
      case 'remove':
        return currentDrops.filter((d) => d.item_id !== value.item_id);
      default:
        return currentDrops;
    }
  }, records);

  const getDrop = (e) => {
    const getRow = () => {
      let el = e.target.parentElement;
      while (el.tagName !== 'TR') {
        el = el.parentElement;
      }
      return el;
    };
    const index = parseInt(getRow().getAttribute('data-index'), 10);
    return drops[index];
  };

  const onItemChange = (e) => {
    const drop = getDrop(e);
    drop.item_id = parseInt(e.target.value, 10);
    dispatch({ type: 'update', value: drop });
  };

  const onMinAmountChange = (e) => {
    const drop = getDrop(e);
    drop.min_amount = parseInt(e.target.value, 10);
    dispatch({ type: 'update', value: drop });
  };

  const onMaxAmountChange = (e) => {
    const drop = getDrop(e);
    drop.max_amount = parseInt(e.target.value, 10);
    dispatch({ type: 'update', value: drop });
  };

  const onDropRateChange = (e) => {
    const drop = getDrop(e);
    drop.drop_rate = parseInt(e.target.value, 10);
    dispatch({ type: 'update', value: drop });
  };

  const itemIdUnique = (id) => !drops.filter((d) => d.item_id === id).length;
  const getNextItemId = () => {
    let id = 1;
    while (!itemIdUnique(id)) {
      id += 1;
    }
    return id;
  };

  const addDrop = () => {
    dispatch({
      type: 'add',
      value: {
        item_id: getNextItemId(),
        min_amount: 0,
        max_amount: 0,
        drop_rate: 0,
      },
    });
  };

  const removeDrop = (e) => {
    const drop = getDrop(e);
    dispatch({ type: 'remove', value: drop });
  };

  const getItemInput = (drop) => {
    return (
      <Form.Control
        type="number"
        value={drop.item_id}
        onChange={onItemChange}
      />
    );
  };

  const getItemSelect = (drop) => {
    const items = itemFile.records
      .filter((i) => i.id === drop.item_id || itemIdUnique(i.id))
      .map((i) => {
        return (
          <option key={i.id} value={i.id}>
            {i.name}
          </option>
        );
      });
    return (
      <Form.Control as="select" value={drop.item_id} onChange={onItemChange}>
        {items}
      </Form.Control>
    );
  };

  return (
    <>
      <Table size="sm">
        <thead>
          <tr>
            <th>Item</th>
            <th>Min.</th>
            <th>Max.</th>
            <th>Rate</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {drops.map((d, index) => {
            return (
              <tr key={d.item_id} data-index={index}>
                <td>
                  {haveItemFile() && getItemSelect(d)}
                  {!haveItemFile() && getItemInput(d)}
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={d.min_amount}
                    onChange={onMinAmountChange}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={d.max_amount}
                    onChange={onMaxAmountChange}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={d.drop_rate}
                    onChange={onDropRateChange}
                  />
                </td>
                <td>
                  <Button variant="danger" onClick={removeDrop}>
                    <i className="fa fa-trash" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button variant="success" onClick={addDrop}>
        <i className="fa fa-plus" />
        &nbsp;Add Drop
      </Button>
    </>
  );
}

function DropsRecord(props) {
  const { record, dropFile, npcFile, itemFile } = props;
  const [tempNpcId, setTempNpcId] = useState(record.npc_id);
  const [npcId, setNpcId] = useState(record.npc_id);
  const [drops, setDrops] = useState(record.drops);

  const haveNpcFile = () => npcFile && npcFile.records.length > 0;

  const npcRecordDefined = (id) =>
    !!dropFile.records.filter((r) => r.npc_id === id).length;

  const onNpcIdChange = (e) => {
    const id = parseInt(e.target.value, 10);
    if (!Number.isNaN(id) && (!npcRecordDefined(id) || id === record.npc_id)) {
      setNpcId(id);
    } else {
      setTempNpcId(npcId);
    }
  };

  const onNpcInputChange = (e) => setTempNpcId(e.target.value);

  const npcCanDrop = (npc) => ['Passive', 'Aggressive'].includes(npc.npc_type);

  const getNpcSelect = () => {
    const npcOptions = npcFile.records
      .filter(
        (n) => (n.id === npcId || !npcRecordDefined(n.id)) && npcCanDrop(n)
      )
      .map((r) => {
        return (
          <option value={r.id} key={r.id}>
            {r.name}
          </option>
        );
      });
    return (
      <Form.Group controlId="npcId">
        <Form.Label>NPC</Form.Label>
        <Form.Control as="select" value={npcId} onChange={onNpcIdChange}>
          {npcOptions}
        </Form.Control>
      </Form.Group>
    );
  };

  const getNpcInput = () => {
    return (
      <Form.Group controlId="npcId">
        <Form.Label>NPC ID</Form.Label>
        <Form.Control
          type="number"
          placeholder="NPC ID"
          value={tempNpcId}
          onChange={onNpcInputChange}
          onBlur={onNpcIdChange}
        />
      </Form.Group>
    );
  };

  const updateDrop = (index, drop) => {
    setDrops((oldDrops) => {
      // eslint-disable-next-line no-param-reassign
      oldDrops[index] = drop;
      return oldDrops;
    });
  };

  return (
    <>
      {haveNpcFile() && getNpcSelect()}
      {!haveNpcFile() && getNpcInput()}
      <DropTable records={drops} itemFile={itemFile} updateDrop={updateDrop} />
    </>
  );
}

DropsRecord.propTypes = {
  record: PropTypes.object.isRequired,
  dropFile: PropTypes.object.isRequired,
  npcFile: PropTypes.object,
  itemFile: PropTypes.object,
};

DropsRecord.defaultProps = {
  npcFile: undefined,
  itemFile: undefined,
};

DropTable.propTypes = {
  records: PropTypes.array.isRequired,
  itemFile: PropTypes.object,
};

DropTable.defaultProps = {
  itemFile: undefined,
};

export default DropsRecord;
