import React from "react"
import { Table } from 'reactstrap'
import {Link} from "react-router-dom"

export default class Todos extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      updated: false
    }
  }

  changeIsDone = (todo) => {
    todo.is_done = !todo.is_done
    this.props.onSubmit(todo, todo.id, "todos").then(() =>{
      this.setState({update: !this.state.updated})
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
            <th scope="row">{todo.title}</th>
            <th>{todo.description}</th>
            <th>{todo.due_date == null ? "": this.formatDate(todo)}</th>
            <th>
              <button className ={todo.is_done ? "btn btn-success": "btn btn-danger"} onClick = {() => this.changeIsDone(todo)}>{todo.is_done ? "Complete":"Incomplete"}</button></th>
            <th><Link to={`/todos/${todo.id}/edit`} className="btn btn-primary">Edit</Link></th>
          </tr>
      )
    })
    return (
      <div>
        <h1>Todos Page</h1>
        <Table striped>
          <thead>
            <tr>
              <th>Todo</th>
              <th>Description</th>
              <th>Due Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todoList}
          </tbody>
        </Table>
        <Link to={"/newtodo"} className="btn btn-danger">Add Todo</Link>
      </div>
    );
  }
}
