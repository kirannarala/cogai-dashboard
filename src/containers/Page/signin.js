import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import Form from '../../components/uielements/form';
import { store } from "../../redux/store";
import Spin from '../../helpers/spin.style';
import { config } from '../../constants';
import appManager from "../appManager";
import Modals from "../../components/feedback/modal";
import logo from "../../image/home_logo.png";

import ModalStyle, { ModalContent } from "../Feedback/Modal/modal.style";
import WithDirection from "../../settings/withDirection";
import actions from "../../redux/dashboardAnalytics/actions";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const confirm = Modals.confirm;

const { logout } = authAction;
const { login} = authAction;
const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const url = config.url.API_URL;
const formValid = formErrors => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    if (val.length === 0 || val !== 'blank') {
      valid = false;
    }
  });
  return valid;
}
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      email: null,
      password: null,
      showError: false,
      errorMsg: '',
      serverErrorBoxVisible: false,
      signInError: false,
      redirectToReferrer: false,
      formErrors: {
        email: '',
        password: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.error = this.error.bind(this);
  }
  componentDidMount() {
  }
  error() {
    Modals.error({
      title: "Network Error",
      content:
        "Please Try again later",
      okText: "OK",
      cancelText: "Cancel"
    });
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = (e) => {
    this.setState({
      loader: true,
      serverErrorBoxVisible: false
    });
    const { login, history } = this.props;
    const { email, username, password } = this.state;
    e.preventDefault();
    if (formValid(this.state.formErrors)) {
      var dashboard_url = '/dashboard/home';
      appManager.login(email, password)
        .then(response => {
          this.setState({
            loader: false,
          })
          login();
          const user_id = response.data.data.user_id;
          appManager.getUserDetails(user_id).then((data) => {
            const lastName = data.data.last_name && data.data.last_name.length > 0 ?  data.data.last_name : '';
            const firstName = data.data.first_name && data.data.first_name.length > 0 ?  data.data.first_name : '';
            store.dispatch({
              type: "USER_NAME",
              payload: {
                name: firstName ? firstName +' '+ lastName : data.data.username,
                persona: data.data.persona ? data.data.persona : ''
              },
            });
          localStorage.setItem('name', firstName && firstName !== '' ? firstName +' '+ lastName : data.data.username);
          localStorage.setItem('persona', data.data.persona ? data.data.persona : '');
          sessionStorage.setItem('token', user_id);
          localStorage.setItem('id_', data.data.user_id ? data.data.user_id : '');
          history.push(dashboard_url);
        })
        
        appManager.getZoneList().then((data) => {
          store.dispatch({
            type: "ZONE_LIST",
            payload: {
              zone_list: data
            },
          })
        });
      })
        .catch((error) => {
          var errorContent = error.error ? error.error : null;
          if (errorContent.message.includes('Network')) {
            this.error();
          }
          else {
            this.setState({
              errorMsg: errorContent !== null ? (errorContent.response ? errorContent.response.data.error.message : '') : '',
              serverErrorBoxVisible: true,
              password: '',
              email: ''
            })
          }
          this.setState({
            loader: false,
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
          email: value
        })
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
          if (e.target.nextElementSibling !== null)
            e.target.nextElementSibling.hidden = false;
          this.setState({ signInError: false });
        }
        break;
      case 'password':
        if (value.length === 0) {
          formErrors.password = '';
        }
        else {
          formErrors.password = 'blank';
        }
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  }
  render() {
    const { history } = this.props;
    const from = { pathname: '/dashboard/home' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            {/* <div className="isoLogoWrapper">

            </div> */}
            <div className="header_"><h5>Welcome Back !</h5><p>Sign in to continue to CogAi.</p>
            <span className="logo_wrapper"><img src={logo} /></span></div>
            <Spin spinning={this.state.loader} size="large">
              <div className="isoSignInForm">
                <div style={{ display: 'block', height: '30px', textAlign: 'center' }}>
                  {this.state.signInError === true && (
                    <span style={{ color: 'red' }}>Invalid email or password</span>
                  )}
                </div>
                {this.state.serverErrorBoxVisible &&
                  <div className="ServerErrorWrapper">
                    <div>Wrong credentials</div>
                    <div>{this.state.errorMsg}</div>
                  </div>
                }
                <Form onSubmit={this.handleLogin} >
                  <div className="isoInputWrapper">
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
                    <label htmlFor="password">Password</label>
                    <Input id="pass" size="large" type="password" placeholder="Enter password" value={this.state.password} name="password" onChange={this.handleChange} />
                    {this.state.formErrors.password.length === 0 && this.state.showError && (
                      <span className="errorMessage">Password cannot be empty</span>
                    )}
                  </div>

                  <div className="isoLeftRightComponent">
                    <Checkbox>
                      <IntlMessages id="page.signInRememberMe" />
                    </Checkbox>
                    {/* <Link to="forgotpassword" className="isoForgotPass">
                      <IntlMessages id="page.signInForgotPass" />
                    </Link> */}
                  </div>
                  <div className="isoSignInBtnWrapper">
                    <Button type="primary" htmlType="submit" >
                      <IntlMessages id="page.signInButton" />
                    </Button>
                  </div>
                  <Link to="#" className="isoForgotPass">
                    <IntlMessages id="page.signInForgotPass" />
                  </Link>
                </Form>
              </div>
            </Spin>
          </div>
          <div className="isoHelperWrapper">
            <div>Don't have an account? </div>
            <Link to="/signup">
              <b><IntlMessages id="page.signInCreateAccount" /></b>
            </Link>
          </div>
          <div className="footer">© 2020 CogAi.</div>
        </div>
      </SignInStyleWrapper>
    );
  }
}
export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
    router: state.router
  }),
  { login, logout }
)(SignIn);
