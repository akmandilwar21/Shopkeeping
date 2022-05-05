import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { object, string, ref, number } from 'yup';
import { Formik, Form } from 'formik';
import { Button, FormGroup, Input, Label, Col } from 'reactstrap';
import { TextField } from './TextField';
import axios from 'axios';

class AuthForm extends React.Component {
  state = {
    data: {
      fname: '',
      lname: '',
      dob: '',
      contact: '',
      address: '',
      city: '',
      landmark: '',
      state: '',
      pincode: '',
      email: '',
      password: '',
      confirmPassword: '',
      user: '',
    },
    errors: {},
  };
  handleChange = e => {
    let errString = this.validateInput(e);
    let errors = { ...this.state.errors };
    errors[e.currentTarget.name] = errString;
    console.log(errors);
    const { currentTarget: input } = e;
    let data = this.state;
    data[input.name] = input.value;
    this.setState({ data });
    this.setState({ errors });
  };
  validateInput = e => {
    switch (e.currentTarget.name) {
      case 'fname':
        if (!e.currentTarget.value.trim()) return 'First Name is required';
        break;
      case 'lname':
        if (!e.currentTarget.value.trim()) return 'Last Name is required';
        break;
      case 'dob':
        if (!e.currentTarget.value.trim()) return 'Date Of Birth is required';
        break;
      case 'contact':
        if (!e.currentTarget.value.trim()) return 'Contact is required';
        if (
          e.currentTarget.value.trim().length !== 10 &&
          !e.currentTarget.value.trim().length
        )
          return 'Contact Number Must be 10 digits';
        break;
      case 'address':
        if (!e.currentTarget.value.trim()) return 'Address is required';
        break;
      case 'city':
        if (!e.currentTarget.value.trim()) return 'City is required';
        break;
      case 'landmark':
        if (!e.currentTarget.value.trim()) return 'Landmark is required';
        break;
      case 'state':
        if (!e.currentTarget.value.trim()) return 'State is required';
        break;
      case 'pincode':
        if (!e.currentTarget.value.trim()) return 'Pincode is required';
        break;
      case 'email':
        if (!e.currentTarget.value.trim()) return 'Email is required';
        break;
      case 'confirmPassword':
        if (e.currentTarget.value !== this.state.data.password)
          return 'Confirm password must be matched';
        break;
      case 'password':
        if (!e.currentTarget.value.trim()) return 'Password is required';
        if (
          e.currentTarget.value.trim().length === 3 ||
          e.currentTarget.value.trim().length < 3
        )
          return 'Password should have atleast 3 characters';
        break;
    }
    return '';
  };
  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };
  handleUser = num => {
    let { data } = this.state;
    data.user = num;
    this.setState({ data });
  };
  handleRegister = async () => {
    let { data } = this.state;
    await axios
      .post('http://3.111.154.180/api/register', {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
        type: data.user,
        contact: data.contact,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        landmark: data.landmark,
        date_of_birth: data.dob,
      })
      .then(alert('Registered Successfully'))
      .then(res => console.log(res))
      .then(responseJson => {
        const returnObj = responseJson;
        this.props.props.history.push('/login');
      })
      .catch(error => alert(error.message));
    data.fname = '';
    data.lname = '';
    data.dob = '';
    data.contact = '';
    data.address = '';
    data.city = '';
    data.landmark = '';
    data.state = '';
    data.pincode = '';
    data.email = '';
    data.password = '';
    data.confirmPassword = '';
    data.user = '';
    this.setState({ data });
  };
  render() {
    let { data, errors } = this.state;
    console.log(errors);
    return (
      <div>
        <div className="text-center pb-4">
          <img
            src={logo200Image}
            className="rounded"
            style={{ width: 60, height: 60, cursor: 'pointer' }}
            alt="logo"
            onClick={this.props.onLogoClick}
          />
        </div>
        <FormGroup>
          <div style={{ marginTop: '10px' }}>
            <Label htmlFor="FirstName">
              First Name<Label style={{ color: 'red' }}>*</Label>
            </Label>
            <Input
              className={`form-control shadow-none `}
              value={data.fname}
              name="fname"
              type="text"
              placeholder="Enter First Name"
              onChange={event => this.handleChange(event)}
            />
          </div>
          {errors.fname ? (
            <div className="alert alert-danger">{errors.fname}</div>
          ) : (
            ''
          )}
          <div style={{ marginTop: '10px' }}>
            <Label htmlFor="LastName">
              Last Name<Label style={{ color: 'red' }}>*</Label>
            </Label>
            <Input
              className={`form-control shadow-none `}
              value={data.lname}
              name="lname"
              type="text"
              placeholder="Enter Last Name"
              onChange={event => this.handleChange(event)}
            />
          </div>

          {errors.lname ? (
            <div className="alert alert-danger">{errors.lname}</div>
          ) : (
            ''
          )}
          <div style={{ marginTop: '10px' }}>
            <Label htmlFor="DateOfBirth">
              Date of Birth<Label style={{ color: 'red' }}>*</Label>
            </Label>
            <Input
              className={`form-control shadow-none `}
              value={data.dob}
              name="dob"
              type="date"
              onChange={event => this.handleChange(event)}
            />
          </div>

          {errors.dob ? (
            <div className="alert alert-danger">{errors.dob}</div>
          ) : (
            ''
          )}
          <div style={{ marginTop: '10px' }}>
            <Label htmlFor="contact">
              Contact<Label style={{ color: 'red' }}>*</Label>
            </Label>
            <Input
              className={`form-control shadow-none `}
              value={data.contact}
              name="contact"
              type="tel"
              placeholder="Enter Your Mobile Number"
              onChange={event => this.handleChange(event)}
            />
          </div>

          {errors.contact ? (
            <div className="alert alert-danger">{errors.contact}</div>
          ) : (
            ''
          )}
          <div style={{ marginTop: '10px' }}>
            <Label htmlFor="Address">
              Address<Label style={{ color: 'red' }}>*</Label>
            </Label>
            <Input
              className={`form-control shadow-none `}
              value={data.address}
              name="address"
              type="text"
              placeholder="Enter Your Address"
              onChange={event => this.handleChange(event)}
            />
          </div>

          {errors.address ? (
            <div className="alert alert-danger">{errors.address}</div>
          ) : (
            ''
          )}
          <div style={{ marginTop: '10px' }}>
            <Label htmlFor="City">
              City<Label style={{ color: 'red' }}>*</Label>
            </Label>
            <Input
              className={`form-control shadow-none `}
              value={data.city}
              name="city"
              type="text"
              placeholder="Enter Your City"
              onChange={event => this.handleChange(event)}
            />
          </div>

          {errors.city ? (
            <div className="alert alert-danger">{errors.city}</div>
          ) : (
            ''
          )}
          <div style={{ marginTop: '10px' }}>
            <Label htmlFor="landmark">
              Landmark<Label style={{ color: 'red' }}>*</Label>
            </Label>
            <Input
              className={`form-control shadow-none `}
              value={data.landmark}
              name="landmark"
              type="text"
              onChange={event => this.handleChange(event)}
              placeholder="Enter Your Landmark"
            />
          </div>

          {errors.landmark ? (
            <div className="alert alert-danger">{errors.landmark}</div>
          ) : (
            ''
          )}
          <div style={{ marginTop: '10px' }}>
            <Label htmlFor="State">
              State`<Label style={{ color: 'red' }}>*</Label>
            </Label>
            <Input
              className={`form-control shadow-none `}
              value={data.state}
              name="state"
              type="text"
              placeholder="Enter Your State"
              onChange={event => this.handleChange(event)}
            />
          </div>

          {errors.state ? (
            <div className="alert alert-danger">{errors.state}</div>
          ) : (
            ''
          )}
          <div style={{ marginTop: '10px' }}>
            <Label htmlFor="pincode">
              Pincode<Label style={{ color: 'red' }}>*</Label>
            </Label>
            <Input
              className={`form-control shadow-none `}
              value={data.pincode}
              name="pincode"
              type="text"
              placeholder="Enter Your Pincode"
              onChange={event => this.handleChange(event)}
            />
          </div>

          {errors.pincode ? (
            <div className="alert alert-danger">{errors.pincode}</div>
          ) : (
            ''
          )}
          <div style={{ marginTop: '10px' }}>
            <Label htmlFor="email">
              Email<Label style={{ color: 'red' }}>*</Label>
            </Label>
            <Input
              className={`form-control shadow-none `}
              value={data.email}
              name="email"
              type="email"
              placeholder="Enter Your Email"
              onChange={event => this.handleChange(event)}
            />
            {errors.email ? (
              <div className="alert alert-danger">{errors.email}</div>
            ) : (
              ''
            )}
          </div>
          <div style={{ marginTop: '10px' }}>
            <Label htmlFor="password">
              Password<Label style={{ color: 'red' }}>*</Label>
            </Label>
            <Input
              className={`form-control shadow-none `}
              value={data.password}
              name="password"
              type="password"
              onChange={event => this.handleChange(event)}
              placeholder="Enter Your Password"
            />
            {errors.password ? (
              <div className="alert alert-danger">{errors.password}</div>
            ) : (
              ''
            )}
          </div>
          <div style={{ marginTop: '10px' }}>
            <Label htmlFor="confirmPassword">
              Confirm Password<Label style={{ color: 'red' }}>*</Label>
            </Label>
            <Input
              className={`form-control shadow-none `}
              value={data.confirmPassword}
              name="confirmPassword"
              type="password"
              onChange={event => this.handleChange(event)}
            />
            {errors.confirmPassword ? (
              <div className="alert alert-danger">{errors.confirmPassword}</div>
            ) : (
              ''
            )}
          </div>
        </FormGroup>
        <FormGroup tag="fieldset" row>
          <Label for="checkbox2" sm={2}>
            I'm a
          </Label>
          <Col sm={8}>
            <FormGroup check style={{ marginTop: '8px' }}>
              <span check>
                <Input
                  type="radio"
                  name="radio2"
                  value="1"
                  onClick={() => this.handleUser(1)}
                />{' '}
                House Owner
              </span>
              <span check style={{ marginLeft: '35px' }}>
                <Input
                  type="radio"
                  name="radio2"
                  value="0"
                  onClick={() => this.handleUser(0)}
                />{' '}
                Service Provider
              </span>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" /> {'Agree the terms and policy'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleRegister}
        >
          SignUp
        </Button>
        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
              Login
            </a>
          </h6>
        </div>
      </div>
    );
  }
}
export default AuthForm;
// const AuthForm=(props)=> {
//    const validate= object({

//      fname: string()
//       .max(15, 'Must be 15 characters or less')
//       .min(3,"Must be atleast 3 character")
//       .required('Required'),
//      lname: string()
//      .max(20, 'Must be 20 characters or less')
//      .required('Required'),
//      DOB:string()
//      .required("Date of Birth is Required"),
//      contact: number()
//      .typeError("That doesn't look like a phone number")
//      .positive("A phone number can't start with a minus")
//      .integer("A phone number can't include a decimal point")
//      .min(8)
//      .required('A phone number is required'),
//      address:string()
//      .required("Address is required"),
//      city: string()
//      .required("City is required"),
//      landmark:string()
//      .required("Landmark is required"),
//      state: string()
//      .required("State is required"),
//      pincode:string()
//      .min(6,"Pincode must be of 6 digit")
//      .required("Pincode is required"),
//      email: string()
//      .email("Email is invalid")
//      .required('Email is required'),
//      password: string()
//      .min(6, 'Password must be atleast 6 characters')
//      .required('Password is required'),
//      confirmPassword: string()
//      .oneOf([ref('password'),null], 'Password must match')
//      .required('Confirm password is required'),

//    })

// const changeAuthState = authState => event => {
//     event.preventDefault();

//     props.onChangeAuthState(authState);
//   };
//   return (
//     <Formik initialValues={{
//       fname:"",
//       lname:"",
//       DOB:"",
//       contact:"",
//       address:"",
//       city:"",
//       landmark:"",
//       state:"",
//       pincode:"",
//       email:"",
//       password:"",
//       confirmPassword:""
//     }}
//     validationSchema={validate}
//     onSubmit={values => {
//       console.log(values)
//     }}>
//       {formik => (
//          <Form>
//          <div className="text-center pb-4">
//            <img
//              src={logo200Image}
//              className="rounded"
//              style={{ width: 60, height: 60, cursor: 'pointer' }}
//              alt="logo"
//              onClick={props.onLogoClick}
//            />
//          </div>
//          <FormGroup>
//            <TextField label="First Name" type="text" name="fname" placeholder="Enter First Name"/>
//          </FormGroup>
//          <FormGroup>
//            <TextField label="Last Name" type="text" name="lname" placeholder="Enter Last Name"/>
//          </FormGroup>
//          <FormGroup>
//            <TextField label="Date of Birth" type="date" name="DOB"/>
//          </FormGroup>
//          <FormGroup>
//            <TextField label="Contact" type="tel" name="contact" placeholder="Enter Your Mobile Number"/>
//          </FormGroup>
//          <FormGroup>
//            <TextField label="Address" type="text" name="address" placeholder="Enter Your Address"/>
//          </FormGroup>
//          <FormGroup>
//            <TextField label="City" type="text" name="city" placeholder="Enter Your City"/>
//          </FormGroup>
//          <FormGroup>
//            <TextField label="Landmark" type="text" name="landmark" placeholder="Enter Your Landmark"/>
//          </FormGroup>
//          <FormGroup>
//            <TextField label="State" type="text" name="state" placeholder="Enter Your State"/>
//          </FormGroup>
//          <FormGroup>
//          <TextField label="Pincode" type="text" name="pincode" placeholder="Enter Your Pincode"/>
//          </FormGroup>
//        <FormGroup>
//          <TextField label="Email" type="email" name="email" placeholder="Enter Your Email"/>
//        </FormGroup>
//        <FormGroup>
//        <TextField label="Password" type="password" name="password" placeholder="Enter Your Password"/>
//        </FormGroup>
//          <FormGroup>
//          <TextField label="Confirm Password" type="password" name="confirmPassword" />
//          </FormGroup>
//        <FormGroup tag="fieldset" row>
//        <Label for="checkbox2" sm={2}>
//          I'm a
//        </Label>
//        <Col sm={10}>
//          <FormGroup check style={{marginTop:"8px"}}>
//            <span check>
//              <Input type="radio" name="radio2" /> House Owner
//            </span>
//            <span check style={{marginLeft:"35px"}}>
//              <Input type="radio" name="radio2"  /> Service Provider
//            </span>
//          </FormGroup>

//        </Col>
//      </FormGroup>
//        <FormGroup check>
//          <Label check>
//            <Input type="checkbox" />{' '}
//            { 'Agree the terms and policy' }
//          </Label>
//        </FormGroup>
//        <hr />
//        <Button
//          size="lg"
//          className="bg-gradient-theme-left border-0"
//          block
//       >
//          SignUp
//        </Button>
//        <div className="text-center pt-1">
//          <h6>or</h6>
//          <h6>
//              <a href="#login" onClick={changeAuthState(STATE_LOGIN)}>
//                Login
//              </a>
//          </h6>
//        </div>
//      </Form>
//       )}
//     </Formik>

//     );
//   }

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

// AuthForm.propTypes = {
//   authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
//   showLogo: PropTypes.bool,
//   usernameLabel: PropTypes.string,
//   usernameInputProps: PropTypes.object,
//   passwordLabel: PropTypes.string,
//   passwordInputProps: PropTypes.object,
//   confirmPasswordLabel: PropTypes.string,
//   confirmPasswordInputProps: PropTypes.object,
//   onLogoClick: PropTypes.func,
// };

// AuthForm.defaultProps = {
//   authState: 'LOGIN',
//   showLogo: true,
//   usernameLabel: 'Email',
//   usernameInputProps: {
//     type: 'email',
//     placeholder: 'your@email.com',
//   },
//   passwordLabel: 'Password',
//   passwordInputProps: {
//     type: 'password',
//     placeholder: 'your password',
//   },
//   confirmPasswordLabel: 'Confirm Password',
//   confirmPasswordInputProps: {
//     type: 'password',
//     placeholder: 'confirm your password',
//   },
//   onLogoClick: () => {},
// };

// export default AuthForm;
