import React from "react"
import {Link, Redirect} from "react-router-dom"

export default class ShowContact extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentContact: null,
            contactId: -1,
            deleteSuccess: false
        }
    }

    getCurrentContact = () => {
        let id = this.props.match.params.id
        if(id == this.state.contactId){
            return
        }
        let url = "/contacts/" + this.props.match.params.id.toString()
        fetch(url)
        .then(resp => {
            return resp.json()})
            .then(contact => {
                this.setState({currentContact: contact, contactId: id})})
    }

    localDelete = () => {
        const{contactId} = this.state
        if(contactId < 1){
            return
        }
        const{deleteContact} = this.props
        deleteContact(contactId, "contacts").then(() => {
            this.setState({deleteSuccess:true})
        })
    }

  render () {
        this.getCurrentContact()
        const{currentContact, deleteSuccess} = this.state
        const{currentUser} = this.props
        if(currentContact == null){
            return (
              <div></div>
            );
        }
        return (
            <div className="singlecontact">

                <h1>{currentContact.first_name} {currentContact.last_name}</h1>
                {currentContact.location}
                <br />
                {currentContact.industry}
                <br />
                {currentContact.email_address}
                <br />
                {currentContact.phone_number}
                {currentUser != currentContact.user_id ? null :
                <div className="buttons">
                    {deleteSuccess ? <Redirect to="/" />: null}
                    <Link to={`/contacts/${currentContact.id}/edit`}><button type="button" class="btn btn-outline-primary" style = {{margin: "10px", width: "100px"}}>Edit</button></Link>
                    <button type="button" class="btn btn-outline-primary" onClick = {this.localDelete} style = {{margin: "10px", width: "100px"}}>Delete</button>
                </div>
                }
            </div>
        );
    }
}
