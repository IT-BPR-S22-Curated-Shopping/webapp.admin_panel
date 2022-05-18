import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useEffect} from "react";

function Login(props) {
    const eventManager = props.eventManager;
    const [pwValue, setPwValue] = React.useState('')
    const [pwError, setPwError] = React.useState(false);
    const [pwErrorMsg, setPwErrorMsg] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('')
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = React.useState('');

    const validEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!validEmail(data.get('email'))) {
            setEmailHelpers(true, "invalid email");
        }
        else if (data.get('password').length === 0) {
            setPwHelpers(true, "empty password");
        }
        else {
            eventManager.invoke(
                eventManager.event().login,
                {
                    email: data.get('email'),
                    password: data.get('password')
                })
        }
    };

    const resetErrors = () => {
        setPwHelpers(false, "")
        setEmailHelpers(false, "")
    }

    const setPwHelpers = (isError, msg) => {
        setPwErrorMsg(msg);
        setPwError(isError);
    }

    const setEmailHelpers = (isError, msg) => {
        setEmailErrorMsg(msg);
        setEmailError(isError);
    }

    const handleError = (error) => {
        const msg = error.replaceAll("-", " ");
        if (msg.startsWith('user') || msg.endsWith('email')) {
            setEmailHelpers(true, msg);
        }
        else if (msg.endsWith('password')) {
            setPwHelpers(true, msg);
        }
        else {
            console.log('Login page error: ' + msg);
        }
    }

    const handleSuccess = () => {
        setPwValue("");
        setEmailValue("");
    }

    const updateEmail = (value) => {
        setEmailValue(value);
        resetErrors();
    }

    const updatePw = (value) => {
        setPwValue(value);
        resetErrors();
    }

    useEffect(() => {
        eventManager.addListener(eventManager.event().authError, handleError)
        eventManager.addListener(eventManager.event().loggedIn, handleSuccess)

        return function cleanup() {
            eventManager.removeListener(eventManager.event().authError, handleError)
            eventManager.removeListener(eventManager.event().loggedIn, handleSuccess)
        };
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        inputProps={{ "data-testid": "textField-email" }}
                        value={emailValue}
                        error={emailError}
                        helperText={emailErrorMsg}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e)=>{ updateEmail(e.target.value)}}
                    />
                    <TextField
                        inputProps={{ "data-testid": "textField-password" }}
                        value={pwValue}
                        error={pwError}
                        helperText={pwErrorMsg}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e)=>{
                            updatePw(e.target.value)
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;