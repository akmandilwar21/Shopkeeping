import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Col } from 'reactstrap';
import InputField from './inputField';
const AuthLoginForm = (props)=>{
const element=[{
  "name": "email",
  "label": "Email",
  "type": "email",
  "placeHolder": "Email Address",
  "class": "required noSpace email"
},
{
  "name": "password",
  "label": "Password",
  "type": "text",
  "placeHolder": "Enter your password",
  "class": "required"
},]
const user= useState({email:"",password:""});

const handleSubmit=(values)=>{
         console.log(values);
  }
const handleChange = (data,name) => {
    if(name==="email") {
      user[1](prevUser => ({
        email:data,
        password:prevUser.password
      }))
    }
    else if(name=== "password") {
    
        user[1](prevUser => ({
        email:prevUser.email,
          password:data
        }))
      }
  
}
    return(
        <Form onSubmit={handleSubmit}>
       
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={props.onLogoClick}
            />
          </div>
          {element.map(n=>(
            <InputField label={n.label} placeHolder={n.placeHolder} type={n.type} name={n.name} onChange={handleChange}/>
          ))}
{/*      
        <FormGroup>
          <Label for="email">Email<Label style={{color:"red"}}>*</Label></Label>
          <Input type="email" name="email" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password<Label style={{color:"red"}}>*</Label></Label>
          <Input type="password" name="password" />
        </FormGroup>
        <FormGroup check>
           <Label style={{color:"blue", cursor:"pointer"}} onClick={props.onForgetPassword}>Forget Password</Label>
        </FormGroup> */}
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={handleSubmit}>
           Login
        </Button>
        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
              <a href="" onClick={props.onClickSignup}>
                Signup
              </a>
          </h6>
        </div>
      </Form>
    
    )

}
export default AuthLoginForm;