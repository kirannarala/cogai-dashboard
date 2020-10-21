import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import appActions from '../../redux/app/actions';
import Auth0 from '../../helpers/auth0/index';
import Firebase from '../../helpers/firebase';
import FirebaseLogin from '../../components/firebase';
import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';
import Form from '../../components/uielements/form';
import Spin from '../../helpers/spin.style';
import notification from "../../components/notification";
import appManager from "../appManager";
import Modals from "../../components/feedback/modal";
import logo from "../../image/cogAI_white.png";

import ModalStyle, { ModalContent } from "../Feedback/Modal/modal.style";
import WithDirection from "../../settings/withDirection";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const confirm = Modals.confirm;

const { login } = authAction;
const { clearMenu } = appActions;
const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const passwordRegex = RegExp(/(?=.{8,})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])).*/);

const formValid = formErrors => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    if (val.length === 0 || val !== 'blank') {
      valid = false;
    }
  });
  return valid;
}
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      email: null,
      password: null,
      username: null,
      showError: false,
      hidden: true,
      signInError: false,
      redirectToReferrer: false,
      formErrors: {
        email: '',
        username: '',
        password: ''
      },
      redirectToReferrer: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.showDuplicateErrorPopup = this.showDuplicateErrorPopup.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  showDuplicateErrorPopup(title, content) {
    Modals.error({
      title: title,
      content: content,
      okText: "OK",
      cancelText: "Cancel"
    });
  }
  handleLogin = (e) => {
    this.setState({
      loader: true,
    });
    const { history } = this.props;
    const { email, username, password } = this.state;
    const user = {
      email: email,
      username: username,
      password: password
    }
    e.preventDefault();
    if (formValid(this.state.formErrors)) {
      appManager.register(user)
        .then(response => {
          this.setState({
            loader: false,
          })
          notification("success", "Registered successfully");
          history.push('/signin');
        })
        .catch(error => {
          if (error.error.response && error.error.response.data.error.includes('duplicate')) {
            this.showDuplicateErrorPopup('Email is already present', 'Sign in instead');
          }
          else if (error.error.message.includes('Network')) {
            this.showDuplicateErrorPopup('Network Error', 'Please try again later');
          }
          this.setState({
            loader: false
          });
        })
    }
    else {
      this.setState({
        loader: false,
        showError: true
      })
    }
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    switch (name) {
      case 'email':
        this.setState({
          showServiceError: false
        });
        if (value.length === 0) {
          formErrors.email = '';
        }
        else if (!emailRegex.test(value) && value.length > 0) {
          formErrors.email = 'false';
          if (e.target.nextElementSibling !== null)
            e.target.nextElementSibling.hidden = false;
        }
        else {
          formErrors.email = 'blank';
        }
        break;
      case 'password':
        if (value.length === 0) {
          formErrors.password = '';
        }
        // else if (!passwordRegex.test(value) && value.length > 0) {
        //   formErrors.password = 'false';
        //   if (e.target.nextElementSibling !== null)
        //     e.target.nextElementSibling.hidden = false;
        // }
        else {
          formErrors.password = 'blank';
        }
        break;
      case 'username':
        if (value.length === 0) {
          formErrors.username = '';
        }
        else if (value.length < 2 && value.length > 0) {
          formErrors.username = 'false';
          if (e.target.nextElementSibling !== null)
            e.target.nextElementSibling.hidden = false;
        }
        else {
          formErrors.username = 'blank';
        }
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value })
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  render() {
    const { history } = this.props;
    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            {/* <div className="isoLogoWrapper">

            </div> */}
            <Spin spinning={this.state.loader} size="large">
              <div className="header_"><h5>Free Register</h5><p>Get your free CogAI account now.</p>
                <span className="logo_wrapper"><img src={logo} /></span>
              </div>
              <div className="isoSignUpForm">
                {/* <div style={{ display: 'block', height: '30px', textAlign: 'center' }}>
                  {this.state.signInError === true && (
                    <span style={{ color: 'red' }}>invalid email or password</span>
                  )}
                </div> */}
                <Form onSubmit={this.handleLogin}>
                  <div className="isoInputWrapper" style={{ marginBottom: '25px' }}>
                    <label htmlFor="email">Email</label>
                    <Input type="email" size="large" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
                    {this.state.formErrors.email === 'false' && this.state.showError && (
                      <span className="errorMessage">A valid email address is required</span>
                    )}
                    {this.state.formErrors.email.length === 0 && this.state.showError && (
                      <span className="errorMessage">Email cannot be empty</span>
                    )}
                  </div>
                  <div className="isoInputWrapper">
                    <label htmlFor="username">Username</label>
                    <Input size="large" type="text" placeholder="Enter username" name="username" onChange={this.handleChange} />
                    {this.state.formErrors.username.length === 0 && this.state.showError && (
                      <span className="errorMessage">Password ield cannot be empty</span>
                    )}
                  </div>
                  <div className="isoInputWrapper">
                    <label htmlFor="password">Password</label>
                    <div style={{ position: 'relative' }}>
                      <Input size="large" type={this.state.hidden ? "password" : "text"} placeholder="Enter password" name="password" onChange={this.handleChange} />
                      <Button className="visibility_btn" onClick={this.toggleShow}>{this.state.hidden ? "SHOW" : "HIDE"}</Button>
                      {/* {this.state.formErrors.password === 'false' && this.state.showError && (
                        <span className="errorMessage">password is not strong enough</span>
                    )}*/}
                      {this.state.formErrors.password.length === 0 && this.state.showError && (
                        <span className="errorMessage">field cannot be empty</span>
                      )}
                    </div>
                  </div>

                  {/* <div className="isoLeftRightComponent">
                    <Checkbox>
                      <IntlMessages id="page.signInRememberMe" />
                    </Checkbox>
                    {/* <Link to="forgotpassword" className="isoForgotPass">
                      <IntlMessages id="page.signInForgotPass" />
                    </Link> */}
                  {/* </div> */}
                  <div className="isoSignInBtnWrapper">
                    <Button type="primary" htmlType="submit" >
                      <IntlMessages id="page.signUpButton" />
                    </Button>
                  </div>
                </Form>
              </div>
            </Spin>
          </div>
          <div className="isoHelperWrapper">
            <div>Don't have an account? </div>
            <Link to="/signin">
              <b><IntlMessages id="page.signUpAlreadyAccount" /></b>
            </Link>
          </div>
          <div className="footer">© 2020 CogAi.</div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
    router: state.router
  }),
  { login, clearMenu }
)(SignUp);
