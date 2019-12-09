import React from "react"
import Sidebar from "react-sidebar";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import NewContact from "./NewContact";


import addButton from "../../images/plusButton.png"

export default class Dashboard extends React.Component {

    openContact = (id) => {
        console.log(id)
    }

    addContact = () => {

    }

    render () {
        const{contacts} = this.props
        let contactList =  contacts.map(contact => {
            return (
                <tr onClick = {() => this.openContact(contact.id)} className="table-active">
                        <td style={{padding: "0px 0px 0px 0px"}}>
                            <Link to = {`/contacts/${contact.id}`} style={{fontSize: "20px", padding: "0px 0px 0px 10px"}}>{contact.first_name} {contact.last_name}</Link>
                            <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px"}}>{contact.industry}</h3>
                        </td>
                    </tr>)
        })

        return (

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
