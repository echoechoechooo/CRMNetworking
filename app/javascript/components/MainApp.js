import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import { Nav, NavItem, NavLink} from 'reactstrap'
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
import logo from "./logo.svg"
import {Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from './Alerts'

let endPointArray =["contacts", "todos"]
const firstWidth = {
    "--firstWidth": "5%"
}

const sideWidth = {
    "--sideWidth": "20%"
}
const alertOptions = {
    timeout: 3000,
    position: 'top center'
}

export default class MainApp extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            contacts: [],
            todos: [],
            githubMembers: [],
            articles: {},
            width: 0,
            navBarExpanded: false,
            cantDeleteTag: false 
        }
    }
    componentDidMount (){
        for(let i = 0; i < endPointArray.length; i++){
            this.fetchIt(endPointArray[i])
        }
        this.fetchArticles()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.updateWindowDimensions()
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions = () => {
        let winWidth = window.innerWidth
        let nuFirst = winWidth > 1250 ? 5: winWidth < 1000 ? 10: 5 - 0.1 * (1250 - winWidth)/10
        let nuSide = 20 + 5 - nuFirst
        Object.keys(firstWidth).map(key => {
            firstWidth[key] = `${nuFirst}%`
            const value = firstWidth[key]
            document.documentElement.style.setProperty(key, value)
        })
        Object.keys(sideWidth).map(key => {
            sideWidth[key] = `${nuSide}%`
            const value = sideWidth[key]
            document.documentElement.style.setProperty(key, value)
        })
        this.setState({width: winWidth})
    }

    deleteTagPress = (canDelete, tag) => {
        if(!canDelete){
            this.setState({cantDeleteTag: !this.state.cantDeleteTag})
        }
        else {
            let {current_user} = this.props
            current_user.tags = current_user.tags.filter(t => t != tag)
            this.updateUserTags()
        }
    }

    updateUserTags = () => {
        let {current_user} = this.props
        let url = '/updateusertags'
        return fetch(url, {
            method: 'PUT',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(current_user)
        }).then(response => {
            if(response.status === 201){
              this.fetchArticles()
            }
        })
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

    fetchArticles = () => {
        if(this.props.current_user == null){
            return
        }
        let tags = this.props.current_user.tags
        for(let i = 0; i < tags.length; i++){
            var url = 'https://newsapi.org/v2/everything?' +
            `q=${tags[i]}&` +
            'from=2019-12-17&' +
            'sortBy=popularity&' +
            'apiKey=25ad034c5f0c45f8bf67762c1aa42371';
            fetch(url)
            .then(response => {
                return response.json()
            })
            .then(output => {
                let a = output.articles
                for(let j = 0; j < a.length; j++){
                    a[j]["tag"] = tags[i]
                }
                let {articles} = this.state
                articles[tags[i]] = a
                this.setState({articles})
            })
        }
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

    openNavbar = () => {
        this.setState({navBarExpanded: !this.state.navBarExpanded})
    }

    render () {
        const { logged_in,sign_in_route, sign_out_route, current_user_id, current_user } = this.props
        const {contacts, todos, width, articles} = this.state
        return (
            <div>
                <AlertProvider template = {AlertTemplate} {...alertOptions} >
                    <Router>
                        <Alerts cantDeleteTag = {this.state.cantDeleteTag} />
                        <Switch>
                            <Route exact path="/" render = {()=><Dashboard contacts = {contacts} todos = {todos} width = {width} articles = {articles} current_user = {current_user} fetchArticles = {this.fetchArticles} deleteTagPress = {this.deleteTagPress} />} />
                        </Switch>
                        <Nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#0E0426"}}>
                            <button className={this.state.navBarExpanded ? "navbar-toggler": "navbar-toggler collapsed"} type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded={this.state.navBarExpanded} aria-label="Toggle navigation" onClick = {this.openNavbar}>
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className={!this.state.navBarExpanded ? "collapse navbar-collapse": "collapse navbar-collapse show"}  id="navbarColor02">
                                <ul className="navbar-nav mr-auto">
                                    <NavItem>
                                        <img src ={logo} />
                                    </NavItem>
                                    <NavItem className = "nav-item">
                                        <Link to="/" className = "nav-link headerFont">Dashboard</Link>
                                    </NavItem>
                                    <NavItem className = "nav-item">
                                        <Link to="/contacts" className = "nav-link headerFont">Contacts</Link>
                                    </NavItem>
                                    <NavItem className = "nav-item">
                                        <Link to="/todos" className = "nav-link headerFont">Todos</Link>
                                    </NavItem>
                                    <NavItem className = "nav-item">
                                        <Link to="/articles" className = "nav-link headerFont">Articles</Link>
                                    </NavItem>
                                    <NavItem className = "nav-item">
                                    <NavLink className = "headerFont" href={logged_in ? sign_out_route:sign_in_route}>{logged_in ? "Sign Out" : "Sign In"}</NavLink>
                                    </NavItem>
                                </ul>
                            </div>
                        </Nav>
                        <Switch>
                            <Route exact path="/contacts" render = {()=><Contacts contacts = {contacts}/>} />
                            <Route exact path="/contacts/:id" render = {(props)=><ShowContact {...props} currentUser = {current_user_id} deleteContact = {this.delete}/>} />
                            <Route exact path="/newcontact" render = {(props)=><NewContact {...props} onSubmit = {this.add}/>}/>
                            <Route exact path = "/contacts/:id/edit" render = {(props) => <EditContact {...props} onSubmit = {this.edit}/>} />
                            <Route exact path="/todos" render = {()=><Todos todos = {todos} onSubmit = {this.edit}/>} />
                            <Route exact path="/newtodo" render = {(props)=><NewTodo {...props} onSubmit = {this.add}/>}/>
                            <Route exact path = "/todos/:id/edit" render = {(props) => <EditTodo {...props} onSubmit = {this.edit} deleteTodo = {this.delete}  />} />
                            <Route exact path="/calendar" render = {()=><Calendar/>} />
                            <Route exact path="/articles" render = {(props)=><Articles {...props} articles = {articles}/>} />
                        </Switch>
                    </Router>
                </AlertProvider>
            </div>
        );
    }
}
