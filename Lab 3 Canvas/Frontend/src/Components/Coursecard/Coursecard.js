import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import './Coursecard.css';
import Draggable, { DraggableCore } from 'react-draggable'; 

export class Coursecard extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: "",
            name: "",
            term: "",
            dept: "",
            num:"",
            position:"",
            deltaPosition:"",
            controlledPosition: ""
        }
    }

    getInitialState = () => {
      return {
        activeDrags: 0,
        deltaPosition: {
          x: 0,
          y: 0
        },
        controlledPosition: {
          x: -400,
          y: 200
        }
      };
    };
  
    handleDrag = (e, ui) => {
      const { x, y } = this.state.deltaPosition;
      this.setState({
        deltaPosition: {
          x: x + ui.deltaX,
          y: y + ui.deltaY
        }
      });
    };
  
    onStart = () => {
      this.setState({ activeDrags: ++this.state.activeDrags });
    };
  
    onStop = () => {
      this.setState({ activeDrags: --this.state.activeDrags });
    };
  
    // For controlled component
    adjustXPos = e => {
      e.preventDefault();
      e.stopPropagation();
      const { x, y } = this.state.controlledPosition;
      this.setState({ controlledPosition: { x: x - 10, y } });
    };
  
    adjustYPos = e => {
      e.preventDefault();
      e.stopPropagation();
      const { controlledPosition } = this.state;
      const { x, y } = controlledPosition;
      this.setState({ controlledPosition: { x, y: y - 10 } });
    };
  
    onControlledDrag = (e, position) => {
      const { x, y } = position;
      this.setState({ controlledPosition: { x, y } });
    };
  
    onControlledDragStop = (e, position) => {
      this.onControlledDrag(e, position);
      this.onStop();
    };
  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;
      let colorTemp = ["https://ih1.redbubble.net/image.530527489.1466/flat,550x550,075,f.jpg",
        "https://www.solidbackgrounds.com/images/2560x1440/2560x1440-sea-blue-solid-color-background.jpg",
        "https://cdn.shopify.com/s/files/1/1011/0376/products/PastelBlue.jpg?v=1512940787"];
    return (
      <div>
        <Link to={`/course/${this.props.id}/home`} className="cardlink">
        <Draggable {...dragHandlers}>
          <Card className="cards searchcards">
              <img src={colorTemp[Number(this.props.num)%3]} alt="cardcolor" className="cardtemp" />
              <h5><span className="cardlink">{this.props.dept}  {this.props.id}  {this.props.name}</span></h5>
              {/* <h5><span className="cardlink">{this.props.name}</span></h5>
              <h6><span className="term">{this.props.term}</span></h6> */}
          </Card>
          </Draggable>
        </Link>
      </div>
    )
  }
}

export default Coursecard
