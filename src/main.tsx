import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Application } from '#components/Application'
import { Provider } from 'react-redux'
import { getStore } from './store'

// [SSR]
const prerenderedStateString = document.querySelector('[data-redux-store-state]')
if (prerenderedStateString) console.log('Using prerendered SSR state...')
const store = prerenderedStateString ? getStore(JSON.parse(prerenderedStateString.textContent)) : getStore()

if (document.querySelector('#app').childNodes.length) {
  // [SSR] Hydration of recieved page
  console.log('Hydrating...')

  ReactDOM.hydrate(
    <Provider store={store}>
      <Router>
        <Application />
      </Router>
    </Provider>,
    window.document.querySelector('#app')
  )
} else {
  // [SSR] Prerendering in pupeteer OR no SSR flow (SPA)
  console.log('Rendering...')

  // [SSR] Special function to access in puppeteer
  document.serializeReduxStore = () => {
    const newElement = document.createElement('div')
    newElement.setAttribute('data-redux-store-state', '')
    newElement.style.display = 'none'
    newElement.innerText = JSON.stringify(store.getState())
    document.body.appendChild(newElement)
  }

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Application />
      </Router>
    </Provider>,
    window.document.querySelector('#app')
  )
}
