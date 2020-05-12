import React,{ Component } from 'react';
import './App.css';

const apiKey = ``;

class App extends Component{

  state = {
    isLoading: true,
    data: {},
    wanted: 'London'
  }

  getQuery = (e) =>{
    let query = e.target.value;
    this.setState({
      wanted: query
    });
  }

  componentDidMount(){
    this.fetchData();
  }


  fetchData = () => { 
    let {wanted} = this.state;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${wanted}&appid=${apiKey}`)
    .then(resp => {
      if(resp.ok){
        return resp.json();
      }else {
        this.setState({
          wanted: ""
        })
        return Promise.reject();
      }
    })

    .then(resp => this.setState({
        data: resp,
        isLoading: false
      }));

    this.setState({
      wanted: ''
    })
  }

  toCelcius = (t) => {
    return (t-273.5).toFixed(1);
  }


  render(){

    const { isLoading, data } = this.state;

    return(
      <div>
      { !isLoading ?
      <div className={ this.toCelcius(data.main.temp) > 10 ? "app appWarm" : "app appCold" }>
        <div className="appHeader">
          <input onChange={this.getQuery} className="searchInput" type="text" value={this.state.wanted}/>
          <button onClick={this.fetchData} className="searchButton" type="submit"><i className="fas fa-search-location"></i></button>
        </div>

        <div className="appInfo">
            <h1 className="location">{data.name} , {data.sys.country}</h1>
            <div className="temperature location">
              <h1>{this.toCelcius(data.main.temp)}</h1>
              <i className="fas fa-temperature-high icon"></i>
            </div>
            <h2 className="location weather">{data.weather[0].main}</h2>
        </div>
      </div>
      : null}
      </div>
      );
  }



}
export default App;
