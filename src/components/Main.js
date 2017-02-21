require('normalize.css/normalize.css');
require('styles/App.css');
import Graph from './Graph/Graph';
import {connect} from 'react-redux';
import info from '../actions/info';
import * as data from '../utils/data';

import React from 'react';

@connect(s => { return {infoData: s.info} }, {info})
class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.refreshData = () => {
      data.reset();
      this.setState({data: data.generateItems()})
    };

    this.updateData = () => {
      this.setState({data: data.modifyPositions(this.state.data)});
    };

    this.updateSize = () => {
      this.setState({data: data.modifySizes(this.state.data)});
    };

    this.filter = () => {
      this.setState({data: data.removeRandom(this.state.data)});
    };

    this.updateColor = () => {
      this.setState({data: data.updateColors(this.state.data)});
    };

    this.addMore = () => {
      this.setState({data: this.state.data.concat(data.generateItems())});
    };

    this.state = {
      data: data.generateItems()
    };
  }

  render() {
    return (
      <div className="layout">
        <div className="controls">
          <button className="btn controls__btn" onClick={this.refreshData}>Reset data</button>
          <button className="btn controls__btn" onClick={this.addMore}>Add more items</button>
          <button className="btn controls__btn" onClick={this.updateData}>Update positions</button>
          <button className="btn controls__btn" onClick={this.updateColor}>Update colors</button>
          <button className="btn controls__btn" onClick={this.updateSize}>Update sizes</button>
          <button className="btn controls__btn" onClick={this.filter}>Remove random</button>
        </div>
        <div>
          <Graph data={this.state.data} onClicked={this.props.info}/>
          <div className="info">
            <strong>CLICKED ITEM DATA:</strong> {JSON.stringify(this.props.infoData)}
          </div>
        </div>
      </div>
    );
  }
}

export default AppComponent;
