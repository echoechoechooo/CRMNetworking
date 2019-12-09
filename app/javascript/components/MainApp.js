import React from "react"
import PropTypes from "prop-types"
import "./MainApp.css"
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
import NewContact from "./pages/NewContact"
import ShowContact from "./pages/ShowContact"
import EditContact from "./pages/EditContact"
import "bootswatch/dist/lux/bootstrap.min.css"
let endPointArray =["contacts", "todos"]

export default class MainApp extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            contacts: [],
            todos: []
        }
    }
    componentDidMount (){

        fetch("/contacts")
        .then(resp => {
            return resp.json()})
        .then(contacts => {
            this.setState({contacts: contacts})
        })
    }



    clickIt = () => {

    }

    getContacts = () => {
        fetch("/contacts")
        .then(resp => {
            return resp.json()})
            .then(apts => {
                this.setState({contacts: apts})})
    }

    addContact = (attrs) => {
        return fetch("/contacts", {
            method: 'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({contact:attrs})
        }).then(response => {
            if(response.status === 201){
                this.getContacts()
            }
        })
    }

    editContact = (attrs, id) => {
        let url = "/contacts/" + id.toString()
        return fetch(url, {
            method: 'PUT',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({contact:attrs})
        }).then(response => {
            if(response.status === 201){
                this.getContacts()
            }
        })
    }

    deleteContact = (id) => {
        let url = "/contacts/" + id.toString()
        return fetch(url, {
            method: 'DELETE'
        }).then(resp => {
            if(resp.status === 400){
                console.log("error")
            }
            else {
                this.getContacts()
            }
        })
    }

  render () {
    const { logged_in,sign_in_route, sign_out_route, current_user_id } = this.props
    const {contacts, todos} = this.state
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" render = {()=><Dashboard contacts = {contacts} />} />
                </Switch>
                <Nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{backgroundColor: "black"}}>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav mr-auto">
                            <NavItem className = "nav-item">
                                <Link to="/" className = "nav-link">Dashboard</Link>
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
                            <NavItem className = "nav-item">
                              <NavLink href={logged_in ? sign_out_route:sign_in_route}>{logged_in ? "Sign Out" : "Sign In"}</NavLink>
                            </NavItem>
                        </ul>
                    </div>
                </Nav>
                <Switch>
                    <Route exact path="/contacts" render = {()=><Contacts contacts = {contacts}/>} />
                    <Route exact path="/contacts/:id" render = {(props)=><ShowContact {...props} currentUser = {current_user_id} deleteContact = {this.deleteContact}/>} />
                    <Route exact path="/calendar" render = {()=><Calendar/>} />
                    <Route exact path="/todos" render = {()=><Todos todos = {todos}/>} />
                    <Route exact path="/articles" render = {()=><Articles/>} />
                    <Route exact path="/newcontact" render = {(props)=><NewContact {...props} onSubmit = {this.addContact}/>}/>
                    {!logged_in ? null : <Route path = "/contacts/:id/edit" render = {(props) => <EditContact {...props} onSubmit = {this.editContact} />} />}
                </Switch>
            </Router>
        </React.Fragment>
    );
  }
}
