import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormLabel, Radio, RadioGroup, TextareaAutosize } from "@mui/material";
import { getSingleTourById } from "../utils/tour-utils";

// Komponenta forma za ADD TOUR / EDIT TOUR

const FormTour = (props) => {
  const theme = createTheme();

  const routeParams = useSelector((state) => state.routeParams); // uzimamo routeParams iz redux statea
  const tours = useSelector((state) => state.tours); // uzimamo routeParams iz redux statea

  const tour_id = routeParams.tour_id;

  const modeEdit = props.modeEdit;

  const preset = {
    name: '',
    description: '',
    date: '02/09/2022',
    difficulty: 'EASY',
    trail_length: 1,
    max_participants: 99
  };

  const [formState, setFormState] = useState(preset);

  useEffect(()=>{
    const editigTour = getSingleTourById(tour_id, tours);
    setFormState(editigTour);
  }, [tour_id, tours])


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

    if (formState.name === '') {
      // name ne sme biti prazno
      test = false;
    }
    if (formState.description === '') {
      // description ne sme biti prazno
      test = false;
    }
    if (formState.trail_length < 1) {
      // trail lenght ne sme biti manje od 1
      test = false;
    }
    if (formState.max_participants < 1) {
      // max_participants ne sme biti manje od 1
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
      if (modeEdit) {
        // UPDATE
        // ovde submit za editovanu turu
      } else {
        // CREATE
        // ovde submit za novi turu
      }
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
            {modeEdit ? 'Edit tour' : 'Create tour'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              id="tourname"
              label="Tour name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
              margin="normal"
              fullWidth
            />
            <TextField
              id="date"
              label="Date"
              name="date"
              value={formState.date}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <FormLabel id="difficulty">Difficulty</FormLabel>
            <RadioGroup
              row
              name="difficulty"
              value={formState.difficulty}
              onChange={handleChange}
            >
              <FormControlLabel value="EASY" control={<Radio />} label="Easy" />
              <FormControlLabel value="MEDIUM" control={<Radio />} label="Medium" />
              <FormControlLabel value="HARD" control={<Radio />} label="Hard" />
            </RadioGroup>

            <TextField
              id="trail_length"
              label="Trail length"
              name="trail_length"
              value={formState.trail_length}
              onChange={handleChange}
              type="number"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <TextField
              id="max_participants"
              label="Max. number of participants"
              name="max_participants"
              value={formState.max_participants}
              onChange={handleChange}
              type="number"
              margin="normal"
              required
              fullWidth
              autoFocus
            />

            {modeEdit ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save changes
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            )
            }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FormTour;
