import allLinks from "../utils/links/allLinks";

export default async function resetPasswordRequest(paramsToResetPassword) {
  try {
    const res = await fetch(allLinks.resetPasswordAPIRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        paramsToResetPassword,
      }),
    });

    const data = await res.json();

    console.log("data", data);

    if (data.joiError) return { joiError: data.joiError };

    if (data.invalidToken) return { invalidToken: true };

    if (data.passwordUpdated) return { passwordUpdated: true };

    if (data.notFoundUser) {
      return { notFoundUser: true };
    }
    if (data.error) {
      return { error: data };
    }

    return { somethingElseHappened: true };
  } catch (error) {
    console.log("error password forgot", error);

    return { error };
  }
}
