import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  CircularProgress,
  Container,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Slide,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

import {
  adminLogin,
  authSelector,
  clearState,
  getAllCity,
  signupContributor,
} from 'features/Auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import { makeStyles } from '@material-ui/core/styles'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import { useHistory } from 'react-router-dom'
import UserSignupSVG from 'assets/signup.svg'
import LogoSVG from 'assets/logo.svg'

function UserSignup() {
  const classes = useStyles()

  const { status, cityList, errorMessage } = useSelector(authSelector)

  const dispatch = useDispatch()

  const history = useHistory()

  const [name, setName] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  // const [cityId, setCityId] = useState('')

  const [username, setUserName] = useState('')

  const handleChangeEmail = (event) => setEmail(event.target.value)

  const handleChangeName = (event) => setName(event.target.value)

  const handleChangePassWord = (event) => setPassword(event.target.value)

  // const handleChangeCityId = (event) => setCityId(event.target.value)

  const handleChangeUserName = (event) => setUserName(event.target.value)
  const role = ['user']

  const handleSubmit = () => {
    dispatch(signupContributor({ email, name, username, password, role }))
  }
  useEffect(() => {
    dispatch(getAllCity())
  }, [])
  useEffect(() => {
    if (status === 'signupContributor.rejected') {
      dispatch(
        showSnackbar({ type: SNACK_BAR_TYPE.ERROR, message: errorMessage })
      )
      dispatch(clearState())
    }
    if (status === 'signupContributor.fulfilled') {
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: 'Signup successfully, redirecting to login page...',
        })
      )
      setTimeout(() => {
        dispatch(clearState())
        history.push('/login')
      }, 2500)
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
              IT Network
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
                alt="Admin image introduction"
                src={UserSignupSVG}
              ></Box>
            </Grid>
          </Grid>
        </Fade>
        <Slide in direction="left" timeout={1500}>
          <Grid item xs={12} sm={4} className={classes.loginForm}>
            <Grid className={classes.formContainer}>
              <Typography component="div" className={classes.formTilte}>
                <Box fontSize={24} fontWeight={500}>
                  Adventure starts here 🚀
                </Box>
              </Typography>
              <Typography component="div" className={classes.describe}>
                <Box fontSize={15} fontWeight={400} color="#878787">
                  Please enter your information below
                </Box>
              </Typography>
              <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator
                  fullWidth
                  variant="outlined"
                  className={classes.input}
                  label="UserName"
                  onChange={handleChangeUserName}
                  autoComplete="none"
                  name="username"
                  inputProps={{ style: { fontSize: 14 } }}
                  value={username}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                  size="medium"
                />
                <TextValidator
                  fullWidth
                  variant="outlined"
                  className={classes.input}
                  label="PassWord"
                  onChange={handleChangePassWord}
                  autoComplete="none"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  inputProps={{ style: { fontSize: 14 } }}
                  value={password}
                  validators={['required', 'minStringLength:5']}
                  errorMessages={[
                    'password is required',
                    'Password must be minimum of 5 characters',
                  ]}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                />
                <TextValidator
                  fullWidth
                  variant="outlined"
                  className={classes.input}
                  label="Name"
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
                  variant="outlined"
                  className={classes.input}
                  label="Email address"
                  onChange={handleChangeEmail}
                  autoComplete="none"
                  name="email"
                  inputProps={{ style: { fontSize: 14 } }}
                  value={email}
                  validators={['required', 'isEmail']}
                  errorMessages={[
                    'Email is required',
                    'Email must be a valid email address',
                  ]}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                />

                {/* <TextValidator
                  fullWidth
                  variant="outlined"
                  select
                  label="City"
                  value={cityId}
                  onChange={handleChangeCityId}
                  className={classes.input}
                  inputProps={{ style: { fontSize: 14 } }}
                  validators={['required']}
                  errorMessages={['City is required']}
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
                  {cityList.map((item) => {
                    return (
                      <MenuItem
                        key={item?.province_id}
                        value={item?.province_id}
                      >
                        {item?.province_name}
                      </MenuItem>
                    )
                  })}
                </TextValidator> */}

                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  type="submit"
                  startIcon={
                    status === 'signupContributor.pending' ? (
                      <CircularProgress color="#fff" size={10} />
                    ) : null
                  }
                >
                  Sign up
                </Button>
                {status === 'signupContributor.fulfilled' && (
                  <Typography component="div" style={{ textAlign: 'center' }}>
                    <Box fontSize={13} fontWeight={300}>
                      Signup successfully, please wait a few second..
                    </Box>
                  </Typography>
                )}
              </ValidatorForm>
              <Typography component="div" style={{ textAlign: 'center' }}>
                <Box fontSize={13} fontWeight={300}>
                  Already have an account?
                  <Link href="/login">Sign in instead</Link>
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
  },
  formContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loginForm: {
    padding: theme.spacing(3, 10),
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
      // boxShadow: '0px 0px 0px 2.5px white inset, 0px 0px 0px 5px #1abc9c',
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
  select: {
    maxHeight: 160,
  },
}))

export default UserSignup
