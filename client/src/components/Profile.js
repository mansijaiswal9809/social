import { Avatar, Box, Button, Toolbar, Typography } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Profile = ({user, logout}) => {
  return (
    <Toolbar
          sx={{ display: "flex", justifyContent: "flex-end", width: "400px"  }}
        >
          {user ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "400px",
                flexDirection: { xs: "column", md: "row" },
                minHeight:{xs:"150px", md:0},
                alignItems:{xs:"flex-end", md:"center"},
                padding:{xs:4, md:0}
              }}
            >
              <Avatar
                sx={{ bgcolor: deepPurple[500] }}
                src={user?.authData?.picture}
                alt={user?.authData?.name}
              >
                {user?.authData?.name.charAt(0)}
              </Avatar>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                variant="h6"
              >
                {user?.authData?.name}
              </Typography>
              <Button variant="contained" color="secondary" onClick={logout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              component={NavLink}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign in
            </Button>
          )}
        </Toolbar>
  )
}

export default Profile
