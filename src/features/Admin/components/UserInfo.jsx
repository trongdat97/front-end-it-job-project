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
import { closeInfo, userInfoSelector } from './userInfoSlice'
import { adminSelector } from '../adminSlice'

function SlideTransition(props) {
  return <Slide {...props} direction="up" timeout={200} />
}

function UserInfo() {
  const classes = useStyles()
  const handleChangeName = (event) => setName(event.target.value)
  const handleChangeImageUrl = (event) => setImageUrl(event.target.value)
  const handleChangeLevelId = (event) => setLevelId(event.target.value)
  const { isOpen } = useSelector(userInfoSelector)
  const { currentUser } = useSelector(adminSelector)
  const dispatch = useDispatch()
  return (
    <div>
      <CustomSnackBar />
      <Dialog
        maxWidth="xs"
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
            height: '75vh',
          },
        }}
        TransitionComponent={SlideTransition}
      >
        <Box position="absolute" top={6} right={6}>
          <IconButton
            onClick={() => {
              dispatch(closeInfo())
            }}
          >
            <CloseOutlined />
          </IconButton>
        </Box>
        <DialogTitle style={{ marginTop: -5 }}>{'User info'}</DialogTitle>
        <Divider style={{ marginBottom: 20 }} />
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CardMedia
            component="image"
            image={
              currentUser?.profile?.profileUrl
                ? currentUser?.profile?.profileUrl
                : 'https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'
            }
            alt={`${currentUser?.profile?.name}'s avatar`}
            title={`${currentUser?.profile?.name}'s avatar`}
            style={{
              height: 120,
              width: 120,
            }}
          />
          <Grid container style={{ marginTop: 25, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 120 }}>
              <Box fontSize={15} fontWeight={600}>{`Name:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 250, wordWrap: 'break-word' }}
            >
              <Box fontSize={15}>{currentUser?.profile?.name}</Box>
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: 5, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 120 }}>
              <Box fontSize={15} fontWeight={600}>{`Email:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 250, wordWrap: 'break-word' }}
            >
              <Box fontSize={15}>{currentUser?.email}</Box>
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: 5, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 120 }}>
              <Box fontSize={15} fontWeight={600}>{`Phone:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 250, wordWrap: 'break-word' }}
            >
              <Box fontSize={15}>{currentUser?.profile?.phone}</Box>
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: 5, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 120 }}>
              <Box fontSize={15} fontWeight={600}>{`Role:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 250, wordWrap: 'break-word' }}
            >
              <Box fontSize={15}>{currentUser?.role?.role}</Box>
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: 5, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 120 }}>
              <Box fontSize={15} fontWeight={600}>{`Website:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 250, wordWrap: 'break-word' }}
            >
              <Box fontSize={15}>{currentUser?.profile?.pageURL}</Box>
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: 5, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 120 }}>
              <Box fontSize={15} fontWeight={600}>{`City:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 250, wordWrap: 'break-word' }}
            >
              <Box fontSize={15}>{currentUser?.profile?.city}</Box>
            </Typography>
          </Grid>
          <Grid container style={{ marginTop: 5, marginBottom: 5 }}>
            <Typography component="div" style={{ minWidth: 120 }}>
              <Box fontSize={15} fontWeight={600}>{`Introduction:`}</Box>
            </Typography>
            <Typography
              component="div"
              style={{ maxWidth: 250, wordWrap: 'break-word' }}
            >
              <Box fontSize={15}>{currentUser?.profile?.introduction}</Box>
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

export default UserInfo
