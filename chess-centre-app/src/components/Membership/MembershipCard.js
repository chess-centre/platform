import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import { useToasts } from "react-toast-notifications";
import { subscribe, useAuthDispatch } from "../../context/Auth";
import { Button } from "@windmill/react-ui";

const RedirectButton = (props) => {
  const { checkout, text, colour } = props;
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = async () => {
    setIsRedirecting(true);
    await checkout();
    setIsRedirecting(false);
  };

  return (
    <Button className={`flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white ${colour}
    transition duration-500 ease-in-out shadow-lg
    `} onClick={handleClick}>
      {isRedirecting ? (
        <div>
          <i className="fas fa-spinner-third animate-spin"></i>
          <span className="ml-2 text-xs sm:text-sm">Redirecting</span>
        </div>
      ) : (
        text
      )}
    </Button>
  );
};

function MembershipCard({
  direct,
  title,
  price,
  subHeading,
  benefits,
  plan,
  pillColour,
  buttonColour,
}) {
  const stripe = useStripe();
  const dispatch = useAuthDispatch();
  const { addToast } = useToasts();
  const checkout = async () => {
    // TODO: need to split out loading states as this dispatch will set loading on ALL buttons :-)
    try {
      await subscribe(dispatch, plan, stripe);
    } catch (error) {
      addToast(
        "Oops. Looks like there is an issue subscribing.",
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
    }
  };

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
        <div>
          <h3
            className={`inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-gradient-to-r ${pillColour} text-white`}
            id="tier-standard"
          >
            <span className="font-normal">
              <i className="fak fa-chess-centre mr-1"></i>
            </span>
            {title}
          </h3>
        </div>
        <div className="mt-4 flex items-baseline text-6xl font-extrabold">
          {price}
          <span className="ml-1 text-2xl font-medium text-gray-500">/mo</span>
        </div>
        <p className="mt-5 text-lg text-gray-900">{subHeading}</p>
      </div>
      <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
        <ul className="space-y-4">
          {benefits.map((benefit, key) => (
            <li key={key} className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-teal-500 ml-2">
                  <i className={benefit.iconClasses}></i>
                </span>
              </div>
              <p className="ml-3 text-md text-gray-700">{benefit.name}</p>
            </li>
          ))}
        </ul>
        {direct ? (
          <RedirectButton checkout={checkout} text={"Upgrade"} colour={buttonColour} />
        ) : (
          <div className="rounded-md shadow">
            <Link
              to={`/register?plan=${plan}`}
              className={`flex items-center justify-center px-5 py-3 border 
              border-transparent text-base font-medium rounded-md text-white ${buttonColour}
              transition duration-500 ease-in-out shadow-lg
              `}
              aria-describedby="tier-standard"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MembershipCard;
