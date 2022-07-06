import { authSelector, logout } from 'features/Auth/authSlice'

import {
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core'
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog'
import React from 'react'
import { showDialog } from 'components/ConfirmDialog/dialogSlice'
import storageAdmin from 'constants/storageAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getAuth, headerSelector } from 'components/Header/headerSlice'
import { useEffect } from 'react'
import Loading from 'components/Loading/Loading'
import congratulationPNG from 'assets/congratulation.png'
import leftPNG from 'assets/left.png'
import { FiAward, FiUsers } from 'react-icons/fi'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { MdOutlineCategory, MdOutlineWorkOutline } from 'react-icons/md'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function Dashboard(props) {
  const classes = useStyles()

  const dispatch = useDispatch()
  const { isOpenDrawer } = useSelector(headerSelector)

  return (
    <Container
      className={classes.root}
      style={{
        marginLeft: isOpenDrawer ? 256 : 0,
        maxWidth: isOpenDrawer ? 1260 : 1800,
        marginTop: 96,
      }}
    >
      <Grid item>
        <Grid container xs={12} style={{ justifyContent: 'space-between' }}>
          <Grid
            item
            xs={12}
            sm={12}
            style={{
              background:
                'linear-gradient(118deg,#7367f0,rgba(115,103,240,.7))',
              color: '#fff',
              paddingTop: 32,
              paddingBottom: 32,
              paddingLeft: 80,
              paddingRight: 80,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '4px',
              position: 'relative',
              boxShadow:
                'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
            }}
          >
            <Grid
              style={{
                backgroundColor: '#7367f0',
                padding: 10,
                borderRadius: 30,
                height: 60,
                width: 60,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}
            >
              <FiAward size={24} />
            </Grid>
            <CardMedia
              image={leftPNG}
              component="img"
              style={{
                height: 100,
                width: 'auto',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            <CardMedia
              image={congratulationPNG}
              component="img"
              style={{
                height: 70,
                width: 'auto',
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            />
            <Typography component="div">
              <Box fontSize={28} fontWeight={500} style={{ color: '#fff' }}>
                Congratulations Admin,
              </Box>
            </Typography>
            <Typography component="div">
              <Box
                fontSize={14}
                fontWeight={500}
                style={{ color: '#fff', textAlign: 'center', marginTop: 16 }}
              >
                You have got 2.56% users today. Check your new badge in your
                profile.
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12} style={{ justifyContent: 'space-between' }}>
          <Grid
            item
            xs={12}
            sm={6}
            style={{ paddingRight: 15, paddingTop: 30 }}
          >
            <Grid
              item
              style={{
                backgroundColor: '#fff',
                borderRadius: 6,
                height: 300,
                boxShadow:
                  'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
              }}
            >
              <Grid container style={{ position: 'relative' }}>
                <Grid>
                  <Typography component="div">
                    <Box
                      fontSize={24}
                      fontWeight={700}
                      style={{ marginTop: 16, color: '#555', marginLeft: 16 }}
                    >
                      2.3k
                    </Box>
                  </Typography>
                  <Typography component="div">
                    <Box
                      fontSize={14}
                      fontWeight={500}
                      style={{ color: 'grey', marginLeft: 16 }}
                    >
                      Avg Sessions
                    </Box>
                  </Typography>
                  <Grid container>
                    <Typography component="div">
                      <Box
                        fontSize={14}
                        fontWeight={500}
                        style={{ color: '#28c76f', marginLeft: 16 }}
                      >
                        +2.3%
                      </Box>
                    </Typography>
                    <Typography component="div">
                      <Box
                        fontSize={14}
                        fontWeight={500}
                        style={{ color: 'grey', marginLeft: 4 }}
                      >
                        vs last 7 days
                      </Box>
                    </Typography>
                  </Grid>
                  <Button
                    color="primary"
                    variant="outlined"
                    className={classes.button}
                  >
                    View Details >>
                  </Button>
                </Grid>
                <Typography
                  component="div"
                  style={{ position: 'absolute', top: 16, right: 20 }}
                >
                  <Box
                    fontSize={14}
                    fontWeight={500}
                    style={{ color: 'grey', marginLeft: 4 }}
                  >
                    Last 7 days
                  </Box>
                </Typography>
                <Grid item>
                  <Bar
                    style={{
                      marginTop: 16,
                      marginLeft: 32,
                    }}
                    height={200}
                    width={250}
                    data={{
                      labels: ['', '', '', '', '', '', ''],
                      datasets: [
                        {
                          fill: false,
                          label: '',
                          barPercentage: 0.5,
                          backgroundColor: '#7367f0',
                          borderRadius: 6,

                          boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
                          data: [75, 125, 225, 175, 125, 75, 25],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        y: { display: false },
                        x: { display: false },
                      },
                      elements: {
                        line: {
                          tension: 0.4,
                        },
                        point: {
                          radius: 0,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Divider style={{ marginTop: -64 }} />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            style={{ paddingTop: 30, paddingLeft: 15, paddingRight: 15 }}
          >
            <Grid
              item
              style={{
                backgroundColor: '#fff',
                borderRadius: 6,
                paddingTop: 8,
                height: 300,
                boxShadow:
                  'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
              }}
            >
              <Grid
                style={{
                  height: 40,
                  marginTop: 16,
                  marginLeft: 16,
                  width: 40,
                  borderRadius: 30,
                  padding: 10,
                  backgroundColor: 'rgba(115,103,240,0.2)',
                }}
              >
                <FiUsers size={20} style={{ color: '#7367f0' }} />
              </Grid>
              <Typography component="div">
                <Box
                  fontSize={24}
                  fontWeight={700}
                  style={{ marginTop: 16, color: '#555', marginLeft: 16 }}
                >
                  1.5k
                </Box>
              </Typography>
              <Typography component="div">
                <Box
                  fontSize={14}
                  fontWeight={500}
                  style={{ color: 'grey', marginLeft: 16 }}
                >
                  Users gained
                </Box>
              </Typography>
              <Line
                style={{ marginTop: 16 }}
                height={120}
                data={{
                  labels: ['', '', '', '', '', '', ''],
                  datasets: [
                    {
                      fill: false,
                      label: '',
                      borderColor: '#7367f0',
                      boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
                      data: [28, 40, 36, 52, 38, 60, 55],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: { display: false },
                    x: { display: false },
                  },
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3} style={{ paddingTop: 30, paddingLeft: 15 }}>
            <Grid
              item
              style={{
                backgroundColor: '#fff',
                borderRadius: 6,
                paddingTop: 8,
                height: 300,
                boxShadow:
                  'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
              }}
            >
              <Grid
                style={{
                  height: 40,
                  marginTop: 16,
                  marginLeft: 16,
                  width: 40,
                  borderRadius: 30,
                  padding: 10,
                  backgroundColor: 'rgba(255,159,67,0.2)',
                }}
              >
                <MdOutlineWorkOutline size={20} style={{ color: '#ff9f43' }} />
              </Grid>
              <Typography component="div">
                <Box
                  fontSize={24}
                  fontWeight={700}
                  style={{ marginTop: 16, color: '#555', marginLeft: 16 }}
                >
                  2.1k
                </Box>
              </Typography>
              <Typography component="div">
                <Box
                  fontSize={14}
                  fontWeight={500}
                  style={{ color: 'grey', marginLeft: 16 }}
                >
                  Jobs gained
                </Box>
              </Typography>
              <Line
                style={{ marginTop: 16 }}
                height={120}
                data={{
                  labels: ['', '', '', '', '', '', ''],
                  datasets: [
                    {
                      fill: false,
                      label: '',
                      borderColor: '#ff9f43',
                      boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
                      data: [10, 15, 8, 15, 7, 12, 8],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: { display: false },
                    x: { display: false },
                  },
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
    margin: theme.spacing(10, 2),
    backgroundColor: '#7367f0',
    color: '#fff',
    borderRadius: 6,
    textTransform: 'capitalize',
    boxShadow: 'none',
    width: theme.spacing(30),
    height: theme.spacing(5),
    fontSize: 13,
    '&:hover': {
      boxShadow:
        'rgba(115,103,240,0.25) 0px 15px 25px, rgba(115,103,240, 0.15) 0px 5px 10px',
      background: '#7367f0',
    },
  },
  input: {
    margin: theme.spacing(2, 0),
    [`& fieldset`]: {
      borderRadius: 10,
    },
  },
}))

export default Dashboard
