import { Box, Button, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { BiDownload } from 'react-icons/bi'
import { RiMessage3Line } from 'react-icons/ri'

function Download(props) {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.footer}>
        <Typography component="div">
          <Box
            style={{
              color: '#f3f3f3',
              fontSize: 64,
              fontWeight: 600,
              marginLeft: 30,
              marginTop: 50,
            }}
          >
            App mobile <br />
            Job Search System
          </Box>
        </Typography>
        <Typography component="div">
          <Box
            style={{
              color: '#f3f3f3',
              fontSize: 24,
              fontWeight: 400,
              marginLeft: 30,
              marginTop: 30,
            }}
          >
            You are an applicant and you want to
            <br />
            find a suitable job. Please download app mobile Job Search System
            applicant and join with us.
          </Box>
        </Typography>
        <Button
          startIcon={<BiDownload fontSize={20} />}
          style={{ fontWeight: 700 }}
          className={classes.button}
        >
          Download App
        </Button>
      </div>
    </div>
  )
}

export default Download
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    margin: -24,
    padding: -24,
  },
  footer: {
    marginTop: 161,
    display: 'block',
    height: '560px',
    width: '100vw',
    boxSizing: 'border-box',
    backgroundColor: '#7367f0',
    clipPath: 'ellipse(114% 100% at 107.6% 100%)',
    textAlign: 'right',
    padding: 40,
  },
  button: {
    backgroundColor: '#fff',
    marginLeft: 30,
    marginTop: 40,
    padding: theme.spacing(1.5, 3.5),
    color: '#7367f0',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#7367f0',
    },
  },
}))
