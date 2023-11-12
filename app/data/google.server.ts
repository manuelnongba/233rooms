import axios from 'axios';
import { MAPSKEY } from '~/api/config';

export const autocomplete = async (debouncedSearchTerm: any) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${debouncedSearchTerm}&key=${MAPSKEY}`
  );

  return response.data;
};
