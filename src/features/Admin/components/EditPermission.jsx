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
  adminSelector,
  editRole,
  getAllPermission,
  getPermissionByRoleId,
} from '../adminSlice'
import { permissionInfoSelector } from './permissionInfoSlice'
import { FiCheck } from 'react-icons/fi'
import { withStyles } from '@material-ui/styles'
import { editPermissionSelector, closeInfo } from './editPermissionSlice'
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

function EditPermission() {
  const classes = useStyles()
  const { permissionList, permission, status } = useSelector(adminSelector)
  const [data, setData] = useState([])
  const [checkArr, setCheckArr] = useState([])
  const [pArr, setPArr] = useState([])

  useEffect(() => {
    if (status === 'editRole.fulfilled') {
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: 'Edit role successfully',
        })
      )
      dispatch(getPermissionByRoleId(currentRole?.id))
      dispatch(closeInfo())
    }
  }, [status])
  useEffect(() => {
    let moduleArr = []
    let moduleArr1 = []
    let actionArr = []
    let idArr = []
    let posession = []
    for (let i = 0; i < permissionList?.length; i++) {
      if (!moduleArr.includes(permissionList[i].module)) {
        moduleArr.push(permissionList[i].module)
      }
    }
    for (let i = 0; i < permission?.length; i++) {
      if (!moduleArr1.includes(permission[i].module)) {
        moduleArr1.push(permission[i].module)
      }
    }
    for (let i = 0; i < moduleArr.length; i++) {
      actionArr.push(
        permissionList
          ?.filter((item) => item.module === moduleArr[i])
          ?.map((item) => ({ action: item.action, id: item.id }))
      )
    }

    for (let i = 0; i < moduleArr.length; i++) {
      idArr.push(
        permission
          ?.filter((item) => item.module === moduleArr[i])
          ?.map((item) => item.id)
      )
    }
    for (let i = 0; i < moduleArr.length; i++) {
      posession.push(
        permission
          ?.filter((item) => item.module === moduleArr[i])
          ?.map((item) => item?.posession)
      )
    }

    let temp = []
    for (let i = 0; i < moduleArr.length; i++) {
      temp.push({
        module: moduleArr[i],
        actionArr: actionArr[i],
        isExpand: true,
        idArr: idArr[i],
        posessionArr: posession[i],
      })
    }
    setData(temp)
    let hello = []
    for (let i of temp)
      for (let j of i?.actionArr) hello?.push(i?.idArr?.includes(j?.id))
    setCheckArr(hello)
    let hi = []
    for (let i of temp)
      for (let j of i?.actionArr)
        hi?.push(
          i?.posessionArr[i?.idArr?.findIndex((it) => it === j?.id)]
            ? i?.posessionArr[i?.idArr?.findIndex((it) => it === j?.id)]
            : 'ANY'
        )
    setPArr(hi)
  }, [permission])
  const handleListItemClick = (event, index) => setSelectedIndex(index)
  const dispatch = useDispatch()
  const { isOpen } = useSelector(editPermissionSelector)
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
        <Box position="absolute" top={10} right={10}>
          <IconButton
            onClick={() => {
              dispatch(closeInfo())
            }}
          >
            <CloseOutlined />
          </IconButton>
        </Box>
        <DialogTitle style={{ marginTop: -10 }}>Edit permission</DialogTitle>
        <Divider style={{ marginBottom: 20 }} />
        <DialogContent>
          <Grid>
            <Grid container>
              <Typography component="div" style={{ width: 96 }}>
                <Box fontSize={14} fontWeight={600}>
                  Role:
                </Box>
              </Typography>
              <Typography component="div">
                <Box fontSize={14} style={{ marginLeft: 8 }}>
                  {currentRole?.role}
                </Box>
              </Typography>
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
              dispatch(editRole({ id: currentRole?.id, data: request }))
            }}
          >
            Edit
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
      borderRadius: 10,
    },
  },
  iconContainer: {
    marginTop: theme.spacing(3),
  },
}))

export default EditPermission
