import React, { Component } from 'react';
import logo from './logo.svg';
import axios from "axios"
import './App.css';
import { apiUrl } from "./utils/config"
import ChartTable from "./ChartTable"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      twitter_api: false,
      size: "10",
      error: "",
      pending: false,
      success: false,
      predictions: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.predictText = this.predictText.bind(this)

  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      success: false
    });
  }

  predictText(e) {
    this.setState({error: "", pending: true, success: false})
    axios.get(apiUrl() + "/api/predict", {
      params: {
       input: this.state.data,
       twitter_api: this.state.twitter_api,
       n: this.state.size}
     }).then((res) => {
          if(res.data.status === 400){
            return this.setState({error: "Error, bad request", pending: false})
          }
          this.setState({predictions: res.data, pending: false, success: true})
        })
        .catch((err) => {
          this.setState({error: err.message, pending: false})
        })
    e.preventDefault();
  }
  
  render() {
    let quantity = null
    if (this.state.twitter_api) {
      quantity = (<div className="form-group">
                    <label>
                      Cantidad de tweets:
                      <input type="number" name="size" className="form-control" defaultValue='10' onChange={this.handleChange} />
                    </label>
                  </div>)}
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TRABAJO FINAL DE INGENIERÍA EN INFORMÁTICA</h1>
        </header>
        <div className="container">
          <form>
            <br />
            <div className="form-group">
              <label>
                Ingrese el texto o el hashtag:
                <input type="text" name="data" style={{'color': 'blue'}} className="form-control form-control-lg" onChange={this.handleChange} />
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  name="twitter_api"
                  type="checkbox"
                  className="form-check-input"
                  checked={this.state.twitter_api}
                  onChange={this.handleChange} />
                Twitter api
              </label>
            </div>
            {quantity}
          </form>
          <button className="btn btn-large" onClick={this.predictText} disabled={this.state.pending}>Analizar</button>
        </div>
        <div style={{'color': 'red'}}>{this.state.error}</div>
          <div className="container"><ChartTable data={this.state.predictions}/></div>
        </div>
    );
  }
}

export default App;
