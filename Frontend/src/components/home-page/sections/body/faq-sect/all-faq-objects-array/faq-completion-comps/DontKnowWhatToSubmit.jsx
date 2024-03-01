import Link from "next/link";

export default function DontKnowWhatToSubmitCompletion() {
  return (
    <>
      <b>
        &nbsp;
        <Link href="#requestSection" className="makeRequestLink">
          Make Request
        </Link>
        &nbsp;
      </b>
      , and make a request to get task solution for any of the clients job.
    </>
  );
}
