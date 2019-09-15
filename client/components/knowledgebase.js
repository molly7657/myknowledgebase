import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {Resource} from './resource'

class KnowledgeBase extends React.Component {
  constructor() {
    super()
    this.state = {
      resources: '',
      sort: '',
      searchterm: 'Search for article or PDF'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  async componentDidMount() {
    const {data} = await axios.get(`/api/resources/${this.props.userId}`)
    this.setState({resources: data})
  }

  handleChange(event) {
    event.preventDefault()
    console.log(event.target.value)
    this.setState({
      sort: event.target.value
    })
  }

  handleSearchChange(event) {
    event.preventDefault()
    this.setState({
      searchterm: event.target.value
    })
  }

  async handleSearch(event) {
    event.preventDefault()
    const sortVal = this.state.sort
    const searchString = this.state.searchterm

    const res = await axios.post(
      `/api/resources/${this.props.userId}/searchresults`,
      {
        sort: sortVal,
        searchterm: searchString
      }
    )
    this.setState({resources: res.data})
  }

  render() {
    return (
      <div>
        <h1 align="center">My Knowledge Base</h1>
        <form onSubmit={this.handleSearch}>
          <FormControl>
            <Select value={this.state.sort} onChange={this.handleChange}>
              <MenuItem value="Ascending">Ascending</MenuItem>
              <MenuItem value="Descending">Descending</MenuItem>
            </Select>
            <FormHelperText>Order of Search Results</FormHelperText>
          </FormControl>
          <Input
            type="search"
            name="searchterm"
            value={this.state.searchterm}
            onChange={this.handleSearchChange}
            fullWidth
          />
          <button type="submit" className="button">
            <img src="https://i.imgur.com/9EoWY43.png" />
          </button>
        </form>
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
