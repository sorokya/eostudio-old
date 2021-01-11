import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

function ClassRecord(props) {
  const record = props.record;
  const file = props.file;
  const [name, setName] = useState(record.name);
  const [base, setBase] = useState(record.base);
  const [type, setType] = useState(record.class_type);
  const [strength, setStrength] = useState(record.strength);
  const [intelligence, setIntelligence] = useState(record.intelligence);
  const [wisdom, setWisdom] = useState(record.wisdom);
  const [agility, setAgility] = useState(record.agility);
  const [charisma, setCharisma] = useState(record.charisma);
  const [constitution, setConstitution] = useState(record.constitution);

  const onNameChange = (e) => setName(e.target.value);
  const onBaseChange = (e) => setBase(e.target.value);
  const onTypeChange = (e) => setType(e.target.value);
  const onStrengthChange = (e) => setStrength(e.target.value);
  const onIntelligenceChange = (e) => setIntelligence(e.target.value);
  const onWisdomChange = (e) => setWisdom(e.target.value);
  const onAgilityChange = (e) => setAgility(e.target.value);
  const onCharismaChange = (e) => setCharisma(e.target.value);
  const onConstitutionChange = (e) => setConstitution(e.target.value);

  const getBaseClassOptions = () => {
    const otherClasses = file.records.filter(r => r.id !== record.id);
    const options = [<option key="0" value="0"></option>];
    return options.concat(otherClasses.map(r => <option key={r.id} value={r.id}>{r.name}</option>));
  };

  return (
    <Card className="edit-record">
      <Card.Header>Editing Class Record</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" value={name} onChange={onNameChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="base">
              <Form.Label>Base Class</Form.Label>
              <Form.Control as="select" value={base} onChange={onBaseChange}>
                {getBaseClassOptions()}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="type">
              <Form.Label>Class Type</Form.Label>
              <Form.Control as="select" value={type} onChange={onTypeChange}>
                <option value="0">Melee</option>
                <option value="1">Rogue</option>
                <option value="2">Magic</option>
                <option value="3">Archer</option>
                <option value="4">Peasant</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="strength">
              <Form.Label>Strength</Form.Label>
              <Form.Control type="number" placeholder="Stength" value={strength} onChange={onStrengthChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="intelligence">
              <Form.Label>Intelligence</Form.Label>
              <Form.Control type="number" placeholder="Intelligence" value={intelligence} onChange={onIntelligenceChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="wisdom">
              <Form.Label>Wisdom</Form.Label>
              <Form.Control type="number" placeholder="Wisdom" value={wisdom} onChange={onWisdomChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="agility">
              <Form.Label>Agility</Form.Label>
              <Form.Control type="number" placeholder="Agility" value={agility} onChange={onAgilityChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="charisma">
              <Form.Label>Charisma</Form.Label>
              <Form.Control type="number" placeholder="Charisma" value={charisma} onChange={onCharismaChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="constitution">
              <Form.Label>Constitution</Form.Label>
              <Form.Control type="number" placeholder="Constitution" value={constitution} onChange={onConstitutionChange} />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ClassRecord;
