import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormLabel, Radio, RadioGroup, TextareaAutosize } from "@mui/material";

const FormTour = () => {
  const theme = createTheme();

  const preset = {
    name: '',
    description: '',
    date: '02/09/2022',
    difficulty: 'EASY',
    trail_length: 1,
    max_participants: 99
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
            Create tour
          </Typography>
          <Box component="form" onSubmit={() => { }} noValidate sx={{ mt: 1 }}>
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FormTour;
