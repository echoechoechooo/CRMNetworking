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
                phone_number: ""
            },
            createSucess: false
        }
    }

    localSubmit = () => {
        const{onSubmit} = this.props
        const{form} = this.state
        onSubmit(form).then(() => {
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
    const{first_name, last_name, location, industry, email_address, phone_number} = form
    return (
        <React.Fragment>
            {createSucess ? <Redirect to="/dashboard" />: null}
            <form className="form-contact">
              <fieldset>

                <legend>Create Contact</legend>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <div className="first-row">
                        <label className="col-form-label" for="inputDefault">First Name</label>
                        <input name="first_name" value = {first_name} type="text" className="form-control" placeholder="First Name" id="inputDefault" onChange = {this.onChange} />
                      </div>
                    </FormGroup>
                  </Col>
                <Col md={6}>
                    <FormGroup>

                <div className="first-row">
                  <label className="col-form-label" for="inputDefault">Last Name</label>
                  <input name="last_name" value = {last_name} type="text" className="form-control" placeholder="Last Name" id="inputDefault" onChange = {this.onChange} />
                </div>

                </FormGroup>
                  </Col>
                </Row>

                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">Location</label>
                  <input name="location" value = {location} type="text" className="form-control" placeholder="Location" id="inputDefault" onChange = {this.onChange} />
                </div>

                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">Industry</label>
                  <input name="industry" value = {industry} type="text" className="form-control" placeholder="Industry" id="inputDefault" onChange = {this.onChange} />
                </div>

                <div className="form-group">
                  <label for="exampleInputEmail1">Email Address</label>
                  <input name="email_address" value = {email_address} onChange = {this.onChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                </div>

                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">Phone Number</label>
                  <input name="phone_number" value = {phone_number} type="text" className="form-control" placeholder="Phone Number" id="inputDefault" onChange = {this.onChange} />
                </div>

                <button className="submit-button" onClick={this.localSubmit} type="submit" className="btn btn-primary">Submit</button>

              </fieldset>
            </form>
        </React.Fragment>
    );
  }
}
