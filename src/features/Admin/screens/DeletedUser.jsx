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
import { SettingsBackupRestoreRounded } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { headerSelector } from 'components/Header/headerSlice'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  adminSelector,
  clearState,
  getDeletedUser,
  restoreUserById,
} from 'features/Admin/adminSlice'
import moment from 'moment'
import { showDialog } from 'components/ConfirmDialog/dialogSlice'
import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar'
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import { message } from 'constants/message'
import Loading from 'components/Loading/Loading'

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
    id: 'deletedAt',
    label: 'DELETED AT',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'action',
    label: 'ACTION',
    minWidth: 170,
    align: 'center',
  },
]

function createData(index, name, email, role, deletedAt, action) {
  return { index, name, email, role, deletedAt, action }
}

function DeleteUser(props) {
  const classes = useStyles()
  const { deletedUser, status, errorMessage } = useSelector(adminSelector)
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
    dispatch(getDeletedUser())
  }, [])

  useEffect(() => {
    if (status === 'restoreUserById.fulfilled') {
      dispatch(getDeletedUser())
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: message.RESTORE_USER_SUCCESS,
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
    if (status === 'getDeletedUser.fulfilled') {
      let temp = []
      deletedUser.map((item) => {
        if (item?.role?.role !== 'ADMIN')
          temp.push(
            createData(
              temp.length + 1,
              item?.profile?.name,
              item?.email,
              item?.role?.role,
              moment(item?.deletedat).format('hh:mm A - DD/MM/YYYY'),

              <Button
                variant="contained"
                startIcon={
                  <SettingsBackupRestoreRounded
                    fontSize="medium"
                    style={{ color: 'white' }}
                  />
                }
                className={classes.button}
                onClick={() => {
                  dispatch(
                    showDialog({
                      onSubmit: () => {
                        dispatch(restoreUserById(item?.id))
                      },
                      message: message.CONFIRM_RESTORE_USER,
                    })
                  )
                }}
              >
                Restore
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
              Deleted User
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
                          key={row.id}
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
    padding: theme.spacing(1.5),
    backgroundColor: '#f44336',
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

export default DeleteUser
