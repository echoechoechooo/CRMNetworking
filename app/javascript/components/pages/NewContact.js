import React from "react"
import {Redirect} from "react-router-dom"

export default class NewContact extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                first_name: "",
                last_name: "",
                // location: "",
                // industry: "",
                // email_address: "",
                // phone_number: "",
                // notes: ""
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
    const{first_name, last_name} = form
    return (
        <React.Fragment>
            {createSucess ? <Redirect to="/" />: null}
            <h1>New Contact Page</h1>
            <div>
                <label>First Name</label>
                <input name="first_name" value = {first_name} onChange = {this.onChange} type = 'text' />
            </div>
            <div>
              <label>last_name</label>
              <input name="last_name" value = {last_name} onChange = {this.onChange} type = 'text' />
            </div>
            <button onClick={this.localSubmit}>Submit</button>
        </React.Fragment>
    );
  }
}
