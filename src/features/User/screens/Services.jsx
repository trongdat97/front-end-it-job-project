import { Box, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import AdminImage from 'assets/admin.png'
import ContributorImage from 'assets/contributor.png'
import MobileImage from 'assets/mobile.png'
import RecommendImage from 'assets/recommend.png'
function Services(props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography component="div">
          <Box fontSize={30} fontWeight={600}>
            OUR SERVICES
          </Box>
        </Typography>
        <Typography component="div" style={{ width: 280, marginTop: 20 }}>
          <Box fontSize={20} fontWeight={600} textAlign="center">
            Join the Job Search System to take your opportunity
          </Box>
        </Typography>
        <Grid container justifyContent="space-around" style={{ marginTop: 20 }}>
          <Grid item className={classes.description} xs={10} sm={2}>
            <CardMedia image={AdminImage} style={{ height: 100, width: 120 }} />
            <Typography component="div" style={{ marginTop: 30 }}>
              <Box fontSize={18} fontWeight={600}>
                ADMIN'S PAGE
              </Box>
            </Typography>
            <Typography component="div" style={{ marginTop: 5 }}>
              <Box fontSize={14} fontWeight={400} textAlign="center">
                We provide an admin website with an intuitive interface to
                manage users and system related content. However, you need an
                admin account to use this feature.
              </Box>
            </Typography>
          </Grid>
          <Grid item className={classes.description} xs={10} sm={2}>
            <CardMedia
              image={ContributorImage}
              style={{ height: 100, width: 120 }}
            />
            <Typography component="div" style={{ marginTop: 30 }}>
              <Box fontSize={18} fontWeight={600}>
                CONTRIBUTOR'S PAGE
              </Box>
            </Typography>
            <Typography component="div" style={{ marginTop: 5 }}>
              <Box fontSize={14} fontWeight={400} textAlign="center">
                Are you a recruiter? Log in to the recruiter website to find
                candidates for the vacant positions at your company.
              </Box>
            </Typography>
          </Grid>
          <Grid item className={classes.description} xs={10} sm={2}>
            <CardMedia
              image={MobileImage}
              style={{ height: 110, width: 120 }}
            />
            <Typography component="div" style={{ marginTop: 30 }}>
              <Box fontSize={18} fontWeight={600}>
                APPLICANT'S APP MOBILE
              </Box>
            </Typography>
            <Typography component="div" style={{ marginTop: 5 }}>
              <Box fontSize={14} fontWeight={400} textAlign="center">
                Have you just graduated from college or haven't had a job yet?
                Please use our app to join the IT job network, a very hot
                industry right now. Find the right job for you and apply.
              </Box>
            </Typography>
          </Grid>
          <Grid item className={classes.description} xs={10} sm={2}>
            <CardMedia
              image={RecommendImage}
              style={{ height: 100, width: 100, marginTop: 20 }}
            />
            <Typography component="div" style={{ marginTop: 40 }}>
              <Box fontSize={18} fontWeight={600}>
                RECOMMENDATION
              </Box>
            </Typography>
            <Typography component="div" style={{ marginTop: 5 }}>
              <Box fontSize={14} fontWeight={400} textAlign="center">
                You have trouble finding the right job. Or you have trouble
                selecting candidates for your job. The recommendation system
                will help you show potential candidates for companies and jobs
                that match your profile.
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Services
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    margin: -24,
    padding: -24,
  },
  container: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    marginLeft: 30,
    marginTop: 40,
    padding: theme.spacing(1.5, 3.5),
    color: '#7367f0',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#7367f0',
    },
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
}))
