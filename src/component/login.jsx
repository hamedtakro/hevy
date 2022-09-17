import React, { useState } from "react";
import Navbar from './navbar'
import { Box, Paper, Label, Input, Button, Modal } from '@mui/material'
import axios from 'axios'
function Login() {

    const [name, setName] = useState()
    const handleName = (e) => {
        setName(e.target.value)
    }

    const [number, setNumber] = useState()
    const handleNumber = (e) => {
        setNumber(e.target.value)
    }

    const [form, setForm] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        let person = { name: name, number: number }
        // axios.post(`/person.json`, person)
        // .then(response => this.Context.dispatch({ type: 'add-person', payload: { person: { ...person, key: response.data.name } } }))
        setForm(true)
        // .catch(err => console.log(err))

    }

    const [checked, setChecked] = useState()
    const handleChecked = (e) => {
        setChecked(e.target.value)
    }


    return (
        <div>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',

                    marginTop: 7,
                    '& > :not(style)': {
                        m: 1,
                        width: 560,
                        height: 360,
                    },
                }}
            >
                <Paper elevation={9} className="paperLogin" >
                    <h1 className="m-10 titleLogin">WECOME TO HEVY</h1>

                    {!form ? <form className="inputLogins" onSubmit={handleSubmit}>
                        <label for='names'> name : </label>
                        <Input id='names' type="name" className=" inputLogin "
                            value={name} onChange={handleName} />
                        <label for='numbers'> number : </label>
                        <Input id='numbers' type="number" className=" inputLogin my-4"
                            value={number} onChange={handleNumber} />
                        <Button className="inputLogin" color="primary" variant="contained" type="submit" > Log IN</Button>
                    </form>
                        :
                        <form className="inputLogins" >
                            <label for='checks'>  Please enter the password sent </label>
                            <Input id='checks' type="number" className=" inputLogin my-4"
                                value={checked} onChange={handleChecked} />
                            <Button className="inputLogin " color="primary" variant="contained" type="submit" > checked</Button>
                        </form>
                    }

                </Paper>

            </Box >
        </div>
    );
}

export default Login;