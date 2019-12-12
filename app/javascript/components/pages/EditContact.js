import React from "react"
import {Redirect} from 'react-router-dom'
import {
      Nav,
      NavItem,
      NavLink,
      Container,
      Row,
      Col,
      Button,
      Form,
      FormGroup,
      Label,
      Input,
      ListGroup,
      ListGroupItem
     } from 'reactstrap'


export default class EditContact extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        contactId: -1,
        form: {
            first_name: "",
            last_name: "",
            location: "",
            industry: "",
            email_address: "",
            phone_number: "",
            notes: "",
            login: ""
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
            form["location"] = contact.location
            form["industry"] = contact.industry
            form["email_address"] = contact.email_address
            form["phone_number"] = contact.phone_number
            form["notes"] = contact.notes
            form["login"] = contact.login

            Object.keys(form).map(key => {
                if(form[key] == null){
                    form[key] = ""
                }
            })
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
      onSubmit(form, contactId, "contacts").then(response =>{
          this.setState({editSuccess: true})
      })
  }


  render () {
      this.getCurrentContact()
      const{form, contactId, editSuccess} = this.state
      const{first_name, last_name, location, industry, email_address, phone_number, notes, login} = form
      if(form.first_name == ""){
          return (
            <div></div>
          );
      }
      return (
        <React.Fragment>
            {editSuccess ? <Redirect to={"/contacts/" + contactId.toString()} />: null}
            <div className="form-board">
            <form className="form-contact">
              <fieldset>

                <h1 className="headerFont headerStyle glow">Edit Contact</h1>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <div className="first-row">
                        <label className="col-form-label label-color" for="inputDefault">First Name</label>
                        <input name="first_name" value = {first_name} type="text" className="form-control" placeholder="First Name" id="inputDefault" onChange = {this.onChange} />
                      </div>
                    </FormGroup>
                  </Col>
                <Col md={6}>
                    <FormGroup>

                <div className="first-row">
                  <label className="col-form-label label-color" for="inputDefault">Last Name</label>
                  <input name="last_name" value = {last_name} type="text" className="form-control" placeholder="Last Name" id="inputDefault" onChange = {this.onChange} />
                </div>

                </FormGroup>
                  </Col>
                </Row>

                <div className="form-group">
                  <label className="col-form-label label-color" for="inputDefault">Location</label>
                  <input name="location" value = {location} type="text" className="form-control" placeholder="Location" id="inputDefault" onChange = {this.onChange} />
                </div>

                <div className="form-group">
                  <label className="col-form-label label-color" for="inputDefault">Industry</label>
                  <input name="industry" value = {industry} type="text" className="form-control" placeholder="Industry" id="inputDefault" onChange = {this.onChange} />
                </div>

                <div className="form-group">
                  <label for="exampleInputEmail1" className="label-color">Email Address</label>
                  <input name="email_address" value = {email_address} onChange = {this.onChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                </div>

                <div className="form-group">
                  <label className="col-form-label label-color" for="inputDefault">Phone Number</label>
                  <input name="phone_number" value = {phone_number} type="text" className="form-control" placeholder="Phone Number" id="inputDefault" onChange = {this.onChange} />
                </div>

                <div className="form-group">
                  <label className="col-form-label label-color" for="inputDefault">Login</label>
                  <input name="login" value = {login} type="text" className="form-control" placeholder="Login" id="inputDefault" onChange = {this.onChange} />
                </div>

                <div className="form-group">
                  <label className="col-form-label label-color" for="inputDefault">Notes</label>
                  <textarea name="notes" rows="5" columns="10" value = {notes} type="text" className="form-control" placeholder="Notes" id="inputDefault" onChange = {this.onChange} />
                </div>

                <br />
                <button style = {{width: "500px", backgroundColor: "#FF6E86"}} className="submit-button" onClick={this.localSubmit} type="submit" className="btn btn-primary">Submit</button>

              </fieldset>
            </form>
            </div>
        </React.Fragment>
      );
  }
}
