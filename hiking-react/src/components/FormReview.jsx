import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionReviewCreate } from "../redux/actions";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormLabel, Radio, RadioGroup, Rating, TextareaAutosize } from "@mui/material";

const FormReview = (props) => {
  const dispatch = useDispatch();
  const theme = createTheme();

  const tour_id = props.tour_id;

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
      const formState2 = {
        ...formState,
        rating: parseInt(formState.rating), // pretvaramo rating iz slova u broj
        tour_id: tour_id,
        // user_id: '???' // user_id ne saljemo ovde jer ce on svakako doci do backenda sa tokenom
      }; // podaci korigovani da bi rating bio number a ne string
      console.log(formState2);
      dispatch(actionReviewCreate(formState2));

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
          <Typography component="h2" variant="h5">
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
