import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormLabel, Radio, RadioGroup, Rating, TextareaAutosize } from "@mui/material";

const FormReview = () => {
  const theme = createTheme();

  const preset = {
    rating: 0,
    text: '',
  };

  const [formState, setFormState] = useState(preset);

  const handleChange = (e) => {
    // univerzalni handler za sva inpout polja
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const validator = (formState) => {
    let test = true;

    if (!(parseInt(formState.rating) > 0)) {
      // morate dati neki rating
      test = false;
    }
    if (formState.text === '') {
      // review ne sme biti prazno
      test = false;
    }

    return test;
  };

  const handleSubmit = (e) => {
    // ovo je handle za onSubmit event forme
    e.preventDefault(); // ovo sprecava da browser automatski submituje
    if (validator(formState)) {
      // ako prodje validaciju forme
      console.log('submit...');
      console.log(formState);
      const submitData = {
        ...formState,
        rating: parseInt(formState.rating),
        tour_id: '4', // dummy
      }; // podaci korigovani da bi rating bio number a ne string
      console.log(submitData);
    } else {
      // ako ne prodje validaciju forme
      window.alert('Form validation error! :(')
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            Write review
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography component="legend">Your rating</Typography>
            <Rating
              name="rating"
              value={formState.rating}
              onChange={handleChange}
            />
            <TextField
              label="Your review"
              name="text"
              value={formState.text}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
              margin="normal"
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit review
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FormReview;
