import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import {object, string, ref, number} from 'yup';
import { Formik, Form } from 'formik';
import { Button, FormGroup, Input, Label, Col } from 'reactstrap';
import { TextField } from './TextField';
const AuthLoginForm=(props)=> {
   const validate= object({
     email: string()
     .email("Email is invalid")
     .required('Email is required'),
     password: string()
     .min(6, 'Password must be atleast 6 characters')
     .required('Password is required'),
   })
 
const changeAuthState = authState => event => {
    event.preventDefault();

    props.onChangeAuthState(authState);
  };
  return (
    <Formik initialValues={{
      email:"",
      password:"",
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
         <TextField label="Email" type="email" name="email" placeholder="Enter Your Email"/>
       </FormGroup>
       <FormGroup>
       <TextField label="Password" type="password" name="password" placeholder="Enter Your Password"/>
       </FormGroup>
       <FormGroup >
         <Label><a href='/forgetPassword'>Forget Password</a></Label>
       </FormGroup>
       <hr />
       <Button
         size="lg"
         className="bg-gradient-theme-left border-0"
         block
      >
         Login
       </Button>
       <div className="text-center pt-1">
         <h6>or</h6>
         <h6>
             <a href="/signup" >
               Sign Up
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

AuthLoginForm.propTypes = {
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

AuthLoginForm.defaultProps = {
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

export default AuthLoginForm;
