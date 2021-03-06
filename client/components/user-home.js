import React from 'react'
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone'
import axios from 'axios'

class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      Url: '',
      tag1: '',
      tag2: '',
      tag3: ''
    }
    this.handleArticleSubmit = this.handleArticleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFileDrop = this.handleFileDrop.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleArticleSubmit(event) {
    event.preventDefault()
    let newTag1 = ''
    let newTag2 = ''
    let newTag3 = ''
    for (let i = 0; i < event.target.tag1.value.length; i++) {
      if (event.target.tag1.value[i] !== ' ') {
        newTag1 += event.target.tag1.value[i].toLowerCase()
      }
    }
    for (let i = 0; i < event.target.tag2.value.length; i++) {
      if (event.target.tag2.value[i] !== ' ') {
        newTag2 += event.target.tag2.value[i].toLowerCase()
      }
    }
    for (let i = 0; i < event.target.tag3.value.length; i++) {
      if (event.target.tag3.value[i] !== ' ') {
        newTag3 += event.target.tag3.value[i].toLowerCase()
      }
    }
    const res = await axios.post(
      `/api/resources/${this.props.userId}/articles`,
      {
        name: event.target.name.value,
        type: 'link',
        Url: event.target.Url.value,
        tag1: newTag1,
        tag2: newTag2,
        tag3: newTag3
      }
    )
    this.setState(res.data)
  }

  async handleFileDrop(files) {
    event.preventDefault()
    const pdf = files[0]
    const newForm = new FormData()
    newForm.append('file', pdf)
    try {
      const res = await axios.post(
        `/api/resources/${this.props.userId}/files`,
        newForm
      )
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div>
        <img src="https://miro.medium.com/max/3600/1*oOYoJk8jvDGhGUETH7wlKQ.gif" />
        <Dropzone onDrop={acceptedFiles => this.handleFileDrop(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()} className="draganddrop">
                <input {...getInputProps()} />
                <p>Drag 'n' drop file here, or click to add a file!</p>
              </div>
            </section>
          )}
        </Dropzone>
        <div className="addarticle">
          <h4>Add an article to PKB</h4>
          <form onSubmit={this.handleArticleSubmit}>
            <label htmlFor="name">Name of Article:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="Url">URL of Article:</label>
            <input
              type="text"
              name="Url"
              value={this.state.Url}
              onChange={this.handleChange}
            />
            <label htmlFor="tag2">Add up to three tags:</label>
            <input
              type="text"
              name="tag1"
              value={this.state.tag1}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="tag2"
              value={this.state.tag2}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="tag3"
              value={this.state.tag3}
              onChange={this.handleChange}
            />
            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    userId: state.user.id
  }
}

export default connect(mapState)(UserHome)
