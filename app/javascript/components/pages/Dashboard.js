import React from "react"
import Sidebar from "react-sidebar";
import {Link} from "react-router-dom";
import { Table } from 'reactstrap'
import Calendar from 'react-calendar';
import addButton from "../../images/plusButton.png"
import "../CalendarAlt.css"
import bird from "./bird.jpg"

export default class Dashboard extends React.Component {
    state = {
      date: new Date(),
    }
    onChange = date => this.setState({ date })
    getColor = (isNull) => {
      if(isNull){
        return "transparent"
      }
      return "white"
    }

    getCalender = () => {
      return(
      <div className = "calendarParent">
        <div className = "widget calendarWidget">
          <Calendar onChange={this.onChange} value={this.state.date} className = "calendarBackground" tileClassName = "calendarDays"/>
        </div>
        <div className = "calendarSpacing widget"></div>
        <div className = "sideCalendarWidget widget">
          <table className="contactTable table-hover">
            <thead>
              <tr>
                <th className = "headerFont tableTitle" scope="col"> {this.state.date.toLocaleDateString()}
                </th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table> 
        </div>
      </div>)
    }

    render () {
        const{contacts, todos, width} = this.props
        let contactList =  contacts.map((contact, dex) => {
            return (
                <tr key = {contact.id} className={dex == 0 ? "tableRowTop" : "tableRow"}>
                    <td style={{padding: "0px 0px 0px 0px"}}>
                        <Link to = {`/contacts/${contact.id}`} style={{fontSize: "20px", padding: "0px 0px 0px 10px", color: "white"}}>{contact.first_name} {contact.last_name}</Link>
                        <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px", color: "white"}}>{contact.industry != null & contact.industry != "" ? contact.industry: contact.first_name != null & contact.first_name != "" ? `Connect with ${contact.first_name}!`: `Connect with ${contact.login}!`}</h3>
                    </td>
                </tr>)
        })
        let todoList = todos.filter(todo => !todo.is_done).map((todo, dex) => {
          return (
            <tr key = {todo.id} className={dex == 0 ? "tableRowTop" : "tableRow"}>
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

              <div className = "sideWidget widget">
                <table className="contactTable table-hover">
                  <thead>
                    <tr>
                      <th className = "headerFont tableTitle" scope="col">Contacts<Link to = {"/newcontact"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                    </tr>
                  </thead>
                  <tbody className="sidebar">
                    {contactList}
                  </tbody>
                </table>
              </div>

              {width <= 1000 ? null : <div className = "firstSpacing widget"/>}
              {width <= 1000 ? null : this.getCalender()}
              
              <div className = "firstSpacing widget"/>
              
              <div className = "sideWidget widget">
                <table className="contactTable table-hover">
                  <thead>
                    <tr>
                      <th className = "headerFont tableTitle" scope="col">Todos<Link to = {"/newtodo"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                    </tr>
                  </thead>
                  <tbody>
                    {todoList}
                  </tbody>
                </table> 
              </div>
              <div className = "endSpacing widget"/>

              {width > 1000 ? null: 
                <div className = "widgetParent2">
                  <div className = "endSpacing widget"/>
                    {this.getCalender()}
                  <div className = "endSpacing widget" />
              </div>}
              <div className = {width > 1000 ? "widgetParent2" : "widgetParent3"}>
                <div className = "endSpacing widget"/>
                <div className = "articlesWidget widget">
                  <table className="contactTable table-hover">
                    <thead>
                      <tr>
                        <th className = "headerFont tableTitle" scope="col">Articles<Link to = {"/"} style={{padding: "0px 0px 0px 10px", float: "right"}}></Link></th>
                      </tr>
                    </thead>
                    <tbody>
                    <div className="flex">
                      <div className="flex-item">
                        <img className = "articleThumbnail" src = {bird} />
                        <h1 className = "articleTitle">All About Them Birds</h1>
                        <div className = "tagFlex">
                          <div className = "flex-tag">
                            <h1 className = "tagTitle">Nature</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    </tbody>
                  </table>
                </div>
              <div className = "endSpacing widget" />
            </div>
            </div>
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