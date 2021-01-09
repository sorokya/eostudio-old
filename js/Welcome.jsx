import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class Welcome extends Component {
    render() {
        return (
            <Container>
                <div>Hello, world!</div>
                <Button variant="primary">Click me!</Button>
            </Container>
        );
    }
}

export default Welcome;