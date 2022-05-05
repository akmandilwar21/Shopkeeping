import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormGroup, Input, Label, Col } from 'reactstrap';
import { Router } from 'react-router';
import { Link } from 'react-router-dom';
// import { TextField } from './TextField';

class AuthLoginForm extends React.Component {
  state = {
    data: { email: '', password: '' },
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
  handleLogin = async () => {
    let { data } = this.state;
    await axios
      .post('http://3.111.154.180/api/login', {
        email: data.email,
        password: data.password,
      })
      .then(responseJson => {
        const returnObj = responseJson;
        console.log(returnObj);
        sessionStorage.setItem('token', returnObj.data.success.token);
        this.props.props.history.push('/dashboard');
      })
      .catch(error => alert(error.message));
  };
  render() {
    let { data, errors } = this.state;
    return (
      <div>
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
              <Label htmlFor="PropertyName">
                Email<Label style={{ color: 'red' }}>*</Label>
              </Label>
              <Input
                className={`form-control shadow-none `}
                value={data.email}
                name="email"
                type="email"
                onChange={event => this.handleChange(event)}
              />
              {errors.email ? (
                <div className="alert alert-danger">{errors.email}</div>
              ) : (
                ''
              )}
            </div>
            <div style={{ marginTop: '10px' }}>
              <Label htmlFor="Address">
                Password<Label style={{ color: 'red' }}>*</Label>
              </Label>
              <Input
                className={`form-control shadow-none `}
                value={data.address}
                name="password"
                type="password"
                onChange={event => this.handleChange(event)}
              />
              {errors.password ? (
                <div className="alert alert-danger">{errors.password}</div>
              ) : (
                ''
              )}
            </div>
          </FormGroup>
          <FormGroup>
            <Label>
              <a href="/forgetPassword">Forget Password</a>
            </Label>
          </FormGroup>
          <hr />
          <Button
            size="lg"
            className="bg-gradient-theme-left border-0"
            block
            onClick={this.handleLogin}
          >
            {' '}
            Login
          </Button>
          <div className="text-center pt-1">
            <h6>or</h6>
            <h6>
              <a href="/signup">Sign Up</a>
            </h6>
          </div>
        </div>
      </div>
    );
  }
}
export default AuthLoginForm;
// const AuthLoginForm = props => {
//   const [data, setData] = useState({ email: '', password: '' });

//   const handleLogin = () => {
//     console.log(data);
//   };
//   const handleChange = event => {
//     console.log(event.target.value);
//   };
//   const changeAuthState = authState => event => {
//     event.preventDefault();

//     props.onChangeAuthState(authState);
//   };
//   return (
//         <Form>
//           <div className="text-center pb-4">
//             <img
//               src={logo200Image}
//               className="rounded"
//               style={{ width: 60, height: 60, cursor: 'pointer' }}
//               alt="logo"
//               onClick={props.onLogoClick}
//             />
//           </div>

//           <FormGroup>
//           <div style={{ marginTop: '10px' }}>
//                   <Label htmlFor="PropertyName">
//                     Email<Label style={{ color: 'red' }}>*</Label>
//                   </Label>
//                   <Input
//                     className={`form-control shadow-none `}
//                     value={data.email}
//                     name="email"
//                     type="email"
//                     onChange={event => handleChange(event)}
//                   />
//                   {errors.name? <label className="text-danger">{errors.name}</label>:""}
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <Label htmlFor="Address">
//                     Address<Label style={{ color: 'red' }}>*</Label>
//                   </Label>
//                   <Input
//                     className={`form-control shadow-none `}
//                     disabled={modal_serviceRequest ? true : false}
//                     value={data.address}
//                     name="address"
//                     onChange={event => handleEditChange(event)}
//                   />
//                   {errors.address? <label className="text-danger">{errors.address}</label>:""}
//                 </div>

//           </FormGroup>
//           <FormGroup>
//             <Label>
//               <a href="/forgetPassword">Forget Password</a>
//             </Label>
//           </FormGroup>
//           <hr />
//           <Button
//             size="lg"
//             className="bg-gradient-theme-left border-0"
//             block
//             onClick={handleLogin}
//           >
//             {' '}
//             Login
//           </Button>
//           <div className="text-center pt-1">
//             <h6>or</h6>
//             <h6>
//               <a href="/signup">Sign Up</a>
//             </h6>
//           </div>
//         </Form>

//   );
// };

// export const STATE_LOGIN = 'LOGIN';
// export const STATE_SIGNUP = 'SIGNUP';

// AuthLoginForm.propTypes = {
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

// AuthLoginForm.defaultProps = {
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

// export default AuthLoginForm;
