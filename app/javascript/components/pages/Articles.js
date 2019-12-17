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
      articles: []
    };
  }

  componentDidMount(){
    this.articlesKeyword()
  }
  
  articlesKeyword = () => {
    let input = this.state.keyword
    input = input === "" ? "technology" : input
    var url = 'https://newsapi.org/v2/everything?' +
              `q=${input}&` +
              'from=2019-12-16&' +
              'sortBy=popularity&' +
              'apiKey=25ad034c5f0c45f8bf67762c1aa42371';
    var req = new Request(url);

    fetch(req)
        .then(function(response) {
            return response.json();
        })
        .then(output => {
          this.setState({articles: output.articles})
      }); 
    }

    onChange = (e) => {
      const{value} = e.target
      this.setState({keyword: value})
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
      if(contact.tags.includes(keyword)){
        console.log(keyword)
        return (
          <div key={index}>
            <h3>{contact.first_name} {contact.last_name} {contact.email}</h3>
          </div>
          )
      }
    })
    return (
      <div>
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="newsKeyword" className="mr-sm-2">Search News</Label>
            <Input onChange = {this.onChange} value={keyword} type="keyword" name="keyword" id="keyword" placeholder="Search" />
          </FormGroup>
          <div>
            {contactsTagged}
          </div>
          <Button onClick={this.articlesKeyword}>Submit</Button>
        </Form>
        <div className = "flexArticles">
          {articlesDisplay}
        </div>
      </div>
    );
  }
}
