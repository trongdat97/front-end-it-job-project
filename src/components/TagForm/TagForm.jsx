import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  MenuItem,
  Slide,
} from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { closeForm, tagFormSelector } from './tagFormSlice'
import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar'
import {
  addCategory,
  addTag,
  adminSelector,
  editCategory,
} from 'features/Admin/adminSlice'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import { message } from 'constants/message'

function SlideTransition(props) {
  return <Slide {...props} direction="up" timeout={200} />
}

function TagForm() {
  const classes = useStyles()
  const [name, setName] = useState('')
  const handleChangeName = (event) => setName(event.target.value)

  const { onSubmit, type, currentTag } = useSelector(tagFormSelector)
  const { status, category } = useSelector(adminSelector)
  const [list, setList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'getAllCategory.fulfilled') {
      let temp = category.map((item) => {
        return {
          id: item.id,
          name: item.name,
        }
      })
      temp = [{ id: 0, name: 'NULL' }, ...temp]
      setList(temp)
    }
  }, [status])
  useEffect(() => {
    if (type === 'add') {
      setName('')
    }
    if (type === 'edit') {
      setName(currentTag?.name)
    }
  }, [currentTag])

  useEffect(() => {
    if (status === 'addTag.fulfilled') {
      dispatch(closeForm())
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: message.ADD_TAG_SUCCESS,
        })
      )
      onSubmit()
    }
    if (status === 'editCategory.fulfilled') {
      dispatch(closeForm())
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: message.EDIT_CATEGORY_SUCCESS,
        })
      )
      onSubmit()
    }
  }, [status])

  return (
    <div>
      <CustomSnackBar />
      <Dialog
        maxWidth="xs"
        fullWidth
        open={Boolean(onSubmit)}
        onClose={() => {
          dispatch(closeForm())
          setName('')
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
            height: '40vh',
          },
        }}
        TransitionComponent={SlideTransition}
      >
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              dispatch(closeForm())
              setName('')
            }}
          >
            <CloseOutlined />
          </IconButton>
        </Box>
        <DialogTitle>
          {type === 'add' ? 'Add a new tag' : 'Edit a tag'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter all information below
          </DialogContentText>
          <ValidatorForm
            onSubmit={() => {
              if (type === 'add') {
                dispatch(addTag({ tagName: name }))
              }
              if (type === 'edit') {
                dispatch(
                  editCategory({
                    slug: currentCategory?.slug,
                    data: { name: name },
                  })
                )
              }
            }}
          >
            <TextValidator
              fullWidth
              variant="filled"
              label="Name"
              onChange={handleChangeName}
              className={classes.input}
              value={name}
              validators={['required', 'maxStringLength:255']}
              errorMessages={[
                'Name is required',
                'Name must be maximum of 255 characters',
              ]}
            />

            <Box textAlign="center" marginTop={1}>
              {type === 'add' ? (
                <Button
                  style={{
                    height: 36,
                    width: 90,
                    marginRight: 20,
                    borderRadius: 20,
                    fontSize: 13,
                    boxShadow: 'none',
                    color: 'white',
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  ADD
                </Button>
              ) : (
                <Button
                  style={{
                    height: 36,
                    width: 90,
                    marginRight: 20,
                    borderRadius: 20,
                    fontSize: 13,
                    boxShadow: 'none',
                    color: 'white',
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  EDIT
                </Button>
              )}
              <Button
                variant="contained"
                color="secondary"
                style={{
                  height: 36,
                  width: 90,
                  borderRadius: 20,
                  fontSize: 13,
                  boxShadow: 'none',
                }}
                onClick={() => {
                  dispatch(closeForm())
                  setName('')
                }}
              >
                CANCEL
              </Button>
            </Box>
          </ValidatorForm>
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
}))

export default TagForm
