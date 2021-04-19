import React from "react";
import { Link } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import { subscribe } from "../../context/Auth";
import { Button } from "@windmill/react-ui";

function MembershipCard({
  direct,
  title,
  price,
  subHeading,
  benefits,
  plan,
  pillColour,
  buttonColour
}) {
  const stripe = useStripe();

  const checkout = async () => {
    // Need a loading state here
    await subscribe(plan, stripe);
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
                < i className={benefit.iconClasses}></i>
                </span>
              </div>
              <p className="ml-3 text-md text-gray-700">{benefit.name}</p>
            </li>
          ))}
        </ul>
        {direct ? (
          <Button
            className={`flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white ${buttonColour}
            transition duration-500 ease-in-out shadow-lg
            `}
            aria-describedby="tier-standard"
            onClick={checkout}
          >
            Upgrade
          </Button>
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
