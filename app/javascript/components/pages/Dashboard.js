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
      return "white"
    }
    render () {
        const{contacts, todos, width} = this.props
        let contactList =  contacts.map(contact => {
            return (
                <tr key = {contact.id} className="table-active">
                    <td style={{padding: "0px 0px 0px 0px"}}>
                        <Link to = {`/contacts/${contact.id}`} style={{fontSize: "20px", padding: "0px 0px 0px 10px", color: "white"}}>{contact.first_name} {contact.last_name}</Link>
                        <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px", color: "white"}}>{contact.industry != null & contact.industry != "" ? contact.industry: `Connect with ${contact.first_name}!`}</h3>
                    </td>
                </tr>)
        })
        let todoList = todos.filter(todo => !todo.is_done).map(todo => {
          return (
            <tr key = {todo.id} className="table-active">
                <td style={{padding: "0px 0px 0px 0px"}}>
                    <Link to = {`/todos/${todo.id}/edit`} style={{fontSize: "20px", padding: "0px 0px 0px 10px", color: 'white'}}>{todo.title}</Link>
                    <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px", "color": (this.getColor(todo.due_date === null))}}>{new Date(todo.due_date).toLocaleDateString()} {new Date(todo.due_date).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</h3>
                </td>
            </tr>)
        })

        return (
          <div>
            <div className = "widgetParent">

              <div className = "endSpacing widget"/>

              <div className = "contactWidget widget">
                <table className="contactTable table-hover">
                  <thead>
                    <tr>
                      <th className = "headerFont" scope="col" style = {{fontSize: "24px", padding: "10px 0px 10px 0px", color:"white"}}>Contacts<Link to = {"/newcontact"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                    </tr>
                  </thead>
                  <tbody className="sidebar">
                    {contactList}
                  </tbody>
                </table>
              </div>
              {width <= 750 ? null : <div className = "firstSpacing widget"/>}
              {width <= 750 ? null : 
              <div className = "calenderWidget widget">
                <table className="contactTable table-hover">
                  <thead>
                    <tr>
                      <th className = "headerFont" scope="col" style = {{fontSize: "24px", padding: "10px 0px 10px 0px", color:"white"}}>Contacts<Link to = {"/newcontact"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                    </tr>
                  </thead>
                  <tbody className="sidebar">
                    {contactList}
                  </tbody>
                </table>
              </div>}
              <div className = "firstSpacing widget"/>
              <div className = "todoWidget widget">
                <table className="contactTable table-hover">
                  <thead>
                    <tr>
                      <th className = "headerFont" scope="col" style = {{fontSize: "24px", padding: "10px 0px 10px 0px", color:"white"}}>Todos<Link to = {"/newtodo"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                    </tr>
                  </thead>
                  <tbody>
                    {todoList}
                  </tbody>
                </table> 
              </div>
              <div className = "endSpacing widget"/>

              {width > 750 ? null: <div className = "widgetParent2">
                <div className = "endSpacing widget"/>
                <div className = "calenderWidget widget">
                  <table className="contactTable table-hover">
                    <thead>
                      <tr>
                        <th className = "headerFont" scope="col" style = {{fontSize: "24px", padding: "10px 0px 10px 0px", color:"white"}}>Contacts<Link to = {"/newcontact"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                      </tr>
                    </thead>
                    <tbody className="sidebar">
                      {contactList}
                    </tbody>
                  </table>
                </div>
              <div className = "endSpacing widget" />
            </div>
              }
              <div className = "widgetParent2">
                <div className = "endSpacing widget"/>
                <div className = "articlesWidget widget">
                  <table className="contactTable table-hover">
                    <thead>
                      <tr>
                        <th className = "headerFont" scope="col" style = {{fontSize: "24px", padding: "10px 0px 10px 0px", color:"white"}}>Contacts<Link to = {"/newcontact"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                      </tr>
                    </thead>
                    <tbody className="sidebar">
                      {contactList}
                    </tbody>
                  </table>
                </div>
              <div className = "endSpacing widget" />
            </div>
            </div>
            {true ? null:
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
    }
          </div>
        );
    }
}

{/* <Sidebar
            children={<div></div>}
            sidebar={
                <table className="table table-hover" style = {{width: "15vw"}}>
                  <thead>
                    <tr>
                      <th className = "headerFont" scope="col" style = {{fontSize: "24px", padding: "10px 0px 10px 0px", color:"white"}}>Contacts<Link to = {"/newcontact"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                    </tr>
                  </thead>
                  <tbody className="sidebar">
                    {contactList}
                  </tbody>
                </table> }
            docked = {true}
            transitions = {false}
            styles={{ sidebar: { top: "90px", background: "#0E0422"}, overlay: { backgroundColor:'clear', zIndex: -10 } }}
            >
            </Sidebar> */}