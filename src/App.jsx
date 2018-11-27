import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import AsyncComponent from '@component/AsyncComponent'
import LoadingBar from '@component/LoadingBar'
import { BASE_PATH } from './util/const'

const Layout = AsyncComponent(() => import('./Layout'))

@inject(
  'GlobalModel',
)
@observer
class App extends Component {
  render() {
    const { GlobalModel } = this.props
    const { loadingStatus } = GlobalModel

    return (
      <Router>
        <div className='container'>
          <Route exact path={ `${ BASE_PATH }/` } render={ () => <Redirect to={ `${ BASE_PATH }/app/home` } /> } />
          <Route path={ `${ BASE_PATH }/app` } component={ Layout } />
          {loadingStatus && <LoadingBar />}
          {process.env.NODE_ENV !== 'production' && <DevTools />}
        </div>
      </Router>
    )
  }
}

export default App