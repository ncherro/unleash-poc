import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      toggles: {},
      userId: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleReload = this.handleReload.bind(this);
  }

  componentDidMount() {
    this.fetchToggles()
  }

  fetchToggles() {
    const state = this.state
    this.setState({
      ...state,
      error: null,
      isLoaded: false,
      toggles: {},
    })
    const { userId } = state
    const qs = userId ? `?userid=${userId}` : ''
    fetch(`/api/toggles${qs}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            ...state,
            isLoaded: true,
            toggles: result.toggles
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            ...state,
            isLoaded: true,
            error
          });
        }
      )
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      userId: e.target.value
    })
  }

  handleReload(e) {
    this.fetchToggles()
  }

  renderForm() {
    const { userId } = this.state
    return (
      <div>
        <input placeholder="User ID" onChange={this.handleChange} value={userId} /> <button onClick={this.handleReload}>Reload</button>
      </div>
    )
  }

  renderContent() {
    const { error, isLoaded, toggles } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {Object.keys(toggles).map((keyName, i) => (
            <li key={keyName}>
              {keyName} - {toggles[keyName] ? '✅' : '❌'}
            </li>
          ))}
        </ul>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          { this.renderForm() }
          { this.renderContent() }
        </header>
      </div>
    )
  }
}

export default App;
