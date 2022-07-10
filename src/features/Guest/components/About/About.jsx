import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import {
  authSelector,
  clearState,
  getProfile,
  logout,
} from 'features/Auth/authSlice'
import { useEffect } from 'react'
import {
  changePhone,
  clearState as clearStateUser,
} from 'features/User/userSlice'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { changePassword, userSelector } from 'features/User/userSlice'
import { getAuth } from 'components/Header/headerSlice'
import { useHistory } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import { message } from 'constants/message'
import Loading from 'components/Loading/Loading'
import storageUser from 'constants/storageUser'

function AboutGuest(props) {
  const classes = useStyles()
  const { info, status } = useSelector(authSelector)
  const { status: userStatus } = useSelector(userSelector)
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isShowOldPassword, setIsShowOldPassword] = useState(false)
  const [isShowNewPassword, setIsShowNewPassword] = useState(false)
  const [isShowRepeatPassword, setIsShowRepeatPassword] = useState(false)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const username = localStorage.getItem(storageUser.USERNAME)
  const history = useHistory()
  const handleChangePhone = (event) => setPhone(event.target.value)
  const [isChangePhone, setIsChangePhone] = useState(false)
  useEffect(() => {
    if (status === 'getProfile.fulfilled') {
      setEmail(info?.email)
      setWebsite(info?.profile?.pageURL)
      setPhone(info?.profile?.phone)
      setCity(info?.profile?.city)
    }
  }, [status])

  useEffect(() => {
    if (userStatus === 'changePassword.fulfilled') {
      dispatch(logout())
      dispatch(getAuth())
      dispatch(clearStateUser())
      history.push('/login')
    }
    if (userStatus === 'changePhone.fulfilled') {
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: message.CHANGE_PHONE_SUCCESS,
        })
      )
      dispatch(getProfile(username))
      setIsChangePhone(false)
    }
  }, [userStatus])

  const handleChangeOldPassword = (event) => setOldPassword(event.target.value)
  const handleChangeNewPassword = (event) => {
    setNewPassword(event.target.value)
    setIsNotMatchPassword(event.target.value !== repeatPassword)
  }
  const handleChangeRepeatPassword = (event) => {
    setRepeatPassword(event.target.value)
    setIsNotMatchPassword(newPassword !== event.target.value)
  }
  const dispatch = useDispatch()
  const [isNotMatchPassword, setIsNotMatchPassword] = useState(false)
  return (
    <Container className={classes.root}>
      <Grid className={classes.top}>
        <Typography component="div">
          <Box fontSize={18} fontWeight={700} style={{ color: '#5e5873' }}>
            Your information
          </Box>
        </Typography>
      </Grid>
      {status === 'getProfile.pending' ? (
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{
            minHeight: '85vh',
          }}
        >
          <Grid item>
            <Loading />
          </Grid>
        </Grid>
      ) : (
        <Grid className={classes.top} style={{ marginTop: 16 }}>
          <Grid
            container
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography component="div">
              <Box fontSize={14} fontWeight={600} style={{ color: '#5e5873' }}>
                Email
              </Box>
            </Typography>
            <TextField
              disabled
              variant="outlined"
              size="small"
              value={email}
              style={{ width: 400 }}
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
            ></TextField>
          </Grid>
          <Grid
            container
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 24,
            }}
          >
            <Typography component="div">
              <Box fontSize={14} fontWeight={600} style={{ color: '#5e5873' }}>
                Website
              </Box>
            </Typography>
            <TextField
              disabled
              variant="outlined"
              size="small"
              value={website}
              style={{ width: 400 }}
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
            ></TextField>
          </Grid>
          <Grid
            container
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 24,
            }}
          >
            <Typography component="div">
              <Box fontSize={14} fontWeight={600} style={{ color: '#5e5873' }}>
                Phone
              </Box>
            </Typography>
            <Grid container style={{ width: 400 }}>
              <TextField
                disabled={!isChangePhone}
                variant="outlined"
                size="small"
                value={phone}
                autoComplete="none"
                style={{ width: 350 }}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
                onChange={handleChangePhone}
              ></TextField>
              {
                <IconButton
                  disabled={isChangePhone}
                  style={{ marginLeft: 8 }}
                  onClick={() => setIsChangePhone(true)}
                >
                  <FaEdit fontSize={14} />
                </IconButton>
              }
            </Grid>
          </Grid>
          {isChangePhone && (
            <Grid style={{ marginLeft: 120 }}>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={() => dispatch(changePhone({ phone }))}
              >
                Change
              </Button>
              <Button
                className={classes.buttonCancel}
                onClick={() => setIsChangePhone(false)}
              >
                Cancel
              </Button>
            </Grid>
          )}
          <Grid
            container
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 24,
            }}
          >
            <Typography component="div">
              <Box fontSize={14} fontWeight={600} style={{ color: '#5e5873' }}>
                City
              </Box>
            </Typography>

            <TextField
              disabled
              variant="outlined"
              size="small"
              value={city}
              style={{ width: 400 }}
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
            ></TextField>
          </Grid>
          <Grid
            container
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 24,
            }}
          >
            <Typography component="div">
              <Box fontSize={14} fontWeight={600} style={{ color: '#5e5873' }}>
                Password
              </Box>
            </Typography>
            {!isChangePassword && (
              <Button
                size="small"
                variant="outlined"
                style={{ width: 400, fontSize: 10, padding: 6 }}
                onClick={() => setIsChangePassword(true)}
              >
                Change password
              </Button>
            )}
            {isChangePassword && (
              <Grid style={{ width: 400 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Old password"
                  onChange={handleChangeOldPassword}
                  type={isShowOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  style={{ width: 400 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setIsShowOldPassword(!isShowOldPassword)
                          }
                        >
                          {isShowOldPassword ? (
                            <FiEye fontSize={12} />
                          ) : (
                            <FiEyeOff fontSize={12} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    classes: {
                      input: classes.resize,
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="New password"
                  value={newPassword}
                  onChange={handleChangeNewPassword}
                  style={{ width: 400, marginTop: 10 }}
                  type={isShowNewPassword ? 'text' : 'password'}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setIsShowNewPassword(!isShowNewPassword)
                          }
                        >
                          {isShowNewPassword ? (
                            <FiEye fontSize={12} />
                          ) : (
                            <FiEyeOff fontSize={12} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Repeat new password"
                  value={repeatPassword}
                  onChange={handleChangeRepeatPassword}
                  type={isShowRepeatPassword ? 'text' : 'password'}
                  style={{ width: 400, marginTop: 10 }}
                  error={isNotMatchPassword}
                  helperText={
                    isNotMatchPassword ? 'Password is not matched' : null
                  }
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setIsShowRepeatPassword(!isShowRepeatPassword)
                          }
                        >
                          {isShowRepeatPassword ? (
                            <FiEye fontSize={12} />
                          ) : (
                            <FiEyeOff fontSize={12} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid container>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                      if (isNotMatchPassword) return
                      dispatch(
                        changePassword({
                          oldPassword,
                          password: newPassword,
                          confirmPassword: repeatPassword,
                        })
                      )
                    }}
                  >
                    Change
                  </Button>
                  <Button
                    onClick={() => setIsChangePassword(false)}
                    className={classes.buttonCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default AboutGuest

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
  },

  top: {
    padding: theme.spacing(2.5),
    boxShadow:
      'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  button: {
    margin: theme.spacing(3, 0),
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'capitalize',
    boxShadow: 'none',
    color: '#fff',
    width: 100,
    height: 32,
    '&:hover': {
      boxShadow:
        'rgba(115,103,240,0.25) 0px 15px 25px, rgba(115,103,240, 0.15) 0px 5px 10px',
      background: '#7367f0',
    },
  },
  buttonCancel: {
    margin: theme.spacing(3, 2),
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'capitalize',
    boxShadow: 'none',
    width: 100,
    height: 32,
  },
  item: {
    padding: theme.spacing(2.5),
    position: 'relative',
    boxShadow:
      'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 16,
  },
  resize: {
    fontSize: 14,
    color: '#000',
  },
}))
