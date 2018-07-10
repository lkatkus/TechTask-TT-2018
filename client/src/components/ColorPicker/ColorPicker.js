// Dependency imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Component imports
import Color from './Color/Color';
import * as actions from '../../store/actions/ColorPicker';

// Asset imports
import classes from './ColorPicker.css'

// Component
class ColorPicker extends Component {

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

    componentDidMount() {
        document.addEventListener('mousemove', (event) => {
            if (this.state.draging) {
                // Set dragged object position
                this.pickedColor.style.left = (event.clientX - 25) + 'px';
                this.pickedColor.style.top = (event.clientY - 25) + 'px';
            };
        });
    };

    mouseUpHandler = (event) => {
        this.props.onDragEnd();

        // Check if dragged object is over dropContainer
        if (event.clientX > this.props.dropContainer.left && event.clientX < this.props.dropContainer.right &&
            event.clientY > this.props.dropContainer.top && event.clientY < this.props.dropContainer.bottom) {
                // Set dropContainer color if color picked
                this.props.onColorPick(this.state.dragedObject.id);
        }

        // Reset dragged object position
        this.pickedColor.style.position = '';
        this.pickedColor.style.left = '0px';
        this.pickedColor.style.top = '0px';

        this.setState({ draging: false }, () => {
            document.removeEventListener('mouseup', this.mouseUpHandler);
        });
    };

    mouseDownHandler = (event) => {
        this.props.onDragStart();

        this.pickedColor = document.getElementById(event.target.id);
        this.pickedColor.style.position = 'absolute';

        this.setState({
            draging: true,
            dragedObject: {
                id: event.target.id
            }
        }, () => {
            document.addEventListener('mouseup', this.mouseUpHandler);
        });
    };

    render() {
        return (
            <div className={classes.ColorPicker}>
                <Color type="red" mouseDown={this.mouseDownHandler} />
                <Color type="green" mouseDown={this.mouseDownHandler} />
                <Color type="blue" mouseDown={this.mouseDownHandler} />
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        dropContainer: state.dropContainer
    }
}

const mapDispatchToState = dispatch => {
    return {
        onColorPick: (pickedColor) => dispatch(actions.setColor(pickedColor)),
        onDragStart: () => dispatch(actions.dragStart()),
        onDragEnd: () => dispatch(actions.dragEnd()),
    }
}

export default connect(mapStateToProps, mapDispatchToState)(ColorPicker);