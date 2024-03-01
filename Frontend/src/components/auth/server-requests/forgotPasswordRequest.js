import allLinks from "../utils/links/allLinks";

export default async function forgotPasswordRequest(email) {
  try {
    const res = await fetch(allLinks.forgotPasswordAPIRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    if (data.emailError) return { emailError: "Provide a valid email address" };

    if (data.notFoundUser) {
      return { emailError: "Email is not Registered" };
    }

    if (data.emailSent) return { emailSent: data };

    return { somethingElseHappened: true };
  } catch (error) {
    console.log("error password forgot", error);

    return { error };
  }
}
