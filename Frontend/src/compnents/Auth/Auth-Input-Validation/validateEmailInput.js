let errorMess;

const isValidEmailId = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default function validateEmailInput(email) {
  if (email === "") {
    errorMess = "Email is required";
    return { errorMess };
  }
  if (!isValidEmailId(email)) {
    errorMess = "Provide a valid email address";
    return { errorMess };
  }

  return true;
}
