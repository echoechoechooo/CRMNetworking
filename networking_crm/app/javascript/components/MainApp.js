import React from "react"
import PropTypes from "prop-types"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import { Nav, NavItem, NavLink, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import Dashboard from "./pages/Dashboard"
import Contacts from "./pages/Contacts"
import Calendar from "./pages/Calendar"
import Todos from "./pages/Todos"
import Articles from "./pages/Articles"
import "bootswatch/dist/lux/bootstrap.min.css";
import Sidebar from "react-sidebar";

export default class MainApp extends React.Component {

    clickIt = () => {

    }

  render () {
    const { logged_in,sign_in_route, sign_out_route } = this.props
    return (
        <React.Fragment>
            <Router>
                <Sidebar
                children={<div></div>}
                sidebar={
                    <table className="table table-hover" style = {{width: "15vw"}}>
                      <thead>
                        <tr>
                          <th scope="col" style = {{fontSize: "30px", padding: "10px 0px 10px 0px"}}>Contacts</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr onClick = {this.clickIt} className="table-active">
                            <td style={{padding: "0px 0px 0px 0px"}}>
                                <h3 style={{fontSize: "20px", padding: "0px 0px 0px 10px"}}>John Doe</h3>
                                <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px"}}>Connect with John!</h3>
                            </td>
                        </tr>
                        <tr onClick = {this.clickIt} className="table-active">
                            <td style={{padding: "0px 0px 0px 0px"}}>
                                <h3 style={{fontSize: "20px", padding: "0px 0px 0px 10px"}}>Jane Doe</h3>
                                <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px"}}>Connect with Jane!</h3>
                            </td>
                        </tr>
                        <tr onClick = {this.clickIt}>
                            <th scope="row">Default</th>
                        </tr>
                        <tr className="table-primary">
                          <th scope="row">Primary</th>
                        </tr>
                        <tr className="table-secondary">
                          <th scope="row">Secondary</th>
                        </tr>
                        <tr className="table-success">
                          <th scope="row">Success</th>
                        </tr>
                        <tr className="table-danger">
                          <th scope="row">Danger</th>
                        </tr>
                        <tr className="table-warning">
                          <th scope="row">Warning</th>
                        </tr>
                        <tr className="table-info">
                          <th scope="row">Info</th>
                        </tr>
                        <tr className="table-light">
                          <th scope="row">Light</th>
                        </tr>
                        <tr className="table-dark">
                          <th scope="row">Dark</th>
                        </tr>
                      </tbody>
                    </table> }
                docked = {true}
                transitions = {false}
                styles={{ sidebar: { top: "90px", background: "white"}, overlay: { backgroundColor:'clear', zIndex: -10 } }}
                >
                </Sidebar>
                <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav mr-auto">
                            <NavItem className = "nav-item">
                              <NavLink href={logged_in ? sign_out_route:sign_in_route}>{logged_in ? "Sign Out" : "Sign In"}</NavLink>
                            </NavItem>
                            <NavItem className = "nav-item">
                                <Link to="/dashboard" className = "nav-link">Dashboard</Link>
                            </NavItem>
                            <NavItem className = "nav-item">
                                <Link to="/contacts" className = "nav-link">Contacts</Link>
                            </NavItem>
                            <NavItem className = "nav-item">
                                <Link to="/calendar" className = "nav-link">Calendar</Link>
                            </NavItem>
                            <NavItem className = "nav-item">
                                <Link to="/todos" className = "nav-link">Todos</Link>
                            </NavItem>
                            <NavItem className = "nav-item">
                                <Link to="/articles" className = "nav-link">Articles</Link>
                            </NavItem>
                        </ul>
                    </div>
                </Nav>
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
