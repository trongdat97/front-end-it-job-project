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
  Chip,
  StepLabel,
  Stepper,
  Typography,
  CardMedia,
  Box,
} from '@material-ui/core'
import {
  MdLocationPin,
  MdMoreHoriz,
  MdOutlineMenu,
  MdPeople,
} from 'react-icons/md'
import { CloseOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import Parser from 'html-react-parser'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { RiCloseCircleFill, RiClosedCaptioningFill } from 'react-icons/ri'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useDispatch, useSelector } from 'react-redux'

import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useEffect } from 'react'
import { authSelector, getAllCity } from 'features/Auth/authSlice'
import { jobDetailsSelector, closeForm } from './jobDetailsSlice'
import { jobFormSelector } from '../JobForm/jobFormSlice'
import moment from 'moment'

function SlideTransition(props) {
  return <Slide {...props} direction="up" timeout={200} />
}

function JobDetails() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { currentJob } = useSelector(jobFormSelector)
  const { onSubmit, type } = useSelector(jobDetailsSelector)
  const { cityList } = useSelector(authSelector)

  return (
    <div>
      <Dialog
        maxWidth="md"
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
            paddingLeft: 0,
            paddingRight: 0,
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
        <DialogTitle>Job Details</DialogTitle>
        <Divider />
        <DialogContent style={{ padding: 0 }}>
          <Grid
            container
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardMedia
              component="img"
              image={currentJob?.companyLogo}
              style={{ width: '100%', height: 'auto' }}
            />
            <Grid
              container
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
              }}
            >
              <Chip
                size="medium"
                label={currentJob?.companyName}
                style={{
                  fontSize: 12,
                  backgroundColor: '#64b5f6',
                  color: '#fff',
                  fontWeight: 400,
                  width: 100,
                  marginTop: 16,
                  marginLeft: 24,
                }}
              />
              <Typography>
                <Box
                  fontSize={28}
                  fontWeight={600}
                  style={{
                    marginTop: 16,
                    marginLeft: 24,
                    color: '#7367f0',
                  }}
                >
                  {currentJob?.jobName}
                </Box>
              </Typography>
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                  marginLeft: 24,
                }}
              >
                <MdLocationPin fontSize={13} style={{ color: 'grey' }} />
                <Typography component="div">
                  <Box
                    fontSize={14}
                    fontWeight={500}
                    style={{ marginLeft: 8, color: '#5e5873' }}
                  >
                    {currentJob?.companyAddress}
                  </Box>
                </Typography>
              </Grid>
              <Grid style={{ marginLeft: 16, marginTop: 8, marginBottom: 8 }}>
                {currentJob?.tags?.map((item) => (
                  <Chip
                    size="small"
                    label={item?.name}
                    style={{ marginLeft: 8 }}
                  />
                ))}
              </Grid>
              <Grid style={{ display: 'flex', flexDirection: 'row' }}>
                <Grid container style={{ alignItems: 'center' }}>
                  <Typography>
                    <Box
                      fontSize={15}
                      fontWeight={700}
                      style={{
                        marginLeft: 24,
                        color: '#5e5873',
                      }}
                    >
                      Posted:
                    </Box>
                  </Typography>
                  <Typography>
                    <Box
                      fontSize={15}
                      fontWeight={500}
                      style={{
                        marginLeft: 24,
                        color: '#5e5873',
                      }}
                    >
                      {`${moment(currentJob?.createAt).format(
                        'hh:mm A - DD/MM/YYYY'
                      )}`}
                    </Box>
                  </Typography>
                </Grid>
                <Grid container style={{ alignItems: 'center' }}>
                  <Typography>
                    <Box
                      fontSize={15}
                      fontWeight={700}
                      style={{
                        marginLeft: 24,
                        color: '#5e5873',
                      }}
                    >
                      Deadline:
                    </Box>
                  </Typography>
                  <Typography>
                    <Box
                      fontSize={15}
                      fontWeight={500}
                      style={{
                        marginLeft: 24,
                        color: '#5e5873',
                      }}
                    >
                      {`${moment(currentJob?.timeExpired).format(
                        'DD/MM/YYYY'
                      )} (${
                        moment(currentJob?.timeExpired).diff(moment(), 'days') >
                        0
                          ? moment(currentJob?.timeExpired).diff(
                              moment(),
                              'days'
                            ) + ' days left)'
                          : '(Expired)'
                      }
                    `}
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
              <Divider style={{ marginTop: 24 }} />
              <Typography>
                <Box
                  fontSize={20}
                  fontWeight={700}
                  style={{
                    marginTop: 16,
                    marginLeft: 24,
                    color: '#5e5873',
                  }}
                >
                  Job Details
                </Box>
              </Typography>
              <Grid container>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={600}
                    style={{
                      marginTop: 16,
                      marginLeft: 32,
                      color: '#5e5873',
                      width: 160,
                    }}
                  >
                    Type
                  </Box>
                </Typography>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={400}
                    style={{
                      marginLeft: 24,
                      color: '#5e5873',
                      marginTop: 16,
                    }}
                  >
                    {currentJob?.type}
                  </Box>
                </Typography>
              </Grid>
              <Grid container>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={600}
                    style={{
                      marginTop: 16,
                      marginLeft: 32,
                      color: '#5e5873',
                      width: 160,
                    }}
                  >
                    Experience
                  </Box>
                </Typography>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={400}
                    style={{
                      marginLeft: 24,
                      color: '#5e5873',
                      marginTop: 16,
                    }}
                  >
                    {currentJob?.experience + ' years'}
                  </Box>
                </Typography>
              </Grid>
              <Grid container>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={600}
                    style={{
                      marginTop: 16,
                      marginLeft: 32,
                      color: '#5e5873',
                      width: 160,
                    }}
                  >
                    Lowest wage
                  </Box>
                </Typography>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={400}
                    style={{
                      marginLeft: 24,
                      color: '#5e5873',
                      marginTop: 16,
                    }}
                  >
                    {'$' + currentJob?.lowestWage}
                  </Box>
                </Typography>
              </Grid>
              <Grid container>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={600}
                    style={{
                      marginTop: 16,
                      marginLeft: 32,
                      color: '#5e5873',
                      width: 160,
                    }}
                  >
                    Highest wage
                  </Box>
                </Typography>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={400}
                    style={{
                      marginLeft: 24,
                      color: '#5e5873',
                      marginTop: 16,
                    }}
                  >
                    {'$' + currentJob?.highestWage}
                  </Box>
                </Typography>
              </Grid>
              <Grid container>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={600}
                    style={{
                      marginTop: 16,
                      marginLeft: 32,
                      color: '#5e5873',
                      width: 160,
                    }}
                  >
                    Tags
                  </Box>
                </Typography>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={400}
                    style={{
                      marginLeft: 24,
                      color: '#5e5873',
                      marginTop: 16,
                    }}
                  >
                    {String(currentJob?.tags?.map((item) => ` ${item?.name}`))}
                  </Box>
                </Typography>
              </Grid>
              <Grid container>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={600}
                    style={{
                      marginTop: 16,
                      marginLeft: 32,
                      color: '#5e5873',

                      width: 160,
                    }}
                  >
                    Deadline
                  </Box>
                </Typography>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={400}
                    style={{
                      marginLeft: 24,
                      color: '#5e5873',
                      marginTop: 16,
                    }}
                  >
                    {moment(currentJob?.deadline).format('DD/MM/YYYY')}
                  </Box>
                </Typography>
              </Grid>
              <Divider style={{ marginTop: 24 }} />
              <Typography>
                <Box
                  fontSize={20}
                  fontWeight={700}
                  style={{
                    marginTop: 32,
                    marginLeft: 24,
                    color: '#5e5873',
                  }}
                >
                  Address
                </Box>
              </Typography>
              <Grid container>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={600}
                    style={{
                      marginTop: 16,
                      marginLeft: 32,
                      color: '#5e5873',
                      width: 160,
                    }}
                  >
                    City
                  </Box>
                </Typography>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={400}
                    style={{
                      marginLeft: 24,
                      color: '#5e5873',
                      marginTop: 16,
                    }}
                  >
                    {
                      cityList?.find(
                        (item) =>
                          item?.province_id ===
                          String(currentJob?.companyAddress)
                      )?.province_name
                    }
                  </Box>
                </Typography>
              </Grid>
              <Grid container>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={600}
                    style={{
                      marginTop: 16,
                      marginLeft: 32,
                      color: '#5e5873',
                      width: 160,
                    }}
                  >
                    Detail
                  </Box>
                </Typography>
                <Typography>
                  <Box
                    fontSize={15}
                    fontWeight={400}
                    style={{
                      marginLeft: 24,
                      color: '#5e5873',
                      marginTop: 16,
                    }}
                  >
                    {currentJob?.companyAddress}
                  </Box>
                </Typography>
              </Grid>
              <Divider style={{ marginTop: 24 }} />
              <Typography>
                <Box
                  fontSize={20}
                  fontWeight={700}
                  style={{
                    marginTop: 32,
                    marginLeft: 24,
                    color: '#5e5873',
                  }}
                >
                  Description
                </Box>
              </Typography>

              <Typography>
                <Box
                  fontSize={15}
                  fontWeight={400}
                  style={{
                    marginLeft: 24,
                    color: '#5e5873',
                    marginTop: 16,
                  }}
                >
                  {Parser(currentJob?.jobDetail + '')}
                </Box>
              </Typography>
            </Grid>
          </Grid>
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

export default JobDetails
