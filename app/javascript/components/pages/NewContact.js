import React from "react"
import {Redirect} from "react-router-dom"
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



export default class NewContact extends React.Component {
    constructor(props){
        super(props)
        this.state = {
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
            createSucess: false
        }
    }

    localSubmit = () => {
        const{onSubmit} = this.props
        const{form} = this.state
        if(form.first_name.length===0){
            return
        }
        if(form.last_name.length===0){
            return
        }
        onSubmit(form, "contacts").then(() => {
            this.setState({createSucess: true})
        })
    }

    onChange = (e) => {
        const{form} = this.state
        const{name,value} = e.target
        form[name] = value
        this.setState({form})
    }

    render () {
        const{form, createSucess} = this.state
        const{first_name, last_name, location, industry, email_address, phone_number, notes, login} = form
        return (
            <React.Fragment>
                {createSucess ? <Redirect to="/" />: null}
                <div className="form-board form-contact">
                
                    <h1 className="headerFont headerStyle glow">Create Contact</h1>

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
                    <button className="submit-button" onClick={this.localSubmit} type="submit" className="btn btn-primary contactButton" style = {{backgroundColor: "#FF6E86"}}>Submit</button>
                </div>
            </React.Fragment>
        );
    }
}
