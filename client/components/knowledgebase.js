import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      Url: '',
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
        Url: event.target.Url.value
      }
    )
    this.setState(res.data)
  }

  async handleFileDrop(files) {
    event.preventDefault()
    const newFile = URL.createObjectURL(files[0])
    console.log('this is the object URL', newFile)
    const res = await axios.post(`/api/resources/${this.props.userId}/files`, {
      fileUrl: newFile,
      filename: files[0].name
    })
    console.log(res.data)
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
