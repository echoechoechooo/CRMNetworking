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
        console.log("clicked")
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
// <div className="col-lg-4">
// <div className="bs-component">
//   <div className="list-group">
//     <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
//       <div className="d-flex w-100 justify-content-between">
//         <h5 className="mb-1">List group item heading</h5>
//         <small>3 days ago</small>
//       </div>
//       <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
//       <small>Donec id elit non mi porta.</small>
//     </a>
//     <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
//       <div className="d-flex w-100 justify-content-between">
//         <h5 className="mb-1">List group item heading</h5>
//         <small className="text-muted">3 days ago</small>
//       </div>
//       <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
//       <small className="text-muted">Donec id elit non mi porta.</small>
//     </a>
//   </div>
// <button className="source-button btn btn-primary btn-xs" role="button" tabindex="0">&lt; &gt;</button></div>
// </div>
// <ListGroup>
//   <ListGroupItem>Cras justo odio</ListGroupItem>
//   <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
//   <ListGroupItem>Morbi leo risus</ListGroupItem>
//   <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
//   <ListGroupItem>Vestibulum at eros</ListGroupItem>
// </ListGroup>
//
// <div>
//     <Nav vertical className="navbar navbar-dark bg-dark">
//         <NavItem className = "nav-item btn btn-outline-success">
//           <NavLink className = "btn-outline-success" href="#">Link</NavLink>
//         </NavItem>
//         <NavItem className = "nav-item btn btn-outline-success">
//           <NavLink className = "btn-outline-success" href="#">Link</NavLink>
//         </NavItem>
//         <NavItem className = "nav-item">
//           <button onClick = {this.clickIt} style ={{backgroundColor: 'red'}} className = "btn-outline-success">Another Link</button>
//         </NavItem>
//         <NavItem>
//           <NavLink className = "btn-outline-success" disabled href="#">Disabled Link</NavLink>
//         </NavItem>
//     </Nav>
// </div>
