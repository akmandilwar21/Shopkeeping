import { Button, Form, FormGroup, Input, Label, Card, Col, Row  } from 'reactstrap';
import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';

export default class AuthForgetPasswordPage extends React.Component{
    handleSubmit = event => {
        event.preventDefault();
      };
      handleLogoClick= () =>{
        this.props.history.push('/');
      }
      changeAuthState=()=>{
        this.props.history.push('/login');
      }
    render(){
        return (
            <Row
            style={{
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Col md={6} lg={4}>
              <Card body>
        <Form onSubmit={this.handleSubmit}>
      
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={this.handleLogoClick}
            />
          </div>
        
        <FormGroup>
          <Label for="email">Email/Phone</Label>
          <Input type="email" placeholder="Enter Email/Phone" />
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          Submit
        </Button>
        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
              <a href="#login" onClick={this.changeAuthState}>
                Login
              </a>        
          </h6>
        </div>
      
      </Form>
      </Card>
        </Col>
      </Row>
    );
            }
}