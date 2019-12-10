import React from "react"
import {Redirect} from 'react-router-dom'
import DateTimePicker from 'react-datetime-picker';

export default class EditTodo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            todoId: -1,
            form: {
                title: "",
                description: "",
                due_date: "",
                is_done: false
            },
            editSuccess: false,
            deleteSuccess: false,
            addDate: false
        }
    }   

    getCurrentTodo = () => {
        let id = this.props.match.params.id
        if(id == this.state.todoId){
            return
        }
        let url = "/todos/" + this.props.match.params.id.toString() + "/edit"
        fetch(url)
        .then(resp => {
            return resp.json()})
            .then(todo => {
                let{form} = this.state
                form["title"] = todo.title
                form["description"] = todo.description
                form["due_date"] = todo.due_date
                form["is_done"] = todo.is_done
                this.setState({form, todoId: id, addDate: todo.due_date != null})})
    }

    onChange = (e) => {
        const{form} = this.state
        const{name,value} = e.target
        form[name] = value
        this.setState({form})
    }

    localSubmit= () => {
        const{onSubmit} = this.props
        const{form, todoId} = this.state
        if(form.title.length === 0){
            return
        }
        onSubmit(form, todoId, "todos").then(() =>{
            this.setState({editSuccess: true})
        })
    }

    changeIsDone = () => {
        const{form} = this.state
        form["is_done"] = !form["is_done"]
        this.setState({form})
    }

    localDelete = () => {
        const{todoId} = this.state
        if(todoId < 1){
            return
        }
        const{deleteTodo} = this.props
        deleteTodo(todoId, "todos").then(() => {
            this.setState({deleteSuccess:true})
        })
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
        this.getCurrentTodo()
        const{form, todoId, editSuccess, deleteSuccess, addDate} = this.state
        const{title, description, due_date, is_done} = form
        if(form.first_name == ""){
            return (
                <div></div>
            );
        }
        return (
            <React.Fragment>
                {editSuccess || deleteSuccess ? <Redirect to={"/todos"} />: null}
                <h1>Edit Contact</h1>
                <div>
                    <label>Title</label>
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
                <div>
                    <button className ={is_done ? "btn btn-success": "btn btn-danger"} onClick = {this.changeIsDone}>{is_done ? "Complete":"Incomplete"}</button>
                </div>
                <div>
                    <button className ="btn btn-danger" onClick = {this.localDelete}>Delete</button>
                </div>
                <button onClick={this.localSubmit}>Submit</button>
            </React.Fragment>
        );
    }
}
