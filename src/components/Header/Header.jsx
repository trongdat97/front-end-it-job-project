import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/MenuRounded'
import AccountCircle from '@material-ui/icons/AccountCircleOutlined'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import {
  Collapse,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Slide,
  Grid,
  CardMedia,
  Avatar,
  Badge,
  MenuList,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/styles'
import MuiListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router-dom'
import LogoSVG from 'assets/logo.svg'
import { ExpandLessRounded, ExpandMoreRounded } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { changeState, headerSelector, getAuth } from './headerSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar'
import { showDialog } from 'components/ConfirmDialog/dialogSlice'
import { authSelector, getProfile, logout } from 'features/Auth/authSlice'
import { FiUser, FiCircle, FiSearch, FiMoon } from 'react-icons/fi'
import FlagIcon from 'assets/flag.png'
import {
  BiHomeAlt,
  BiCategory,
  BiShieldQuarter,
  BiMessage,
} from 'react-icons/bi'
import { RiContactsBook2Line, RiNotification2Line } from 'react-icons/ri'
import {
  MdLogout,
  MdOutlineAccountCircle,
  MdOutlineWorkOutline,
  MdStarOutline,
} from 'react-icons/md'

const ListItem = withStyles({
  root: {
    color: 'rgb(99, 115, 129)',
    '&$selected': {
      background: 'linear-gradient(118deg,#7367f0,rgba(115,103,240,.7))',
      color: '#fff',
      boxShadow: '0 0 10px 1px rgb(115 103 240 / 70%)',
      borderRadius: '4px',
      '& .MuiListItemIcon-root': {
        color: '#fff',
        margin: '4px 0 4px 0px',
        transition: '0.2s margin ease-in-out',
      },
      '& .MuiListItemText-root': {
        margin: '4px 0 4px 0px',
        transition: '0.2s margin ease-in-out',
      },
    },
    '&$selected:hover': {
      color: '#fff',
      '& .MuiListItemIcon-root': {
        margin: '4px 0 4px 2px',
        transition: '0.2s margin ease-in-out',
      },
      '& .MuiListItemText-root': {
        margin: '4px 0 4px 2px',
        transition: '0.2s margin ease-in-out',
      },
    },
    '&:hover': {
      color: '#333',
      '& .MuiListItemIcon-root': {
        margin: '4px 0 4px 2px',
        transition: '0.2s margin ease-in-out',
      },
      '& .MuiListItemText-root': {
        margin: '4px 0 4px 2px',
        transition: '0.2s margin ease-in-out',
      },
    },
  },
  selected: {},
})(MuiListItem)

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

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { isOpenDrawer } = useSelector(headerSelector)
  const dispatch = useDispatch()
  const { isAuth } = useSelector(headerSelector)
  const { info } = useSelector(authSelector)

  useEffect(() => {
    dispatch(getAuth())
    dispatch(getProfile())
  }, [])

  const [isExpandedUserMenu, setIsExpandedUserMenu] = React.useState(false)
  const [isExpandedJobMenu, setIsExpandedJobMenu] = React.useState(false)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const history = useHistory()
  const handleSubmit = () => {
    dispatch(logout())
    dispatch(getAuth())
    setAnchorEl(null)
    history.push('/admin/login')
  }

  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const location = useLocation().pathname
  useEffect(() => {
    if (location.startsWith('/admin/user/list')) {
      setSelectedIndex(1.1)
      setIsExpandedUserMenu(true)
    }
    if (location.startsWith('/admin/user/request')) {
      setSelectedIndex(1.2)
      setIsExpandedUserMenu(true)
    }
    if (location.startsWith('/admin/user/deleted')) {
      setSelectedIndex(1.3)
      setIsExpandedUserMenu(true)
    }
    if (location.startsWith('/admin/tags')) {
      setSelectedIndex(2)
    }
    if (location.startsWith('/admin/jobs/list')) {
      setSelectedIndex(5.1)
      setIsExpandedJobMenu(true)
    }
    if (location.startsWith('/admin/jobs/request')) {
      setSelectedIndex(5.2)
      setIsExpandedJobMenu(true)
    }
    if (location.startsWith('/admin/jobs/deleted')) {
      setSelectedIndex(5.3)
      setIsExpandedJobMenu(true)
    }
  }, [location])

  const handleListItemClick = (event, index) => setSelectedIndex(index)

  const classes = useStyles()

  return (
    <div>
      <CustomSnackBar />
      {isAuth && location.startsWith('/admin') && (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              className={classes.appBar}
              style={{
                width: isOpenDrawer ? '78vw' : '95vw',
                transition: '0.5s width ease-in-out',
                position: 'fixed',
                top: 0,
                left: isOpenDrawer ? 288 : 32,
              }}
            >
              <Toolbar>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <IconButton
                      size="medium"
                      edge="start"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                      style={{ marginRight: 15 }}
                      onClick={() => {
                        dispatch(changeState())
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Link to="/admin/user/list">
                      <IconButton
                        size="medium"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        style={{ marginRight: 15, color: '#555' }}
                      >
                        <FiUser fontSize={20} />
                      </IconButton>
                    </Link>

                    <Link to="/admin/jobs/list">
                      <IconButton
                        size="medium"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        style={{ marginRight: 15, color: '#555' }}
                      >
                        <MdOutlineWorkOutline fontSize={20} />
                      </IconButton>
                    </Link>

                    <IconButton
                      size="medium"
                      edge="start"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                      style={{ marginRight: 15 }}
                    >
                      <MdStarOutline
                        fontSize={22}
                        style={{ color: 'orange' }}
                      />
                    </IconButton>
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
                      {!info.profile && (
                        <div style={{ marginRight: 15 }}>
                          <Typography component="div">
                            <Box
                              fontSize={15}
                              fontWeight={600}
                              style={{ color: '#020202' }}
                            >
                              17PFIEV3
                            </Box>
                          </Typography>
                          <Typography component="div">
                            <Box
                              fontSize={13}
                              fontWeight={600}
                              style={{ color: 'grey' }}
                            >
                              Admin
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
                        style={{ marginRight: Boolean(anchorEl) ? -17 : 0 }}
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
                            src="https://demo.digityze.asia/ilearning/wp-content/themes/cera-child/assets/images/avatars/user-avatar.png"
                            style={{ width: 36, height: 36 }}
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
                          <Typography
                            component="div"
                            style={{ marginLeft: -18 }}
                          >
                            <Box fontSize={15}>Profile</Box>
                          </Typography>
                        </StyledMenuItem>

                        <StyledMenuItem onClick={handleSubmit}>
                          <ListItemIcon>
                            <MdLogout fontSize={18} />
                          </ListItemIcon>
                          <Typography
                            component="div"
                            style={{ marginLeft: -18 }}
                          >
                            <Box fontSize={15}>Logout</Box>
                          </Typography>
                        </StyledMenuItem>
                      </Menu>
                    </Grid>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <Grid
              style={{
                width: '100vw',
                height: 96,
                zIndex: 888,
                position: 'fixed',
                top: 0,
                left: 0,
                background:
                  'linear-gradient(180deg,hsla(0,0%,97.3%,.95) 44%,hsla(0,0%,97.3%,.46) 73%,hsla(0,0%,100%,0))',
              }}
            ></Grid>
          </Box>

          <Drawer
            variant="persistent"
            open={isOpenDrawer}
            classes={{ paper: classes.paper }}
            className={classes.drawer}
          >
            <Grid
              container
              style={{
                position: 'fixed',
                top: 10,
                left: 20,
                alignItems: 'center',
              }}
            >
              <CardMedia image={LogoSVG} style={{ width: 40, height: 30 }} />
              <Typography component="div">
                <Box
                  fontSize={22}
                  fontWeight={500}
                  style={{ marginLeft: 10, color: '#7367f0' }}
                >
                  IT Network
                </Box>
              </Typography>
            </Grid>
            <div>
              <List component="nav" style={{ marginTop: 20 }}>
                <Link to="/admin/dashboard" className={classes.link}>
                  <ListItem
                    button
                    key="Dashboard"
                    selected={selectedIndex === 0}
                    style={{ marginTop: 25 }}
                    onClick={(event) => handleListItemClick(event, 0)}
                  >
                    <ListItemIcon>
                      <BiHomeAlt size={22} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography component="div" style={{ marginLeft: -15 }}>
                          <Box fontSize={15} fontWeight={400}>
                            Dashboard
                          </Box>
                        </Typography>
                      }
                    ></ListItemText>
                  </ListItem>
                </Link>
                <ListItem
                  button
                  key="User"
                  onClick={(event) => {
                    setIsExpandedUserMenu(!isExpandedUserMenu)
                  }}
                >
                  <ListItemIcon>
                    <FiUser size={22} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography component="div" style={{ marginLeft: -15 }}>
                        <Box fontSize={15} fontWeight={400}>
                          User
                        </Box>
                      </Typography>
                    }
                  ></ListItemText>
                  {isExpandedUserMenu ? (
                    <ExpandLessRounded />
                  ) : (
                    <ExpandMoreRounded />
                  )}
                </ListItem>
                <Collapse in={isExpandedUserMenu} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to="/admin/user/list" className={classes.link}>
                      <ListItem
                        button
                        key="List User"
                        selected={selectedIndex === 1.1}
                        onClick={(event) => handleListItemClick(event, 1.1)}
                      >
                        <ListItemIcon className={classes.subIcon}>
                          <FiCircle size={11} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="div"
                              style={{ marginLeft: -15 }}
                            >
                              <Box fontSize={15} fontWeight={400}>
                                List
                              </Box>
                            </Typography>
                          }
                        ></ListItemText>
                      </ListItem>
                    </Link>
                    <Link to="/admin/user/request" className={classes.link}>
                      <ListItem
                        button
                        key="Company Request"
                        selected={selectedIndex === 1.2}
                        onClick={(event) => handleListItemClick(event, 1.2)}
                      >
                        <ListItemIcon className={classes.subIcon}>
                          <FiCircle size={11} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="div"
                              style={{ marginLeft: -15 }}
                            >
                              <Box fontSize={15} fontWeight={400}>
                                Request
                              </Box>
                            </Typography>
                          }
                        ></ListItemText>
                      </ListItem>
                    </Link>
                    <Link to="/admin/user/deleted" className={classes.link}>
                      <ListItem
                        button
                        key="Deleted User"
                        selected={selectedIndex === 1.3}
                        onClick={(event) => handleListItemClick(event, 1.3)}
                      >
                        <ListItemIcon className={classes.subIcon}>
                          <FiCircle size={11} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="div"
                              style={{ marginLeft: -15 }}
                            >
                              <Box fontSize={15} fontWeight={400}>
                                Deleted
                              </Box>
                            </Typography>
                          }
                        ></ListItemText>
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
                <Link to="/admin/tags" className={classes.link}>
                  <ListItem
                    button
                    key="tags"
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                  >
                    <ListItemIcon>
                      <BiCategory size={22} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography component="div" style={{ marginLeft: -15 }}>
                          <Box fontSize={15} fontWeight={400}>
                            Tags
                          </Box>
                        </Typography>
                      }
                    ></ListItemText>
                  </ListItem>
                </Link>
                <Link to="/admin/role" className={classes.link}>
                  <ListItem
                    button
                    key="Role"
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                  >
                    <ListItemIcon>
                      <RiContactsBook2Line size={22} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography component="div" style={{ marginLeft: -15 }}>
                          <Box fontSize={15} fontWeight={400}>
                            Role
                          </Box>
                        </Typography>
                      }
                    ></ListItemText>
                  </ListItem>
                </Link>
                <Link to="/admin/permission" className={classes.link}>
                  <ListItem
                    button
                    key="Permission"
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                  >
                    <ListItemIcon>
                      <BiShieldQuarter size={22} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography component="div" style={{ marginLeft: -15 }}>
                          <Box fontSize={15} fontWeight={400}>
                            Permission
                          </Box>
                        </Typography>
                      }
                    ></ListItemText>
                  </ListItem>
                </Link>
                <ListItem
                  button
                  key="Jobs"
                  onClick={(event) => {
                    setIsExpandedJobMenu(!isExpandedJobMenu)
                  }}
                >
                  <ListItemIcon>
                    <MdOutlineWorkOutline size={22} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography component="div" style={{ marginLeft: -15 }}>
                        <Box fontSize={15} fontWeight={400}>
                          Jobs
                        </Box>
                      </Typography>
                    }
                  ></ListItemText>
                  {isExpandedJobMenu ? (
                    <ExpandLessRounded />
                  ) : (
                    <ExpandMoreRounded />
                  )}
                </ListItem>
                <Collapse in={isExpandedJobMenu} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to="/admin/jobs/list" className={classes.link}>
                      <ListItem
                        button
                        key="List Jobs"
                        selected={selectedIndex === 5.1}
                        onClick={(event) => handleListItemClick(event, 5.1)}
                      >
                        <ListItemIcon className={classes.subIcon}>
                          <FiCircle size={11} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="div"
                              style={{ marginLeft: -15 }}
                            >
                              <Box fontSize={15} fontWeight={400}>
                                List
                              </Box>
                            </Typography>
                          }
                        ></ListItemText>
                      </ListItem>
                    </Link>
                    <Link to="/admin/jobs/request" className={classes.link}>
                      <ListItem
                        button
                        key="Job Request"
                        selected={selectedIndex === 5.2}
                        onClick={(event) => handleListItemClick(event, 5.2)}
                      >
                        <ListItemIcon className={classes.subIcon}>
                          <FiCircle size={11} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="div"
                              style={{ marginLeft: -15 }}
                            >
                              <Box fontSize={15} fontWeight={400}>
                                Request
                              </Box>
                            </Typography>
                          }
                        ></ListItemText>
                      </ListItem>
                    </Link>
                    <Link to="/admin/jobs/deleted" className={classes.link}>
                      <ListItem
                        button
                        key="Deleted Jobs"
                        selected={selectedIndex === 5.3}
                        onClick={(event) => handleListItemClick(event, 5.3)}
                      >
                        <ListItemIcon className={classes.subIcon}>
                          <FiCircle size={11} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="div"
                              style={{ marginLeft: -15 }}
                            >
                              <Box fontSize={15} fontWeight={400}>
                                Deleted
                              </Box>
                            </Typography>
                          }
                        ></ListItemText>
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
              </List>
            </div>
          </Drawer>
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  customBadge: {
    backgroundColor: '#28C76F',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: theme.spacing(8),
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    borderRadius: 10,
    boxShadow:
      'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
  },
  menu: {
    marginTop: theme.spacing(8),
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    border: 'none',
  },
  paper: {
    width: theme.spacing(32),
    padding: theme.spacing(3, 2),
    boxShadow:
      'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
    border: 'none',
  },
  link: {
    textDecoration: 'none',
  },
  subIcon: {
    marginLeft: theme.spacing(1),
  },
}))
