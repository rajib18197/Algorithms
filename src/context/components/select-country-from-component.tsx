import React from "react";
import { SelectCountry, Country } from "../select-country-library";
import { useFormAPI, useFormCountry } from "../form-api";

export type { Country };

export const SelectCountryFormComponent = () => {
  const { onCountryChange } = useFormAPI();
  const country = useFormCountry();
  console.info("SelectCountryFormComponent render");

  return <SelectCountry onChange={onCountryChange} activeCountry={country} />;
};
