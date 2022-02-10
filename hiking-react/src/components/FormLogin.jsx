import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const FormLogin = () => {
  const theme = createTheme();

  const preset = {
    username: '',
    password: '',
    rememberme: true
  };

  const [formState, setformState] = useState(preset);

  const handleChange = (e) => {
    // univerzalni handler za sva inpout polja
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setformState({
      ...formState,
      [name]: value
    });
  };

  const validator = () => {
    let test = true;

    if (formState.username === '') {
      test = false;
    }
    if (formState.password === '') {
      test = false;
    }

    return test;
  };

  const handleClickSubmit = (e) => {
    // ovo je handle za OBICAN CLICK event na taster
    e.preventDefault(); // ovo sprecava da browser automatski submituje
    if (validator(formState)) {
      // prosla validacije
      console.log('click submit...')
      console.log(formState)
    } else {
      // pala validacija
      window.alert('Form validation error :(')
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={() => { }}
            noValidate sx={{ mt: 1 }}
          >
            <TextField
              label="Username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              label="Password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              type="password"
              margin="normal"
              required
              fullWidth
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox 
                color="primary" 
                name="rememberme"
                checked={formState.rememberme}
                onChange={handleChange}
              />}
              label="Remember me"
            />
            <Button
              type="button"
              onClick={handleClickSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
};

export default FormLogin;