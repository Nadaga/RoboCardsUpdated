import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/Errorboundry"

// const App = () => {
//     return (
//         <div>
//         <h1>RoboFriends</h1>
//         <SearchBox/>
//          <CardList robots={robots}/>
//          </div>
//     )
// }

  

class App extends Component {
  constructor () {
    super()
    this.state = {
      robots: [],
      searchfield: ""
    }
  }
  // Getting robot list
  componentDidMount () {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => { return response.json();})
    .then(users => {this.setState({robots:users})})
  }
  
  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value})
  }
  render () {
    const {robots, searchfield} = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    if (!robots.length) {
      return <h1>Loading</h1>
    } else {
      return (
        <div>
      <h1 className="title">ROBOFRIENDS</h1>
      <SearchBox searchChange={this.onSearchChange}/>
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots}/>
        </ErrorBoundry>
      </Scroll>
       </div>
  )
  }
  
  }
}

export default App;