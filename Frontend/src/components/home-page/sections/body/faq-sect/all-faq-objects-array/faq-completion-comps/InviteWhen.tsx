import Link from "next/link";

export default function InviteWhenCompletion() {
  return (
    <>
      <b>
        &nbsp;
        <Link href="/requestSection" className="makeRequestLink">
          Make Request
        </Link>
        &nbsp;
      </b>
      to make your request.
      <p>
        Subsequent Invites will be sent within 12 hours of completion of
        previous job.
      </p>
    </>
  );
}
