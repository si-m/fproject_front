import React, { Component } from 'react';

export default class Tweet extends Component {
	render() {
		return (
      <tr id={this.props.key}>
        <td>{this.props.tweet}</td>
        <td>{this.props.sentiment}</td>
      </tr>
		);
	}
}
