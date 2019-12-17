import React from "react"
import {Redirect} from "react-router-dom"
import DateTimePicker from 'react-datetime-picker';
export default class NewContact extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                title: "",
                description: "",
                due_date: new Date(),
                is_done: false
            },
            createSucess: false,
            addDate: false
        }
    }

    localSubmit = () => {
        const{onSubmit} = this.props
        const{form} = this.state
        if(form.title.length === 0){
            return
        }
        onSubmit(form, "todos").then(() => {
            this.setState({createSucess: true})
        })
    }

    onChange = (e) => {
        const{form} = this.state
        const{name,value} = e.target
        form[name] = value
        this.setState({form})
    }

    changeDate = date => {
        const{form} = this.state
        form.due_date = date
        this.setState({ form })
    }

    enableDate = () => {
        const {addDate, form} = this.state
        let nuAdd = !addDate
        if(nuAdd){
            form.due_date = new Date()
        }
        else {
            form.due_date = null
        }
        this.setState({form, addDate: nuAdd})
    }

  render () {
    const{form, createSucess, addDate} = this.state
    const{title, description, due_date} = form
    return (
        <React.Fragment>
            <div className="form-board form-contact" style={{marginTop:"50px"}}>
            {createSucess ? <Redirect to="/todos" />: null}
            <h1 className="headerFont headerStyle glow">Add Todo</h1>


            <div className="form-group">
                <label className="col-form-label label-color" for="inputDefault">Name</label>
                <input name="title" value = {title} type="text" className="form-control" placeholder="Name" onChange = {this.onChange} />
            </div>

            <div className="form-group">
                <label className="col-form-label label-color" for="inputDefault">Description</label>
                <textarea name="description" value = {description} type="text" className="form-control" placeholder="Description" onChange = {this.onChange} type="text" />
            </div>

            <button className ={!addDate ? "btn btn-success": "btn btn-danger"} onClick = {this.enableDate}>{addDate ? "Disable Date":"Enable Date"}</button>
            {!addDate ? null: 
            <div>
                <label style={{color:"white", marginTop:"25px"}}>Due Date</label>
                <DateTimePicker onChange={this.changeDate} value={due_date}/>
            </div>}
            <br />
            <br />
            <button className="submit-button btn btn-primary" style = {{width: "100%", backgroundColor: "#FF6E86"}} onClick={this.localSubmit}>Submit</button>
            </div>
        </React.Fragment>
    );
  }
}
