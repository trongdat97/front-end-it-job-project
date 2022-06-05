import {
  Dialog,
  DialogContent,
  Button,
  Box,
  IconButton,
  Typography,
  Slide,
  DialogTitle,
  Grid,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { closeDialog, dialogSelector } from './dialogSlice'

function SlideTransition(props) {
  return <Slide {...props} direction="up" timeout={200} />
}

function ConfirmDialog() {
  const { onSubmit, message } = useSelector(dialogSelector)
  const dispatch = useDispatch()
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={Boolean(onSubmit)}
      onClose={() => dispatch(closeDialog())}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
      }}
      PaperProps={{
        style: {
          backgroundColor: 'white',
          boxShadow: 'none',
          padding: 8,
          borderRadius: 17,
        },
      }}
      TransitionComponent={SlideTransition}
    >
      <DialogTitle>Confirm Action</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={() => dispatch(closeDialog())}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography
          style={{
            wordWrap: 'break-word',
            marginBottom: 10,
          }}
        >
          <Box fontSize={16} fontWeight={400}>
            {message}
          </Box>
        </Typography>
      </DialogContent>
      <Grid style={{ marginLeft: 20, marginTop: 6, paddingBottom: 20 }}>
        <Button
          style={{
            height: 36,
            width: 90,
            borderRadius: 8,
            fontSize: 13,
            boxShadow: 'none',
            color: '#fff',
            backgroundColor: '#7367f0',
          }}
          variant="contained"
          onClick={() => {
            if (onSubmit) {
              onSubmit()
            }
            dispatch(closeDialog())
          }}
        >
          YES
        </Button>
        <Button
          variant="contained"
          style={{
            height: 36,
            width: 90,
            borderRadius: 8,
            fontSize: 13,
            boxShadow: 'none',
            marginLeft: 15,
            color: '#333',
          }}
          onClick={() => dispatch(closeDialog())}
        >
          NO
        </Button>
      </Grid>
    </Dialog>
  )
}

export default ConfirmDialog
