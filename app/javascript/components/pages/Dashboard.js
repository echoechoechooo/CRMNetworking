import React from "react"
import Sidebar from "react-sidebar";
import {Link} from "react-router-dom";
import { Table } from 'reactstrap'
import "../../fonts.css"


import addButton from "../../images/plusButton.png"

export default class Dashboard extends React.Component {

    getColor = (isNull) => {
      if(isNull){
        return "transparent"
      }
      return "black"
    }
    render () {
        const{contacts, todos} = this.props
        let contactList =  contacts.map(contact => {
            return (
                <tr key = {contact.id} className="table-active">
                    <td style={{padding: "0px 0px 0px 0px"}}>
                        <Link to = {`/contacts/${contact.id}`} style={{fontSize: "20px", padding: "0px 0px 0px 10px"}}>{contact.first_name} {contact.last_name}</Link>
                        <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px"}}>{contact.industry}</h3>
                    </td>
                </tr>)
        })
        let todoList = todos.filter(todo => !todo.is_done).map(todo => {
          return (
            <tr key = {todo.id} className="table-active">
                <td style={{padding: "0px 0px 0px 0px"}}>
                    <Link to = {`/todos/${todo.id}/edit`} style={{fontSize: "20px", padding: "0px 0px 0px 10px", fontFamily: 'houseonmars'}}>{todo.title}</Link>
                    <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px", "color": (this.getColor(todo.due_date === null))}}>{new Date(todo.due_date).toLocaleDateString()} {new Date(todo.due_date).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</h3>
                </td>
            </tr>)
        })

        return (
          <div>
            <Sidebar
            children={<div></div>}
            sidebar={
                <table className="table table-hover" style = {{width: "15vw"}}>
                  <thead>
                    <tr>
                      <th scope="col" style = {{fontSize: "24px", padding: "10px 0px 10px 0px"}}>Contacts<Link to = {"/newcontact"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactList}
                  </tbody>
                </table> }
            docked = {true}
            transitions = {false}
            styles={{ sidebar: { top: "90px", background: "white"}, overlay: { backgroundColor:'clear', zIndex: -10 } }}
            >
            </Sidebar>

            <Sidebar
            children={<div></div>}
            sidebar={
                <table className="table table-hover" style = {{width: "15vw"}}>
                  <thead>
                    <tr>
                      <th scope="col" style = {{fontSize: "24px", padding: "10px 0px 10px 0px"}}>Todos<Link to = {"/newcontact"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                    </tr>
                  </thead>
                  <tbody>
                    {todoList}
                  </tbody>
                </table> }
            docked = {true}
            transitions = {false}
            styles={{ sidebar: { top: "90px", background: "white"}, overlay: { backgroundColor:'clear', zIndex: -10 }, root: {left: "85vw"} }}
            >
            </Sidebar>
          </div>
        );
    }
}

// <tr onClick = {this.clickIt}>
//     <th scope="row">Default</th>
// </tr>
// <tr className="table-primary">
//   <th scope="row">Primary</th>
// </tr>
// <tr className="table-secondary">
//   <th scope="row">Secondary</th>
// </tr>
// <tr className="table-success">
//   <th scope="row">Success</th>
// </tr>
// <tr className="table-danger">
//   <th scope="row">Danger</th>
// </tr>
// <tr className="table-warning">
//   <th scope="row">Warning</th>
// </tr>
// <tr className="table-info">
//   <th scope="row">Info</th>
// </tr>
// <tr className="table-light">
//   <th scope="row">Light</th>
// </tr>
// <tr className="table-dark">
//   <th scope="row">Dark</th>
// </tr>
