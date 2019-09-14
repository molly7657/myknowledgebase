import React from 'react'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export const Resource = props => {
  return (
    <div>
      <Card
        style={{
          width: 300,
          margin: 50,
          background: '#BAC1B8',
          fontFamily: 'Helvetica Neue'
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.resource.name}
          </Typography>
        </CardContent>
        <CardActions>
          <a href={props.resource.Url} target="_blank">
            {props.resource.name}
          </a>
        </CardActions>
      </Card>
    </div>
  )
}
