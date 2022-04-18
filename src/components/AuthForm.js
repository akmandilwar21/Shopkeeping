import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import {object, string, ref, number} from 'yup';
import { Formik, Form } from 'formik';
import { Button, FormGroup, Input, Label, Col } from 'reactstrap';
import { TextField } from './TextField';
const AuthForm=(props)=> {
   const validate= object({
    
     fname: string()
      .max(15, 'Must be 15 characters or less')
      .min(3,"Must be atleast 3 character")
      .required('Required'),
     lname: string()
     .max(20, 'Must be 20 characters or less')
     .required('Required'),
     DOB:string()
     .required("Date of Birth is Required"),
     contact: number()
     .typeError("That doesn't look like a phone number")
     .positive("A phone number can't start with a minus")
     .integer("A phone number can't include a decimal point")
     .min(8)
     .required('A phone number is required'),
     address:string()
     .required("Address is required"),
     city: string()
     .required("City is required"),
     landmark:string()
     .required("Landmark is required"),
     state: string()
     .required("State is required"),
     pincode:string()
     .min(6,"Pincode must be of 6 digit")
     .required("Pincode is required"),
     email: string()
     .email("Email is invalid")
     .required('Email is required'),
     password: string()
     .min(6, 'Password must be atleast 6 characters')
     .required('Password is required'),
     confirmPassword: string()
     .oneOf([ref('password'),null], 'Password must match')
     .required('Confirm password is required'),
     
   })
 
const changeAuthState = authState => event => {
    event.preventDefault();

    props.onChangeAuthState(authState);
  };
  return (
    <Formik initialValues={{
      fname:"",
      lname:"",
      DOB:"",
      contact:"",
      address:"",
      city:"",
      landmark:"",
      state:"",
      pincode:"",
      email:"",
      password:"",
      confirmPassword:""
    }} 
    validationSchema={validate} 
    onSubmit={values => {
      console.log(values)
    }}>
      {formik => (
         <Form>
         <div className="text-center pb-4">
           <img
             src={logo200Image}
             className="rounded"
             style={{ width: 60, height: 60, cursor: 'pointer' }}
             alt="logo"
             onClick={props.onLogoClick}
           />
         </div>
         <FormGroup>
           <TextField label="First Name" type="text" name="fname" placeholder="Enter First Name"/>
         </FormGroup>
         <FormGroup>
           <TextField label="Last Name" type="text" name="lname" placeholder="Enter Last Name"/>
         </FormGroup>
         <FormGroup>
           <TextField label="Date of Birth" type="date" name="DOB"/>
         </FormGroup>
         <FormGroup>
           <TextField label="Contact" type="tel" name="contact" placeholder="Enter Your Mobile Number"/>
         </FormGroup>
         <FormGroup>
           <TextField label="Address" type="text" name="address" placeholder="Enter Your Address"/>
         </FormGroup>
         <FormGroup>
           <TextField label="City" type="text" name="city" placeholder="Enter Your City"/>
         </FormGroup>
         <FormGroup>
           <TextField label="Landmark" type="text" name="landmark" placeholder="Enter Your Landmark"/>
         </FormGroup>
         <FormGroup>
           <TextField label="State" type="text" name="state" placeholder="Enter Your State"/>
         </FormGroup>
         <FormGroup>
         <TextField label="Pincode" type="text" name="pincode" placeholder="Enter Your Pincode"/>
         </FormGroup>
       <FormGroup>
         <TextField label="Email" type="email" name="email" placeholder="Enter Your Email"/>
       </FormGroup>
       <FormGroup>
       <TextField label="Password" type="password" name="password" placeholder="Enter Your Password"/>
       </FormGroup>
         <FormGroup>
         <TextField label="Confirm Password" type="password" name="confirmPassword" />
         </FormGroup>
       <FormGroup tag="fieldset" row>
       <Label for="checkbox2" sm={2}>
         I'm a
       </Label>
       <Col sm={10}>
         <FormGroup check style={{marginTop:"8px"}}>
           <span check>
             <Input type="radio" name="radio2" /> House Owner
           </span>
           <span check style={{marginLeft:"35px"}}>
             <Input type="radio" name="radio2"  /> Service Provider
           </span>
         </FormGroup>
         
       </Col>
     </FormGroup>
       <FormGroup check>
         <Label check>
           <Input type="checkbox" />{' '}
           { 'Agree the terms and policy' }
         </Label>
       </FormGroup>
       <hr />
       <Button
         size="lg"
         className="bg-gradient-theme-left border-0"
         block
      >
         SignUp
       </Button>
       <div className="text-center pt-1">
         <h6>or</h6>
         <h6>
             <a href="#login" onClick={changeAuthState(STATE_LOGIN)}>
               Login
             </a>
         </h6>
       </div>
     </Form>
      )}
    </Formik>
      
    );
  }


export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default AuthForm;
