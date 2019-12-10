import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import { Nav, NavItem, NavLink, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import Dashboard from "./pages/Dashboard"
import Contacts from "./pages/Contacts"
import NewContact from "./pages/NewContact"
import ShowContact from "./pages/ShowContact"
import EditContact from "./pages/EditContact"
import Todos from "./todos/Todos"
import NewTodo from "./todos/NewTodo"
import EditTodo from "./todos/EditTodo"
import Calendar from "./pages/Calendar"
import Articles from "./pages/Articles"
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
        for(let i = 0; i < endPointArray.length; i++){
            this.fetchIt(endPointArray[i])
        }
    }

    fetchIt = (input) => {
        fetch(`/${input}/`)
        .then(resp => {
            return resp.json()})
        .then(output => {
            switch(input){
                case endPointArray[0]:
                    this.setState({contacts: output})
                    break
                case endPointArray[1]:
                    this.setState({todos: output})
                    break
            }
        })
    }

    add = (attrs, type) => {
        return fetch(`/${type}`, {
            method: 'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(this.getBodyObject(attrs,type))
        }).then(response => {
            if(response.status === 201){
                this.fetchIt(type)
            }
        })
    }

    getBodyObject = (attrs, type) => {
        switch(type){
            case endPointArray[0]:
                return {contact: attrs}
            case endPointArray[1]:
                return {todo: attrs}
        }
    }

    edit = (attrs, id, type) => {
        let url = `/${type}/${id}`
        return fetch(url, {
            method: 'PUT',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(this.getBodyObject(attrs,type))
        }).then(response => {
            if(response.status === 201){
                this.fetchIt(type)
            }
        })
    }

    delete = (id, type) => {
        let url = `/${type}/${id}`
        return fetch(url, {
            method: 'DELETE'
        }).then(resp => {
            if(resp.status === 400){
                console.log("error")
            }
            else {
                this.fetchIt(type)
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
                    <Route exact path="/" render = {()=><Dashboard contacts = {contacts} todos = {todos} />} />
                </Switch>
                <Nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{backgroundColor: "black"}}>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav mr-auto">
                            <NavItem className = "nav-item">
                              <NavLink href={logged_in ? sign_out_route:sign_in_route}>{logged_in ? "Sign Out" : "Sign In"}</NavLink>
                            </NavItem>
                            <NavItem className = "nav-item">
                                <Link to="/" className = "nav-link">Dashboard</Link>
                            </NavItem>
                            <NavItem className = "nav-item">
                                <Link to="/contacts" className = "nav-link">Contacts</Link>
                            </NavItem>
                            <NavItem className = "nav-item">
                                <Link to="/todos" className = "nav-link">Todos</Link>
                            </NavItem>
                            <NavItem className = "nav-item">
                                <Link to="/calendar" className = "nav-link">Calendar</Link>
                            </NavItem>
                            <NavItem className = "nav-item">
                                <Link to="/articles" className = "nav-link">Articles</Link>
                            </NavItem>
                        </ul>
                    </div>
                </Nav>
                <Switch>
                    <Route exact path="/contacts" render = {()=><Contacts contacts = {contacts}/>} />
                    <Route exact path="/contacts/:id" render = {(props)=><ShowContact {...props} currentUser = {current_user_id} deleteContact = {this.delete}/>} />
                    <Route exact path="/newcontact" render = {(props)=><NewContact {...props} onSubmit = {this.add}/>}/>
                    <Route path = "/contacts/:id/edit" render = {(props) => <EditContact {...props} onSubmit = {this.edit}/>} />
                    <Route exact path="/todos" render = {()=><Todos todos = {todos} onSubmit = {this.edit}/>} />
                    <Route exact path="/newtodo" render = {(props)=><NewTodo {...props} onSubmit = {this.add}/>}/>
                    <Route path = "/todos/:id/edit" render = {(props) => <EditTodo {...props} onSubmit = {this.edit} deleteTodo = {this.delete}  />} />
                    <Route exact path="/calendar" render = {()=><Calendar/>} />
                    <Route exact path="/articles" render = {()=><Articles/>} />
                </Switch>
            </Router>
        </React.Fragment>
    );
  }
}
