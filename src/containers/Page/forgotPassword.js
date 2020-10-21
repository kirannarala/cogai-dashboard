import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import ForgotPasswordStyleWrapper from './forgotPassword.style';
import Form from '../../components/uielements/form';
import Spin from '../../helpers/spin.style';

import MessageContent from "../Feedback/Message/message.style";
import message from "../../components/feedback/message";



const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      showError: false,
      //valid: false,
      loader: false
    }
    this.onEmailChange = this.onEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.success = this.success.bind(this);
  }
  onEmailChange(e) {
    e.preventDefault();
    // const { value } = e.target;
    this.setState({
      email: e.target.value,
      showError: false
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!emailRegex.test(this.state.email) || this.state.email.length === 0) {
      this.setState({
        showError: true,
      });
      return;
    }
    else {
      this.success();
    }
  }
  success = () => {
    message.success(
      <MessageContent>
        The link to reset your password has been sent to your email.
      </MessageContent>,
      4
    );
  };
  render() {
    return (
      <ForgotPasswordStyleWrapper className="isoForgotPassPage">
        <div className="isoFormContentWrapper">
          <Spin spinning={this.state.loader} size="large">
            <div className="isoFormContent">

              <div className="header_"><h5>Welcome Back !</h5><p>Sign in to continue to CogAi.</p></div>

              <div className="isoForgotPassForm">
                <Form onSubmit={this.handleSubmit}>
                  <div className="isoInputWrapper">
                    <label htmlFor="email">Email</label>
                    <Input type="email" size="large" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onEmailChange} />
                    {this.state.showError && (
                      <span className="errorMessage">{this.state.email === '' ? 'field cannot be empty' : 'valid email address is required'}</span>
                    )}
                  </div>
                  <div className="isoInputWrapper">
                    <Button type="primary" htmlType="submit">
                      <span>Reset</span>
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Spin>
          <div className="isoHelperWrapper">
            <div>Go back to</div>
            <Link to="/signin">
              <b><span>Login</span></b>
            </Link>
          </div>
          <div className="footer">© 2020 CogAi.</div>
        </div>
      </ForgotPasswordStyleWrapper>
    );
  }
}
