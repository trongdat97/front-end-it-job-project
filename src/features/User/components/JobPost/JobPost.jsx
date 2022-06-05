import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  CardMedia,
  Chip,
  ClickAwayListener,
  Container,
  Divider,
  Fade,
  Grid,
  Grow,
  IconButton,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { authSelector } from 'features/Auth/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  deleteJobByJobId,
  getCandidate,
  getJobByUserId,
  userSelector,
  getAllJob,
} from 'features/User/userSlice'
import {
  MdLocationPin,
  MdMoreHoriz,
  MdOutlineMenu,
  MdPeople,
} from 'react-icons/md'
import moment from 'moment'
import { withStyles } from '@material-ui/styles'
import { FiEdit2, FiEye, FiTrash } from 'react-icons/fi'
import { showForm } from '../JobDetails/jobDetailsSlice'
import {
  showForm as showJobForm,
  setType,
} from 'features/User/components/JobForm/jobFormSlice'
import { setCurrent } from 'features/User/components/JobForm/jobFormSlice'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import { message } from 'constants/message'
import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar'
import { getAllJobs } from 'features/Admin/adminSlice'
import { showDialog } from 'components/ConfirmDialog/dialogSlice'
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog'
import { showCandidateForm } from '../CandidateForm/candidateFormSlice'
import CandidateForm from '../CandidateForm/CandidateForm'
import Loading from 'components/Loading/Loading'
import storageUser from 'constants/storageUser'
const StyledMenuItem = withStyles({
  root: {
    '&:hover': {
      backgroundColor: 'rgba(115, 103, 240, 0.15)',
      color: 'rgb(115, 103, 240)',
    },
    '& .MuiListItemIcon-root:hover': {
      color: 'rgb(115, 103, 240)',
    },
  },
})(MenuItem)
function JobPost(props) {
  const tokenUser = localStorage.getItem(storageUser.TOKEN)
  const classes = useStyles()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [currentOne, setCurrentOne] = React.useState({})
  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget)
    setCurrentOne(item)
    console.log(currentOne)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { info } = useSelector(authSelector)
  const { jobList, status } = useSelector(userSelector)
  let jobList1 = []
  jobList1 = jobList.slice().reverse()
  console.log(jobList1)

  useEffect(() => {
    dispatch(getAllJob(tokenUser))
  }, [])
  const onSubmit = () => console.log('view')
  const handleView = (item) => {
    dispatch(setCurrent(item))
    dispatch(showForm({ onSubmit: onSubmit }))
    setAnchorEl(null)
  }
  const handleEdit = (item) => {
    dispatch(setType('edit'))
    dispatch(setCurrent(item))
    dispatch(showJobForm({ onSubmit: onSubmit }))
    setAnchorEl(null)
  }
  const handleDelete = (item) => {
    dispatch(
      showDialog({
        onSubmit: () => {
          dispatch(deleteJobByJobId(item?.id))
        },
        message: message.CONFIRM_DELETE_PERMANENTLY_JOB_MESSAGE,
      })
    )
    setAnchorEl(null)
  }
  const handleViewCandidate = (item) => {
    dispatch(setCurrent(item))
    dispatch(getCandidate(item?.id))
    dispatch(showCandidateForm({ onSubmit: onSubmit }))
  }
  // useEffect(() => {
  //   if (status.includes('rejected')) {
  //     dispatch(
  //       showSnackbar({ type: SNACK_BAR_TYPE.ERROR, message: errorMessage })
  //     )
  //     dispatch(clearState())
  //   }
  //   if (status === 'deleteJobByJobId.fulfilled') {
  //     dispatch(
  //       showSnackbar({
  //         type: SNACK_BAR_TYPE.SUCCESS,
  //         message: message.DELETE_JOB_SUCCESS,
  //       })
  //     )
  //     dispatch(getJobByUserId(info?.id))
  //   }
  //   if (status === 'addJob.fulfilled') {
  //     dispatch(
  //       showSnackbar({
  //         type: SNACK_BAR_TYPE.SUCCESS,
  //         message: message.ADD_JOB_SUCCESS,
  //       })
  //     )
  //     dispatch(getJobByUserId(info?.id))
  //   }
  //   if (status === 'editJobByJobId.fulfilled') {
  //     dispatch(
  //       showSnackbar({
  //         type: SNACK_BAR_TYPE.SUCCESS,
  //         message: message.EDIT_JOB_SUCCESS,
  //       })
  //     )
  //     dispatch(getJobByUserId(info?.id))
  //   }
  // }, [status])

  return (
    <Container className={classes.root}>
      <CustomSnackBar />
      <ConfirmDialog />
      <CandidateForm />
      <Grid className={classes.top}>
        <Typography component="div">
          <Box fontSize={18} fontWeight={700} style={{ color: '#5e5873' }}>
            Your posts
          </Box>
        </Typography>
      </Grid>
      {status === 'getJobByUserId.pending' ? (
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
        jobList1?.map((item) => (
          <Grid className={classes.item} key={item?.id}>
            <Chip
              size="small"
              label={item?.companyName}
              style={{
                fontSize: 10,
                backgroundColor: '#64b5f6',
                color: '#fff',
                fontWeight: 400,
              }}
            />
            <div>
              <IconButton
                style={{ position: 'absolute', top: 10, right: 10 }}
                id="fade-button"
                aria-controls="fade-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => {
                  handleClick(event, item)
                }}
              >
                <MdMoreHoriz fontSize={24} />
              </IconButton>
            </div>
            <Typography component="div">
              <Box
                fontSize={20}
                fontWeight={700}
                style={{ color: '#5e5873', marginTop: 16 }}
              >
                {item?.jobName}
              </Box>
            </Typography>

            <Grid
              container
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <MdLocationPin fontSize={13} style={{ color: 'grey' }} />
              <Typography component="div">
                <Box
                  fontSize={14}
                  fontWeight={500}
                  style={{ marginLeft: 8, color: '#5e5873' }}
                >
                  {item?.companyAddress}
                </Box>
              </Typography>
            </Grid>
            {item?.tags?.map((item) => (
              <Chip size="small" label={item?.name} style={{ marginLeft: 8 }} />
            ))}
            <CardMedia
              component="img"
              image={item?.companyLogo}
              style={{
                height: 300,
                width: '100%',
                marginTop: 24,
                resizeMode: 'contain',
              }}
            />
            <Grid
              container
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 24,
              }}
            >
              <Typography component="div">
                <Box
                  fontSize={14}
                  fontWeight={500}
                  style={{ marginLeft: 8, color: '#5e5873' }}
                >
                  {`Posted: ${moment(item?.createdat).format('DD/MM/YYYY')}`}
                </Box>
              </Typography>
              <Typography component="div">
                <Box
                  fontSize={14}
                  fontWeight={500}
                  style={{ marginLeft: 8, color: '#5e5873' }}
                >
                  {`Deadline: ${moment(item?.deadline).format('DD/MM/YYYY')}`}
                </Box>
              </Typography>
            </Grid>
          </Grid>
        ))
      )}
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        keepMounted
        onClose={handleClose}
        TransitionComponent={Fade}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          elevation: 0,
          style: {
            boxShadow:
              'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
          },
        }}
      >
        <StyledMenuItem onClick={() => handleView(currentOne)}>
          <ListItemIcon>
            <FiEye fontSize={15} />
          </ListItemIcon>
          <Typography component="div">
            <Box
              fontSize={15}
              fontWeight={500}
              style={{ color: '#5e5873', marginLeft: -16 }}
            >
              View
            </Box>
          </Typography>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleEdit(currentOne)}>
          <ListItemIcon>
            <FiEdit2 fontSize={15} />
          </ListItemIcon>
          <Typography component="div">
            <Box
              fontSize={15}
              fontWeight={500}
              style={{ color: '#5e5873', marginLeft: -16 }}
            >
              Edit
            </Box>
          </Typography>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleDelete(currentOne)}>
          <ListItemIcon>
            <FiTrash fontSize={15} />
          </ListItemIcon>
          <Typography component="div">
            <Box
              fontSize={15}
              fontWeight={500}
              style={{ color: '#5e5873', marginLeft: -16 }}
            >
              Delete
            </Box>
          </Typography>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleViewCandidate(currentOne)}>
          <ListItemIcon>
            <MdPeople fontSize={15} />
          </ListItemIcon>
          <Typography component="div">
            <Box
              fontSize={15}
              fontWeight={500}
              style={{ color: '#5e5873', marginLeft: -16 }}
            >
              Candidates
            </Box>
          </Typography>
        </StyledMenuItem>
      </Menu>
    </Container>
  )
}

export default JobPost

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
  item: {
    padding: theme.spacing(2.5),
    position: 'relative',
    boxShadow:
      'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 16,
  },
}))
