/**
 * Created by okruti on 03-10-2020.
 */
import React, {Component} from "react";
import {connect} from 'react-redux';

import "../login/login.css";
import {Redirect} from "react-router-dom";
import {userStore} from '../index';
import Input from '../htmlcomponent/input';
import Button from '../htmlcomponent/Button';
var signupData=require('../asserts/signup.json');

var storeData;
class SignUp extends Component {
    constructor(props) {
        super(props);
        storeData = userStore ? userStore.getState() : [];
        this.state = {
            islogged: false,
            signUpParams: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            }
        };
    }

    handleFormChange = event => {
        let signUpParamsNew = {...this.state.signUpParams};
        let val = event.target.value;
        signUpParamsNew[event.target.name] = val;
        this.setState({
            signUpParams: signUpParamsNew
        });
    };

    register = event => {
         let user_id = this.state.signUpParams.email;
        if(this.checkUserExist()){
            return ;
        }
        event.preventDefault();
        const data = {
            id: storeData.length,
            registerFormData: this.state.signUpParams
        };
        userStore.dispatch({
            type: 'ADD',
            data
        });
        localStorage.setItem("token",user_id);
        this.props.history.push("/");
    };

    checkUserExist = () => {
        if (storeData.length === 0) {
            return false;
        }
        let userExists = storeData.find((user) => {
            return user.email === this.state.signUpParams.email;
        });
        if (userExists) {
            return true;
        }
    };

    render() {
        if (localStorage.getItem("token")) {
            return <Redirect to="/"/>;
        }
        return (
            <div className="container">
                <form  className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal" style={{textAlign:'center'}}>{signupData.label}</h1>
                    <div className="row">
                        <div className="col">
                            {signupData.formFeilds.map((formFeild) => {
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
                    { this.checkUserExist()&&<p>User already Exists with this email id</p>}
                </form>
                <div>

                </div>
            </div>

        );
    }
}
export default connect()(SignUp);