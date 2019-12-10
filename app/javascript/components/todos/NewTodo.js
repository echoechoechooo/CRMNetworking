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
            {createSucess ? <Redirect to="/todos" />: null}
            <h1>Add Todo</h1>
            <div>
                <label>Name</label>
                <input name="title" value = {title} onChange = {this.onChange} type = 'text' />
            </div>
            <div>
              <label>Description</label>
              <textarea name="description" value = {description} onChange = {this.onChange} type = 'text' />
            </div>
            <div>
                <button className ={!addDate ? "btn btn-success": "btn btn-danger"} onClick = {this.enableDate}>{addDate ? "Disable Date":"Enable Date"}</button>
            </div>
            {!addDate ? null: 
            <div>
                <label>Due Date</label>
                <DateTimePicker onChange={this.changeDate} value={due_date}/>
            </div>}
            <button onClick={this.localSubmit}>Submit</button>
        </React.Fragment>
    );
  }
}
