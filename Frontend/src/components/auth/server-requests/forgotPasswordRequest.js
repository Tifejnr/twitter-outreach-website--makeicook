import allLinks from "../utils/links/allLinks";

type ForgotPasswordParamsResponse = {
  emailError?: string;
  emailSent?: { userId?: string; forgotPassToken?: string };
  error?: any;
  somethingElseHappened?: boolean;
};

export default async function forgotPasswordRequest(
  email: string
): Promise<ForgotPasswordParamsResponse> {
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
  } catch (error: any) {
    console.log("error password forgot", error);

    return { error };
  }
}
