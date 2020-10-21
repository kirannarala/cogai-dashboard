import React, { Component } from 'react';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import UserSummaryStyleWrapper from './userSummary.style';
import basicStyle from '../../settings/basicStyle';
import Popconfirms from '../../components/feedback/popconfirm';
import Spin from "../../helpers/spin.style";
import appManager from "../appManager";
import PopconfirmWrapper from '../Feedback/Popconfirm/popconfirm.style';
import Modals from "../../components/feedback/modal";
import Select, { SelectOption } from '../../components/uielements/select';
import { notification } from '../../components/index';
import ModalStyle, { ModalContent } from "../Feedback/Modal/modal.style";
import WithDirection from "../../settings/withDirection";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './phoneInput.css';

const Option = SelectOption;
const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const confirm = Modals.confirm;
const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const Popconfirm = props => (
    <PopconfirmWrapper>
        <Popconfirms {...props} />
    </PopconfirmWrapper>
);

var user_ = '', editable = '';
const PersonaOption = [<Option value="Security Personnel">Security Personnel</Option>, <Option value="Admin">Admin</Option>, <Option value="Plant Manager">Plant Manager</Option>, <Option value="Paramedics">Paramedics</Option>];
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            //valid: false,
            Popupvisible: false,
            EditPopupvisible: false,
            disable: true,
            loader: false,
            currentFirstUserName: '',
            currentLastUserName: '',
            currentUserId: '',
            currentUserPersona: 'Security Personnel',
            currentUserPhone: '',
            currentUserLastLogin: '',
            currentUserEmail: '',
            currentUserPassword: '',
            passwordError: '',
            emailError: '',
            showError: false,
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.ManagePopup = this.ManagePopup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUser = this.handleUser.bind(this);
        this.selectPersonaChange = this.selectPersonaChange.bind(this);
        this.getUsersList = this.getUsersList.bind(this);
    }
    componentDidMount() {
        user_ = localStorage.getItem('id_');
        editable = localStorage.getItem('persona') ? (localStorage.getItem('persona')).toLowerCase().includes('admin') : false;
        this.getUsersList();
    }
    getUsersList() {
        this.setState({
            loader: true
        })
        appManager.getUserList()
            .then(data => {
                var list = data;
                debugger;
                if (!editable){
                    list = data.filter(user => user.user_id === user_);
                }
                this.setState({
                    usersList: list,
                    loader: false
                })
            })
    }
    handleUser = (task) => {
        var self = this;
        var { currentUserId, currentUserLastLogin, currentUserFirstName, currentUserLastName, currentUserPersona, currentUserPhone, currentUserEmail, currentUserPassword, emailError, passwordError } = this.state;
        
        var newUser ={};
        if (task == 'add') {
            if(emailError === 'blank' && passwordError === 'blank'){
            newUser = {
                "first_name": currentUserFirstName,
                "last_name": currentUserLastName,
                "persona": currentUserPersona,
                "email": currentUserEmail,
                "mobile_number": currentUserPhone,
                "password": currentUserPassword,
                "last_login_at": currentUserLastLogin
            }
            appManager.register(newUser)
                .then(data => {
                    self.getUsersList();
                    notification('success', 'User added successfully');
                })
                .catch(error => {
                    notification('error', 'There was an error while adding, please try again');
                })
                self.setState({ Popupvisible: false });
            }
            else{
                this.setState({
                    showError: true
                })
            }
        }
        else {
        if(emailRegex.test(currentUserEmail) && currentUserEmail.length > 0){
            newUser = {
                "first_name": currentUserFirstName,
                "last_name": currentUserLastName,
                "persona": currentUserPersona,
                "email": currentUserEmail,
                "mobile_number": currentUserPhone,
                "last_login_at": currentUserLastLogin,
                "user_id": currentUserId
            }
            appManager.updateUser(newUser, "update_data")
                .then(data => {
                    self.getUsersList();
                    notification('success', 'User is updated successfully.');
                })
                .catch(error => {
                    notification('error', 'User is not updated, please try again.');
                })
            self.setState({ Popupvisible: false });
        }
        else{
                this.setState({
                    showError: true
                })
        }
    }
    }
    ManagePopup(user) {
        if (user) {
            this.setState({
                currentUserFirstName: user.first_name,
                currentUserLastName: user.last_name,
                currentUserId: user.user_id,
                currentUserPersona: user.persona,
                currentUserPhone: user.mobile_number,
                currentUserLastLogin: user.last_login_at,
                currentUserEmail: user.email,
                currentUserPassword: user.password,
                disable: false,
                Popupvisible: !this.state.Popupvisible,
            })
        }
        else {
            this.setState({
                Popupvisible: !this.state.Popupvisible,
                currentUserLastName: '',
                currentUserFirstName: '',
                currentUserId: '',
                currentUserPersona: 'Security Personnel',
                currentUserPhone: '',
                currentUserLastLogin: '',
                currentUserEmail: '',
                currentUserPassword: '',
                disable: true,
            })
        }
        this.setState({
            showError: false,
            emailError: ''
        })
    }
    deleteUser = (userId) => {
        appManager.deleteUser(userId)
            .then(data => {
                this.getUsersList();
                notification('success', 'User is deleted successfully');
            })
            .catch(error => {
                notification('error', 'User is not deleted, please try again.');
            })
    }
    selectPersonaChange = e => {
        this.setState({ currentUserPersona: e });
    }
    handlePhoneNumberChange = (val) => {
        this.setState({
            currentUserPhone: val
        })
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case 'firstname':
                this.setState({
                    currentUserFirstName: value
                });
                break;
            case 'lastname':
                this.setState({
                    currentUserLastName: value
                });
                break;
            case 'email':
                this.setState({
                    showServiceError: false,
                    currentUserEmail: value
                  });
                  var emailError = '';
                  if (value.length === 0) {
                    emailError = '';
                  }
                  else if (!emailRegex.test(value) && value.length > 0) {
                    emailError = 'false';
                    if (e.target.nextElementSibling !== null)
                      e.target.nextElementSibling.hidden = false;
                  }
                  else {
                    emailError = 'blank';
                  }
                  this.setState({emailError: emailError})
                  break;
            case 'password':
                this.setState({
                    currentUserPassword: value
                });
                  var passwordError = '';
                  if (value.length === 0) {
                    passwordError = '';
                  }
                  else if (value.length > 0 && value.length <= 3) {
                    passwordError = 'false';
                  }
                  else if (value.length > 3) {
                    passwordError = 'blank';
                  }
                  this.setState({passwordError: passwordError})
                  break;
            default: break;
        }
    }

    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        return (
            <UserSummaryStyleWrapper>
                <div style={{ width: '100%' }}>
                    <div className="page_header">
                        <h4>User Summary</h4>
                        <span>CogAi / user summary</span>
                    </div>
                    <div className="body_">
                        <Spin size="large" spinning={this.state.loader}>
                        <div className="userSummary">
                            <div className="table_head">
                                <div className={editable ? "header_row" : 'header_row fullWidth'}>
                                    <div>Name</div>
                                    <div>Phone</div>
                                    <div>Persona</div>
                                    <div className="fixed">Email</div>
                                    <div>Last login</div>
                                </div>
                                {editable && <div className="btnWrapper">
                                    <Modal
                                        visible={this.state.Popupvisible}
                                        title={this.state.disable ? 'Add User' : 'Edit User'}
                                        onOk={this.handleOk}
                                        onCancel={() => this.ManagePopup('')}
                                        footer={[
                                            <Button key="back" size="large" onClick={() => this.ManagePopup('')}>
                                                Cancel
                                            </Button>,
                                            <Button
                                                key="submit"
                                                type="primary"
                                                size="large"
                                                loading={this.state.loading}
                                                onClick={() => this.handleUser(this.state.disable ? 'add' : 'edit')}
                                            >
                                                <span>{this.state.disable ? 'Add' : 'Save'}</span>
                                            </Button>
                                        ]}
                                    >
                                        <div style={{ padding: '5px 10px' }}>
                                            <div style={{ paddingBottom: '10px' }}>
                                                <label style={{ fontSize: '14px' }}>Persona</label>
                                                <Select style={{ width: '100%', height: '43px', marginTop: '5px' }}
                                                    placeholder="Enter persona" name="persona" value={this.state.currentUserPersona} onChange={this.selectPersonaChange} >
                                                    {PersonaOption}
                                                </Select>
                                            </div>
                                            <div style={{ paddingBottom: '10px' }}>
                                                <label style={{ fontSize: '14px' }}>Name</label>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Input style={{ height: '43px', marginTop: '5px', width: '49%' }} name="firstname" placeholder="Enter first name" value={this.state.currentUserFirstName} onChange={this.handleChange} />
                                                    <Input style={{ height: '43px', marginTop: '5px', width: '49%' }} name="lastname" placeholder="Enter last name" value={this.state.currentUserLastName} onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div style={{ paddingBottom: '10px' }}>
                                                <label style={{ fontSize: '14px' }}>Email</label>
                                                <Input type="email" size="large" placeholder="Enter email" name="email" value={this.state.currentUserEmail} onChange={this.handleChange} />
                                                {this.state.emailError === 'false' && this.state.showError && (
                                                <span className="errorMessage" style={{fontSize: '12px',color: '#f46a6a'}}>A valid email address is required</span>
                                                )}
                                                {this.state.emailError.length === 0 && this.state.showError && (
                                                <span className="errorMessage" style={{fontSize: '12px',color: '#f46a6a'}} >Email cannot be empty</span>
                                                )}
                                            </div>
                                            {this.state.disable && (<div style={{ paddingBottom: '10px' }}>
                                                <label style={{ fontSize: '14px' }}>Password</label>
                                                <Input type="text" style={{ height: '43px', marginTop: '5px' }} name="password" placeholder="Enter password" value={this.state.currentUserPassword} onChange={this.handleChange} />
                                                {this.state.passwordError === 'false' && this.state.showError && (
                                                <span className="errorMessage" style={{fontSize: '12px',color: '#f46a6a'}}>Password is not strong enough</span>
                                                )}
                                                {this.state.passwordError.length === 0 && this.state.showError && (
                                                <span className="errorMessage" style={{fontSize: '12px',color: '#f46a6a'}} >Password cannot be empty</span>
                                                )}
                                            </div>)}
                                            <div style={{ paddingBottom: '10px' }}>
                                                <label style={{ fontSize: '14px' }}>Phone</label>
                                                <PhoneInput
                                                    inputProps={{
                                                        name: 'phoneNumber',
                                                        required: true,
                                                    }}
                                                    preferredCountries={['in', 'us', 'de', 'mx', 'lt']}
                                                    preserveOrder={['preferredCountries']}
                                                   value={this.state.currentUserPhone} 
                                                   onChange={this.handlePhoneNumberChange}
                                                    country='us'
                                                   placeholder="+x (xxx) xxx-xxxx"
                                                />
                                            </div>
                                        </div>
                                    </Modal>
                                    <Button onClick={() => this.ManagePopup('')}><span>Add</span></Button>
                                </div>}
                            </div>
                            <div className="body">
                                {this.state.usersList && this.state.usersList.map(user => {
                                    return (
                                        <div className="row_">
                                            <div className={editable ? "row_content" : 'row_content fullWidth'}>
                                                <div>{user.first_name.length > 1 && user.first_name !== '' ? user.first_name +' '+ user.last_name : user.username !== undefined ? user.username : '---'} </div>
                                                {/* <div>{user.user_id}</div> */}
                                                <div>{user.mobile_number ? user.mobile_number : '---'}</div>
                                                <div>{user.persona ? user.persona : '---'}</div>
                                                <div  className="fixed">{user.email}</div>
                                                <div>{user.last_login_at ? appManager.getDateString(user.last_login_at) : '---'}</div>
                                            </div>
                                            {editable && <div className="btnWrapper">
                                                <Button onClick={() => this.ManagePopup(user)}><span>Edit</span></Button>
                                                <Popconfirm
                                                    placement="topRight"
                                                    title="Are you sure delete this user?"
                                                    okText="Delete"
                                                    cancelText="Cancel"
                                                    onConfirm={() => this.deleteUser(user.user_id)}
                                                >
                                                    <Button><span>Delete</span></Button>
                                                </Popconfirm>
                                            </div>}
                                        </div>)
                                }
                                )}
                            </div>
                        </div>
                        </Spin>
                    </div>
                </div>
            </UserSummaryStyleWrapper>
        );
    }
}
