import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  Collapse,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  MenuItem as StyledMenuItem,
  Slide,
  TextField,
  Typography,
} from '@material-ui/core'
import {
  CloseOutlined,
  ExpandLessRounded,
  ExpandMoreRounded,
} from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar'

import {
  addRole,
  adminSelector,
  editRole,
  getAllPermission,
  getAllRole,
  getPermissionByRoleId,
} from '../adminSlice'
import { permissionInfoSelector } from './permissionInfoSlice'
import { FiCheck } from 'react-icons/fi'
import { withStyles } from '@material-ui/styles'
import { addPermissionSelector, closeInfo } from './addPermissionSlice'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import { message } from 'constants/message'

function SlideTransition(props) {
  return <Slide {...props} direction="up" timeout={200} />
}

const ListItem = withStyles({
  root: {
    color: '#333',
    '&$selected': {
      background: 'linear-gradient(118deg,#7367f0,rgba(115,103,240,.7))',
      color: '#fff',
      boxShadow: '0 0 10px 1px rgb(115 103 240 / 70%)',
      borderRadius: '4px',
      '& .MuiListItemIcon-root': {
        color: '#fff',
        margin: '4px 0 4px 0px',
        transition: '0.2s margin ease-in-out',
      },
      '& .MuiListItemText-root': {
        margin: '4px 0 4px 0px',
        transition: '0.2s margin ease-in-out',
      },
    },
    '&:hover': {
      color: '#333',
      '& .MuiListItemIcon-root': {
        margin: '4px 0 4px 2px',
        transition: '0.2s margin ease-in-out',
      },
      '& .MuiListItemText-root': {
        margin: '4px 0 4px 2px',
        transition: '0.2s margin ease-in-out',
      },
    },
  },
  selected: {},
})(MuiListItem)

function AddPermission() {
  const classes = useStyles()
  const { permissionList, permission, status } = useSelector(adminSelector)
  const [data, setData] = useState([])
  const [checkArr, setCheckArr] = useState([])
  const [pArr, setPArr] = useState([])
  const [name, setName] = useState('')
  const handleChangeName = (event) => setName(event.target.value)
  useEffect(() => {
    dispatch(getAllPermission())
  }, [])
  useEffect(() => {
    if (status === 'addRole.fulfilled') {
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: 'Add role successfully',
        })
      )
      dispatch(getAllRole())
      dispatch(closeInfo())
    }
  }, [status])

  useEffect(() => {
    let moduleArr = []
    let actionArr = []

    for (let i = 0; i < permissionList?.length; i++) {
      if (!moduleArr.includes(permissionList[i].module)) {
        moduleArr.push(permissionList[i].module)
      }
    }

    for (let i = 0; i < moduleArr.length; i++) {
      actionArr.push(
        permissionList
          ?.filter((item) => item.module === moduleArr[i])
          ?.map((item) => ({ action: item.action, id: item.id }))
      )
    }

    let temp = []
    for (let i = 0; i < moduleArr.length; i++) {
      temp.push({
        module: moduleArr[i],
        actionArr: actionArr[i],
        isExpand: true,
      })
    }
    setData(temp)
    let cloneArr1 = []
    let cloneArr2 = []
    for (let i of permissionList) {
      cloneArr1.push(false)
      cloneArr2.push('ANY')
    }
    setCheckArr(cloneArr1)
    setPArr(cloneArr2)
  }, [permissionList])
  const handleListItemClick = (event, index) => setSelectedIndex(index)
  const dispatch = useDispatch()
  const { isOpen } = useSelector(addPermissionSelector)
  const { currentRole } = useSelector(adminSelector)
  const handleChange = (event) => {
    setChecked(event.target.checked)
  }
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
            borderRadius: 10,
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
        <DialogTitle style={{ marginTop: -5 }}>Add Role</DialogTitle>
        <Divider style={{ marginBottom: 20 }} />
        <DialogContent>
          <Grid>
            <Grid
              container
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography component="div" style={{ width: 100 }}>
                <Box fontSize={14} fontWeight={600}>
                  Name
                </Box>
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                className={classes.input}
                label=""
                type="text"
                value={name}
                onChange={handleChangeName}
                autoComplete="none"
                style={{ width: 760 }}
                name="name"
                inputProps={{ style: { fontSize: 14 } }}
                required
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
            </Grid>
            <Grid container style={{ marginTop: 8 }}>
              <Typography component="div" style={{ marginTop: 18 }}>
                <Box fontSize={14} fontWeight={600}>
                  Permission
                </Box>
              </Typography>
              <div style={{ marginLeft: 8 }}>
                <List component="nav">
                  {data?.map((item) => (
                    <div style={{ width: 800 }}>
                      <ListItem
                        button
                        key={item?.module}
                        onClick={() => {
                          let temp = [...data]

                          temp.forEach((i) => {
                            if (i === item) i.isExpand = !i.isExpand
                          })
                          setData(temp)
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography component="div">
                              <Box fontSize={14} fontWeight={600}>
                                {item?.module}
                              </Box>
                            </Typography>
                          }
                        ></ListItemText>
                        {item?.isExpand ? (
                          <ExpandLessRounded />
                        ) : (
                          <ExpandMoreRounded />
                        )}
                      </ListItem>

                      {item?.actionArr?.map((item1) => (
                        <Collapse
                          in={item?.isExpand}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            <ListItem key={item1.action}>
                              <Checkbox
                                color="primary"
                                defaultChecked={item?.idArr?.includes(
                                  item1?.id
                                )}
                                checked={
                                  checkArr[
                                    permissionList?.findIndex(
                                      (i) => i?.id === item1?.id
                                    )
                                  ]
                                }
                                style={{ marginRight: 16 }}
                                onChange={(e) => {
                                  let cloneArr = [...checkArr]

                                  cloneArr[
                                    permissionList?.findIndex(
                                      (i) => i?.id === item1?.id
                                    )
                                  ] = e.target.checked
                                  setCheckArr(cloneArr)
                                }}
                              />

                              <ListItemText
                                primary={
                                  <Typography
                                    component="div"
                                    style={{ marginLeft: -15 }}
                                  >
                                    <Box fontSize={13} fontWeight={400}>
                                      {item1?.action}
                                    </Box>
                                  </Typography>
                                }
                              ></ListItemText>
                              {checkArr[
                                permissionList?.findIndex(
                                  (i) => i?.id === item1?.id
                                )
                              ] && (
                                <TextField
                                  variant="outlined"
                                  label=""
                                  select
                                  size="small"
                                  value={
                                    pArr[
                                      permissionList?.findIndex(
                                        (i) => i?.id === item1?.id
                                      )
                                    ]
                                  }
                                  style={{ width: 120 }}
                                  inputProps={{ style: { fontSize: 10 } }}
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
                                  onChange={(e) => {
                                    let cloneArr = [...pArr]
                                    cloneArr[
                                      permissionList?.findIndex(
                                        (i) => i?.id === item1?.id
                                      )
                                    ] = e.target.value
                                    setPArr(cloneArr)
                                  }}
                                >
                                  <MenuItem key="item1" value="ANY">
                                    ANY
                                  </MenuItem>
                                  <MenuItem key="item2" value="OWN">
                                    OWN
                                  </MenuItem>
                                </TextField>
                              )}
                            </ListItem>
                          </List>
                        </Collapse>
                      ))}
                    </div>
                  ))}
                </List>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider style={{ marginTop: 20 }} />
        <Grid container justifyContent="flex-end" style={{ padding: 10 }}>
          <Button
            style={{ marginRight: 8 }}
            onClick={() => dispatch(closeInfo())}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: 8 }}
            onClick={() => {
              let request = []
              for (let i = 0; i < checkArr?.length; i++)
                if (checkArr[i])
                  request?.push({ permissionId: i + 1, posession: pArr[i] })
              dispatch(addRole({ role: name, permissionPosession: request }))
            }}
          >
            Add
          </Button>
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
  select: {
    fontSize: 10,
  },
  input: {
    margin: theme.spacing(2, 0),
    [`& fieldset`]: {
      borderRadius: 8,
    },
  },
  iconContainer: {
    marginTop: theme.spacing(3),
  },
}))

export default AddPermission
