import axios from "axios";

const registerUserEndPoint = "http://localhost:3000/api/register-user";

export default async function registerUser(regParams) {
  try {
    const response = await axios.post(registerUserEndPoint, regParams);
    const data = await response.json();
    console.log(data);
    if (!data.registered) return false;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
