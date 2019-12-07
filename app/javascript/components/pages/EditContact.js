import React from "react"
import {Redirect} from 'react-router-dom'
import
    { Nav, NavItem, NavLink, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'


export default class EditContact extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        contactId: -1,
        form: {
            first_name: "",
            last_name: ""
        },
        editSuccess: false
    }
}

getCurrentContact = () => {
    let id = this.props.match.params.id
    if(id == this.state.contactId){
        return
    }
    let url = "/contacts/" + this.props.match.params.id.toString() + "/edit"
    fetch(url)
    .then(resp => {
        return resp.json()})
        .then(contact => {
            let{form} = this.state
            form["first_name"] = contact.first_name
            form["last_name"] = contact.last_name
            this.setState({form, contactId: id})})
}

onChange = (e) => {
    const{form} = this.state
    const{name,value} = e.target
    form[name] = value
    this.setState({form})
}

localSubmit= () => {
    const{onSubmit} = this.props
    const{form, contactId} = this.state
    onSubmit(form,contactId).then(response =>{
        this.setState({editSuccess: true})
    })
}


  render () {
      this.getCurrentContact()
      const{form, contactId, editSuccess} = this.state
      const{first_name, last_name} = form
      if(form.first_name == ""){
          return (
            <div></div>
          );
      }
      return (
        <React.Fragment>
            {editSuccess ? <Redirect to={"/contacts/" + contactId.toString()} />: null}
            <h1>Edit Contact</h1>
            <div>
                <label>First Name</label>
                <input name="first_name" value = {first_name} onChange = {this.onChange} type = 'text' />

            </div>
            <div>
              <label>Last Name</label>
              <input name="last_name" value = {last_name} onChange = {this.onChange} type = 'text' />
            </div>
            <button onClick={this.localSubmit}>Submit</button>
        </React.Fragment>
      );
  }
}
