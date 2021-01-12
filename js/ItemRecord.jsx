/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';

const dollItemType = ['Weapon', 'Shield', 'Armor', 'Hat', 'Boots'];
const equipableType = [
  'Weapon',
  'Shield',
  'Armor',
  'Hat',
  'Boots',
  'Accessory',
  'Belt',
  'Gloves',
  'Necklace',
  'Ring',
  'Armlet',
  'Bracer',
];

function ItemRecord(props) {
  const { record, classFile } = props;
  const [tab, setTab] = useState('#properties');
  const [name, setName] = useState(record.name);
  const [gfxId, setGfxId] = useState(record.graphic_id);
  const [type, setType] = useState(record.item_type);
  const [subType, setSubType] = useState(record.sub_type);
  const [special, setSpecial] = useState(record.special);
  const [param1, setParam1] = useState(record.item_specific_param_1);
  const [param2, setParam2] = useState(record.item_specific_param_2);
  const [param3, setParam3] = useState(record.item_specific_param_3);
  const [hp, setHP] = useState(record.hp);
  const [tp, setTP] = useState(record.tp);
  const [minDamage, setMinDamage] = useState(record.min_damage);
  const [maxDamage, setMaxDamage] = useState(record.max_damage);
  const [accuracy, setAccuracy] = useState(record.accuracy);
  const [armor, setArmor] = useState(record.armor);
  const [evade, setEvade] = useState(record.evade);
  const [strength, setStrength] = useState(record.strength);
  const [intelligence, setIntelligence] = useState(record.intelligence);
  const [wisdom, setWisdom] = useState(record.wisdom);
  const [agility, setAgility] = useState(record.agility);
  const [charisma, setCharisma] = useState(record.charisma);
  const [constitution, setConstitution] = useState(record.constitution);
  const [levelReq, setLevelReq] = useState(record.level_req);
  const [classReq, setClassReq] = useState(record.class_req);
  const [strengthReq, setStrengthReq] = useState(record.strength_req);
  const [intelligenceReq, setIntelligenceReq] = useState(
    record.intelligence_req
  );
  const [wisdomReq, setWisdomReq] = useState(record.wisdom_req);
  const [agilityReq, setAgilityReq] = useState(record.agility_req);
  const [charismaReq, setCharismaReq] = useState(record.charisma_req);
  const [constitutionReq, setConstitutionReq] = useState(
    record.constitution_req
  );
  const [element, setElement] = useState(record.element);
  const [elementPower, setElementPower] = useState(record.element_power);
  const [weight, setWeight] = useState(record.weight);
  const [size, setSize] = useState(record.size);

  const onNameChange = (e) => setName(e.target.value);
  const onGfxIdChange = (e) => setGfxId(e.target.value);
  const onTypeChange = (e) => setType(e.target.value);
  const onSubTypeChange = (e) => setSubType(e.target.value);
  const onSpecialChange = (e) => setSpecial(e.target.value);
  const onParam1Change = (e) => setParam1(e.target.value);
  const onParam2Change = (e) => setParam2(e.target.value);
  const onParam3Change = (e) => setParam3(e.target.value);
  const onHPChange = (e) => setHP(e.target.value);
  const onTPChange = (e) => setTP(e.target.value);
  const onMinDamageChange = (e) => setMinDamage(e.target.value);
  const onMaxDamageChange = (e) => setMaxDamage(e.target.value);
  const onAccuracyChange = (e) => setAccuracy(e.target.value);
  const onArmorChange = (e) => setArmor(e.target.value);
  const onEvadeChange = (e) => setEvade(e.target.value);
  const onStrengthChange = (e) => setStrength(e.target.value);
  const onIntelligenceChange = (e) => setIntelligence(e.target.value);
  const onWisdomChange = (e) => setWisdom(e.target.value);
  const onAgilityChange = (e) => setAgility(e.target.value);
  const onCharismaChange = (e) => setCharisma(e.target.value);
  const onConstitutionChange = (e) => setConstitution(e.target.value);
  const onLevelReqChange = (e) => setLevelReq(e.target.value);
  const onClassReqChange = (e) => setClassReq(e.target.value);
  const onStrengthReqChange = (e) => setStrengthReq(e.target.value);
  const onIntelligenceReqChange = (e) => setIntelligenceReq(e.target.value);
  const onWisdomReqChange = (e) => setWisdomReq(e.target.value);
  const onAgilityReqChange = (e) => setAgilityReq(e.target.value);
  const onCharismaReqChange = (e) => setCharismaReq(e.target.value);
  const onConstitutionReqChange = (e) => setConstitutionReq(e.target.value);
  const onElementChange = (e) => setElement(e.target.value);
  const onElementPowerChange = (e) => setElementPower(e.target.value);
  const onWeightChange = (e) => setWeight(e.target.value);
  const onSizeChange = (e) => setSize(e.target.value);

  const onTabSelect = (newTab) => setTab(newTab);
  const hasStats = () => equipableType.includes(type) || type === 'Heal';
  const getClassOptions = () => {
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    const options = [<option key="0" value="0" />];
    return options.concat(
      classFile.records.map((r) => (
        <option key={r.id} value={r.id}>
          {r.name}
        </option>
      ))
    );
  };

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
        <Nav.Item>
          <Nav.Link
            href="#requirements"
            disabled={!equipableType.includes(type)}
          >
            Requirements
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
                placeholder="Item name"
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
                <option value="Static">Static</option>
                <option value="Unknown1">Unknown1</option>
                <option value="Money">Money</option>
                <option value="Heal">Heal</option>
                <option value="Teleport">Teleport</option>
                <option value="Spell">Spell</option>
                <option value="EXPReward">EXP Reward</option>
                <option value="StatReward">Stat Reward</option>
                <option value="SkillReward">Skill Reward</option>
                <option value="Key">Key</option>
                <option value="Weapon">Weapon</option>
                <option value="Shield">Shield</option>
                <option value="Armor">Armor</option>
                <option value="Hat">Hat</option>
                <option value="Boots">Boots</option>
                <option value="Gloves">Gloves</option>
                <option value="Accessory">Accessory</option>
                <option value="Belt">Belt</option>
                <option value="Necklace">Necklace</option>
                <option value="Ring">Ring</option>
                <option value="Armlet">Armlet</option>
                <option value="Bracer">Bracer</option>
                <option value="Beer">Beer</option>
                <option value="EffectPotion">Effect Potion</option>
                <option value="HairDye">Hair Dye</option>
                <option value="CureCurse">Cure Curse</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="subType">
              <Form.Label>Sub-Type</Form.Label>
              <Form.Control
                as="select"
                value={subType}
                onChange={onSubTypeChange}
              >
                <option>None</option>
                <option>Ranged</option>
                <option>Arrows</option>
                <option>Wings</option>
                <option value="TwoHanded">Two Handed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="special">
              <Form.Label>Special</Form.Label>
              <Form.Control
                as="select"
                value={special}
                onChange={onSpecialChange}
              >
                <option>Normal</option>
                <option>Uncommon</option>
                <option>Rare</option>
                <option>Unique</option>
                <option>Lore</option>
                <option>Cursed</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={onWeightChange}
              />
            </Form.Group>
            <Form.Group controlId="special">
              <Form.Label>Size</Form.Label>
              <Form.Control as="select" value={size} onChange={onSizeChange}>
                <option value="Size1x1">1x1</option>
                <option value="Size1x2">1x2</option>
                <option value="Size1x3">1x3</option>
                <option value="Size1x4">1x4</option>
                <option value="Size2x1">2x1</option>
                <option value="Size2x2">2x2</option>
                <option value="Size2x3">2x3</option>
                <option value="Size2x4">2x4</option>
              </Form.Control>
            </Form.Group>
            {type === 'Teleport' && (
              <>
                <Form.Group controlId="scrollMap">
                  <Form.Label>Scroll Map</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Scroll map"
                    value={param1}
                    onChange={onParam1Change}
                  />
                </Form.Group>
                <Form.Group controlId="scrollMap">
                  <Form.Label>Scroll X</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Scroll x"
                    value={param2}
                    onChange={onParam2Change}
                  />
                </Form.Group>
                <Form.Group controlId="scrollMap">
                  <Form.Label>Scroll Y</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Scroll y"
                    value={param3}
                    onChange={onParam3Change}
                  />
                </Form.Group>
              </>
            )}
            {dollItemType.includes(type) && (
              <Form.Group controlId="Doll Graphic ID">
                <Form.Label>Doll Graphic ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Doll Graphic ID"
                  value={param1}
                  onChange={onParam1Change}
                />
              </Form.Group>
            )}
            {type === 'Key' && (
              <Form.Group controlId="keyID">
                <Form.Label>Key ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Key ID"
                  value={param1}
                  onChange={onParam1Change}
                />
              </Form.Group>
            )}
            {type === 'EXPReward' && (
              <Form.Group controlId="expReward">
                <Form.Label>EXP Reward</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="EXP Reward"
                  value={param1}
                  onChange={onParam1Change}
                />
              </Form.Group>
            )}
            {type === 'HairDye' && (
              <Form.Group controlId="hairColor">
                <Form.Label>Hair Color</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Hair Color"
                  value={param1}
                  onChange={onParam1Change}
                />
              </Form.Group>
            )}
            {type === 'EffectPotion' && (
              <Form.Group controlId="effect">
                <Form.Label>Effect</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Effect"
                  value={param1}
                  onChange={onParam1Change}
                />
              </Form.Group>
            )}
            {type === 'Armor' && (
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  value={param2}
                  onChange={onParam2Change}
                >
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </Form.Control>
              </Form.Group>
            )}
          </Col>
        </Row>
      )}
      {tab === '#stats' && (
        <>
          {hasStats(type) && (
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
              <Col>
                <Form.Group controlId="tp">
                  <Form.Label>TP</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="TP"
                    value={tp}
                    onChange={onTPChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
          {type === 'Weapon' && (
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
          )}
          {equipableType.includes(type) && (
            <>
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
                  <Form.Group controlId="strength">
                    <Form.Label>Strength</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Stength"
                      value={strength}
                      onChange={onStrengthChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="intelligence">
                    <Form.Label>Intelligence</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Intelligence"
                      value={intelligence}
                      onChange={onIntelligenceChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="wisdom">
                    <Form.Label>Wisdom</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Wisdom"
                      value={wisdom}
                      onChange={onWisdomChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="agility">
                    <Form.Label>Agility</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Agility"
                      value={agility}
                      onChange={onAgilityChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="charisma">
                    <Form.Label>Charisma</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Charisma"
                      value={charisma}
                      onChange={onCharismaChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="constitution">
                    <Form.Label>Constitution</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Constitution"
                      value={constitution}
                      onChange={onConstitutionChange}
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
      {tab === '#requirements' && (
        <>
          <Row>
            <Col>
              <Form.Group controlId="levelReq">
                <Form.Label>Level</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Level"
                  value={levelReq}
                  onChange={onLevelReqChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="classReq">
                <Form.Label>Class</Form.Label>
                {classFile && (
                  <Form.Control
                    as="select"
                    value={classReq}
                    onChange={onClassReqChange}
                  >
                    {getClassOptions()}
                  </Form.Control>
                )}
                {!classFile && (
                  <Form.Control
                    type="number"
                    placeholder="Class"
                    value={classReq}
                    onChange={onClassReqChange}
                  />
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="strengthReq">
                <Form.Label>Strength</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Stength"
                  value={strengthReq}
                  onChange={onStrengthReqChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="intelligenceReq">
                <Form.Label>Intelligence</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Intelligence"
                  value={intelligenceReq}
                  onChange={onIntelligenceReqChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="wisdomReq">
                <Form.Label>Wisdom</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Wisdom"
                  value={wisdomReq}
                  onChange={onWisdomReqChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="agilityReq">
                <Form.Label>Agility</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Agility"
                  value={agilityReq}
                  onChange={onAgilityReqChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="charismaReq">
                <Form.Label>Charisma</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Charisma"
                  value={charismaReq}
                  onChange={onCharismaReqChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="constitutionReq">
                <Form.Label>Constitution</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Constitution"
                  value={constitutionReq}
                  onChange={onConstitutionReqChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

ItemRecord.propTypes = {
  record: PropTypes.object.isRequired,
  classFile: PropTypes.object,
};

ItemRecord.defaultProps = {
  classFile: undefined,
};

export default ItemRecord;
