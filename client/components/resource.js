import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

export const Resource = props => {
  return (
    <div>
      <Card
        style={{
          width: 300,
          margin: 50,
          background: '#E88EB8',
          fontFamily: 'Helvetica Neue'
        }}
      >
        <CardMedia
          style={{height: 300, width: 300, align: 'center'}}
          image="https://i.imgur.com/aNb3ueA.jpg"
          title={props.resource.name}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.resource.name}
          </Typography>
        </CardContent>
        <CardActions>
          {props.resource.type === 'link' && (
            <a
              href={props.resource.Url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.resource.name}
            </a>
          )}
          {props.resource.type === 'file' && (
            <a href={props.resource.Url} download={props.resource.name}>
              {props.resource.name}
            </a>
          )}
        </CardActions>
      </Card>
    </div>
  )
}
