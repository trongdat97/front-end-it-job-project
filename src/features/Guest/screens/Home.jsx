import { Box, Button, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { BiUpArrow, BiUpArrowCircle } from 'react-icons/bi'
import { RiMessage3Line } from 'react-icons/ri'

function Home(props) {
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
              marginLeft: 48,
              marginTop: 50,
            }}
          >
            Welcome to our <br />
            IT Network
          </Box>
        </Typography>
        <Typography component="div">
          <Box
            style={{
              color: '#f3f3f3',
              fontSize: 28,
              fontWeight: 400,
              marginLeft: 48,
              marginTop: 30,
            }}
          >
            Job network just for the IT industry
          </Box>
        </Typography>
        <Button
          startIcon={<BiUpArrowCircle fontSize={22} />}
          style={{ fontWeight: 700 }}
          className={classes.button}
        >
          Get started
        </Button>
      </div>
      <div className={classes.iconContainer}>
        <RiMessage3Line
          fontSize={35}
          style={{
            color: '#333',
          }}
        />
      </div>
    </div>
  )
}

export default Home
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
    clipPath: 'ellipse(102% 100% at 8.4% 100%)',
  },
  button: {
    backgroundColor: '#fff',
    marginLeft: 48,
    marginTop: 40,
    padding: theme.spacing(1.5, 3.5),
    color: '#7367f0',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#7367f0',
    },
  },
  iconContainer: {
    position: 'fixed',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
