// Dependency imports
import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

// Component imports
import Input from '../Input/Input';
import * as actions from '../../store/actions/Form';

// Asset imports

// Component
class Form extends Component{
    
    state = {
        form:{
            username: {
                value: ''
            },
            email: {
                value: ''
            }
        }
    }
    
    changeHandler = event => {
        let updatedForm = {...this.state.form};
        
        updatedForm[event.target.name].value = event.target.value;

        this.setState({
            form: updatedForm
        });
    };

    submitFormHandler = event => {
        event.preventDefault();

        let userData = {
            username: this.state.form.username.value,
            email: this.state.form.email.value
        };

        this.props.onMessageRequestSent();

        axios.post('/', userData)
        .then((res) => {
            this.props.onMessageReceived(message);
        })
        .catch((err) => {
            this.props.onMessageRequestFailed();
        })
    }

    render(){
        return(
            <form onSubmit={this.submitFormHandler}>
                <Input type="text" name="username" label="Username" onChange={this.changeHandler} required/>
                <Input type="email" label="E-mail address" onChange={this.changeHandler} required/>
                <Input type="submit"/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return{
        message: state.message,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onMessageReceived: (message) => dispatch(actions.messageReceived(message)),
        onMessageRequestSent: () => dispatch(actions.messageRequestSent()),
        onMessageRequestFailed: () => dispatch(actions.messageRequestFailed())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);