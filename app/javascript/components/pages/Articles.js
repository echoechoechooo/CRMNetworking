import React from "react"
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Form, FormGroup, Label, Input
} from 'reactstrap';
let rand = ""

export default class Articles extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      keyword: "",
      articles: [],
      contactsTagged: null
    };
  }

  componentDidMount(){
    this.articlesKeyword()
    // this.setState({contactsTagged: this.getContactsTagged()})
  }

  getTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`
}
  
  articlesKeyword = () => {
    let input = this.state.keyword
    input = input === "" ? "technology" : input
    var url = 'https://newsapi.org/v2/everything?' +
              `q=${input}&` +
              `from=${this.getTodaysDate()}z&` +
              'sortBy=popularity&' +
              'apiKey=25ad034c5f0c45f8bf67762c1aa42371';
    var req = new Request(url);

    fetch(req)
        .then(function(response) {
            return response.json();
        })
        .then(output => {
          // this.setState({contactsTagged: this.getContactsTagged()})
          this.setState({articles: output.articles})
      }); 
    }

    onChange = (e) => {
      const{value} = e.target
      this.setState({keyword: value})
    }

    hasName = (name) => {
      return name != null && name.length > 0
    }

    render () {
      const{articles, keyword} = this.state
      const{contacts} = this.props
      let articlesDisplay = articles.map((article, index) => {
        return (
          <div key={index} className="articleFlexParent">
            <Card>
              <CardTitle><h3 style={{color:"white"}}>{article.title}</h3></CardTitle>
              <CardImg top width="99%" src={article.urlToImage} alt="Card image cap" />
              <CardBody>
                <CardText>{article.description}</CardText>
                <Button href = {article.url} target = "_blank">Read More</Button>
              </CardBody>
            </Card>
          </div>
        )
      })
      let contactsTagged = contacts.map((contact, index) => {
        let canCheck = false
        for(let i = 0; i < contact.tags.length; i++){
          if(contact.tags[i].toLowerCase() == keyword.toLowerCase()){
            canCheck = true
            break
          }
        }
        if(canCheck){
          return (
            <div key={index} className="contactsTagged">
              <h1 className="tagTitle">
                {this.hasName(contact.first_name) ? `${contact.first_name} ${contact.last_name}` : contact.login}
              </h1>
            </div>
          )
        }
      })
    return (
      <div>
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input onChange = {this.onChange} value={keyword} type="keyword" name="keyword" id="keyword" placeholder="Search" />
          </FormGroup>
          <Button onClick={this.articlesKeyword}>Submit</Button>
        </Form>
        <div className="contactsTaggedParent">
          {contactsTagged}
        </div>
        <div className = "flexArticles">
          {articlesDisplay}
        </div>
      </div>
    );
  }
}
