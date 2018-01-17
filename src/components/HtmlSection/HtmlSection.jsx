import React, { Component } from 'react';

class HtmlSection extends Component {

  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.props.content }} className={this.props.customClass ? this.props.customClass : ''} />
    );
  }

}

export default HtmlSection;