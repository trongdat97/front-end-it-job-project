import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Box,
  Button,
  CardMedia,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/styles'
import LogoSVG from 'assets/logo.svg'
import HomeScreen from 'features/User/screens/Home'
import ServicesScreen from 'features/User/screens/Services'
import DownloadScreen from 'features/User/screens/Download'
import ContactScreen from 'features/User/screens/Contact'
import { useHistory } from 'react-router-dom'
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function NavBar() {
  const classes = useStyles()
  const history = useHistory()
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          className={classes.appBar}
          style={{
            width: '100vw',
            position: 'fixed',
          }}
        >
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid
                  container
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <CardMedia
                    image={LogoSVG}
                    style={{ width: 35, height: 25 }}
                  />
                  <Typography>
                    <Box
                      fontSize={20}
                      fontWeight={500}
                      style={{ marginLeft: 10, color: '#7367f0' }}
                    >
                      IT Network
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab
                    disableRipple
                    label="Home"
                    {...a11yProps(0)}
                    style={{
                      height: 80,
                      fontSize: 16,
                      textTransform: 'capitalize',
                    }}
                  />

                  <Tab
                    disableRipple
                    label="Services"
                    {...a11yProps(1)}
                    style={{
                      height: 80,
                      fontSize: 16,
                      textTransform: 'capitalize',
                    }}
                  />
                  <Tab
                    disableRipple
                    label="Download"
                    {...a11yProps(2)}
                    style={{
                      height: 80,
                      fontSize: 16,
                      textTransform: 'capitalize',
                    }}
                  />

                  <Tab
                    disableRipple
                    label="Contact"
                    {...a11yProps(3)}
                    style={{
                      height: 80,
                      fontSize: 16,
                      textTransform: 'capitalize',
                    }}
                  />
                </Tabs>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    history.push('/login')
                  }}
                  disableRipple
                  className={classes.buttonSignin}
                >
                  Sign in
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid>
        <TabPanel value={value} index={0}>
          <HomeScreen />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ServicesScreen />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DownloadScreen />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ContactScreen />
        </TabPanel>
      </Grid>
    </div>
  )
}

export default NavBar

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  customBadge: {
    backgroundColor: '#28C76F',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: theme.spacing(10),
    background: 'transparent',
    justifyContent: 'center',
    boxShadow:
      'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
  },
  navitem: {
    fontSize: 16,

    width: theme.spacing(11),
    height: theme.spacing(11),
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#7367f0',
    },
    '&:focus': {
      backgroundColor: 'transparent',
      borderBottom: '3px solid #7367f0',
      color: '#7367f0',
    },
  },
  buttonSignin: {
    textTransform: 'capitalize',
    backgroundColor: '#7367f0',
    color: '#fff',
    padding: theme.spacing(1.5, 4.5),
    marginRight: theme.spacing(2),
    borderRadius: 30,
    '&:hover': {
      backgroundColor: '#333',
      color: '#fff',
    },
  },
}))
