import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone'
import axios from 'axios'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imageUrl: '',
      tags: ''
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
    const res = await axios.post(
      `/api/resources/${this.props.userId}/articles`,
      {
        name: event.target.name.value,
        type: 'link',
        Url: event.target.imageUrl.value
      }
    )
    this.setState(res.data)
  }

  async handleFileDrop(files) {
    console.log('name:', files[0].name, 'File on front end', files[0])
    event.preventDefault()
    const res = await axios.post(`/api/resources/${this.props.userId}/files`, {
      file: files[0],
      filename: files[0].name
    })
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
            <label htmlFor="imageUrl">URL of Article:</label>
            <input
              type="text"
              name="imageUrl"
              value={this.state.Url}
              onChange={this.handleChange}
            />
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              name="tags"
              value={this.state.tags}
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    userId: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
