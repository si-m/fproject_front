import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts' 

export default class ChartTable extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	hola: "mundo",
			configPredictions: {
	        /* HighchartsConfig */
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
	        },
	        title: {
	          text: 'Distribucion de sentimientos'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (ReactHighcharts.Highcharts.theme && ReactHighcharts.Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: 'Sentimiento',
	            colorByPoint: true,
	            data: [{
	                name: 'Negativo',
	                y: 56.33
	            }, {
	                name: 'Positivo',
	                y: 44.66,
	            }]
	        }]
	      }
	    }
	}
	componentWillUpdate(){
		console.log(this.state.configPredictions.series)
	}

  componentWillReceiveProps(nextProps){
  	if(this.props.data !== nextProps.data){
  	  const reduced = this.mapReduce(nextProps.data.predictions)
  	  this.setState({configPredictions: Object.assign(this.state.configPredictions, {series: [reduced]}), hola: "puto"})
  	}
  }

  mapReduce(data){
  	//reduce all the probabilitis to an object of counted sentiments
		const stats = data.reduce((oldValue, newValue) =>{  newValue > 0.5 ? oldValue.positive++ : oldValue.negative++
																											oldValue.total++
																									    return oldValue}, {negative: 0, positive: 0, total: 0})
		//map the conunted sentiments object into a distribution object of percentages
		const percentages = {negative: (stats.negative/stats.total), positive: (stats.positive/stats.total)}
		//map into the required shape of highcharts
		const highchartsData = {name: 'Sentimiento',
																 colorByPoint: true, 
																 data:[{ name:'Negativo', 
																 				    y: percentages.negative},
																 			 { name:'Positivo', 
																 			      y: percentages.positive}]}
  	return highchartsData
  }

	render() {
		return (
			<div>
	     <ReactHighcharts config={this.state.configPredictions} ></ReactHighcharts>
	     {this.state.hola}
			</div>
		);
	}
}

