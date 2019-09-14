import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import {Resource} from './resource'

class KnowledgeBase extends React.Component {
  constructor() {
    super()
    this.state = {
      resources: ''
    }
  }

  async componentDidMount() {
    const {data} = await axios.get(`/api/resources/${this.props.userId}`)
    this.setState({resources: data})
  }

  render() {
    return (
      <div>
        <h1 align="center">My Knowledge Base</h1>
        <div />
        <Grid container spacing={20} style={{padding: 20}}>
          {Array.isArray(this.state.resources) &&
            this.state.resources.map(resource => (
              <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: 5}}>
                <Resource key={resource.id} resource={resource} />
              </Grid>
            ))}
        </Grid>
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

export default connect(mapState)(KnowledgeBase)
