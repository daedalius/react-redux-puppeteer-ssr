/* eslint-disable react/no-unescaped-entities */
import * as React from 'react'

import './styles.css'
import { Switch, Route, Link } from 'react-router-dom'
import { Local } from './routes/Local'
import { Remote } from './routes/Remote'

export const Application = (): JSX.Element => {
  return (
    <div>
      <div>
        <Link to="/local">local</Link>
      </div>
      <div>
        <Link to="/remote">remote</Link>
      </div>
      <Switch>
        <Route path="/local">
          <Local />
        </Route>
        <Route path="/remote">
          <Remote />
        </Route>
        <Route path="/" redirectTo="/local" />
      </Switch>
    </div>
  )
}
