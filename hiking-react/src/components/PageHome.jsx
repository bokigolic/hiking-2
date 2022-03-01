import { Box, Container, CssBaseline, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionReviewsNeeded, actionToursNeeded } from "../redux/actions";
import Spinner from "./Spinner";
import TourItem from "./TourItem";

const PageHome = (props) => {
  const dispatch = useDispatch();
  const routeFreshness = useSelector((state) => state.routeFreshness);

  useEffect(() => {
    // bice pozvan svaki put kad se routeFreshness promeni
    dispatch(actionToursNeeded());
    dispatch(actionReviewsNeeded());
  }, [routeFreshness]);


  // SEKCIJA FILTER
  const preset = {
    search: '',
    difficulty: 'ALL',
    trail_length_min: 1,
    trail_length_max: 99,
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


  // SEKCIJA LISTA TURA
  const tours = useSelector((state) => state.tours); // uzimamo podatak tours iz globalnog reducovog statea apliakcije

  const filteredTours = tours.data.filter((tour) => {
    let test = true;

    // filtriranej po search-u
    if (formState.search !== '') {
      // filtriramo po search recima samo ako je nesto ukucano
      if (tour.name.toUpperCase().includes(formState.search.toUpperCase()) || tour.description.toUpperCase().includes(formState.search.toUpperCase())) {
        // .toUpperCase() pretvara sva slovau velik aradi poredjenja kako bi bilo svejedno da li smo kucali velika ili mala
        // true
      } else {
        test = false;
      }
    }

    // filtriranje po difficulty
    if (tour.difficulty === formState.difficulty || formState.difficulty === 'ALL') {
      // return true; // stay in aarray
    } else {
      // return false; // deleted from array
      test = false;
    }

    // filtriranje po min mac
    if (tour.trail_length >= formState.trail_length_min && tour.trail_length <= formState.trail_length_max) {
      // true
    } else {
      test = false;
    }

    return test;
  });

  let jsxSpinner = null;
  if (tours.fetching) {
    jsxSpinner = (
      <Spinner />
    );
  }
  let jsx = filteredTours.map((tour, index) => {
    return (
      <TourItem key={tour._id} tour={tour} />
    );
  });

  return (
    <>
      <h1> Home page </h1>
      <h3>Filter tours</h3>

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
          <TextField
            id="search"
            label="Filter by keywords"
            name="search"
            value={formState.search}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            autoFocus
          />
          <Grid container>
            <Grid item xs>
              <TextField
                id="trail_length_min"
                label="Trail length min."
                name="trail_length_min"
                value={formState.trail_length_min}
                onChange={handleChange}
                type="number"
                margin="normal"
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item>
              <TextField
                id="trail_length_max"
                label="Trail length max."
                name="trail_length_max"
                value={formState.trail_length_max}
                onChange={handleChange}
                type="number"
                margin="normal"
                required
                fullWidth
                autoFocus
              />
            </Grid>
          </Grid>

          <FormLabel id="difficulty">Difficulty</FormLabel>
          <RadioGroup
            row
            name="difficulty"
            value={formState.difficulty}
            onChange={handleChange}
          >
            <FormControlLabel value="ALL" control={<Radio />} label="All" />
            <FormControlLabel value="EASY" control={<Radio />} label="Easy" />
            <FormControlLabel value="MEDIUM" control={<Radio />} label="Medium" />
            <FormControlLabel value="HARD" control={<Radio />} label="Hard" />
          </RadioGroup>
        </Box>
      </Container>

      <h4>Tours</h4>
      {jsxSpinner}
      {jsx}
    </>
  );
};

export default PageHome;
