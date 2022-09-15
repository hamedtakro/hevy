import React, { useState } from "react";
import { Grid, Box, ListItem, List, InputBase } from '@mui/material'
import Navbar from './navbar'
import { Label } from "@mui/icons-material";
import { FormControl, Input, InputLabel } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Settings = () => {


    const [profile, setProfile] = useState(true)

    const handleProfile = () => {
        setProfile(true)
        setAccount(false)
    }
    const [account, setAccount] = useState(false)

    const handleAccount = () => {
        setProfile(false)
        setAccount(true)
    }
    const [img, setImg] = useState()

    const handleImg = (e) => {
        setImg(e.target.value)
    }

    const [name, setName] = useState()

    const handleName = (e) => {
        setName(e.target.value)
    }

    const [bio, setBio] = useState()
    const handleBio = (e) => {
        setBio(e.target.value)
    }


    return (
        <div className='exercise.style'>
            <Navbar />
            <div className='setting-box lg:flex sm:w-full'>
                <Grid container >
                    <Grid item md={4} className=' md:flex lg:flex sm:w-full'>
                        <List className="listSetting" sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '.5rem', minHeight: 500, position: 'fix', overflow: 'auto', }}>
                            <h1 className="m-2 ml-5 titleSetting">Account</h1>
                            <a onClick={handleProfile} > <ListItem ><div className="listItemSetting "> <h1>Profile</h1> </div> <ArrowForwardIosOutlinedIcon /> </ListItem></a>
                            <a onClick={handleAccount} > <ListItem ><div className="listItemSetting "><h1>Account</h1> </div><ArrowForwardIosOutlinedIcon /></ListItem></a>
                            <a> <ListItem ><div className="listItemSetting "><samp samp>PRO </samp><h1>Manage Subscription</h1> </div><ArrowForwardIosOutlinedIcon /></ListItem></a>

                        </List>
                    </Grid>
                    <Grid item md={8} className='setting-Right md:flex lg:flex sm:w-full max-md:w-full mb-5 lg:w-5/6 sm:inline'>

                        {profile ? < >
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 6, mt: 3 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <div className="uploadpicture">
                                    <label for="file-upload" className=""  > <AccountCircleIcon sx={{ fontSize: 140 }} color="disabled" /> </label>
                                    <label for="file-upload"  >
                                        <Input id="file-upload" type="file" className=" mt-8" style={{ display: 'none' }}
                                            value={img} onChange={handleImg}
                                        />
                                        Change picture
                                    </label >
                                </div>
                                <Input placeholder="Name" id="name-id" type="text" className=" inputSetting"
                                    value={name} onChange={handleName}
                                />
                                <Input placeholder="Bio" type="text" id="bio-id" className="inputSetting"
                                    value={bio} onChange={handleBio}
                                />
                            </Box>
                        </>
                            : account ? <div>
                                <h1>Private Profile</h1>
                                <br />
                                <h3 className="">Having a private profile means other users need to request to follow you. Only if you accept their follow request, will they be able to see your workouts.</h3>
                                <Box
                                className=" passwordSetting mt-20"
                                    component="form"
                                    sx={{
                                        '& > :not(style)': {mt:1 },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <label for="CurrentPassword">Current password</label>
                                    <Input id="CurrentPassword"   type="text" 
                                        // value={CurrentPassword} onChange={handleCurrentPassword}
                                    />
                                    <label for="NewPassword">New Password</label>
                                    <Input id="NewPassword"  type="text"  
                                        // value={newPassword} onChange={handleNewPassword}
                                    />
                                </Box>

                            </div>
                                : ''}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Settings;