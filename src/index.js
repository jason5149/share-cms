import './polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import store from '@model'
import App from './App'
import '@asset/sass/index.scss'

render(
  <Provider { ...store }>
    <App />
  </Provider>,
  document.getElementById('root'),
)

/* eslint-disable-next-line */
console.info(`当前环境：${ APP_ENV }`)
/* eslint-disable-next-line */
console.info(`当前版本：${ APP_VERSION }`)