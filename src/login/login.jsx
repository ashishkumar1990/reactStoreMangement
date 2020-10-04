/**
 * Created by okruti on 03-10-2020.
 */
import React, {Component} from "react";
import {connect} from 'react-redux';

import "./login.css";
import {Redirect} from "react-router-dom";
import {userStore} from '../index';
import Input from '../htmlcomponent/input';
import Button from '../htmlcomponent/Button';
var storeData;
var loginData=require('../asserts/login.json');
class Login extends Component {
    constructor(props) {
        super(props);
        console.log(props.store);
        storeData = userStore ? userStore.getState() : [];
        this.state = {
            islogged: false,
            loginParams: {
                email: "",
                user_password: ""
            }
        };
    }
    // componentDidMount(){
    //     const Form = require('../../asserts/'+formToLoad+'.json');
    //     this.setState({data:Form,title:formToLoad.toUpperCase()});
    // }
    checkUserExist = () => {
        if (storeData.length === 0) {
            return false;
        }
        let userExists = storeData.find((user) => {
            return user.registerFormData.email === this.state.loginParams.email;
        });
        if (!userExists) {
            return false;
        }
        return true;
    };

    handleFormChange = event => {
        let loginParamsNew = {...this.state.loginParams};
        let val = event.target.value;
        loginParamsNew[event.target.name] = val;
        this.setState({
            loginParams: loginParamsNew
        });
    };

    login = event => {
        if (!this.checkUserExist()) {
            return false;
        }
        event.preventDefault();
        let user_id = this.state.loginParams.email;
        let user_password = this.state.loginParams.user_password;
        localStorage.setItem("token", user_id);
        this.props.history.push("/");

    };
    signUp = event => {

        event.preventDefault();
        this.props.history.push("/signup");
    };

    render() {
        if (localStorage.getItem("token")) {
            return <Redirect to="/"/>;
        }
        return (
            <div className="container">
                <form  className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal" style={{textAlign:'center'}}>{loginData.label}</h1>
                    <div className="row">
                        <div className="col">
                            {loginData.formFeilds.map((formFeild) => {
                                 if(formFeild.type==="input"){
                                     return <Input item={formFeild} change={(e)=>this[formFeild.callBack]}/>
                                }
                                if(formFeild.type==="button"){
                                    return <Button item={formFeild } click={(e)=>this[formFeild.callBack]} />
                                }
                            })
                            }
                        </div>
                    </div>
                    { !this.checkUserExist()&& this.state.loginParams.email && <p>NO User already Exists with this email id</p>}
                </form>
            </div>
        );
    }
}
export default connect()(Login);