import React from "react"
import { Table } from 'reactstrap'
import {Link} from "react-router-dom"
import edit from "./edit.png"

export default class Todos extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      updated: false
    }
  }

  changeIsDone = (todo) => {
    todo.is_done = !todo.is_done
    this.props.onSubmit(todo, todo.id, "todos")
    .then(() =>{
      this.setState({updated: !this.state.updated})
    })
  }

  formatDate = (todo) => {
    const _date = new Date(todo.due_date)
    return _date.toLocaleString()
  }

  render () {
    const{todos} = this.props
    let todoList = todos.map(todo => {
      return (
          <tr key = {todo.id}>
            <th scope="row">
              <p>
              {todo.title}
              </p>
            </th>
            <th>{todo.description}</th>
            <th>{todo.due_date == null ? "": this.formatDate(todo)}</th>
            <th>
              <button className ={todo.is_done ? "btn btn-success": "btn btn-danger"} onClick = {() => this.changeIsDone(todo)}>{todo.is_done ? "Complete":"Incomplete"}</button></th>
            <th><Link to={`/todos/${todo.id}/edit`}><img src={edit} className="edit" alt="edit" /></Link></th>
          </tr>
      )
    })
    return (
      <div>
        
        <Table striped style={{backgroundColor:"#361077", color:"white", tableLayout: "fixed"}}>
          <thead>
            <tr className="tableheaders">
              <th>Todo</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Complete?</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {todoList}
          </tbody>
        </Table>
        <div className="btn-placement">
        <Link to={"/newtodo"} style={{backgroundColor:"#591481"}} className="btn btn-danger">Add Todo</Link>
        </div>
      </div>
    );
  }
}
