import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
  Menu,
  ListItemIcon,
  TextField,
  Card,
  CardActionArea,
  Slide,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/styles'
import { getAuth } from 'components/Header/headerSlice'
import {
  authSelector,
  getAllCity,
  getProfile,
  logout,
} from 'features/Auth/authSlice'
import React from 'react'
import { useEffect } from 'react'
import { BiDownload, BiMessage } from 'react-icons/bi'
import {
  FaBullseye,
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaLessThanEqual,
  FaLinkedin,
} from 'react-icons/fa'
import { RiMessage3Line, RiNotification2Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import LogoSVG from 'assets/logo.svg'
import { MdLogout, MdOutlineAccountCircle } from 'react-icons/md'
import AddJobBG from 'assets/addJob.jpg'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useState } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import storageUser from 'constants/storageUser'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { uploadFile, userSelector, getAllTag, addJob } from '../userSlice'

function SlideTransition(props) {
  return <Slide {...props} direction="up" timeout={200} />
}
const username = localStorage.getItem(storageUser.USERNAME)

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
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertToHTML } from 'draft-convert'
import moment from 'moment'
function CreateJob(props) {
  const [activeStep, setActiveStep] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const username = localStorage.getItem(storageUser.USERNAME)
  const [editorStateDescription, setEditorStateDescription] = useState(() =>
    EditorState.createEmpty()
  )
  const { info, cityList } = useSelector(authSelector)

  const history = useHistory()

  const [name, setName] = useState('')

  const [type, setType] = useState('')

  const [lowestWage, setLowestWage] = useState(null)

  const [highestWage, setHighestWage] = useState(null)

  const [experience, setExperience] = useState(null)

  const [deadline, setDeadline] = useState(new Date())

  const [city, setCity] = useState('')

  const [street, setStreet] = useState(null)

  const [image, setImage] = useState('')

  const { status, file, tagList } = useSelector(userSelector)

  const [tag, setTag] = useState([])

  const handleChangeName = (event) => setName(event.target.value)

  const handleChangeLowestWage = (event) => setLowestWage(event.target.value)

  const handleChangeHighestWage = (event) => setHighestWage(event.target.value)

  const handleChangeExperience = (event) => setExperience(event.target.value)

  const handleChangeType = (event) => setType(event.target.value)

  const handleChangeDeadline = (date) => {
    setDeadline(date)
    setIsOpenDatePicker(false)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleChangeCity = (event) => setCity(event.target.value)

  const handleChangeTag = (event) => {
    setTag(event.target.value)
  }

  const handleChangeStreet = (event) => setStreet(event.target.value)
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)

  const handleChangeImage = (event) => {
    // let formData = new FormData()
    // formData.append('file', event.target.files[0])
    // dispatch(uploadFile(formData))
    // setImage(event.target.files[0])
    setImage(event.target.value)
  }

  useEffect(() => {
    if (status === 'addJob.fulfilled') history.push('/home')
  }, [status])

  useEffect(() => {
    dispatch(getAuth())
    dispatch(getProfile(username))
  }, [])

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

  const handleSubmitForm = () => {
    dispatch(
      addJob({
        name,
        lowestWage: Number(lowestWage),
        highestWage: Number(highestWage),
        description: convertToHTML(editorStateDescription.getCurrentContent()),
        type,
        experience: Number(experience),
        deadline: moment(deadline).format('YYYY-MM-DD'),
        introImg: file,
        tagIds: tag,
        city: Number(city),
        fullAddress: street,
        longitude: 15.99119,
        latitude: 78.137062,
      })
    )
  }
  useEffect(() => {
    dispatch(getAllCity())
    dispatch(getAllTag())
  }, [])
  return (
    <Container maxWidth="xl" className={classes.root}>
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
                        {info?.profile?.name}
                      </Box>
                    </Typography>
                    <Typography component="div">
                      <Box
                        fontSize={12}
                        fontWeight={500}
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
                    <Avatar src={info?.profile?.profileUrl} />
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
      <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <Grid item className={classes.imageContainer}>
          <CardMedia
            image={AddJobBG}
            style={{
              width: '100%',
              height: 400,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              filter: 'brightness(40%)',
              boxShadow:
                'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
            }}
          />
          <Grid
            style={{
              position: 'absolute',
              bottom: 100,
              left: 160,
              display: 'flex',
              justifyContent: 'center',

              flexDirection: 'column',
            }}
          >
            <Typography component="div">
              <Box fontSize={32} fontWeight={600} style={{ color: '#fff' }}>
                Create Post
              </Box>
            </Typography>
            <Typography component="div">
              <Box fontSize={20} fontWeight={400} style={{ color: '#fff' }}>
                Make a post for your own
              </Box>
            </Typography>
          </Grid>
        </Grid> */}
        <Grid item xs={12} sm={10} className={classes.addForm}></Grid>
        {/* <Grid item xs={12} sm={8} className={classes.formContainer}>
          <Grid className={classes.boxContainer}>
            <Typography component="div">
              <Box fontSize={24} fontWeight={600}>
                Job Information
              </Box>
            </Typography>
            <Typography component="div">
              <Box fontSize={16} fontWeight={300}>
                Please enter all information for the job post
              </Box>
            </Typography>
            <ValidatorForm onSubmit={handleSubmit} style={{ marginTop: 24 }}>
              <TextValidator
                fullWidth
                variant="filled"
                className={classes.input}
                label="Name"
                type="text"
                required
                onChange={handleChangeName}
                autoComplete="none"
                name="name"
                inputProps={{ style: { fontSize: 14 } }}
                value={name}
                validators={['required']}
                errorMessages={['Name is required']}
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
              <TextValidator
                fullWidth
                required
                variant="filled"
                type="number"
                className={classes.input}
                label="Lowest Wage"
                onChange={handleChangeLowestWage}
                autoComplete="none"
                name="lowestwage"
                inputProps={{ style: { fontSize: 14 } }}
                value={lowestWage}
                validators={['required']}
                errorMessages={['Lowest Wage is required']}
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
              <TextValidator
                fullWidth
                variant="filled"
                type="number"
                required
                className={classes.input}
                label="Highest Wage"
                onChange={handleChangeHighestWage}
                autoComplete="none"
                name="highestwage"
                inputProps={{ style: { fontSize: 14 } }}
                value={highestWage}
                validators={['required']}
                errorMessages={['Highest Wage is required']}
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
              <TextValidator
                fullWidth
                variant="filled"
                select
                required
                className={classes.input}
                label="Type"
                onChange={handleChangeType}
                name="type"
                value={type}
                inputProps={{ style: { fontSize: 14 } }}
                validators={['required']}
                errorMessages={['Type is required']}
                SelectProps={{
                  MenuProps: {
                    disableScrollLock: true,
                    classes: { paper: classes.select },
                  },
                }}
              >
                <MenuItem key="item1" value="FULLTIME">
                  FULLTIME
                </MenuItem>
                <MenuItem key="item2" value="PARTTIME">
                  PARTTIME
                </MenuItem>
              </TextValidator>
              <TextValidator
                fullWidth
                variant="filled"
                type="number"
                className={classes.input}
                label="Experience"
                onChange={handleChangeExperience}
                autoComplete="none"
                name="experience"
                inputProps={{ style: { fontSize: 14 } }}
                value={experience}
                validators={['required']}
                errorMessages={['Experience is required']}
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  open={isOpenDatePicker}
                  onOpen={() => setIsOpenDatePicker(true)}
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="deadline"
                  label="Deadline"
                  value={deadline}
                  onChange={handleChangeDeadline}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <TextValidator
                fullWidth
                variant="filled"
                select
                required
                className={classes.input}
                label="City"
                onChange={handleChangeCity}
                autoComplete="none"
                name="city"
                inputProps={{ style: { fontSize: 14 } }}
                value={city}
                validators={['required']}
                errorMessages={['City is required']}
                InputLabelProps={{ style: { fontSize: 16 } }}
                SelectProps={{
                  MenuProps: {
                    disableScrollLock: true,
                    classes: { paper: classes.select },
                  },
                }}
              >
                {cityList.map((item) => {
                  return (
                    <MenuItem key={item?.province_id} value={item?.province_id}>
                      {item?.province_name}
                    </MenuItem>
                  )
                })}
              </TextValidator>
              <TextValidator
                fullWidth
                variant="filled"
                type="text"
                required
                className={classes.input}
                label="Street"
                onChange={handleChangeStreet}
                autoComplete="none"
                name="street"
                inputProps={{ style: { fontSize: 14 } }}
                value={street}
                validators={['required']}
                errorMessages={['Street is required']}
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
              <TextValidator
                fullWidth
                variant="filled"
                type="file"
                required
                className={classes.input}
                label="Image"
                onChange={handleChangeImage}
                autoComplete="none"
                name="image"
                inputProps={{ style: { fontSize: 14 } }}
                id="image"
                validators={['required']}
                errorMessages={['Image is required']}
                InputLabelProps={{ shrink: true, style: { fontSize: 16 } }}
              ></TextValidator>
              {image && (
                <CardMedia image={file} style={{ height: 200, width: 300 }} />
              )}
              <TextValidator
                fullWidth
                variant="filled"
                select
                required
                className={classes.input}
                label="Tag"
                value={tag}
                onChange={handleChangeTag}
                autoComplete="none"
                name="tag"
                inputProps={{ style: { fontSize: 14 } }}
                validators={['required']}
                errorMessages={['Tag is required']}
                InputLabelProps={{ style: { fontSize: 16 } }}
                SelectProps={{
                  multiple: true,

                  MenuProps: {
                    disableScrollLock: true,
                    classes: { paper: classes.select },
                  },
                }}
              >
                {tagList?.map((item) => {
                  return (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item?.name}
                    </MenuItem>
                  )
                })}
              </TextValidator>

              <Typography>
                <Box
                  fontSize={14}
                  fontWeight={500}
                  style={{ marginTop: 32, marginBottom: 8, color: '#000' }}
                >
                  Description*
                </Box>
              </Typography>
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: 16,
                  minHeight: '400px',
                }}
              >
                <Editor
                  editorState={editorStateDescription}
                  onEditorStateChange={setEditorStateDescription}
                />
              </div>
              <Button
                color="primary"
                variant="contained"
                className={classes.submit}
                type="submit"
                onClick={handleSubmitForm}
              >
                Create
              </Button>
            </ValidatorForm>
          </Grid>
        </Grid> */}
      </Grid>
    </Container>
  )
}

export default CreateJob
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
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
  submit: {
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 4),
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 15,
    textTransform: 'capitalize',
    boxShadow: 'none',
    color: '#fff',
    '&:hover': {
      boxShadow:
        'rgba(115,103,240,0.25) 0px 15px 25px, rgba(115,103,240, 0.15) 0px 5px 10px',
      background: '#7367f0',
    },
  },
  boxContainer: {
    width: '100%',
  },
  input: {
    margin: theme.spacing(1.5, 0),
    [`& fieldset`]: {
      borderRadius: 10,
    },
  },
  imageContainer: {
    backgroundColor: '#fff',
    width: '100vw',
    height: theme.spacing(50),
    borderRadius: 10,
    position: 'relative',
    boxShadow:
      'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
  },
  formContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  addForm: {
    backgroundColor: '#fff',
    height: 200,
  },
}))
