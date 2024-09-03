export default function Welcome() {
  return (
    <>
      <div className="w-full lg:px-10 flex flex-col items-center" id="welcome">
        <p className="text-2xl font-bold mb-4 text-center">
          WELCOME TO THE APPLICATION FOR 2025's SEASON OF FARMER WANTS A WIFE!
        </p>
        <p className="text-xl text-center font-medium mb-2">
          10 marriages, 2 engagements, 26 kids and another on the way - if
          you're a single farmer looking for love or you know your way around a
          farm and would love to build a life and home on one, this is your
          chance!
        </p>

        <p className="text-xl text-center font-medium ">
          Many Aussie farmers have found love through Farmer Wants A Wife
          Australia®. Now it's your turn!
        </p>

        <div className="mb-5">
          <p className="text-xl text-center font-medium">
            Farmers, to begin your love story:
          </p>
          <ul className="text-lg list-disc pl-20 text-left glass-morphism">
            <li>
              Click on the{" "}
              <span className="apply-button-color font-bold">"Apply"</span>{" "}
              button above if this is your first time applying or the{" "}
              <span className="text-blue-600 font-bold">
                "Complete Saved Application"
              </span>{" "}
              button above to finish your application
            </li>
            <li>
              Accurately fill in your details and answer just a couple questions
              about you
            </li>
            <li>Upload a recent photo</li>
          </ul>
        </div>

        <p className="text-xl text-center font-medium">
          For any questions, or to nominate a single farmer,{" "}
          <a
            href="mailto:farmerwantsawife@ashandchooka.com"
            className="underline"
          >
            {" "}
            contact us here
          </a>
        </p>
      </div>
    </>
  );
}
