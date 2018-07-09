// Dependency imports
import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

// Component imports
import Form from '../../components/Form/Form';

// Asset imports
import classes from './Home.css';

// Component
class Home extends Component{

    displayMessage(){
        if(this.props.message && !this.props.loading){
            return(
                <div className={classes.MessageContainer}>
                    {this.props.message}
                </div>
            )
        }else if(!this.props.message && this.props.loading){
            <div className={classes.MessageContainer}>
                Loading...
            </div>            
        }else{
            return null;
        }
    }

    render(){
        return(
            <div className={classes.MainContainer}>
                <div className={classes.FormContainer}>
                    <Form/>
                </div>
                {this.displayMessage()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        message: state.message,
        loading: state.loading
    }
}

export default connect(mapStateToProps)(Home);