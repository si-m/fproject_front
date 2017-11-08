import React, { Component } from 'react';
import Tweet 								from './Tweet'
import {Table} 							from 'reactstrap'

export default class Tweets extends Component {
	render() {
    let tweets = null
    let {predictions, tweets_list} = this.props.data
    if(predictions && tweets_list)
	     tweets = this.props.data.tweets_list.map((tweet, i) =><Tweet key={i} id={i} tweet={tweet} sentiment={predictions[i]}/>)
		return (
      <Table responsive>
        <thead>
        <tr>
          <th>Texto</th>
          <th>Sentimiento</th>
        </tr>
        </thead>
        <tbody>
					{tweets}
        </tbody>
      </Table>			
		);
	}
}
