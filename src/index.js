import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  CssBaseline,
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createTheme,
} from '@material-ui/core'
import { GREEN, PRIMARY } from 'constants/color'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'app/store'

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', serif",
    fontSize: 14,
    color: '#625f6e',
  },
  palette: {
    primary: {
      main: `${PRIMARY}`,
    },
    background: {
      default: '#F8F8F8',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: '#B7B7B7 transparent',
          '&::-webkit-scrollbar': {
            width: 6,
            height: 6,
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 6,
            backgroundColor: '#B7B7B7',
            minHeight: 24,
            minWidth: 24,
          },
          '&::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#adadad',
          },
          '&::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#adadad',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#adadad',
          },
          '&::-webkit-scrollbar-corner': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <React.StrictMode>
          <CssBaseline />
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
