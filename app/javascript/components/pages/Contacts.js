import React from "react"
import { Table } from 'reactstrap'
import
    { Nav, NavItem, NavLink, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import {Link} from 'react-router-dom'
import Todos from "../todos/Todos"


export default class Contacts extends React.Component {
  render () {
    const{contacts} = this.props
    let contactList = contacts.map(contact => {
      return (
        <tr key = {contact.id}>
          <th><p><Link to = {`/contacts/${contact.id}`} style={{color: "white"}}>{contact.first_name} {contact.last_name}</Link></p></th>
          <th><p><Link to = {`/contacts/${contact.id}`} style={{color: "white"}}>{contact.location}</Link></p></th>
          <th><p><Link to = {`/contacts/${contact.id}`} style={{color: "white"}}>{contact.industry}</Link></p></th>
          <th><p><Link to = {`/contacts/${contact.id}`} style={{color: "white"}}>{contact.email_address}</Link></p></th>
          <th><p><Link to = {`/contacts/${contact.id}`} style={{color: "white"}}>{contact.phone_number}</Link></p></th>
          <th><p><Link to = {`/contacts/${contact.id}`} style={{color: "white"}}>{contact.login}</Link></p></th>
          <th><p><Link to = {`/contacts/${contact.id}`} style={{color: "white"}}>{contact.notes}</Link></p></th>
        </tr>
      )
    })
    return (
      <div>
        <Table striped style={{backgroundColor:"#361077", color:"white", tableLayout: "fixed"}}>
          <thead>
            <tr className="tableheaders">
              <th>Name</th>
              <th>Location</th>
              <th>Industry</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Github</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {contactList}
          </tbody>
        </Table>
        <div className="btn-placement">
        <Link to={"/newcontact"} style={{backgroundColor:"#591481"}} className="btn btn-danger">Add Contact</Link>
        </div>
      </div>
    );
  }
}
