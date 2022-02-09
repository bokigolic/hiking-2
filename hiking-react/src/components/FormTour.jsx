import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormLabel, Radio, RadioGroup, TextareaAutosize } from "@mui/material";

const FormTour = () => {
  const theme = createTheme();

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
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Description"
              name="description"
              value={'state.description'}
              onChange={'handleChange'}
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
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <FormLabel id="difficulty">Difficulty</FormLabel>
            <RadioGroup
              row
              name="difficulty"
            >
              <FormControlLabel value="EASY" control={<Radio />} label="Easy" />
              <FormControlLabel value="MEDIUM" control={<Radio />} label="Medium" />
              <FormControlLabel value="HARD" control={<Radio />} label="Hard" />
            </RadioGroup>

            <TextField
              id="trail_length"
              label="Trail length"
              name="trail_length"
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
