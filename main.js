import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'
import { helloSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))

const action = type => store.dispatch({ type })

sagaMiddleware.run(helloSaga);

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
