import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  Container,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Slide,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import {
  userLogin,
  authSelector,
  clearState,
  getAuth,
} from 'features/Auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import { makeStyles } from '@material-ui/core/styles'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import { useHistory } from 'react-router-dom'
import UserLoginSVG from 'assets/userlogin.svg'
import LogoSVG from 'assets/logo.svg'
import { FiEye, FiEyeOff } from 'react-icons/fi'

function UserLogin() {
  const classes = useStyles()

  const { status, errorMessage } = useSelector(authSelector)

  const dispatch = useDispatch()

  const history = useHistory()

  const [username, setUserName] = useState('')

  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const [remember, setRemember] = useState(false)

  const handleChangeEmail = (event) => setUserName(event.target.value)

  const handleChangePassword = (event) => setPassword(event.target.value)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleCheckBoxChange = () => setRemember(!remember)

  const handleSubmit = () => {
    dispatch(userLogin({ username, password, remember }))
  }

  useEffect(() => {
    if (status === 'userLogin.rejected') {
      dispatch(
        showSnackbar({ type: SNACK_BAR_TYPE.ERROR, message: errorMessage })
      )
      dispatch(clearState())
    }
    if (status === 'userLogin.fulfilled') {
      dispatch(clearState())
      history.push('/home')
    }
  }, [status])

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container>
        <Grid
          container
          style={{
            position: 'fixed',
            top: 25,
            left: 30,
            alignItems: 'center',
          }}
        >
          <CardMedia image={LogoSVG} style={{ width: 40, height: 30 }} />
          <Typography>
            <Box
              fontSize={22}
              fontWeight={500}
              style={{ marginLeft: 10, color: '#7367f0' }}
            >
              Job Search System
            </Box>
          </Typography>
        </Grid>
        <Fade in timeout={1500}>
          <Grid item xs={12} sm={8} className={classes.imageGrid}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              className={classes.logoContainer}
            >
              <Box
                className={classes.image}
                component="img"
                style={{ justifyContent: 'center' }}
                alt="user image introduction"
                src={UserLoginSVG}
              ></Box>
            </Grid>
          </Grid>
        </Fade>
        <Slide in direction="left" timeout={1500}>
          <Grid item xs={12} sm={4} className={classes.loginForm}>
            <Grid className={classes.formContainer}>
              <Typography component="div" className={classes.formTilte}>
                <Box fontSize={24} fontWeight={500}>
                  Welcome to Job Search System! 👋
                </Box>
              </Typography>
              <Typography component="div" className={classes.describe}>
                <Box fontSize={15} fontWeight={400} color="#878787">
                  Please sign-in to your account and start the adventure
                </Box>
              </Typography>
              <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator
                  fullWidth
                  variant="outlined"
                  className={classes.input}
                  label="Email address"
                  onChange={handleChangeEmail}
                  autoComplete="none"
                  name="username"
                  inputProps={{ style: { fontSize: 14 } }}
                  value={username}
                  validators={['required']}
                  errorMessages={[
                    'Email is required',
                    'Email must be a valid email address',
                  ]}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                />
                <TextValidator
                  fullWidth
                  variant="outlined"
                  className={classes.input}
                  label="Password"
                  onChange={handleChangePassword}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  inputProps={{ style: { fontSize: 14 } }}
                  validators={[
                    'required',
                    'minStringLength:5',
                    'maxStringLength:255',
                  ]}
                  errorMessages={[
                    'Password is required',
                    'Password must be minimum of 5 characters ',
                    'Password must be maximum of 255 characters',
                  ]}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  style={{ marginLeft: -10 }}
                >
                  <Checkbox
                    checked={remember}
                    onChange={handleCheckBoxChange}
                    color="primary"
                  ></Checkbox>
                  <Typography component="div">
                    <Box fontSize={14} fontWeight={400}>
                      Remember me
                    </Box>
                  </Typography>
                </Grid>

                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  type="submit"
                >
                  Sign in
                </Button>
              </ValidatorForm>
              <Typography component="div" style={{ textAlign: 'center' }}>
                <Box fontSize={13} fontWeight={300}>
                  New on our platform?{' '}
                  <Link href="/signup">Create an account</Link>
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Slide>
      </Grid>
      <CustomSnackBar />
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
  },
  imageGrid: {
    height: '80vh',
    borderRadius: 10,
  },
  imageTitle: {
    textAlign: 'center',
    padding: theme.spacing(5),
  },
  logoContainer: {
    margin: theme.spacing(5, 0, 0, 0),
  },
  image: {
    padding: theme.spacing(2),
    margin: theme.spacing(10, 0),
  },
  formContainer: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loginForm: {
    padding: theme.spacing(20, 10),
    backgroundColor: '#fff',
    height: '100vh',
  },
  describe: {
    margin: theme.spacing(1, 0, 2, 0),
  },
  button: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(1.5),
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
  input: {
    margin: theme.spacing(1.5, 0),
    [`& fieldset`]: {
      borderRadius: 10,
    },
  },
}))

export default UserLogin
