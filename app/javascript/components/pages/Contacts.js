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
          <th scope="row">
            <p>
              {contact.first_name} {contact.last_name}
            </p>
          </th>
          <th>{contact.location}</th>
          <th>{contact.industry}</th>
          <th>{contact.email_address}</th>
          <th>{contact.phone_number}</th>
          <th>{contact.login}</th>
          <th>{contact.notes}</th>
        </tr>
      )
    })
    return (
      <div>
        <Table striped style={{backgroundColor:"#361077", color:"white"}}>
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
