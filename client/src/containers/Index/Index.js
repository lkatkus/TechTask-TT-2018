// Dependency imports
import React, {Component} from 'react';
import {connect} from 'react-redux';

// Component imports
import Form from '../../components/Form/Form';
import ColorPicker from '../../components/ColorPicker/ColorPicker';

// Asset imports
import classes from './Index.css';

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
            return(
                <div className={classes.MessageContainer}>
                    Connecting to server...
                </div>
            )
        }else{
            return null;
        }
    }

    render(){
        return(
            <React.Fragment>
                <ColorPicker/>
                
                <div className={classes.MainContainer}>
                    <div className={classes.FormContainer}>
                        <Form/>
                    </div>
                    {this.displayMessage()}
                </div>   
                             
            </React.Fragment>
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