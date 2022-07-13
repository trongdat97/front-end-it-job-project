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
import { RiCloseCircleFill, RiClosedCaptioningFill } from 'react-icons/ri'
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
  getAllTag,
  getCandidate,
  setFile,
  uploadFile,
  userSelector,
} from 'features/User/userSlice'
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
  const { candidateList, status } = useSelector(userSelector)
  const { currentJob } = useSelector(jobFormSelector)
  const [showInfo, setShowInfo] = useState([])
  useEffect(() => {
    if (status === 'acceptJob.fulfilled' || status === 'denyJob.fulfilled') {
      dispatch(getCandidate(currentJob?.id))
    }
  }, [status])
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
                {'Total: ' + candidateList?.length}
              </Box>
            </Typography>
            <Grid style={{ marginTop: 24 }}>
              {[...candidateList]
                ?.sort((l, r) => (l.match < r.match ? 1 : -1))
                ?.map((item) => (
                  <>
                    <Grid
                      container
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 8,
                        borderRadius: 4,
                        backgroundColor: item?.status
                          ? '#a2cf6e'
                          : item?.isDenied
                          ? '#f6685e'
                          : '#fff',
                      }}
                    >
                      <Grid
                        onClick={() => {
                          if (showInfo.includes(item.id))
                            setShowInfo(showInfo.filter((i) => i != item.id))
                          else setShowInfo([...showInfo, item.id])
                        }}
                        item
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Avatar
                          src={
                            'https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg'
                          }
                        />
                        <Grid>
                          <Typography
                            component="div"
                            style={{
                              marginLeft: 16,
                              color: '#ee0033',
                              cursor: 'pointer',
                            }}
                          >
                            <Box fontSize={14} fontWeight={600}>
                              {item?.name?.substr(0, 25)}
                            </Box>
                          </Typography>
                          <Typography
                            component="div"
                            style={{ marginLeft: 16 }}
                          >
                            <Box fontSize={13} fontWeight={400}>
                              {item?.username + ' - ' + item?.cvname}
                            </Box>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Button
                          style={{
                            backgroundColor: '#2196f3',
                            color: '#fff',
                            height: 30,
                          }}
                          target="_blank"
                          component="a"
                          href={item?.url}
                        >
                          <FaEye fontSize={13} />
                        </Button>
                        <Button
                          style={{
                            backgroundColor: '#4caf50',
                            color: '#fff',
                            height: 30,
                            marginLeft: 8,
                          }}
                          onClick={() =>
                            dispatch(
                              acceptJob({
                                id: currentJob?.id,
                                data: { userId: item?.user?.id },
                              })
                            )
                          }
                        >
                          <BiCheck fontSize={13} />
                        </Button>
                        <Button
                          style={{
                            backgroundColor: '#f44336',
                            color: '#fff',
                            height: 30,
                            marginLeft: 8,
                          }}
                          onClick={() => {
                            dispatch(
                              denyJob({
                                cvId: item?.cvId,
                                jobId: currentJob?.id,
                              })
                            )
                          }}
                        >
                          <MdCancel fontSize={13} />
                        </Button>
                      </Grid>
                    </Grid>
                    {showInfo.includes(item.id) && (
                      <Grid
                        item
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <table
                          style={{
                            borderCollapse: 'collapse',
                            marginTop: 12,
                            marginBottom: 12,
                            borderRadius: 6,
                          }}
                        >
                          <tr>
                            <td
                              style={{
                                border: '1px solid #ddd',
                                width: '15%',
                                padding: 4,
                              }}
                            >
                              Match
                            </td>
                            <th
                              style={{
                                textAlign: 'left',
                                border: '1px solid #ddd',
                                padding: 4,
                              }}
                            >
                              {item?.match}
                            </th>
                          </tr>
                          <tr>
                            <td
                              style={{ border: '1px solid #ddd', padding: 4 }}
                            >
                              CV Skills
                            </td>
                            <th
                              style={{
                                textAlign: 'left',
                                padding: 4,
                                border: '1px solid #ddd',
                              }}
                            >
                              {item?.cvskill}
                            </th>
                          </tr>
                          <tr>
                            <td
                              style={{ border: '1px solid #ddd', padding: 4 }}
                            >
                              JD Skills
                            </td>
                            <th
                              style={{
                                textAlign: 'left',
                                border: '1px solid #ddd',

                                padding: 4,
                              }}
                            >
                              {item?.jdskill}
                            </th>
                          </tr>
                        </table>
                      </Grid>
                    )}
                  </>
                ))}
            </Grid>
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

export default CandidateForm
