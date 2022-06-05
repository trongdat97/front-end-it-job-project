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
  CategoryRounded,
  CheckCircleRounded,
  DeleteRounded,
  EditOutlined,
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
  deleteCategory,
  deleteUserById,
  getAllTags,
  getAllUser,
  getUserById,
  searchCategory,
} from 'features/Admin/adminSlice'
import UserInfo from '../components/UserInfo'
import { showInfo } from '../components/userInfoSlice'
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog'
import { showDialog } from 'components/ConfirmDialog/dialogSlice'
import { SNACK_BAR_TYPE } from 'constants/snackbarType'
import { message } from 'constants/message'
import { showSnackbar } from 'components/CustomSnackBar/snackbarSlice'
import moment from 'moment'
import {
  getOneCategory,
  setCurrent,
  setType,
  showForm,
} from 'components/TagForm/tagFormSlice'
import CategoryForm from 'components/TagForm/TagForm'
import { searchSelector, setSearch } from 'components/SearchBox/searchSlice'
import { useLocation } from 'react-router'
import Loading from 'components/Loading/Loading'
import { RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri'
import { BiCategory } from 'react-icons/bi'
import { getAllTag } from 'features/User/userSlice'

const columns = [
  { id: 'index', label: 'INDEX', minWidth: 50 },
  { id: 'name', label: 'NAME', minWidth: 200 },
  { id: 'id', label: 'ID', minWidth: 200 },
]

function createData(index, name, id) {
  return { index, name, id }
}

function TagsScreen(props) {
  const classes = useStyles()
  const { tags, status, errorMessage } = useSelector(adminSelector)
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
    dispatch(getAllTags())
  }, [])

  useEffect(() => {
    if (status.includes('rejected')) {
      dispatch(
        showSnackbar({ type: SNACK_BAR_TYPE.ERROR, message: errorMessage })
      )
      dispatch(clearState())
    }
    if (status === 'deleteCategory.fulfilled') {
      dispatch(getAllCategory())
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
      status === 'getAllTags.fulfilled' ||
      status === 'searchCategory.fulfilled'
    ) {
      let temp = []
      tags.map((item) => {
        temp.push(createData(temp?.length + 1, item?.name, item?.id))
      })
      setRows(temp)
    }
  }, [status])
  const handleSubmit = () => {
    dispatch(getAllTags())
  }

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
      <CategoryForm />
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
              Tags
            </Box>
          </Typography>
          <Grid container justifyContent="space-between">
            <Button
              startIcon={<AddCircleOutlined />}
              variant="contained"
              className={classes.button}
              onClick={() => {
                dispatch(
                  showForm({
                    onSubmit: handleSubmit,
                  })
                )
                dispatch(setType('add'))
              }}
            >
              Add tag
            </Button>
          </Grid>
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
                                  paddingTop: 16,
                                  paddingBottom: 16,
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
    width: theme.spacing(20),
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

export default TagsScreen
