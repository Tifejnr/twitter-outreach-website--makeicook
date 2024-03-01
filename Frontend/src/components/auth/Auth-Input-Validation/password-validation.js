const minPasswordLength: number = 5;

export default function validatePassword(extensionKey: string) {
  if (extensionKey === "")
    return { extensionKeyError: "Password cannot be empty" };
  if (extensionKey.length <= minPasswordLength)
    return {
      extensionKeyError: `Password must be at least ${minPasswordLength} xters.`,
    };

  return true;
}
