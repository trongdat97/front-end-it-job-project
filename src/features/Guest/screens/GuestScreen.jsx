import React from 'react'
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  ListItemIcon,
  makeStyles,
  Menu,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core'
import FlagIcon from 'assets/flag.png'
import LogoSVG from 'assets/logo.svg'
import { BiMessage } from 'react-icons/bi'
import { RiNotification2Line } from 'react-icons/ri'
import { authSelector, getProfile, logout } from 'features/Auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from 'components/Header/headerSlice'
import { useEffect } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import { MdLogout, MdOutlineAccountCircle } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import ContributorBG from 'assets/contributorBg.jpg'
import moment from 'moment'
import JobForm from '../components/JobForm/JobForm'
import CvForm from '../components/CvForm/CvForm'
import { showFormCv, setType } from '../components/CvForm/cvFormSlice'
//import { showForm, setType } from '../components/JobForm/jobFormSlice'
import JobPost from '../components/JobPost/JobPost'
import JobDetails from '../components/JobDetails/JobDetails'
import { getJobById } from 'features/Admin/adminSlice'
import About from '../components/About/About'
import storageUser from 'constants/storageUser'
import {
  changeAvatar,
  uploadFile,
  userSelector,
  setType as setTypeFile,
} from '../userSlice'
import { useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { FiMoon, FiSearch } from 'react-icons/fi'
import ListCv from '../components/ListCv/ListCv'

const recommendUser = [
  {
    name: 'Nguyen Viet Da111nh',
    avatar:
      'https://pickaface.net/gallery/avatar/43747121_160902_1918_9l357y.png',
    email: 'nguyenvietdanhnph@gmail.com',
    phone: '0905050623',
  },
  {
    name: 'Le Van Duc',
    avatar:
      'https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png',
    email: 'lvd181299@gmail.com',
    phone: '0783213312',
  },
  {
    name: 'Nguyen Van Dat',
    avatar:
      'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    email: 'datnguyen@gmail.com',
    phone: '0905050623',
  },
  {
    name: 'Le Duc Luong',
    avatar:
      'https://pickaface.net/gallery/avatar/unr_random_180527_1151_2bcb7h9.png',
    email: 'luongle@gmail.com',
    phone: '0312312333',
  },
]
const StyledMenuItem = withStyles({
  root: {
    '&:hover': {
      backgroundColor: 'rgba(115, 103, 240, 0.15)',
      color: 'rgb(115, 103, 240)',
    },
    '& .MuiListItemIcon-root:hover': {
      color: 'rgb(115, 103, 240)',
    },
  },
})(MenuItem)

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

function GuestScreen(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const username = sessionStorage.getItem(storageUser.USERNAME)
  const { info, status } = useSelector(authSelector)
  const history = useHistory()
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleAdd = () => {
    console.log('add ne')
  }
  useEffect(() => {
    dispatch(getAuth())
    dispatch(getProfile(username))
  }, [])
  const { file, type } = useSelector(userSelector)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleSubmit = () => {
    dispatch(logout())
    dispatch(getAuth())
    setAnchorEl(null)
    history.push('/login')
  }

  const handleCapture = ({ target }) => {
    let formData = new FormData()
    formData.append('file', target.files[0])
    dispatch(uploadFile(formData))
    dispatch(setTypeFile('avatar'))
    dispatch(changeAvatar({ profileUrl: file }))
  }
  useEffect(() => {
    if (type === 'avatar') {
      dispatch(changeAvatar({ profileUrl: file }))
      dispatch(getProfile(username))
      dispatch(setTypeFile(''))
    }
  }, [file])
  return (
    <Container className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid
                container
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CardMedia image={LogoSVG} style={{ width: 35, height: 25 }} />
                <Typography>
                  <Box
                    fontSize={20}
                    fontWeight={500}
                    style={{ marginLeft: 10, color: '#7367f0' }}
                  >
                    Job Search System
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <CardMedia
                  component="img"
                  image={FlagIcon}
                  style={{ height: 24, width: 'auto' }}
                />
                <Typography component="div">
                  <Box
                    fontSize={13}
                    fontWeight={500}
                    style={{
                      color: '#333',
                      marginLeft: 8,
                      marginRight: 16,
                    }}
                  >
                    English
                  </Box>
                </Typography>
                <IconButton
                  size="medium"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  style={{ marginRight: 15 }}
                >
                  <FiMoon fontSize={20} />
                </IconButton>
                <IconButton
                  size="medium"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  style={{ marginRight: 15 }}
                >
                  <FiSearch fontSize={20} />
                </IconButton>
                <IconButton
                  size="medium"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  style={{ marginRight: 15 }}
                >
                  <Badge
                    badgeContent={5}
                    style={{ marginRight: 10 }}
                    color="primary"
                  >
                    <BiMessage fontSize={20} />
                  </Badge>
                </IconButton>
                <IconButton
                  size="medium"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  style={{ marginRight: 15 }}
                >
                  <Badge
                    badgeContent={3}
                    style={{ marginRight: 10 }}
                    color="secondary"
                    f
                  >
                    <RiNotification2Line fontSize={20} />
                  </Badge>
                </IconButton>
                {info && (
                  <div style={{ marginRight: 15 }}>
                    <Typography component="div">
                      <Box
                        fontSize={15}
                        fontWeight={600}
                        style={{ color: '#020202' }}
                      >
                        {info?.name}
                      </Box>
                    </Typography>
                    <Typography component="div">
                      <Box
                        fontSize={12}
                        fontWeight={300}
                        style={{ color: 'grey', textTransform: 'capitalize' }}
                      >
                        {info?.role?.role}
                      </Box>
                    </Typography>
                  </div>
                )}

                <IconButton
                  size="medium"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                >
                  <Badge
                    classes={{ badge: classes.customBadge }}
                    variant="dot"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <Avatar
                      src={
                        'https://pickaface.net/gallery/avatar/43747121_160902_1918_9l357y.png'
                      }
                    />
                  </Badge>
                </IconButton>
                <Menu
                  className={classes.menu}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    elevation: 0,
                    style: {
                      boxShadow:
                        'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
                      width: 180,
                    },
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <MdOutlineAccountCircle fontSize={18} />
                    </ListItemIcon>
                    <Typography component="div" style={{ marginLeft: -18 }}>
                      <Box fontSize={15}>Profile</Box>
                    </Typography>
                  </StyledMenuItem>

                  <StyledMenuItem onClick={handleSubmit}>
                    <ListItemIcon>
                      <MdLogout fontSize={18} />
                    </ListItemIcon>
                    <Typography component="div" style={{ marginLeft: -18 }}>
                      <Box fontSize={15}>Logout</Box>
                    </Typography>
                  </StyledMenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid item xs className={classes.imageContainer}>
        <CvForm />
        <CardMedia
          image={ContributorBG}
          style={{
            width: 1216,
            height: 416,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            boxShadow:
              'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
          }}
        />
        <Grid
          style={{
            position: 'absolute',
            bottom: 40,
            left: 32,
            width: 120,
            height: 120,
            backgroundColor: '#fff',
            elevation: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            boxShadow:
              'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
          }}
        >
          <CardMedia
            image="https://pickaface.net/gallery/avatar/43747121_160902_1918_9l357y.png"
            style={{
              width: 112,
              height: 112,
              borderRadius: 10,
            }}
          />
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-video"
            type="file"
            onChange={handleCapture}
            hidden
          />
          <label htmlFor="icon-button-video">
            <IconButton
              component="span"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            >
              <FaCamera fontSize={13} />
            </IconButton>
          </label>
        </Grid>
        <Grid style={{ position: 'absolute', bottom: 80, left: 184 }}>
          <Typography component="div">
            <Box fontSize={24} fontWeight={500} style={{ color: '#fff' }}>
              {info?.profile?.name}
            </Box>
          </Typography>
          <Typography component="div">
            <Box fontSize={13} fontWeight={300} style={{ color: '#fff' }}>
              {info?.role?.role}
            </Box>
          </Typography>
        </Grid>
        <Grid item style={{ position: 'absolute', bottom: 0, left: 160 }}>
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
              label="About"
              {...a11yProps(0)}
              style={{
                height: 64,
                fontSize: 15,
                textTransform: 'capitalize',
              }}
            />

            <Tab
              disableRipple
              label="Jobs"
              {...a11yProps(1)}
              style={{
                height: 64,
                fontSize: 15,
                textTransform: 'capitalize',
              }}
            />
          </Tabs>
        </Grid>
        <Button
          className={classes.button}
          onClick={() => {
            dispatch(setType('add'))
            dispatch(showFormCv({ onSubmit: handleAdd }))
          }}
        >
          POST NEW CV
        </Button>
        {/* <Button
          variant="contained"
          component="label"

          Upload File
          <input  
            type="file"
            hidden
          />
        </Button> */}
      </Grid>
      <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid sm={3} container className={classes.about}>
          <Grid>
            <Typography component="div">
              <Box fontSize={18} fontWeight={700} style={{ color: '#5e5873' }}>
                Introduction
              </Box>
            </Typography>
            <Divider style={{ marginTop: 16 }} />
            <Typography component="div">
              <Box
                fontSize={13}
                fontWeight={400}
                style={{ color: '#5e5873', marginTop: 24 }}
              >
                {info?.profile?.introduction}
              </Box>
            </Typography>
          </Grid>
          <Grid style={{ marginTop: 20 }}>
            <Typography component="div">
              <Box fontSize={15} fontWeight={600} style={{ color: '#5e5873' }}>
                Joined
              </Box>
            </Typography>
            <Typography component="div">
              <Box
                fontSize={13}
                fontWeight={400}
                style={{ color: '#5e5873', marginTop: 6 }}
              >
                {moment(info?.createdat).format('MMMM DD, YYYY')}
              </Box>
            </Typography>
          </Grid>
          <Grid style={{ marginTop: 20 }}>
            <Typography component="div">
              <Box fontSize={15} fontWeight={600} style={{ color: '#5e5873' }}>
                City
              </Box>
            </Typography>
            <Typography component="div">
              <Box
                fontSize={13}
                fontWeight={400}
                style={{ color: '#5e5873', marginTop: 6 }}
              >
                {info?.city}
              </Box>
            </Typography>
          </Grid>
          <Grid style={{ marginTop: 20 }}>
            <Typography component="div">
              <Box fontSize={15} fontWeight={600} style={{ color: '#5e5873' }}>
                Email
              </Box>
            </Typography>
            <Typography component="div">
              <Box
                fontSize={13}
                fontWeight={400}
                style={{ color: '#5e5873', marginTop: 6 }}
              >
                {info?.email}
              </Box>
            </Typography>
          </Grid>
          <Grid style={{ marginTop: 20 }}>
            <Typography component="div">
              <Box fontSize={15} fontWeight={600} style={{ color: '#5e5873' }}>
                {/* Website */}
              </Box>
            </Typography>
            <Typography component="div">
              <Box
                fontSize={13}
                fontWeight={400}
                style={{ color: '#5e5873', marginTop: 6 }}
              >
                <Link href={info?.website} component="a" target="_blank">
                  {/* {info?.website} */}
                </Link>
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <TabPanel value={value} index={0}>
            <About />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <JobPost />
          </TabPanel>
        </Grid>
        <Grid item xs={3} className={classes.recommend}>
          {/* <Typography component="div">
            <Box fontSize={18} fontWeight={700} style={{ color: '#5e5873' }}>
              Candidates you may need
            </Box>
          </Typography>
          <Divider style={{ marginTop: 16 }} />
          {recommendUser?.map((item) => (
            <Grid container style={{ marginTop: 16 }}>
              <Avatar src={item.avatar} sizes="small" />
              <Grid style={{ marginLeft: 8 }}>
                <Typography component="div">
                  <Box
                    fontSize={12}
                    fontWeight={700}
                    style={{ color: '#5e5873' }}
                  >
                    {item.name}
                  </Box>
                </Typography>
                <Typography component="div">
                  <Box
                    fontSize={11}
                    fontWeight={500}
                    style={{ color: '#5e5873' }}
                  >
                    {item.email}
                  </Box>
                </Typography>
                <Typography component="div">
                  <Box
                    fontSize={11}
                    fontWeight={500}
                    style={{ color: '#5e5873' }}
                  >
                    {item.phone}
                  </Box>
                </Typography>
                <Button style={{ fontSize: 11 }} size="small">
                  View details
                </Button>
              </Grid>
            </Grid>
          ))} */}
          <ListCv />
        </Grid>
      </Grid>
      <JobDetails />
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: theme.spacing(8),
    backgroundColor: 'white',
    justifyContent: 'center',

    boxShadow:
      'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
  },

  menu: {
    marginTop: theme.spacing(7),
  },
  imageContainer: {
    backgroundColor: '#fff',
    marginTop: theme.spacing(8),
    height: theme.spacing(60),
    borderRadius: 10,
    position: 'relative',
    boxShadow:
      'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
  },
  button: {
    position: 'absolute',
    bottom: 14,
    right: 16,
    backgroundColor: '#7367f0',
    color: '#fff',
    borderRadius: 10,
    boxShadow: 'none',
    width: theme.spacing(16),
    height: theme.spacing(5),
    fontSize: 12,
    '&:hover': {
      boxShadow:
        'rgba(115,103,240,0.25) 0px 15px 25px, rgba(115,103,240, 0.15) 0px 5px 10px',
      background: '#7367f0',
    },
  },
  about: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: theme.spacing(2.5),
    marginTop: theme.spacing(3),
    borderRadius: 10,
    height: 480,
    boxShadow:
      'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
  },
  recommend: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: theme.spacing(2.5),
    marginTop: theme.spacing(3),
    borderRadius: 10,
    height: 480,
    boxShadow:
      'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
  },
}))

export default GuestScreen
