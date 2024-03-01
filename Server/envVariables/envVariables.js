function getSecretKeys() {
  const JWT_PRIVATE_KEY = "i.TsI$d=@FA!J9783";
  const mongoDB_string =
    "mongodb+srv://tifejnr:*BaQYxV8hMJw53X1@rep-trial.9lgvb8b.mongodb.net/?retryWrites=true&w=majority";
  const emailUsername = "workforreputation@gmail.com";
  const emailPassword = "mbgooubrckzepkka";
  const entry_code = "lamzh21";
  const supportEmail = "lilblessingjnr@gmail.com";
  const TIFE_ENTRY_CODE = "tk7KT8n";
  const PAYSTACK_SECRET = "sk_live_3d895957b726a108bf18579ac65a16631aa28316";
  const BLESSING_OPENAI_APIK_KEY =
    "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";
  const huggingFaceModel =
    "bert-large-uncased-whole-word-masking-finetuned-squad";

  const HF_TOKEN = "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";
  const extensionEntryCode = "tifwfrtrial";

  const threeLetterslamzStudentsIdentifier = "lam";

  const keys = {
    JWT_PRIVATE_KEY,
    mongoDB_string,
    emailUsername,
    emailPassword,
    entry_code,
    supportEmail,
    TIFE_ENTRY_CODE,
    PAYSTACK_SECRET,
    BLESSING_OPENAI_APIK_KEY,
    huggingFaceModel,
    HF_TOKEN,
    extensionEntryCode,
    threeLetterslamzStudentsIdentifier,
  };

  return keys;
}

export default getSecretKeys;
