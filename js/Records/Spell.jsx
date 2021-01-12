import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';

function SpellRecord(props) {
  const { record } = props;

  const [tab, setTab] = useState('#properties');
  const [name, setName] = useState(record.name);
  const [shout, setShout] = useState(record.shout);
  const [iconId, setIconId] = useState(record.icon_id);
  const [gfxId, setGfxId] = useState(record.graphic_id);
  const [tpCost, setTpCost] = useState(record.tp_cost);
  const [spCost, setSpCost] = useState(record.sp_cost);
  const [castTime, setCastTime] = useState(record.cast_time);
  const [type, setType] = useState(record.spell_type);
  const [element, setElement] = useState(record.element);
  const [elementPower, setElementPower] = useState(record.element_power);
  const [targetRestrict, setTargetRestrict] = useState(record.target_restrict);
  const [targetType, setTargetType] = useState(record.target_type);
  const [minDamage, setMinDamage] = useState(record.min_damage);
  const [maxDamage, setMaxDamage] = useState(record.max_damage);
  const [accuracy, setAccuracy] = useState(record.accuracy);
  const [hp, setHP] = useState(record.hp);

  const onNameChange = (e) => setName(e.target.value);
  const onShoutChange = (e) => setShout(e.target.value);
  const onIconIdChange = (e) => setIconId(e.target.value);
  const onGfxIdChange = (e) => setGfxId(e.target.value);
  const onTpCostChange = (e) => setTpCost(e.target.value);
  const onSpCostChange = (e) => setSpCost(e.target.value);
  const onCastTimeChange = (e) => setCastTime(e.target.value);
  const onTypeChange = (e) => setType(e.target.value);
  const onElementChange = (e) => setElement(e.target.value);
  const onElementPowerChange = (e) => setElementPower(e.target.value);
  const onTargetRestrictChange = (e) => setTargetRestrict(e.target.value);
  const onTargetTypeChange = (e) => setTargetType(e.target.value);
  const onMinDamageChange = (e) => setMinDamage(e.target.value);
  const onMaxDamageChange = (e) => setMaxDamage(e.target.value);
  const onAccuracyChange = (e) => setAccuracy(e.target.value);
  const onHPChange = (e) => setHP(e.target.value);

  const onTabSelect = (newTab) => setTab(newTab);
  const hasStats = () => type !== 'Bard';

  return (
    <>
      <Nav variant="tabs" defaultActiveKey="#properties" onSelect={onTabSelect}>
        <Nav.Item>
          <Nav.Link href="#properties">Properties</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#stats" disabled={!hasStats()}>
            Stats
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {tab === '#properties' && (
        <Row>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={onNameChange}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Shout</Form.Label>
              <Form.Control
                type="text"
                placeholder="Shout"
                value={shout}
                onChange={onShoutChange}
              />
            </Form.Group>
            <Form.Group controlId="gfxId">
              <Form.Label>Icon ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Icon ID"
                value={iconId}
                onChange={onIconIdChange}
              />
            </Form.Group>
            <Form.Group controlId="gfxId">
              <Form.Label>Graphic ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Graphic ID"
                value={gfxId}
                onChange={onGfxIdChange}
              />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" value={type} onChange={onTypeChange}>
                <option>Heal</option>
                <option>Damage</option>
                <option>Bard</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tpCost">
              <Form.Label>TP Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="TP Cost"
                value={tpCost}
                onChange={onTpCostChange}
              />
            </Form.Group>
            <Form.Group controlId="tpCost">
              <Form.Label>SP Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="SP Cost"
                value={spCost}
                onChange={onSpCostChange}
              />
            </Form.Group>
            <Form.Group controlId="castTime">
              <Form.Label>Cast Time</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cast Time"
                value={castTime}
                onChange={onCastTimeChange}
              />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Target Restrict</Form.Label>
              <Form.Control
                as="select"
                value={targetRestrict}
                onChange={onTargetRestrictChange}
              >
                <option value="NPCOnly">NPC Only</option>
                <option>Friendly</option>
                <option>Opponent</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Target Type</Form.Label>
              <Form.Control
                as="select"
                value={targetType}
                onChange={onTargetTypeChange}
              >
                <option>Normal</option>
                <option value="SELF">Self</option>
                <option>Unknown1</option>
                <option>Group</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      )}
      {tab === '#stats' && hasStats() && (
        <>
          {type === 'Heal' && (
            <Row>
              <Col>
                <Form.Group controlId="hp">
                  <Form.Label>HP</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="HP"
                    value={hp}
                    onChange={onHPChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
          {type === 'Damage' && (
            <>
              <Row>
                <Col>
                  <Form.Group controlId="minDamage">
                    <Form.Label>Minimum Damage</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Minimum Damage"
                      value={minDamage}
                      onChange={onMinDamageChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="maxDamage">
                    <Form.Label>Maximum Damage</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Maximum Damage"
                      value={maxDamage}
                      onChange={onMaxDamageChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="accuracy">
                    <Form.Label>Accuracy</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Accuracy"
                      value={accuracy}
                      onChange={onAccuracyChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="element">
                    <Form.Label>Element</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Element"
                      value={element}
                      onChange={onElementChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="elementPower">
                    <Form.Label>Element Power</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Element Power"
                      value={elementPower}
                      onChange={onElementPowerChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
}

SpellRecord.propTypes = {
  record: PropTypes.object.isRequired,
};

export default SpellRecord;
