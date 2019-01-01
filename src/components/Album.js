import React, { Component } from 'react';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="album">
        {this.props.match.params.slug} Album will go here
      </section>
    );
  }
}

export default Album;