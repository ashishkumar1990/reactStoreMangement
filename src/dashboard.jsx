import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./dashboard.css";
import {Form, Input, Button,Popup,TextArea} from 'semantic-ui-react'
import {productStore} from './index';



var storeData;
class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {name:"",price:0,category:"",description:"", islogout: false};
        console.log(productStore);
        storeData = productStore ? productStore.getState() : [];
        if (storeData.length > 0 && props.match.params.id) {
            const matchedPost = storeData[props.match.params.id];
            if (matchedPost) {
                this.state = matchedPost['productFormData'];
            }
        }
    }
    signOut = () => {
        localStorage.removeItem("token");
        this.setState({
            islogout: true
        });
    };

    // check form is valid or not
    isFormValid = () => {
        if (!this.state.name || !this.state.category || !this.state.price) {
            return false
        } else {
            return true;
        }
    };


    handleSubmit = (e) => {
        if (this.isFormValid()) {
            debugger;
            e.preventDefault();
            const productFormData = this.state;
            const data = {
                id: this.props.match.params.id ? this.props.match.params.id :
                    storeData.length,
                productFormData: productFormData,
                editing: false
            };
                productStore.dispatch({
                    type: 'ADD',
                    data
                })
            debugger;
            this.props.history.push("/product-list");
        }
    };

    // changes event handlers
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };



    render() {
        if (this.state.islogout) {
            return <Redirect to="/login" />;
        }
        const { match } = this.props;
        return (
            <div>
                <ul>
                    <li>
                        <Link to={`${match.path}`}>Dashboard</Link>
                    </li>
                    <li className="push-right">
                        <button onClick={this.signOut} href="#">
                            Sign Out
                        </button>
                    </li>
                </ul>
                <main role="main">
                    <div className="main" style={{marginLeft:'38%'}}>
                        <div style={{margin: '20px', width: '312px', textAlign: 'center'}}>
                            <h1>Product </h1>
                            <Form onChange={this.handleChange}>

                                <Form.Field>
                                    <Popup
                                        trigger={<Input type="text" placeholder="Name" name="name"
                                                        value={this.state.name}
                                                        required="true"/>}
                                        content='Name is mandatory.'
                                        on='hover'
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Popup
                                        trigger={<Input type="text" placeholder="Category" name="category"
                                                        value={this.state.category}
                                                        required/>}
                                        content='Category is mandatory.'
                                        on='hover'
                                    />

                                </Form.Field>
                                <Form.Field>
                                    <Popup
                                        trigger={<Input type="number" placeholder="Price" name="price"
                                                        value={this.state.price}  min="0"
                                                        required/>}
                                        content='Price is mandatory.'
                                        on='hover'
                                    />


                                </Form.Field>
                                <Form.Field>
                                    <Popup
                                        trigger={<TextArea type="text" placeholder="Description" name="description"
                                                           value={this.state.description}/>}
                                    />

                                </Form.Field>
                                <Button onClick={this.handleSubmit}> submit </Button>
                            </Form>

                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default withRouter(Dashboard);
