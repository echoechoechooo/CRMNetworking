import React from "react"
import Sidebar from "react-sidebar";


export default class Dashboard extends React.Component {
  render () {
    return (
        <div>
        <Sidebar
        children={<div></div>}
        sidebar={
            <table className="table table-hover" style = {{width: "15vw"}}>
              <thead>
                <tr>
                  <th scope="col" style = {{fontSize: "30px", padding: "10px 0px 10px 0px"}}>Contacts</th>
                </tr>
              </thead>
              <tbody>
                <tr onClick = {this.clickIt} className="table-active">
                    <td style={{padding: "0px 0px 0px 0px"}}>
                        <h3 style={{fontSize: "20px", padding: "0px 0px 0px 10px"}}>John Doe</h3>
                        <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px"}}>Connect with John!</h3>
                    </td>
                </tr>
                <tr onClick = {this.clickIt} className="table-active">
                    <td style={{padding: "0px 0px 0px 0px"}}>
                        <h3 style={{fontSize: "20px", padding: "0px 0px 0px 10px"}}>Jane Doe</h3>
                        <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px"}}>Connect with Jane!</h3>
                    </td>
                </tr>
                <tr onClick = {this.clickIt}>
                    <th scope="row">Default</th>
                </tr>
                <tr className="table-primary">
                  <th scope="row">Primary</th>
                </tr>
                <tr className="table-secondary">
                  <th scope="row">Secondary</th>
                </tr>
                <tr className="table-success">
                  <th scope="row">Success</th>
                </tr>
                <tr className="table-danger">
                  <th scope="row">Danger</th>
                </tr>
                <tr className="table-warning">
                  <th scope="row">Warning</th>
                </tr>
                <tr className="table-info">
                  <th scope="row">Info</th>
                </tr>
                <tr className="table-light">
                  <th scope="row">Light</th>
                </tr>
                <tr className="table-dark">
                  <th scope="row">Dark</th>
                </tr>
              </tbody>
            </table> }
        docked = {true}
        transitions = {false}
        styles={{ sidebar: { top: "90px", background: "white"}, overlay: { backgroundColor:'clear', zIndex: -10 } }}
        >
        </Sidebar>
        </div>
    );
  }
}
