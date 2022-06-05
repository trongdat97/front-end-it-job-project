import React, { useState } from 'react'
import { Slide, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { useSelector } from 'react-redux'
import {
  hideSnackbar,
  snackbarSelector,
} from 'components/CustomSnackBar/snackbarSlice'
import { useDispatch } from 'react-redux'

function SlideTransition(props) {
  return <Slide {...props} direction="left" timeout={300} />
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
      style={{ width: 300, height: 60, alignItems: 'center' }}
    />
  )
})

function CustomSnackBar() {
  const { type, message, isSnackbarOpen } = useSelector(snackbarSelector)
  const dispatch = useDispatch()
  const handleClose = (event, reason) => {
    if (reason == 'clickaway') {
      return
    }
    dispatch(hideSnackbar())
  }
  return (
    <div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CustomSnackBar
