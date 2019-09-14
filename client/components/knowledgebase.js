import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

/**
 * COMPONENT
 */
export default class KnowledgeBase extends React.Component {
  constructor() {
    super()
    this.state = {
      resources: ''
    }
  }

  render() {
    return (
      <div>
        <h1 align="center">Your Knowledge Base</h1>
        <p>hi</p>
        <div />
        {/* <Grid container spacing={24} style={{padding: 24}}>
          {Array.isArray(this.props.resources) &&
            this.props.resources.map(resource => (
              <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: 5}}>
                <Resource key={resource.id} resource={resource} />
              </Grid>
            ))}
        </Grid> */}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     email: state.user.email,
//     userId: state.user.id
//   }
// }

// export default connect(mapState)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
