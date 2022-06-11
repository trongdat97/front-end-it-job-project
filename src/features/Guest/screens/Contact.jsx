import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { BiDownload } from 'react-icons/bi'
import { FaFacebook, FaGoogle, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { RiMessage3Line } from 'react-icons/ri'

function Contact(props) {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.footer}>
        <Typography component="div">
          <Box
            style={{
              color: '#f3f3f3',
              fontSize: 48,
              fontWeight: 600,
              marginLeft: 30,
              marginTop: 50,
            }}
          >
            CONTACT WITH US
          </Box>
        </Typography>
        <Grid item>
          <IconButton
            target="_blank"
            component="a"
            href="https://www.facebook.com/lvduc99/"
          >
            <FaFacebook fontSize={28} style={{ color: '#fff' }} />
          </IconButton>
          <IconButton
            target="_blank"
            component="a"
            href="https://mail.google.com/mail/u/0/#inbox"
          >
            <FaGoogle fontSize={28} style={{ color: '#fff' }} />
          </IconButton>
          <IconButton
            target="_blank"
            component="a"
            href="https://www.linkedin.com/in/lvd1812/"
          >
            <FaLinkedin fontSize={28} style={{ color: '#fff' }} />
          </IconButton>
          <IconButton
            target="_blank"
            component="a"
            href="https://www.instagram.com/cudnavel.99/"
          >
            <FaInstagram fontSize={28} style={{ color: '#fff' }} />
          </IconButton>
          <Typography component="div">
            <Box
              style={{
                color: '#f3f3f3',
                fontSize: 36,
                fontWeight: 600,
                marginLeft: 30,
                marginTop: 50,
              }}
            >
              IT Network - Not only a network, but also a community
            </Box>
          </Typography>
          <Typography component="div">
            <Box
              style={{
                color: '#f3f3f3',
                fontSize: 20,
                fontWeight: 600,
                marginLeft: 30,
                marginTop: 160,
              }}
            >
              Created by JMG Group
            </Box>
          </Typography>
          <Typography component="div">
            <Box
              style={{
                color: '#f3f3f3',
                fontSize: 20,
                fontWeight: 600,
                marginLeft: 30,
              }}
            >
              2021
            </Box>
          </Typography>
        </Grid>
      </div>
    </div>
  )
}

export default Contact
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
    clipPath: 'ellipse(54% 100% at 49.8% 100%)',
    textAlign: 'center',
    padding: 32,
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
