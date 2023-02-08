import axios from 'axios';

export const createRide = async ({ ...form }) => {
  //debugger;
  try {
    const response = await axios.post('http://localhost:9000/api/settings/createride', {
      ...form,
    });
    //return response.data.message;
    return response;
  } catch (e) {
    console.log(e.response);
  }
};
