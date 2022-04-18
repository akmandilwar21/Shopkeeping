import AuthLoginForm from 'components/AuthLoginForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';

class AuthPage extends React.Component {

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  handleForget = () => {
    this.props.history.push('/forgetPassword');
  };
  handleSignup =() => {
    this.props.history.push('/signup');
  }
  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <AuthLoginForm
              onForgetPassword={this.handleForget}
              authState={this.props.authState}
              onLogoClick={this.handleLogoClick}
              onClickSignup={this.handleSignup}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
