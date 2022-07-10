import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Slide,
  Step,
  StepLabel,
  Stepper,
  Typography,
  CardMedia,
  Box,
} from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { RiCloseCircleFill, RiClosedCaptioningFill } from 'react-icons/ri'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useDispatch, useSelector } from 'react-redux'
import { closeForm, cvFormSelector, setCurrent, setType } from './cvFormSlice'
import storageUser from 'constants/storageUser'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import {
  GoogleMap,
  LoadScript,
  useJsApiLoader,
  useLoadScript,
} from '@react-google-maps/api'
import { GOOGLE_MAP_API_KEY } from 'constants/env'
import Map from '../Map/Map'
import { mapSelector, setCoordinate, showForm } from '../Map/mapSlice'
import {
  addJob,
  postCv,
  editJobByJobId,
  getAllTag,
  setFile,
  uploadFile,
  userSelector,
} from 'features/Guest/userSlice'

import { EditorState, ContentState } from 'draft-js'

import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useEffect } from 'react'
import { authSelector, getAllCity } from 'features/Auth/authSlice'
import moment from 'moment'
import { convertToHTML, convertFromHTML } from 'draft-convert'
import { stateFromHTML } from 'draft-js-import-html'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import { message } from 'constants/message'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
function SlideTransition(props) {
  return <Slide {...props} direction="up" timeout={200} />
}
const steps = [
  'Enter CV Name',
  'Add Your CV',
  // 'Pick your tags',
]

function CvForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { onSubmit, type } = useSelector(cvFormSelector)
  const [activeStep, setActiveStep] = useState(0)
  const [cv, setCv] = useState('')
  const { currentCv } = useSelector(cvFormSelector)
  const tokenUser = localStorage.getItem(storageUser.TOKEN)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const { latitude, longitude } = useSelector(mapSelector)
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
  }
  const [name, setName] = useState('')
  const handleChangeName = (event) => setName(event.target.value)

  const [image, setImage] = useState('')
  const handleChangeImg = (event) => setIntroImg(event.target.value)
  const username = sessionStorage.getItem(storageUser.USERNAME)
  const handleChangeCv = (event) => {
    let formData = new FormData()
    console.log(formData)
    let modelData = {
      name: name,
      url: 'http://driver.com/xyz',
      activate: false,
      userId: 1,
      jobId: 'baec',
      username: username,
    }
    formData.append('file', event.target.files[0])
    formData.append('model', JSON.stringify(modelData))
    console.log(formData)
    dispatch(setCurrent(formData))
    setCv(event.target.value)
    // setImage(event.target.value)
  }
  const { file, tagList, status } = useSelector(userSelector)
  const handleAdd = () => {
    console.log('add')
  }
  const handleSubmit = () => {
    console.log('Submit')
    dispatch(postCv(currentCv))
    dispatch(closeForm())

    setActiveStep(0)
    setName(0)
    setCv(null)
    dispatch(
      showSnackbar({
        type: SNACK_BAR_TYPE.SUCCESS,
        message: message.CHANGE_PHONE_SUCCESS,
      })
    )
  }
  const [editorStateDescription, setEditorStateDescription] = useState(() =>
    EditorState.createEmpty()
  )
  useEffect(() => {
    if (type === 'add') {
      dispatch(
        setCoordinate({
          latitude: 16.054407,
          longitude: 108.202164,
        })
      )
    }
    if (type === 'edit') {
      dispatch(
        setCoordinate({
          latitude: currentJob?.address?.latitude,
          longitude: currentJob?.address?.longitude,
        })
      )
    }
  }, [type])
  useEffect(() => {
    if (status === 'addJob.fulfilled') {
      dispatch(closeForm())
      dispatch(setType(''))
    }
    if (status === 'editJobByJobId.fulfilled') {
      dispatch(closeForm())
      dispatch(setType(''))
    }
  }, [status])
  const handleCreate = () => {
    dispatch(
      addJob({
        jobName: name,
        jobType: jobType,
        lowestSalary: lowestWage,
        highestSalary: highestWage,
        experience: experience,
        // //timeExpired: deadline: moment(deadline).format('YYYY-MM-DD'),
        // timeExpired: moment(deadline).format('YYYY-MM-DD'),
        // //city,
        // companyAddress: address,
        // //fullAddress,
        // //latitude,
        // //longitude,
        // companyName: 'viettel',
        // createAt: null,
        // companyLogo: introImg,
        // jobDetail: convertToHTML(editorStateDescription.getCurrentContent()),
      })
    )
  }
  const [tag, setTag] = useState([])
  useEffect(() => {
    if (type === 'add') {
      // setName('')
      // // setJobType('')
      // dispatch(setFile(''))
      // setUsername('')
    }
  }, [currentCv, type])
  const handleChangeTag = (event) => {
    setTag(event.target.value)
  }
  return (
    <div>
      <Dialog
        maxWidth="xl"
        fullWidth
        open={Boolean(onSubmit)}
        onClose={() => {
          dispatch(closeForm())
        }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.01)',
        }}
        PaperProps={{
          style: {
            backgroundColor: 'white',
            boxShadow: 'none',
            padding: 8,
            borderRadius: 17,
            height: '85vh',
          },
        }}
        TransitionComponent={SlideTransition}
      >
        <Box position="absolute" top={10} right={10}>
          <IconButton
            onClick={() => {
              dispatch(closeForm())
            }}
          >
            <RiCloseCircleFill fontSize={24} />
          </IconButton>
        </Box>
        <DialogTitle>
          {type === 'add' ? 'Add a new job post' : 'Edit a job post'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>Please follow the steps below</DialogContentText>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => {
                const stepProps = {}
                const labelProps = {}
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography style={{ marginLeft: 49, marginTop: 24 }}>
                  <Box fontWeight={600} fontSize={21}>
                    All steps completed - you&apos;re finished
                  </Box>
                </Typography>
                {type === 'add' && (
                  <Typography style={{ marginLeft: 49, marginTop: 16 }}>
                    <Box fontWeight={400} fontSize={14}>
                      • Click create to finish
                    </Box>
                  </Typography>
                )}
                {type === 'edit' && (
                  <Typography style={{ marginLeft: 49, marginTop: 16 }}>
                    <Box fontWeight={400} fontSize={14}>
                      • Click edit to finish
                    </Box>
                  </Typography>
                )}
                <Typography style={{ marginLeft: 49, marginTop: 16 }}>
                  <Box fontWeight={400} fontSize={14}>
                    • Click reset to back to the step 1
                  </Box>
                </Typography>
                <Typography style={{ marginLeft: 49, marginTop: 16 }}>
                  <Box fontWeight={400} fontSize={14}>
                    • Click back to back to the previous step
                  </Box>
                </Typography>
                <Box
                  position="absolute"
                  bottom={24}
                  right={80}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button
                    style={{
                      height: 40,
                      marginRight: 24,
                      width: 128,
                      borderRadius: 10,
                    }}
                    onClick={handleBack}
                    startIcon={<BiChevronLeft />}
                  >
                    Back
                  </Button>
                  <Button
                    style={{
                      height: 40,
                      marginRight: 24,
                      width: 128,
                      borderRadius: 10,
                    }}
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                  {type === 'add' && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleSubmit}
                    >
                      Create
                    </Button>
                  )}
                  {type === 'edit' && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === 0 && (
                  <Grid
                    style={{ paddingRight: 48, paddingLeft: 48, marginTop: 24 }}
                  >
                    <Typography component="div">
                      <Box fontSize={16} fontWeight={600}>
                        Step 1: Enter CV name
                      </Box>
                    </Typography>
                    <Typography component="div">
                      <Box fontSize={14} fontWeight={400}>
                        Please enter your CV name
                      </Box>
                    </Typography>
                    <ValidatorForm
                      onSubmit={handleNext}
                      style={{ marginTop: 8 }}
                    >
                      <TextValidator
                        fullWidth
                        variant="filled"
                        className={classes.input}
                        label="Name"
                        type="text"
                        onChange={handleChangeName}
                        autoComplete="none"
                        name="name"
                        inputProps={{ style: { fontSize: 14 } }}
                        value={name}
                        validators={['required']}
                        errorMessages={['Name is required']}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        sx={{
                          backgroundColor: '#fff',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          paddingRight: 80,
                          paddingLeft: 80,
                          justifyContent: 'space-between',
                        }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          variant="text"
                          className={classes.backButton}
                          startIcon={<BiChevronLeft />}
                        >
                          Back
                        </Button>
                        <Button
                          color="primary"
                          variant="contained"
                          className={classes.submit}
                          type="submit"
                          endIcon={<BiChevronRight />}
                        >
                          Next
                        </Button>
                      </Box>
                    </ValidatorForm>
                  </Grid>
                )}
              </React.Fragment>
            )}
            {activeStep === 1 && (
              <Grid
                style={{ paddingRight: 48, paddingLeft: 48, marginTop: 24 }}
              >
                <Typography component="div">
                  <Box fontSize={16} fontWeight={600}>
                    Step 2: Add Your CV
                  </Box>
                </Typography>
                <Typography component="div">
                  <Box fontSize={14} fontWeight={400}>
                    Please pick one CV
                  </Box>
                </Typography>
                <ValidatorForm onSubmit={handleNext} style={{ marginTop: 8 }}>
                  <TextValidator
                    fullWidth
                    variant="filled"
                    type="file"
                    className={classes.input}
                    label="CV"
                    onChange={handleChangeCv}
                    autoComplete="none"
                    name="cv"
                    inputProps={{ style: { fontSize: 14 } }}
                    id="cv"
                    value={cv}
                    // InputLabelProps={{ shrink: true, style: { fontSize: 16 } }}
                  ></TextValidator>
                  {/* // {type === 'add' && (
                  //   <CardMedia image={file} style={{ height: 60, width: 80 }} />
                  // )}
                  // {type === 'edit' && (
                  //   <CardMedia image={file} style={{ height: 60, width: 80 }} />
                  // )} */}
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      paddingRight: 80,
                      paddingLeft: 80,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      variant="text"
                      className={classes.backButton}
                      startIcon={<BiChevronLeft />}
                    >
                      Back
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.submit}
                      type="submit"
                      endIcon={<BiChevronRight />}
                    >
                      Next
                    </Button>
                  </Box>
                </ValidatorForm>
              </Grid>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage:
      'url(https://images6.alphacoders.com/987/thumb-1920-987255.png)',
    height: '100vh',
    padding: theme.spacing(0),
  },
  select: {
    maxHeight: 160,
    maxWidth: 200,
  },

  input: {
    margin: theme.spacing(2, 0),
    [`& fieldset`]: {
      borderRadius: 10,
    },
  },
  iconContainer: {
    marginTop: theme.spacing(3),
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
  backButton: {
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 4),
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 15,
    textTransform: 'capitalize',
    boxShadow: 'none',
  },
}))

export default CvForm
