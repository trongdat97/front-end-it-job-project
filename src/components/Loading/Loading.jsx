import { CardMedia, Grid } from '@material-ui/core'
import React from 'react'
import LoadingAnimation from 'assets/loading.gif'
function Loading(props) {
  return (
    <Grid container style={{ flexDirection: 'column' }}>
      <CardMedia
        component="image"
        image={LoadingAnimation}
        style={{ width: 50, height: 50 }}
      />
    </Grid>
  )
}

export default Loading
