// Dependency imports
import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

// Component imports
import Input from './Input/Input';
import * as actions from '../../store/actions/Form';

// Asset imports
import classes from './Form.css';

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
    };
    
    dropContainer;

    componentDidMount(){
        this.dropContainer = document.getElementById('dropContainer');
        let dropContainerPosition = this.dropContainer.getBoundingClientRect();
        
        let position = {
            top: dropContainerPosition.top,
            bottom: dropContainerPosition.bottom,
            left: dropContainerPosition.left,
            right: dropContainerPosition.right
        };
        
        this.props.onContainerPositionSet(position);
    };

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
            email: this.state.form.email.value,
            pickedColor: this.props.pickedColor
        };

        this.props.onMessageRequestSent();

        axios.post('http://localhost:3000/', userData)
        .then((res) => {
            this.props.onMessageReceived(res.data);
        })
        .catch((err) => {
            this.props.onMessageRequestFailed();
        });
    };

    render(){
        return(
            <form id='dropContainer' onSubmit={this.submitFormHandler} style={{backgroundColor:this.props.pickedColor}}>
                <Input type="text" name="username" label="Username" onChange={this.changeHandler} required/>
                <Input type="email" label="E-mail address" onChange={this.changeHandler} required/>
                <Input type="submit"/>
            </form>
        )
    };
};

const mapStateToProps = state => {
    return{
        message: state.message,
        loading: state.loading,
        pickedColor: state.pickedColor
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onMessageReceived: (message) => dispatch(actions.messageReceived(message)),
        onMessageRequestSent: () => dispatch(actions.messageRequestSent()),
        onMessageRequestFailed: () => dispatch(actions.messageRequestFailed()),
        onContainerPositionSet: (position) => dispatch(actions.setContainerSize(position))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);