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
        deleteContact(contactId).then(() => {
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
            <div>
                <h1>{currentContact.id}</h1>
                {currentUser != currentContact.user_id ? null :
                <div>
                    {deleteSuccess ? <Redirect to="/" />: null}
                    <Link to={`/contacts/${currentContact.id}/edit`}>Edit</Link>
                    <button onClick = {this.localDelete}>Delete</button>
                </div>
                }
            </div>
        );
    }
}
