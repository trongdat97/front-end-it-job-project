import React from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearSearch, setSearch } from './searchSlice'
import { CancelRounded } from '@material-ui/icons'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { searchSelector } from './searchSlice'
import { MdOutlineCancel } from 'react-icons/md'
function SearchBox({ item, icon }) {
  const [searchValue, setSearchValue] = useState('')
  const { value } = useSelector(searchSelector)
  const dispatch = useDispatch()
  const history = useHistory()
  React.useEffect(() => {
    setSearchValue(value)
  }, [])
  return (
    <Paper
      style={{
        borderRadius: 10,
        width: item.width,
        height: item.height,
        boxShadow:
          'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
        alignItems: 'center',
      }}
    >
      <IconButton disabled>{icon}</IconButton>
      <InputBase
        style={{ fontSize: 15, width: searchValue !== '' ? 224 : 268 }}
        placeholder={item?.placeholder}
        inputProps={{ 'aria-label': 'search google maps' }}
        value={searchValue}
        onKeyPress={(e) => {
          if (e.code === 'Enter') {
            if (item?.type === 'user') {
              dispatch(setSearch({ type: 'user', value: searchValue }))
              history.push(`/admin/user/list?object=user&query=${searchValue}`)
            }
            if (item?.type === 'category') {
              dispatch(setSearch({ type: 'category', value: searchValue }))
              history.push(
                `/admin/category?object=category&query=${searchValue}`
              )
            }
            if (item?.type === 'job') {
              dispatch(setSearch({ type: 'job', value: searchValue }))
              history.push(`/admin/jobs/list?object=job&query=${searchValue}`)
            }
          }
        }}
        onChange={(e) => {
          setSearchValue(e.target.value)
        }}
      />
      {searchValue !== '' && (
        <IconButton
          onClick={() => {
            setSearchValue('')
            if (item.type === 'user') {
              dispatch(clearSearch())
              history.push('/admin/user/list')
            }
            if (item.type === 'category') {
              dispatch(clearSearch())
              history.push('/admin/category')
            }
            if (item.type === 'job') {
              dispatch(clearSearch())
              history.push('/admin/jobs/list')
            }
          }}
        >
          <MdOutlineCancel fontSize={20} />
        </IconButton>
      )}

      <IconButton
        aria-label="search"
        onClick={() => {
          if (item?.type === 'user') {
            dispatch(setSearch({ type: 'user', value: searchValue }))
            history.push(`/admin/user/list?object=user&query=${searchValue}`)
          }
          if (item?.type === 'category') {
            dispatch(setSearch({ type: 'category', value: searchValue }))
            history.push(`/admin/category?object=category&query=${searchValue}`)
          }
          if (item?.type === 'job') {
            dispatch(setSearch({ type: 'job', value: searchValue }))
            history.push(`/admin/jobs/list?object=job&query=${searchValue}`)
          }
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBox
