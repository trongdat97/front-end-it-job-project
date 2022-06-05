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
import { headerSelector } from 'components/Header/headerSlice'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  adminSelector,
  clearState,
  deleteJob,
  deleteUserById,
  getAllJobs,
  getAllRole,
  getAllUser,
  getPermissionByRoleId,
  getUserById,
  setCurrentRole,
} from 'features/Admin/adminSlice'
import PermissionInfo from '../components/PermissionInfo'
import { showInfo } from '../components/permissionInfoSlice'
import { showInfo as showAddInfo } from '../components/addPermissionSlice'
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog'
import { showDialog } from 'components/ConfirmDialog/dialogSlice'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import { message } from 'constants/message'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import moment from 'moment'
import { useLocation } from 'react-router'
import Loading from 'components/Loading/Loading'
import { FaEye } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdWorkOutline } from 'react-icons/md'
import AddPermission from '../components/AddPermission'

const columns = [
  { id: 'id', label: 'ID', minWidth: 40, align: 'center' },
  { id: 'role', label: 'Role', minWidth: 200 },
  {
    id: 'createdAt',
    label: 'CREATED AT',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'updatedAt',
    label: 'UPDATED AT',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'permission',
    label: 'PERMISSION',
    minWidth: 170,
    align: 'center',
  },
]

function createData(id, role, createdAt, updatedAt, permission) {
  return { id, role, createdAt, updatedAt, permission }
}

function RoleScreen(props) {
  const classes = useStyles()
  const { roleList, status } = useSelector(adminSelector)
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
    dispatch(getAllRole())
  }, [])

  useEffect(() => {
    if (status.includes('rejected')) {
      dispatch(
        showSnackbar({ type: SNACK_BAR_TYPE.ERROR, message: errorMessage })
      )
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
    if (status === 'getAllRole.fulfilled') {
      let temp = []
      roleList.map((item) => {
        temp.push(
          createData(
            item?.id,
            item?.role,
            moment(item?.createdat).format('hh:mm A - DD/MM/YYYY'),
            moment(item?.updatedat).format('hh:mm A - DD/MM/YYYY'),
            <Grid key={item?.id + 'grid'}>
              <IconButton
                title="View"
                onClick={() => {
                  dispatch(getPermissionByRoleId(item?.id))
                  console.log(item?.role)
                  dispatch(setCurrentRole(item))
                  dispatch(showInfo({}))
                }}
              >
                <FaEye fontSize={20} />
              </IconButton>
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
      <PermissionInfo />
      <AddPermission />
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
              Role
            </Box>
          </Typography>
          <Grid container justifyContent="space-between">
            <Button
              startIcon={<AddCircleOutlined />}
              variant="contained"
              className={classes.button}
              onClick={() => dispatch(showAddInfo({}))}
            >
              Add Role
            </Button>
          </Grid>
          <Paper
            sx={{ width: '100%', overflow: 'hidden' }}
            style={{
              boxShadow:
                'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
              marginTop: 24,
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
                                    column?.id === 'role'
                                      ? '#7367f0'
                                      : '#6e6b7b',
                                  fontWeight: column?.id === 'role' ? 500 : 400,
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
  button: {
    margin: theme.spacing(3, 0),
    backgroundColor: '#7367f0',
    color: '#fff',
    borderRadius: 10,
    boxShadow: 'none',
    width: theme.spacing(16),
    height: theme.spacing(5),
    marginTop: theme.spacing(2),
    fontSize: 12,
    '&:hover': {
      boxShadow:
        'rgba(115,103,240,0.25) 0px 15px 25px, rgba(115,103,240, 0.15) 0px 5px 10px',
      background: '#7367f0',
    },
  },
}))

export default RoleScreen
