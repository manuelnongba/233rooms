import axios from 'axios';

export const autocomplete = async (debouncedSearchTerm: any) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${debouncedSearchTerm}&key=${process.env.MAPSKEY}`
  );

  return response.data;
};
