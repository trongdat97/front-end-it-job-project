import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  TableHead,
} from '@material-ui/core'
import {
  AddCircleOutlined,
  CancelRounded,
  CheckCircleRounded,
  DeleteRounded,
  PeopleOutlineRounded,
  VisibilityRounded,
  WorkOutlined,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import { headerSelector } from 'components/Header/headerSlice'
import SearchBox from 'components/SearchBox/SearchBox'
import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  adminSelector,
  clearState,
  deleteJob,
  deleteUserById,
  getAllJobs,
  getAllUser,
  getJobById,
  getUserById,
  searchJob,
} from 'features/Admin/adminSlice'
import {
  getCvByUsername,
  getAllCv,
  userSelector,
} from 'features/Guest/userSlice'
import JobInfo from '../../../Admin/components/JobInfo'
import { showInfo } from '../../../Admin/components/jobInfoSlice'
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog'
import { showDialog } from 'components/ConfirmDialog/dialogSlice'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import { message } from 'constants/message'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import moment from 'moment'
import { useLocation } from 'react-router'
import { searchSelector, setSearch } from 'components/SearchBox/searchSlice'
import Loading from 'components/Loading/Loading'
import { FaEye } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdWorkOutline } from 'react-icons/md'
import storageUser from 'constants/storageUser'
const columns = [
  // { id: 'index', label: 'INDEX', minWidth: 10, align: 'center' },
  { id: 'name', label: 'NAME', minWidth: 100 },
  // { id: 'email', label: "USER'S EMAIL", minWidth: 200 },
  // {
  //   id: 'createdAt',
  //   label: 'CREATED AT',
  //   minWidth: 170,
  //   align: 'center',
  // },
  // {
  //   id: 'updatedAt',
  //   label: 'UPDATED AT',
  //   minWidth: 170,
  //   align: 'center',
  // },
  {
    id: 'action',
    label: 'ACTION',
    minWidth: 170,
    align: 'center',
  },
]

function createData(index, name, email, createdAt, updatedAt, action) {
  return { index, name, email, createdAt, updatedAt, action }
}

function ListJob(props) {
  const classes = useStyles()
  const tokenUser = localStorage.getItem(storageUser.TOKEN)
  const { listJobs, status } = useSelector(adminSelector)
  const dispatch = useDispatch()
  const { isOpenDrawer } = useSelector(headerSelector)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [rows, setRows] = React.useState([])
  const query = useLocation().search
  const params = new URLSearchParams(query)
  const { type, value } = useSelector(searchSelector)
  const { cvListByUsername, status: newstatus } = useSelector(userSelector)
  const [listCv, setListCv] = useState([])
  const username = sessionStorage.getItem(storageUser.USERNAME)
  useEffect(() => {
    dispatch(
      setSearch({ type: params.get('object'), value: params.get('query') })
    )
  }, [])

  // useEffect(() => {
  //   dispatch(getAllCv(tokenUser))
  // }, [])

  useEffect(() => {
    dispatch(getCvByUsername(username))
  }, [])

  // useEffect(() => {
  //   const getApi = 'http://localhost:8400/cv'
  //   axios
  //     .get(getApi, {
  //       headers: {
  //         Authorization: `Bearer ${tokenUser}`,
  //       },
  //     })
  //     .then((response) => {
  //       setListCv(response.data.data)
  //     })
  // }, [])
  // console.log(listCv)

  useEffect(() => {
    if (type === 'job') dispatch(searchJob(value))
    if (type === '') dispatch(getAllJobs())
  }, [type, value])
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  useEffect(() => {
    dispatch(getAllJobs())
  }, [])

  useEffect(() => {
    if (status.includes('rejected')) {
      dispatch(showSnackbar({ type: SNACK_BAR_TYPE.ERROR, message: 'loix' }))
      dispatch(clearState())
    }
    if (status === 'deleteJob.fulfilled') {
      dispatch(getAllJobs())
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: message.DELETE_JOB_SUCCESS,
        })
      )
      dispatch(clearState())
    }
  }, [status])
  useEffect(() => {
    if (
      newstatus === 'getCvByUsername.fulfilled' ||
      newstatus === 'getCvByUsername.fulfilled'
    ) {
      let temp = []
      cvListByUsername.map((item) => {
        temp.push(
          createData(
            temp.length + 1,
            item?.cvname,
            item?.companyName,
            moment(item?.createdat).format('hh:mm A - DD/MM/YYYY'),
            moment(item?.updatedat).format('hh:mm A - DD/MM/YYYY'),
            <Grid key={item?.id + 'grid'}>
              <IconButton
                title="View"
                onClick={() => {
                  dispatch(getJobById(item?.id))
                  dispatch(showInfo({}))
                }}
              >
                <FaEye fontSize={20} />
              </IconButton>
              <IconButton
                title="Delete"
                onClick={() => {
                  dispatch(
                    showDialog({
                      onSubmit: () => {
                        dispatch(deleteJob(item?.id))
                      },
                      message: message.CONFIRM_DELETE_JOB_MESSAGE,
                    })
                  )
                }}
              >
                <RiDeleteBin5Line fontSize={20} />
              </IconButton>
            </Grid>
          )
        )
      })
      setRows(temp)
    }
  }, [newstatus])
  return (
    <Container
      className={classes.root}
      style={{
        marginTop: 30,
        height: 440,
        overflow: 'scroll',
      }}
    >
      <JobInfo />
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
              List CVs
            </Box>
          </Typography>
          <Paper
            sx={{ width: '100%', overflow: 'hidden' }}
            style={{
              boxShadow:
                'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
              marginTop: 5,
              borderRadius: 10,
            }}
          >
            <TableContainer
              sx={{ maxHeight: 400 }}
              style={{ borderRadius: 10 }}
            >
              <Table stickyHeader aria-label="sticky table">
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
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id]
                            return (
                              <TableCell
                                key={column.id + value}
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
    padding: theme.spacing(0),
  },
}))

export default ListJob
