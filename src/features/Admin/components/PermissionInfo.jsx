import {
  Box,
  Button,
  CardMedia,
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
  MenuItem as StyledMenuItem,
  Slide,
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

import { adminSelector } from '../adminSlice'
import { permissionInfoSelector, closeInfo } from './permissionInfoSlice'
import { FiCheck } from 'react-icons/fi'
import { withStyles } from '@material-ui/styles'
import { showInfo } from './editPermissionSlice'
import EditPermission from './EditPermission'

function SlideTransition(props) {
  return <Slide {...props} direction="up" timeout={200} />
}

const ListItem = withStyles({
  root: {
    color: 'rgb(99, 115, 129)',
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

function PermissionInfo() {
  const classes = useStyles()
  const { isOpen } = useSelector(permissionInfoSelector)
  const { permission } = useSelector(adminSelector)
  const [data, setData] = useState([])

  useEffect(() => {
    let moduleArr = []
    let scopeArr = []
    for (let i = 0; i < permission?.length; i++) {
      if (!moduleArr.includes(permission[i].module)) {
        moduleArr.push(permission[i].module)
      }
    }
    for (let i = 0; i < moduleArr.length; i++) {
      scopeArr.push(
        permission
          ?.filter((item) => item.module === moduleArr[i])
          ?.map((item) => item.scope)
      )
    }
    let temp = []
    for (let i = 0; i < moduleArr.length; i++) {
      temp.push({ module: moduleArr[i], scopeArr: scopeArr[i], isExpand: true })
    }
    setData(temp)
  }, [permission])
  const handleListItemClick = (event, index) => setSelectedIndex(index)
  const dispatch = useDispatch()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
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
        <DialogTitle style={{ marginTop: -10 }}>Permission</DialogTitle>
        <Divider style={{ marginBottom: 20 }} />
        <DialogContent>
          <div>
            <List component="nav">
              {data?.map((item) => (
                <div>
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

                  {item?.scopeArr?.map((item1) => (
                    <Collapse in={item?.isExpand} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem key={item1}>
                          <ListItemIcon>
                            <FiCheck size={13} color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                component="div"
                                style={{ marginLeft: -15 }}
                              >
                                <Box fontSize={13} fontWeight={400}>
                                  {item1}
                                </Box>
                              </Typography>
                            }
                          ></ListItemText>
                        </ListItem>
                      </List>
                    </Collapse>
                  ))}
                </div>
              ))}
            </List>
          </div>
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
            onClick={() => dispatch(showInfo())}
          >
            Edit
          </Button>
        </Grid>
      </Dialog>
      <EditPermission />
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

export default PermissionInfo
