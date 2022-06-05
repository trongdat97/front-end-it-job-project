import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  TableHead,
  IconButton,
  Grid,
} from '@material-ui/core'
import {
  CheckCircleRounded,
  DeleteRounded,
  VisibilityRounded,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { headerSelector } from 'components/Header/headerSlice'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  adminSelector,
  clearState,
  deletePermanentlyJob,
  getJobById,
  getJobRequest,
  getRequestUser,
  identifyJob,
  identifyUserById,
} from 'features/Admin/adminSlice'
import moment from 'moment'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar'
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog'
import { showDialog } from 'components/ConfirmDialog/dialogSlice'
import { message } from 'constants/message'
import JobInfo from '../components/JobInfo'
import { showInfo } from '../components/jobInfoSlice'
import Loading from 'components/Loading/Loading'

const columns = [
  { id: 'index', label: 'INDEX', minWidth: 50, align: 'center' },
  { id: 'name', label: 'NAME', minWidth: 200 },
  { id: 'email', label: "USER'S EMAIL", minWidth: 200 },
  {
    id: 'type',
    label: 'TYPE',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'createdAt',
    label: 'CREATED AT',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'action',
    label: 'ACTION',
    minWidth: 150,
    align: 'center',
  },
]

function createData(index, name, email, type, createdAt, action) {
  return { index, name, email, type, createdAt, action }
}

function JobRequest(props) {
  const classes = useStyles()
  const { requestJob, status, errorMessage } = useSelector(adminSelector)
  const dispatch = useDispatch()
  const { isOpenDrawer } = useSelector(headerSelector)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [rows, setRows] = React.useState([])
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  useEffect(() => {
    dispatch(getJobRequest())
  }, [])

  useEffect(() => {
    if (status === 'identifyJob.fulfilled') {
      dispatch(getJobRequest())
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: message.ACCEPT_JOB_SUCCESS,
        })
      )
      dispatch(clearState())
    }
    if (status === 'deletePermanentlyJob.fulfilled') {
      dispatch(getJobRequest())
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: message.DELETE_JOB_SUCCESS,
        })
      )
      dispatch(clearState())
    }
    if (status.includes('rejected')) {
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.ERROR,
          message: errorMessage,
        })
      )
    }
  }, [status])

  useEffect(() => {
    if (status === 'getJobRequest.fulfilled') {
      let temp = []
      requestJob.map((item) => {
        temp.push(
          createData(
            temp.length + 1,
            item?.name,
            item?.user?.email,
            item?.type,
            moment(item?.createdat).format('hh:mm A - DD/MM/YYYY'),
            <Grid key={item?.id + 'grid'}>
              <IconButton
                title="View"
                onClick={() => {
                  dispatch(getJobById(item?.id))
                  dispatch(showInfo({}))
                }}
              >
                <VisibilityRounded fontSize="medium" />
              </IconButton>
              <IconButton
                title="Delete"
                onClick={() => {
                  dispatch(
                    showDialog({
                      onSubmit: () => {
                        dispatch(deletePermanentlyJob(item?.id))
                      },
                      message: message.CONFIRM_DELETE_PERMANENTLY_USER_MESSAGE,
                    })
                  )
                }}
              >
                <DeleteRounded fontSize="medium" />
              </IconButton>
              <Button
                className={classes.button}
                startIcon={
                  <CheckCircleRounded
                    fontSize="medium"
                    style={{ color: 'white' }}
                  />
                }
                onClick={() => {
                  dispatch(
                    showDialog({
                      onSubmit: () => {
                        dispatch(identifyJob(item?.id))
                      },
                      message: message.CONFIRM_ACCEPT_JOB,
                    })
                  )
                }}
              >
                Accept
              </Button>
            </Grid>
          )
        )
      })
      setRows(temp)
    }
  }, [status])
  return (
    <Container
      className={classes.root}
      style={{
        marginLeft: isOpenDrawer ? 256 : 0,
        maxWidth: isOpenDrawer ? 1260 : 1800,
        marginTop: 96,
      }}
    >
      <JobInfo />
      <CustomSnackBar />
      <ConfirmDialog />
      {status.includes('pending') ? (
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
        <Grid>
          <Typography component="div">
            <Box fontSize={24} fontWeight={700} style={{ color: '#5e5873' }}>
              Job Request
            </Box>
          </Typography>
          <Paper
            sx={{ width: '100%', overflow: 'hidden' }}
            style={{
              boxShadow:
                'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
              marginTop: 40,
              borderRadius: 10,
            }}
          >
            <TableContainer
              sx={{ maxHeight: 400 }}
              style={{ borderRadius: 10 }}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                style={{ borderRadius: 15 }}
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: 600,
                          color: '#5e5873',
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id]
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  paddingTop: 8,
                                  paddingBottom: 8,
                                  color:
                                    column?.id === 'name'
                                      ? '#7367f0'
                                      : '#6e6b7b',
                                  fontWeight: column?.id === 'name' ? 500 : 400,
                                }}
                              >
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      )}
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  imageGrid: {
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    height: '80vh',
    borderRadius: 10,
    backgroundColor: 'rgb(255,255,255)',
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
    margin: theme.spacing(5, 0),
  },
  formContainer: {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loginForm: {
    padding: theme.spacing(10),
  },
  describe: {
    margin: theme.spacing(1, 0, 2, 0),
  },
  button: {
    backgroundColor: '#8bc34a',
    borderRadius: 10,
    boxShadow: 'none',
    width: theme.spacing(12),
    height: theme.spacing(4),
    color: 'white',
    fontSize: 10,
  },
  input: {
    margin: theme.spacing(2, 0),
    [`& fieldset`]: {
      borderRadius: 10,
    },
  },
}))

export default JobRequest
