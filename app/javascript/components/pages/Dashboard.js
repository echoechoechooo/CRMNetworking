import React from "react"
import Sidebar from "react-sidebar";
import {Link} from "react-router-dom";
import Calendar from 'react-calendar';
import addButton from "../../images/plusButton.png"
import "../CalendarAlt.css"
import {getCompanySite, getArticleTitle} from "../GetArticleInfo"
let suggestedTags = ["augmented reality", "virtual reality", "computer vision", "technology"]

export default class Dashboard extends React.Component {
    state = {
      date: new Date(),
      newTag: "",
      addingTag: false
    }

    updateUserTags = () => {
      let {current_user} = this.props
      let url = '/updateusertags'
      return fetch(url, {
          method: 'PUT',
          headers: {
              "Content-type":"application/json"
          },
          body: JSON.stringify(current_user)
      }).then(response => {
          if(response.status === 201){
            this.setState({newTag: "", addingTag: false})
            this.props.fetchArticles()
          }
      })
    }

    changeAddTagState = () => this.setState({addingTag: !this.state.addingTag})

    changeDate = date => this.setState({ date })

    getColor = isNull => isNull ? "transparent" : "white"

    changeNewTag = e => this.setState({newTag: e.target.value})

    getTagName = tag => {
      return tag
      // return tag == "technology" ? "tech" : tag
    }

    addTag = () => {
      const {newTag} = this.state
      if(newTag.length == 0){
        return
      }
      this.props.current_user.tags.push(newTag)
      this.updateUserTags()
    }

    addSpecificTag = (tag) => {
      this.props.current_user.tags.push(tag)
      this.updateUserTags()
    }

    getCalender = () => {
      const {todos} = this.props
      const curDate = this.state.date.toLocaleDateString()
      let daysTodo = todos.filter(todo => new Date(todo.due_date).toLocaleDateString() === curDate)
      .map((todo,dex) => {
        return (
          <tr key = {todo.id} className={dex == 0 ? "tableRowTop" : "tableRow"}>
            <td style={{padding: "0px 0px 0px 0px"}}>
                <Link to = {`/todos/${todo.id}/edit`} style={{fontSize: "20px", padding: "0px 0px 0px 10px", color: 'white'}}>{todo.title}</Link>
                <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px", "color": (this.getColor(todo.due_date === null))}}>{new Date(todo.due_date).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</h3>
            </td>
          </tr>)
      })
      return(
        <div className = "calendarParent">
          <div className = "widget calendarWidget">
            <Calendar onChange={this.changeDate} value={this.state.date} className = "calendarBackground" tileClassName = "calendarDays"/>
          </div>
          <div className = "calendarSpacing widget"></div>
          <div className = "sideCalendarWidget widget">
            <table className="contactTable table-hover">
              <thead>
                <tr>
                  <th className = "headerFont tableTitle" scope="col"> {curDate}
                  </th>
                </tr>
              </thead>
              <tbody className = "sidebar">
                  {daysTodo}
              </tbody>
            </table> 
          </div>
        </div>)
    }

    render () {
        const{contacts, todos, width, articles, current_user} = this.props
        let tags = current_user.tags
        let{newTag, addingTag} = this.state
        let contactList =  contacts.map((contact, dex) => {
            return (
                <tr key = {contact.id} className={dex == 0 ? "tableRowTop" : "tableRow"}>
                    <td style={{padding: "0px 0px 0px 0px"}}>
                        <Link to = {`/contacts/${contact.id}`} style={{fontSize: "20px", padding: "0px 0px 0px 10px", color: "white"}}>{contact.first_name} {contact.last_name}</Link>
                        <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px", color: "white"}}>{contact.industry != null & contact.industry != "" ? contact.industry: contact.first_name != null & contact.first_name != "" ? `Connect with ${contact.first_name}!`: `Connect with ${contact.login}!`}</h3>
                    </td>
                </tr>)
        })
        let todoList = todos.filter(todo => !todo.is_done).map((todo, dex) => {
          return (
            <tr key = {todo.id} className={dex == 0 ? "tableRowTop" : "tableRow"}>
                <td style={{padding: "0px 0px 0px 0px"}}>
                    <Link to = {`/todos/${todo.id}/edit`} style={{fontSize: "20px", padding: "0px 0px 0px 10px", color: 'white'}}>{todo.title}</Link>
                    <h3 style={{fontSize: "12px", padding: "0px 0px 0px 10px", "color": (this.getColor(todo.due_date === null))}}>{new Date(todo.due_date).toLocaleDateString()} {new Date(todo.due_date).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</h3>
                </td>
            </tr>)
        })
        let articleList = null
        if(Object.keys(articles).length > 0) {
          // console.log(Object.keys(articles).map(key => articles[key]).reduce((arr, e) => arr.concat(e)))
          // if(Object.keys(articles).length > 1){
          //   // console.log(articles["technology"])
          //   console.log(articles, Object.keys(articles), Object.keys(articles).map(key => articles[key]))
          // }
          articleList = Object.values(articles).reduce((arr, e) => arr.concat(e))
          .map((article, dex) => {
            return (
              <div href = {article.url} key = {dex} className="articleFlex">
                <div className="flex-item">
                  <img className = "articleThumbnail" src = {`//logo.clearbit.com/${getCompanySite(article)}`} />
                  <a href = {article.url} className = "articleTitle">{getArticleTitle(article)}</a>
                  <div className = "articleTagsWrapper">
                    <div className = "tagFlexItem">
                      <h1 className = "tagTitle">{article.tag != null ? this.getTagName(article.tag) : ""}</h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
        // console.log(Object.keys(articles).map(key => articles[key]).map(article => console.log(article)))
        let tagsList = tags.map((tag, dex) => {
          return(
            <div key = {dex} className = "tagFlexItem">
              <h1 className = "tagTitle">{this.getTagName(tag)}</h1>
            </div>
          )
        })
        let suggestedTagsList = suggestedTags.filter(suggestedTag => {
          for(let i = 0; i < tags.length; i++){
            if(suggestedTag.toLowerCase() == tags[i].toLowerCase()){
              return false
            }
          }
          return true
        })
        .map((tag, dex) => {
          return(
            <button onClick = {() => this.addSpecificTag(tag)}  key = {dex} className = "tagFlexItem">
              <h1 className = "tagTitle">{this.getTagName(tag)}</h1>
            </button>
          )
        })

        return (
          <div>
            <div className = "widgetParent">
              <div className = "endSpacing widget"/>
              <div className = "sideWidget widget">
                <table className="contactTable table-hover">
                  <thead>
                    <tr>
                      <th className = "headerFont tableTitle" scope="col">Contacts<Link to = {"/newcontact"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                    </tr>
                  </thead>
                  <tbody className="sidebar">
                    {contactList}
                  </tbody>
                </table>
              </div>

              {width <= 1000 ? null : <div className = "firstSpacing widget"/>}
              {width <= 1000 ? null : this.getCalender()}
              
              <div className = "firstSpacing widget"/>
              
              <div className = "sideWidget widget">
                <table className="contactTable table-hover">
                  <thead>
                    <tr>
                      <th className = "headerFont tableTitle" scope="col">Todos<Link to = {"/newtodo"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                    </tr>
                  </thead>
                  <tbody>
                    {todoList}
                  </tbody>
                </table> 
              </div>
              <div className = "endSpacing widget"/>

              {width > 1000 ? null: 
                <div className = "widgetParent2">
                  <div className = "endSpacing widget"/>
                    {this.getCalender()}
                  <div className = "endSpacing widget" />
              </div>}
              <div className = {width > 1000 ? "widgetParent2" : "widgetParent3"}>
                <div className = "articlesWidget widget">
                  <div className="articlesTable">
                    {articleList}
                  </div>
                  <h1 className = "articleHeader headerFont">Articles</h1>
                  <div className="sideArticlesTable">
                    <div className = "tagsWrapper">
                      {!addingTag ? null : <div className="form-group addTagFlexItem">
                        <input name="newTag" value = {newTag} type="text" className="form-control" placeholder="Add Tag" id="inputDefault" onChange = {this.changeNewTag} />
                      </div>}
                      {!addingTag ? null: suggestedTagsList}
                      {addingTag ? null : tagsList}
                    </div>
                  </div>
                  <h1 className = "sideArticleHeader headerFont">Tags</h1>
                  {!addingTag ? null : <div className = "addTagButtonParent"><button onClick = {this.addTag} className = "headerFont addTagButton">Add</button></div>}
                  <div className = "addTagPlus">
                    <img onClick = {this.changeAddTagState} src = {addButton} className = "addTagsImage"/>
                  </div>
                </div>
            </div>
            </div>
          </div>
        );
    }
}

{/* <Sidebar
            children={<div></div>}
            sidebar={
                <table className="table table-hover" style = {{width: "15vw"}}>
                  <thead>
                    <tr>
                      <th className = "headerFont" scope="col" style = {{fontSize: "24px", padding: "10px 0px 10px 0px", color:"white"}}>Contacts<Link to = {"/newcontact"} style={{padding: "0px 0px 0px 10px", float: "right"}}><img src = {addButton} style = {{width: "24px", height: "24px", verticalAlign: "inherit", textAlign: "right"}} /></Link></th>
                    </tr>
                  </thead>
                  <tbody className="sidebar">
                    {contactList}
                  </tbody>
                </table> }
            docked = {true}
            transitions = {false}
            styles={{ sidebar: { top: "90px", background: "#0E0422"}, overlay: { backgroundColor:'clear', zIndex: -10 } }}
            >
            </Sidebar> */}