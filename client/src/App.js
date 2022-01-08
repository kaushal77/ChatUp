import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Chat from './Components/Chat'
import Login from './Components/Login'

const App = () => (
  <Router>
      <Route path='/chat' exact component={Chat} />
      <Route path='/' exact component={Login} />
  </Router>
)

export default App;