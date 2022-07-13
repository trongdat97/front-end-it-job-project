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
import { closeForm, jobFormSelector, setType } from './jobFormSlice'
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
  editJobByJobId,
  getAllTag,
  getJobByUsername,
  setFile,
  uploadFile,
  userSelector,
} from 'features/User/userSlice'
import { EditorState, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useEffect } from 'react'
import { authSelector, getAllCity } from 'features/Auth/authSlice'
import moment from 'moment'
import { convertToHTML, convertFromHTML } from 'draft-convert'
import { stateFromHTML } from 'draft-js-import-html'
import storageUser from 'constants/storageUser'
function SlideTransition(props) {
  return <Slide {...props} direction="up" timeout={200} />
}
const steps = [
  'Enter a name',
  'Chose a type',
  'Set a salary',
  'Enter your experience',
  'Pick a deadline',
  'Enter your address',
  'Add an image',
  "Add a job's description",
  // 'Pick your tags',
]

function JobForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { cityList } = useSelector(authSelector)
  const { onSubmit, type } = useSelector(jobFormSelector)
  const [activeStep, setActiveStep] = useState(0)
  const { currentJob } = useSelector(jobFormSelector)
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

  const [jobType, setJobType] = useState('')
  const handleChangeJobType = (event) => setJobType(event.target.value)

  const [lowestWage, setLowestWage] = useState(null)
  const handleChangeLowestWage = (event) => setLowestWage(event.target.value)

  const [highestWage, setHighestWage] = useState(null)
  const handleChangeHighestWage = (event) => setHighestWage(event.target.value)

  const [experience, setExperience] = useState(null)
  const handleChangeExperience = (event) => setExperience(event.target.value)

  const [deadline, setDeadline] = useState(new Date())
  //const [deadline, setDeadline] = useState('')
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)

  const [address, setAddress] = useState('')
  const [introImg, setIntroImg] = useState('')
  const handleChangeImg = (event) => setIntroImg(event.target.value)
  const handleChangeAddress = (event) => setAddress(event.target.value)

  const username = sessionStorage.getItem(storageUser.USERNAME)
  const handleChangeDeadline = (date) => {
    setDeadline(date)
    setIsOpenDatePicker(false)
  }
  // useEffect(() => {
  //   dispatch(getAllCity())
  //   dispatch(getAllTag())
  // }, [])
  const [city, setCity] = useState('')
  const handleChangeCity = (event) => setCity(event.target.value)
  const [image, setImage] = useState('')
  const handleChangeImage = (event) => {
    // let formData = new FormData()
    // formData.append('file', event.target.files[0])
    // dispatch(uploadFile(formData))
    // setImage(event.target.files[0])
    setImage(event.target.value)
  }
  const { file, tagList, status } = useSelector(userSelector)
  const handleAdd = () => {
    console.log('add')
  }
  const handleEdit = () => {
    let tagArr = []
    for (let i = 0; i < tag.length; i++) tagArr[i] = { id: tag[i] }
    dispatch(
      editJobByJobId({
        id: currentJob?.id,
        data: {
          name,
          type: jobType,
          lowestWage: String(lowestWage),
          highestWage: String(highestWage),
          experience: String(experience),
          deadline: deadline.format('YYYY-MM-DD'),
          city: String(city),
          fullAddress: address,
          //latitude,
          //longitude,
          introImg: file,
          description: convertToHTML(
            editorStateDescription.getCurrentContent()
          ),
          tags: tagArr,
        },
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
      dispatch(getJobByUsername(username))
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
        //timeExpired: deadline: moment(deadline).format('YYYY-MM-DD'),
        timeExpired: moment(deadline).format('YYYY-MM-DD'),
        //city,
        companyAddress: address,
        //fullAddress,
        //latitude,
        //longitude,
        companyName: 'viettel',
        createAt: moment().format('YYYY-MM-DD'),
        companyLogo: introImg,
        jobDetail: convertToHTML(editorStateDescription.getCurrentContent()),
        username: username,
      })
    )
  }
  const [tag, setTag] = useState([])
  useEffect(() => {
    if (type === 'add') {
      setName('')
      setJobType('')
      setLowestWage(null)
      setHighestWage(null)
      setExperience(null)
      setDeadline(new Date())
      setCity(null)
      setAddress('')
      setEditorStateDescription(() => EditorState.createEmpty())
      setTag([])
      dispatch(setFile(''))
      setActiveStep(0)
    }
    if (type === 'edit') {
      setName(currentJob?.name)
      setJobType(currentJob?.type)
      setLowestWage(currentJob?.lowestWage)
      setHighestWage(currentJob?.highestWage)
      setExperience(currentJob?.experience)
      setDeadline(new Date(currentJob?.deadline))
      setCity(currentJob?.address?.city)
      setAddress(currentJob?.address?.description)
      setEditorStateDescription(() =>
        EditorState.createWithContent(stateFromHTML(currentJob?.description))
      )
      setTag(currentJob?.tags?.map((item) => item?.id))
      dispatch(setFile(currentJob?.introImg))
      setActiveStep(0)
    }
  }, [currentJob, type])
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
                      onClick={handleCreate}
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
                        Step 1: Enter a name
                      </Box>
                    </Typography>
                    <Typography component="div">
                      <Box fontSize={14} fontWeight={400}>
                        Please enter your job's name
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
                {activeStep === 1 && (
                  <Grid
                    style={{ paddingRight: 48, paddingLeft: 48, marginTop: 24 }}
                  >
                    <Typography component="div">
                      <Box fontSize={16} fontWeight={600}>
                        Step 2: Choose a type
                      </Box>
                    </Typography>
                    <Typography component="div">
                      <Box fontSize={14} fontWeight={400}>
                        Please chose one type for your job
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
                        label="Type"
                        select
                        onChange={handleChangeJobType}
                        autoComplete="none"
                        name="type"
                        inputProps={{ style: { fontSize: 13 } }}
                        value={jobType}
                        validators={['required']}
                        errorMessages={['Type is required']}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        SelectProps={{
                          MenuProps: {
                            disableScrollLock: true,
                            classes: { paper: classes.select },
                            getContentAnchorEl: null,
                            anchorOrigin: {
                              vertical: 'bottom',
                              horizontal: 'left',
                            },
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
                {activeStep === 2 && (
                  <Box
                    style={{ paddingRight: 48, paddingLeft: 48, marginTop: 24 }}
                  >
                    <Typography component="div">
                      <Box fontSize={16} fontWeight={600}>
                        Step 3: Set a salary
                      </Box>
                    </Typography>
                    <Typography component="div">
                      <Box fontSize={14} fontWeight={400}>
                        Please enter the lowest and the highest wage for your
                        job
                      </Box>
                    </Typography>
                    <ValidatorForm
                      onSubmit={handleNext}
                      style={{ marginTop: 8 }}
                    >
                      <Box
                        sx={{
                          width: '100%',

                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <TextValidator
                          style={{ width: 600 }}
                          variant="filled"
                          className={classes.input}
                          label="Lowest wage"
                          type="number"
                          onChange={handleChangeLowestWage}
                          autoComplete="none"
                          name="lowestwage"
                          inputProps={{ style: { fontSize: 14 } }}
                          value={lowestWage}
                          validators={['required']}
                          errorMessages={['Lowest wage is required']}
                          InputLabelProps={{ style: { fontSize: 16 } }}
                        />
                        <TextValidator
                          style={{ width: 600 }}
                          variant="filled"
                          className={classes.input}
                          label="Highest wage"
                          type="number"
                          onChange={handleChangeHighestWage}
                          autoComplete="none"
                          name="highestwage"
                          inputProps={{ style: { fontSize: 14 } }}
                          value={highestWage}
                          validators={['required']}
                          errorMessages={['Highest wage is required']}
                          InputLabelProps={{ style: { fontSize: 16 } }}
                        />
                      </Box>
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        sx={{
                          width: '100%',
                          backgroundColor: '#fff',
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
                  </Box>
                )}
              </React.Fragment>
            )}
            {activeStep === 3 && (
              <Grid
                style={{ paddingRight: 48, paddingLeft: 48, marginTop: 24 }}
              >
                <Typography component="div">
                  <Box fontSize={16} fontWeight={600}>
                    Step 4: Enter your experience
                  </Box>
                </Typography>
                <Typography component="div">
                  <Box fontSize={14} fontWeight={400}>
                    Please enter the experience that you need about your
                    applicant
                  </Box>
                </Typography>
                <ValidatorForm onSubmit={handleNext} style={{ marginTop: 8 }}>
                  <TextValidator
                    fullWidth
                    variant="filled"
                    className={classes.input}
                    label="Experience"
                    type="number"
                    onChange={handleChangeExperience}
                    autoComplete="none"
                    name="experience"
                    inputProps={{ style: { fontSize: 14 } }}
                    value={experience}
                    validators={['required']}
                    errorMessages={['Experience is required']}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                  />
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    sx={{
                      width: '100%',
                      backgroundColor: '#fff',
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
            {activeStep === 4 && (
              <Grid
                style={{ paddingRight: 48, paddingLeft: 48, marginTop: 24 }}
              >
                <Typography component="div">
                  <Box fontSize={16} fontWeight={600}>
                    Step 5: Pick a deadline
                  </Box>
                </Typography>
                <Typography component="div">
                  <Box fontSize={14} fontWeight={400}>
                    Please choose one deadline for your job post
                  </Box>
                </Typography>
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
                    endIcon={<BiChevronRight />}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            )}
            {activeStep === 5 && (
              <Grid
                style={{ paddingRight: 48, paddingLeft: 48, marginTop: 24 }}
              >
                <Typography component="div">
                  <Box fontSize={16} fontWeight={600}>
                    Step 6: Enter your address
                  </Box>
                </Typography>
                <Typography component="div">
                  <Box fontSize={14} fontWeight={400}>
                    Please choose your position in the map and enter some
                    description about it
                  </Box>
                </Typography>
                <Map />

                <ValidatorForm onSubmit={handleNext} style={{ marginTop: 8 }}>
                  <Box
                    sx={{
                      width: 1200,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* <TextValidator
                      style={{ width: 800 }}
                      variant="filled"
                      className={classes.input}
                      label="City"
                      type="text"
                      onChange={handleChangeCity}
                      autoComplete="none"
                      name="address"
                      inputProps={{ style: { fontSize: 14 } }}
                      value={address}
                      validators={['required']}
                      errorMessages={['City is required']}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                    /> */}
                    <Button
                      style={{ width: 200, height: 50 }}
                      variant="outlined"
                      onClick={() => {
                        dispatch(showForm({ onSubmit: handleAdd }))
                      }}
                    >
                      OPEN THE MAP
                    </Button>
                  </Box>
                  <TextValidator
                    fullWidth
                    variant="filled"
                    className={classes.input}
                    label="Address"
                    type="text"
                    onChange={handleChangeAddress}
                    autoComplete="none"
                    name="address"
                    inputProps={{ style: { fontSize: 14 } }}
                    value={address}
                    validators={['required']}
                    errorMessages={['Address is required']}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                  />
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
            {activeStep === 6 && (
              <Grid
                style={{ paddingRight: 48, paddingLeft: 48, marginTop: 24 }}
              >
                <Typography component="div">
                  <Box fontSize={16} fontWeight={600}>
                    Step 7: Add an image
                  </Box>
                </Typography>
                <Typography component="div">
                  <Box fontSize={14} fontWeight={400}>
                    Please pick one photo for your job
                  </Box>
                </Typography>
                <ValidatorForm onSubmit={handleNext} style={{ marginTop: 8 }}>
                  <TextValidator
                    fullWidth
                    variant="filled"
                    type="text"
                    className={classes.input}
                    label="Image"
                    onChange={handleChangeImg}
                    autoComplete="none"
                    name="image"
                    inputProps={{ style: { fontSize: 14 } }}
                    id="image"
                    value={introImg}
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
            {activeStep === 7 && (
              <Grid
                style={{ paddingRight: 48, paddingLeft: 48, marginTop: 24 }}
              >
                <Typography component="div">
                  <Box fontSize={16} fontWeight={600}>
                    Step 8: Add a job's description
                  </Box>
                </Typography>
                <Typography component="div">
                  <Box fontSize={14} fontWeight={400}>
                    Please enter your job's description
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
                    onClick={handleNext}
                    endIcon={<BiChevronRight />}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            )}
            {/* {activeStep === 8 && (
              <Grid
                style={{ paddingRight: 48, paddingLeft: 48, marginTop: 24 }}
              >
                <Typography component="div">
                  <Box fontSize={16} fontWeight={600}>
                    Step 9: Pick your tags
                  </Box>
                </Typography>
                <Typography component="div">
                  <Box fontSize={14} fontWeight={400}>
                    Please chose one or multiple tags for your job
                  </Box>
                </Typography>
                <ValidatorForm onSubmit={handleNext} style={{ marginTop: 8 }}>
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
                        getContentAnchorEl: null,
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
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
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    sx={{
                      width: '100%',
                      backgroundColor: '#fff',
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
            )} */}
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

export default JobForm
