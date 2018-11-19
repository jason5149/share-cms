import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import DevTools from 'mobx-react-devtools'
import Layout from './Layout'

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Route exact path='/' render={ () => <Redirect to='/app/home' /> }  />
          <Route path='/app' component={ Layout }  />
          {process.env.NODE_ENV !== 'production' && <DevTools />}
        </div>
      </Router>
    )
  }
}

export default App