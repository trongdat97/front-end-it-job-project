import {
  Box,
  Button,
  CardMedia,
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
  Typography,
} from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar'
import { closeInfo, jobInfoSelector, showInfo } from './jobInfoSlice'
import { adminSelector } from '../adminSlice'
import Parser from 'html-react-parser'
import moment from 'moment'
import { current } from 'immer'

function SlideTransition(props) {
  return <Slide {...props} direction="up" timeout={200} />
}

function JobInfo() {
  const classes = useStyles()
  const handleChangeName = (event) => setName(event.target.value)
  const handleChangeImageUrl = (event) => setImageUrl(event.target.value)
  const handleChangeLevelId = (event) => setLevelId(event.target.value)
  const { isOpen } = useSelector(jobInfoSelector)
  const { currentJob } = useSelector(adminSelector)
  const dispatch = useDispatch()
  return (
    <div>
      <CustomSnackBar />
      <Dialog
        maxWidth="md"
        fullWidth
        open={isOpen}
        onClose={() => {
          dispatch(closeInfo())
        }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.01)',
        }}
        PaperProps={{
          style: {
            backgroundColor: 'white',
            boxShadow: 'none',
            padding: 4,
            borderRadius: 8,
            height: '90vh',
          },
        }}
        TransitionComponent={SlideTransition}
      >
        <Box position="absolute" top={10} right={10}>
          <IconButton
            onClick={() => {
              dispatch(closeInfo())
            }}
          >
            <CloseOutlined />
          </IconButton>
        </Box>
        <DialogTitle style={{ marginTop: -5 }}>{'Job info'}</DialogTitle>
        <Divider style={{ marginBottom: 20 }} />
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid>
            <CardMedia
              component="image"
              image={
                currentJob?.introImg
                  ? currentJob?.introImg
                  : 'https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'
              }
              alt={`${currentJob?.name}'s avatar`}
              title={`${currentJob?.name}'s avatar`}
              style={{
                height: 120,
                width: 120,
              }}
            />
          </Grid>
          <Grid container style={{ marginTop: 25, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 150 }}>
              <Box fontSize={15} fontWeight={600}>{`Name:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 700, wordWrap: 'break-word' }}
            >
              <Box fontSize={15}>{currentJob?.name}</Box>
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: 5, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 150 }}>
              <Box fontSize={15} fontWeight={600}>{`Description:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 700, wordWrap: 'break-word', marginTop: -15 }}
            >
              <Box fontSize={15}> {Parser(currentJob?.description + '')}</Box>
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: 5, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 150 }}>
              <Box fontSize={15} fontWeight={600}>{`Experience:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 700, wordWrap: 'break-word' }}
            >
              <Box fontSize={15}>
                {currentJob?.experience === '1'
                  ? '1 year'
                  : currentJob?.experience + ' years'}
              </Box>
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: 5, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 150 }}>
              <Box fontSize={15} fontWeight={600}>{`Address:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 700, wordWrap: 'break-word' }}
            >
              <Box fontSize={15}>{currentJob?.address?.description}</Box>
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: 5, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 150 }}>
              <Box fontSize={15} fontWeight={600}>{`Salary:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 700, wordWrap: 'break-word' }}
            >
              <Box fontSize={15}>
                {currentJob?.lowestWage +
                  '$ - ' +
                  currentJob?.highestWage +
                  '$'}
              </Box>
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: 5, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 150 }}>
              <Box fontSize={15} fontWeight={600}>{`Deadline:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 700, wordWrap: 'break-word' }}
            >
              <Box fontSize={15}>
                {moment(currentJob?.deadline).format('DD-MM-YYYY')}
              </Box>
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: 5, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 150 }}>
              <Box fontSize={15} fontWeight={600}>{`Owner:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 700, wordWrap: 'break-word' }}
            >
              <Box fontSize={15} style={{ marginTop: -15 }}>
                <ul>
                  <li>{'Name: ' + currentJob?.user?.profile?.name}</li>
                  <li> {'Email: ' + currentJob?.user?.email}</li>
                  <li>{'Phone: ' + currentJob?.user?.profile?.phone}</li>
                </ul>
              </Box>
            </Typography>
          </Grid>
        </DialogContent>
        <Divider style={{ marginTop: 20 }} />
        <Grid container justifyContent="flex-end" style={{ padding: 10 }}>
          <Button onClick={() => dispatch(closeInfo())}>Close</Button>
        </Grid>
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

  button: {
    backgroundColor: '00bcd4',
    margin: theme.spacing(3, 0),
    padding: theme.spacing(1.5),
    boxShadow: 'rgb(0 188 212 / 24%) 0px 8px 16px 0px',
    borderRadius: 10,
    color: 'white',
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
}))

export default JobInfo
