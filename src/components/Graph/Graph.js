import React from 'react';
import GraphRenderer from './graphRenderer';

export default class extends React.Component {
  componentDidMount() {
    this.graphRenderer = new GraphRenderer({
      root: this.root,
      size: 500,
      onItemClicked: this.props.onClicked
    });
    this.graphRenderer.render(this.props.data);
  }

  componentDidUpdate() {
    this.graphRenderer.render(this.props.data);
  }

  render() {
    return <dev className="test" ref={(root) => { this.root = root; }}/>;
  }
}
