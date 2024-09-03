export default function Footer() {
  return (
    <>
      <footer className="text-sm p-4 text-center ">
        <p>
          Need assistance with your application?{" "}
          <a
            href="mailto:help@ashandchooka.com"
            className="underline hover:text-blue-800"
          >
            Contact us here
          </a>
        </p>

        <p>
          <a href="https://privacy-policy.ashandchook.com">
            Terms of Use - Applicant
          </a>{" "}
          | <a href="https://privacy-policy.ashandchook.com">Privacy Policy</a>{" "}
          | Copyright © 2025 Farmer Wants A Wife Casting | All Rights Reserved
        </p>
        <p>
          To be alerted to new casting information as they launch,{" "}
          <a
            href="https://casting-subscribe.ashandchooka.com"
            className="underline hover:text-blue-800"
          >
            subscribe to casting alerts here
          </a>
        </p>
      </footer>
    </>
  );
}
