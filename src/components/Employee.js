import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),

        },
    },
}));

export default function Employee() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [employees, setEmployees] = useState([])
    const classes = useStyles();

    const handleClick = (e) => {
        e.preventDefault()
        const employee = { name, address }
        console.log(employee)
        fetch("http://localhost:8080/employee/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)

        }).then(() => {
            console.log("New Employee added")
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/employee/getAll")
            .then(res => res.json())
            .then((result) => {
                setEmployees(result);
            }
            )
    }, [])
    return (

        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Add Employee</u></h1>

                <form className={classes.root} noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Employee Name" variant="outlined" fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Employee Address" variant="outlined" fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </form>

            </Paper>
            <h1>Employees</h1>

            <Paper elevation={3} style={paperStyle}>

                {employees.map(employee => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={employee.id}>
                        Id:{student.id}<br />
                        Name:{employee.name}<br />
                        Address:{employee.address}

                    </Paper>
                ))
                }


            </Paper>



        </Container>
    );
}