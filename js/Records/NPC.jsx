import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';

function NPCRecord(props) {
  const { record } = props;

  const [tab, setTab] = useState('#properties');
  const [name, setName] = useState(record.name);
  const [gfxId, setGfxId] = useState(record.graphic_id);
  const [boss, setBoss] = useState(record.boss);
  const [child, setChild] = useState(record.child);
  const [type, setType] = useState(record.npc_type);
  const [vendorId, setVendorId] = useState(record.vendor_id);
  const [hp, setHP] = useState(record.hp);
  const [minDamage, setMinDamage] = useState(record.min_damage);
  const [maxDamage, setMaxDamage] = useState(record.max_damage);
  const [accuracy, setAccuracy] = useState(record.accuracy);
  const [evade, setEvade] = useState(record.evade);
  const [armor, setArmor] = useState(record.armor);
  const [element, setElement] = useState(record.element);
  const [elementPower, setElementPower] = useState(record.element_power);
  const [experience, setExperience] = useState(record.experience);

  const onNameChange = (e) => setName(e.target.value);
  const onGfxIdChange = (e) => setGfxId(e.target.value);
  const onBossChange = (e) => setBoss(e.target.checked);
  const onChildChange = (e) => setChild(e.target.checked);
  const onTypeChange = (e) => setType(e.target.value);
  const onVendorIdChange = (e) => setVendorId(e.target.value);
  const onHPChange = (e) => setHP(e.target.value);
  const onMinDamageChange = (e) => setMinDamage(e.target.value);
  const onMaxDamageChange = (e) => setMaxDamage(e.target.value);
  const onAccuracyChange = (e) => setAccuracy(e.target.value);
  const onArmorChange = (e) => setArmor(e.target.value);
  const onEvadeChange = (e) => setEvade(e.target.value);
  const onElementChange = (e) => setElement(e.target.value);
  const onElementPowerChange = (e) => setElementPower(e.target.value);
  const onExperienceChange = (e) => setExperience(e.target.value);

  const onTabSelect = (newTab) => setTab(newTab);
  const isMonster = () => ['Passive', 'Aggressive'].includes(type);
  const hasVendorId = () => ['Inn', 'Shop', 'Skills', 'Quest'].includes(type);

  return (
    <>
      <Nav variant="tabs" defaultActiveKey="#properties" onSelect={onTabSelect}>
        <Nav.Item>
          <Nav.Link href="#properties">Properties</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#stats">Stats</Nav.Link>
        </Nav.Item>
      </Nav>

      {tab === '#properties' && (
        <Row>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="NPC name"
                value={name}
                onChange={onNameChange}
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
                <option>NPC</option>
                <option>Passive</option>
                <option>Aggressive</option>
                <option>Unknown1</option>
                <option>Unknown2</option>
                <option>Unknown3</option>
                <option>Shop</option>
                <option>Inn</option>
                <option>Unknown4</option>
                <option>Bank</option>
                <option>Barber</option>
                <option>Guild</option>
                <option>Priest</option>
                <option>Law</option>
                <option>Skills</option>
                <option>Quest</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {isMonster() && (
              <>
                <Form.Group controlId="experience">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Experience"
                    value={experience}
                    onChange={onExperienceChange}
                  />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Boss"
                  id="boss"
                  checked={boss}
                  onChange={onBossChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Child"
                  id="child"
                  checked={child}
                  onChange={onChildChange}
                />
              </>
            )}
            {hasVendorId() && (
              <Form.Group controlId="vendorId">
                <Form.Label>Vendor ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Vendor ID"
                  value={vendorId}
                  onChange={onVendorIdChange}
                />
              </Form.Group>
            )}
          </Col>
        </Row>
      )}
      {tab === '#stats' && (
        <>
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
            <Col>
              <Form.Group controlId="evade">
                <Form.Label>Evade</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Evade"
                  value={evade}
                  onChange={onEvadeChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="armor">
                <Form.Label>Armor</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Armor"
                  value={armor}
                  onChange={onArmorChange}
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
  );
}

NPCRecord.propTypes = {
  record: PropTypes.object.isRequired,
};

export default NPCRecord;
