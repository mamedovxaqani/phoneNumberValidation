import React, { useEffect, useState } from "react";
import getAllCountries from "./helpers/getCountries.js";
import {
  FormGroup,
  FormHelperText,
  TextField,
  FormLabel,
  Button,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DoneOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { validateNumber } from "./yup/phoneSchame.js";

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState("GB");
  const [countries, setCountries] = useState([]);
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  useEffect(() => {
    getAllCountries().then((countries) => {
      setCountries(Array.from(countries.data));
    });
  }, []);

  const schema = yupResolver(validateNumber(selectedCountry));

  const form = useForm({
    resolver: schema,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSave = (data) => {
    setTimeout(() => {
      setSnackBarVisible(true);
    }, 1000);

    setSnackBarVisible(false);
  };

  const handleChangeCountry = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleClose = () => {
    setSnackBarVisible(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <Snackbar
        open={snackBarVisible}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          icon={<DoneOutline fontSize="inherit" sx={{ color: "green" }} />}
          severity="success"
        >
          Phone number validated successfully!
        </Alert>
      </Snackbar>

      <form action="" onSubmit={handleSubmit(onSave)} style={{ width: "100%" }}>
        <FormGroup>
          <FormLabel required>Phone Number</FormLabel>
          <TextField
            type="tel"
            variant="outlined"
            fullWidth
            placeholder="Enter your phone number"
            {...register("number")}
            error={!!errors.number}
            helperText={errors.number?.message}
            sx={{ marginBottom: "1rem" }}
          />
        </FormGroup>

        <FormControl fullWidth sx={{ marginBottom: "1.5rem" }}>
          <InputLabel id="country-label">Select Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            value={selectedCountry}
            onChange={handleChangeCountry}
          >
            {countries.map((country) => {
              return (
                <MenuItem value={country.cca2} key={country.name.common}>
                  {country.flag} {country.name.common}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          sx={{ padding: "0.75rem 1.5rem", textTransform: "none" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default App;
