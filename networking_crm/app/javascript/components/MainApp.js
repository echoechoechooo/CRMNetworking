import React from "react"
import PropTypes from "prop-types"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import { Nav, NavItem, NavLink } from 'reactstrap'
import Dashboard from "./pages/Dashboard"
import Contacts from "./pages/Contacts"
import Calendar from "./pages/Calendar"
import Todos from "./pages/Todos"
import Articles from "./pages/Articles"

export default class MainApp extends React.Component {
  render () {
    const { logged_in,sign_in_route, sign_out_route } = this.props
    return (
        <React.Fragment>
            <Router>
                <Nav>
                    <NavItem>
                      <NavLink href={logged_in ? sign_out_route:sign_in_route}>{logged_in ? "Sign Out" : "Sign In"}</NavLink>
                    </NavItem>
                    <NavItem>
                        <Link to="/dashboard" className = "nav-link">Dashboard</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/contacts" className = "nav-link">Contacts</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/calendar" className = "nav-link">Calendar</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/todos" className = "nav-link">Todos</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/articles" className = "nav-link">Articles</Link>
                    </NavItem>
                </Nav>
                <h1>about the project</h1>
                <h1>team bio stuff down here</h1>
                <Switch>
                    <Route path="/dashboard" render = {()=><Dashboard/>} />
                    <Route path="/contacts" render = {()=><Contacts/>} />
                    <Route path="/calendar" render = {()=><Calendar/>} />
                    <Route path="/todos" render = {()=><Todos/>} />
                    <Route path="/dashboard" render = {()=><Dashboard/>} />
                    <Route path="/articles" render = {()=><Articles/>} />
                </Switch>
            </Router>
        </React.Fragment>
    );
  }
}
