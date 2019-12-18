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
            <div className="form-board form-contact" style={{marginTop: "50px"}}>
            <div className="singlecontact">

                <h1 className="headerFont headerStyle glow">{currentContact.first_name} {currentContact.last_name}</h1>
                <div style={{color:"white"}}>
                    <div>{currentContact.location}</div>
                    <div>{currentContact.industry}</div>
                    <div>{currentContact.email_address}</div>
                    <div>{currentContact.phone_number}</div>
                    <div><a href = {`http://github.com/${currentContact.login}`} target = "_blank" style={{color:"white"}}>github.com/{currentContact.login}</a></div>
                    <div>Notes: {currentContact.notes}</div>
                    <div>Interests: {currentContact.tags.join(', ')}</div>
                </div>
                <br />
                {currentUser != currentContact.user_id ? null :
                <div className="buttons">
                    {deleteSuccess ? <Redirect to="/" />: null}
                    <Link to={`/contacts/${currentContact.id}/edit`}><button type="button" className="btn btn-danger" style = {{margin: "10px", width: "100px", backgroundColor:"#591481"}}>Edit</button></Link>
                    <button type="button" className="btn btn-danger" onClick = {this.localDelete} style = {{margin: "10px", width: "100px"}}>Delete</button>
                </div>
                }
            </div>
            </div>
        );
    }
}