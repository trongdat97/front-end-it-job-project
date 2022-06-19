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
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { headerSelector } from 'components/Header/headerSlice'
import SearchBox from 'components/SearchBox/SearchBox'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  adminSelector,
  clearState,
  deleteUserById,
  getAllUser,
  getUserById,
  searchUser,
} from 'features/Admin/adminSlice'
import UserInfo from '../components/UserInfo'
import { showInfo } from '../components/userInfoSlice'
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog'
import { showDialog } from 'components/ConfirmDialog/dialogSlice'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import { message } from 'constants/message'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import { searchSelector, setSearch } from 'components/SearchBox/searchSlice'
import { useLocation } from 'react-router'
import Loading from 'components/Loading/Loading'
import { FaEye } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { BiUser } from 'react-icons/bi'
import storageUser from 'constants/storageUser'

const columns = [
  { id: 'index', label: 'INDEX', minWidth: 50, align: 'center' },
  { id: 'name', label: 'NAME', minWidth: 200 },
  { id: 'email', label: 'EMAIL', minWidth: 200 },
  {
    id: 'role',
    label: 'ROLE',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'active',
    label: 'ACTIVE',
    minWidth: 120,
    align: 'center',
  },
  {
    id: 'action',
    label: 'ACTION',
    minWidth: 120,
    align: 'center',
  },
]

function createData(index, name, email, role, active, action) {
  return { index, name, email, role, active, action }
}

function ListUser(props) {
  const classes = useStyles()
  const { listUser, status } = useSelector(adminSelector)
  const dispatch = useDispatch()
  const { isOpenDrawer } = useSelector(headerSelector)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [rows, setRows] = React.useState([])
  const query = useLocation().search
  const params = new URLSearchParams(query)
  const tokenUser = localStorage.getItem(storageUser.TOKEN)
  const { type, value } = useSelector(searchSelector)
  useEffect(() => {
    dispatch(
      setSearch({ type: params.get('object'), value: params.get('query') })
    )
  }, [])

  useEffect(() => {
    if (type === 'user') dispatch(searchUser(value))
    if (type === '') dispatch(getAllUser())
  }, [type, value])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  useEffect(() => {
    dispatch(getAllUser(tokenUser))
  }, [])

  useEffect(() => {
    if (status.includes('rejected')) {
      dispatch(
        showSnackbar({ type: SNACK_BAR_TYPE.ERROR, message: errorMessage })
      )
      dispatch(clearState())
    }
    if (status === 'deleteUserById.fulfilled') {
      dispatch(getAllUser())
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: message.DELETE_USER_SUCCESS,
        })
      )
      dispatch(clearState())
    }
  }, [status])
  useEffect(() => {
    if (
      status === 'getAllUser.fulfilled' ||
      status === 'searchUser.fulfilled'
    ) {
      let temp = []
      listUser.map((item) => {
        if (item?.role?.role !== 'ROLE_ADMIN')
          temp.push(
            createData(
              temp.length + 1,
              item?.profile?.name,
              item?.email,
              item?.role?.role,
              item?.active ? (
                <CheckCircleRounded
                  key={item?.id + 'check'}
                  style={{ color: '#8bc34a' }}
                  fontSize="medium"
                />
              ) : (
                <CancelRounded
                  key={item?.id + 'cancel'}
                  color="error"
                  fontSize="medium"
                />
              ),
              <Grid key={item?.id + 'grid'}>
                <IconButton
                  title="View"
                  onClick={() => {
                    dispatch(getUserById(item?.id))
                    dispatch(showInfo({}))
                  }}
                >
                  <FaEye fontSize={18} />
                </IconButton>
                <IconButton
                  title="Delete"
                  onClick={() => {
                    dispatch(
                      showDialog({
                        onSubmit: () => {
                          dispatch(deleteUserById(item?.id))
                        },
                        message: message.CONFIRM_DELETE_USER_MESSAGE,
                      })
                    )
                  }}
                >
                  <RiDeleteBin5Line fontSize={18} />
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
      <UserInfo />
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
            <Box fontSize={24} fontWeight={600} style={{ color: '#5e5873' }}>
              List User
            </Box>
          </Typography>
          <Grid container justifyContent="space-between">
            <Button
              startIcon={<AddCircleOutlined />}
              variant="contained"
              className={classes.button}
            >
              Add User
            </Button>
            <Grid>
              <SearchBox
                item={{
                  type: 'user',
                  placeholder: 'Search name, email',
                  width: 360,
                  height: 47,
                }}
                icon={<BiUser fontSize={20} />}
              />
            </Grid>
          </Grid>
          <Paper
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
              <Table
                stickyHeader
                aria-label="sticky table"
                style={{ overflow: 'visible' }}
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

export default ListUser
