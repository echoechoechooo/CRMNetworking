import React from "react"
import { Table } from 'reactstrap'

export default class Todos extends React.Component {
  render () {
    return (
      <div>  
        <h1>Todos Page</h1>
        <Table striped>
          <thead>  
            <tr>
              <th>Picture</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Last Activity</th>
              <th>Notes</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Image?</th>
              <th>Sally</th>
              <th>Seashore</th>
              <th>sseashore@yahoo.com</th>
              <th>(619) 456-9832</th>
              <th>20190815</th>
              <th>Met at the PB Festival</th>
              <th>Baking; Oceanography</th>
            </tr>
            <tr>
              <th scope="row">Image?</th>
              <th>Freddy</th>
              <th>Frankfurter</th>
              <th>frankf@yahoo.com</th>
              <th>(925) 456-9832</th>
              <th>20190823</th>
              <th>Met at the Sausage Festival</th>
              <th>Sausage; Chemistry</th>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
