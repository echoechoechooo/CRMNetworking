import React, { Component, Fragment } from 'react'
import {withAlert} from "react-alert"

export class Alerts extends Component {
    componentDidUpdate(prevProps){
        const {cantDeleteTag, alert} = this.props
        if (cantDeleteTag !== prevProps.cantDeleteTag){
            alert.error("Please Select a tag to delete")
        }
    }
    render() {
        return <Fragment />
    }
}

export default (withAlert()(Alerts))
