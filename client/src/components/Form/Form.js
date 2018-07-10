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

        axios.post('https://rocky-dawn-89543.herokuapp.com', userData)
        .then((res) => {
            this.props.onMessageReceived(res.data);
        })
        .catch((err) => {
            this.props.onMessageRequestFailed();
        });
    };

    render(){

        let dropContainerStyle = {};
        if(this.props.dragging && !this.props.pickedColor){
            dropContainerStyle = {
                backgroundColor: '#f0f0f0'
            }
        }else if(this.props.pickedColor){
            dropContainerStyle = {
                backgroundColor: this.props.pickedColor
            }
        }

        return(
            <form id='dropContainer' onSubmit={this.submitFormHandler} style={dropContainerStyle}>
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
        pickedColor: state.pickedColor,
        dragging: state.dragging
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