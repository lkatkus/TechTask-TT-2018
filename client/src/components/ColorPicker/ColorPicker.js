// Dependency imports
import React, {Component} from 'react';
import {connect} from 'react-redux';

// Component imports
import Color from './Color/Color';
import * as actions from '../../store/actions/ColorPicker';

// Asset imports
import classes from './ColorPicker.css'

// Component
class ColorPicker extends Component{
    
    state = {
        draging: false,
        dragedObject: {
            id: null,
            position: {
                x: null,
                y: null
            }
        }
    };

    pickedColor = null;

    componentDidMount(){
        document.addEventListener('mousemove', (event) => {
            if(this.state.draging){
                this.pickedColor.style.left = (event.clientX - 25) + 'px';
                this.pickedColor.style.top = (event.clientY - 25) + 'px';
            };
        });
    };

    updateState = (event) => {
        if(event.clientX > this.props.dropContainer.left && event.clientX < this.props.dropContainer.right &&
            event.clientY > this.props.dropContainer.top && event.clientY < this.props.dropContainer.bottom){
                this.props.onColorPick(this.state.dragedObject.id);
        }

        this.setState({draging: false}, () => {
            document.removeEventListener('mouseup', this.updateState);
        });
    };

    mouseDownHandler = (event) => {
        this.pickedColor = document.getElementById(event.target.id);
        this.pickedColor.style.position = 'absolute';

        this.setState({
            draging: true,
            dragedObject: {
                id: event.target.id
            }}, () => {
            document.addEventListener('mouseup', this.updateState);
        });
    };
 
    render(){
        return(
            <div className={classes.ColorPicker}>
                <Color type="red" mouseDown={this.mouseDownHandler} />
                <Color type="green" mouseDown={this.mouseDownHandler} />
                <Color type="blue" mouseDown={this.mouseDownHandler} />
            </div>
        )
    };
};

const mapStateToProps = state => {
    return{
        dropContainer: state.dropContainer
    }
}

const mapDispatchToState = dispatch => {
    return{
        onColorPick: (pickedColor) => dispatch(actions.setColor(pickedColor))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(ColorPicker);