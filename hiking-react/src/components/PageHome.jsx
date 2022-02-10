import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const PageHome = (props) => {

  // SEKCIJA FILTER
  const preset = {
    search: '',
    difficulty: 'ALL',
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


  // SEKCIJA LISTA TURA
  const tours = useSelector((state) => state.tours); // uzimamo podatak tours iz globalnog reducovog statea apliakcije

  const filteredTours = tours.filter((tour)=>{
    if (tour.difficulty === formState.difficulty || formState.difficulty === 'ALL') {
      return true; // stay ina array
    } else {
      return false; // deleted from array
    }
  });

  let jsx = filteredTours.map((tour, index) => {
    return (
      <div key={tour._id}>
        <h4>{tour.name}</h4>
        <div>{tour.description}</div>
        <div>{tour.date}</div>
        <div>{tour.trail_legth}</div>
        <div>{tour.difficulty}</div>
        <div>{tour.max_participants}</div>
      </div>
    );
  });

  return (
    <>
      <h1> Home page </h1>
      <h3>Filter tours</h3>

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

      <h4>Tours</h4>
      {jsx}
    </>
  );
};

export default PageHome;
