import axios from 'axios';
const serverEndpoint =  "http://localhost:3000/api/jwt"

export default async function uidToServer (uidValue) {
 try {
      const response = await axios.post(serverEndpoint, uidValue);
      const data = await response.json();

      console.log('POST request successful:', data);
      // Handle the response or update your component state as needed
    } catch (error) {
      console.error('Error occurred during POST request:', error);
      // Handle the error as needed
    }

}

