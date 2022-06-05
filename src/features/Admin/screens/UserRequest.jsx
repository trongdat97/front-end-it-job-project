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
  Grid,
} from '@material-ui/core'
import { CheckCircleRounded } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { headerSelector } from 'components/Header/headerSlice'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  adminSelector,
  clearState,
  getRequestUser,
  identifyUserById,
} from 'features/Admin/adminSlice'
import moment from 'moment'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar'
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog'
import { showDialog } from 'components/ConfirmDialog/dialogSlice'
import { message } from 'constants/message'
import Loading from 'components/Loading/Loading'

const columns = [
  { id: 'index', label: 'INDEX', minWidth: 50, align: 'center' },
  { id: 'name', label: 'NAME', minWidth: 200 },
  { id: 'email', label: 'EMAIL', minWidth: 200 },
  {
    id: 'phone',
    label: 'PHONE NUMBER',
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
    minWidth: 120,
    align: 'center',
  },
]

function createData(index, name, email, phone, createdAt, action) {
  return { index, name, email, phone, createdAt, action }
}

function UserRequest(props) {
  const classes = useStyles()
  const { requestUser, status, errorMessage } = useSelector(adminSelector)
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
    dispatch(getRequestUser())
  }, [])

  useEffect(() => {
    if (status === 'identifyUserById.fulfilled') {
      dispatch(getRequestUser())
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: message.ACCEPT_USER_SUCCESS,
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
    if (status === 'getRequestUser.fulfilled') {
      let temp = []
      requestUser.map((item) => {
        if (item?.role?.role !== 'ADMIN')
          temp.push(
            createData(
              temp.length + 1,
              item?.profile?.name,
              item?.email,
              item?.profile?.phone,
              moment(item?.createdat).format('hh:mm A - DD/MM/YYYY'),
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
                        dispatch(identifyUserById(item?.id))
                      },
                      message: message.CONFIRM_ACCEPT_USER,
                    })
                  )
                }}
              >
                Accept
              </Button>
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
              Company Request
            </Box>
          </Typography>
          <Paper
            style={{
              boxShadow:
                'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
              marginTop: 30,
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

  button: {
    backgroundColor: '#8bc34a',
    borderRadius: 10,
    boxShadow: 'none',
    width: theme.spacing(12),
    height: theme.spacing(4),
    color: 'white',
    fontSize: 10,
  },
}))

export default UserRequest
