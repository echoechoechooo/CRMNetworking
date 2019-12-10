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
let endPointArray =["contacts", "todos"]

export default class MainApp extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            contacts: [],
            todos: [],
            githubMembers: []
        }
    }
    componentDidMount (){

        fetch("/contacts")
        .then(resp => {
            return resp.json()})
        .then(contacts => {
            this.setState({contacts: contacts})})
        fetch("/todos")
        .then(resp => {
            return resp.json()})
        .then(todos => {
            this.setState({todos: todos})
        })
    
    }
    
    
    clickIt = () => {

    }

  render () {
    const { logged_in,sign_in_route, sign_out_route } = this.props
    const {contacts, todos} = this.state
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/dashboard" render = {()=><Dashboard/>} />
                    <Route path="/contacts" render = {()=><Contacts contacts = {contacts}/>} />
                    <Route path="/calendar" render = {()=><Calendar/>} />
                    <Route path="/todos" render = {()=><Todos todos = {todos}/>} />
                    <Route path="/articles" render = {()=><Articles/>} />
                </Switch>
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
            </Router>
        </React.Fragment>
    );
  }
}
