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
  Avatar,
  Box,
} from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import storageUser from 'constants/storageUser'
import {
  RiCloseCircleFill,
  RiClosedCaptioningFill,
  RiDeleteBin5Line,
} from 'react-icons/ri'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useDispatch, useSelector } from 'react-redux'
import { closeForm, candidateFormSelector } from './candidateFormSlice'
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
  acceptJob,
  addJob,
  denyJob,
  editJobByJobId,
  setFile,
  uploadFile,
  userSelector,
  applyCv,
  getCvByUsername,
} from 'features/Guest/userSlice'
import { EditorState, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useEffect } from 'react'
import { authSelector, getAllCity } from 'features/Auth/authSlice'
import { jobFormSelector } from '../JobForm/jobFormSlice'
import { FaEye } from 'react-icons/fa'
import { BiCheck } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'
function SlideTransition(props) {
  return <Slide {...props} direction="up" timeout={200} />
}

function CandidateForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { onSubmit } = useSelector(candidateFormSelector)
  const { candidateList, status, cvListByUsername } = useSelector(userSelector)
  const { currentJob } = useSelector(jobFormSelector)
  const [choseCv, setChoseCv] = useState(null)
  const username = sessionStorage.getItem(storageUser.USERNAME)

  const handleApplyCv = () => {
    dispatch(
      applyCv({
        username: sessionStorage.getItem('username'),
        idJob: currentJob?.id,
        idCv: choseCv?.id,
      })
    )
    dispatch(getCvByUsername(username))
    dispatch(closeForm())
  }
  return (
    <div>
      <Dialog
        maxWidth="sm"
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
            padding: 0,
            borderRadius: 17,
            height: '60vh',
            paddingBottom: 96,
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
        <DialogTitle>List Application</DialogTitle>
        <Divider />
        <DialogContent>
          <Box sx={{ width: '100%' }}>
            <Typography component="div">
              <Box fontSize={16} fontWeight={600}>
                {'Job: ' + currentJob?.jobName}
              </Box>
            </Typography>
            <Typography component="div">
              <Box fontSize={14} fontWeight={400}>
                {'Total: ' + cvListByUsername?.length}
              </Box>
            </Typography>
            <Grid style={{ marginTop: 24 }}>
              {cvListByUsername?.map((item, index) => (
                <Grid
                  key={item?.id + 'grid'}
                  className={
                    (classes.menu, choseCv == item ? classes.active : null)
                  }
                  onClick={() => setChoseCv(item)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(231,231,231,0.9)',
                    padding: 3,
                    paddingLeft: 10,
                    borderRadius: 6,
                    marginTop: 12,
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  <Grid
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Grid style={{ marginRight: 8 }}>{index + 1}</Grid>
                    <Grid>{item?.cvname}</Grid>
                  </Grid>
                  <Grid
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <IconButton title="View">
                      <a href={item?.url} target="_blank">
                        <FaEye fontSize={20} />
                      </a>
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                position: 'absolute',
                bottom: 0,
                width: '90%',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => handleApplyCv()}
              >
                Apply
              </Button>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}
const useStyles = makeStyles((theme) => ({
  menu: {
    '&:hover': {
      backgroundColor: 'rgba(196,196,196,0.8) !important',
    },
  },
  active: {
    backgroundColor: 'rgba(196,196,196,0.8) !important',
  },
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

export default CandidateForm
