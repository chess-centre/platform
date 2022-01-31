import API from "@aws-amplify/api";
import React, { useState, useReducer } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useStripe } from "@stripe/react-stripe-js";
import { CheckIcon } from "@heroicons/react/solid";
import FestivalBuilding from "../../../assets/img/festival_building.png";
import { Switch, RadioGroup } from "@headlessui/react";
import { getECFPlayer } from "../../../api/profile/chess";
import { FestivalReducer, initialState } from "./reducer";
import { FestivalProvider, useFestivalContext } from "../../../context/FestivalContext";
import { loginUser, signUpUser, confirmEmail } from "./authentication";
import { getMemberBySub } from "../../../api/member";

const [
  ONE_ACCOUNT_INFO,
  TWO_ENTRY_DETAILS,
  THREE_CONFIRM_INFO,
  FOUR_PASSWORD_INPUT,
  FIVE_CONFIRM_EMAIL_CODE
] = [0, 1, 2, 3, 4];

function getFieldError(value) {
  if (!value) return 'field is required'
  return null
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function FestivalRegister(props) {
  const [user, dispatch] = useReducer(FestivalReducer, initialState);
  const [potentialPlayer, setPotentialPlayer] = useState([]);
  const [globalFormState, setGlobalFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    ecfId: "",
    existingUser: false,
    section: "",
    byes: [],
    price: "30",
  });
  const [stepState, setStepState] = useState([
    { id: "01", name: "Account", href: "#", status: "current" },
    { id: "02", name: "Entry", href: "#", status: "upcoming" },
    { id: "03", name: "Submit / Pay", href: "#", status: "upcoming" },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const handleUpdateStep = (step) => {
    const updatedSteps = stepState.map((s, idx) => {
      if (step > idx) {
        s.status = "complete";
      }
      if (step === idx) {
        s.status = "current";
      }
      if (step < idx) {
        s.status = "upcoming";
      }
      return s;
    });
    setStepState(updatedSteps);
    setCurrentStep(step);
  };

  return (
    <FestivalProvider>
      <div className="bg-gray-50 h-full py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-2">
        <div className="relative max-w-xl mx-auto">
          <svg
            className="absolute left-full transform translate-x-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            />
          </svg>
          <svg
            className="absolute right-full bottom-0 transform -translate-x-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-600"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            />
          </svg>
          <div className="text-center flex items-center justify-center mb-2">
            <Link to="/festival">
              <img
                alt="featival building"
                src={FestivalBuilding}
                className=" max-w-xs sm:max-w-md"
              />
            </Link>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight  text-teal-brand sm:text-5xl">
              <span className="text-orange-brand">Ilkley</span> Chess Festival
            </h1>
            <p className="mt-4 text-lg leading-6 text-blue-brand font-bold">
              Entry form
            </p>
          </div>

          <Steps {...{ stepState }} />

          {currentStep === ONE_ACCOUNT_INFO && (
            <AccountInfo {...{ handleUpdateStep, setPotentialPlayer, setGlobalFormState, globalFormState, dispatch }} />
          )}
          {currentStep === TWO_ENTRY_DETAILS && (
            <EntryInfo {...{ handleUpdateStep, potentialPlayer, setGlobalFormState, globalFormState, dispatch }} />
          )}
          {currentStep === THREE_CONFIRM_INFO && (
            <ConfirmInfo {...{ handleUpdateStep, globalFormState, dispatch }} />
          )}
          {currentStep === FOUR_PASSWORD_INPUT && !globalFormState.existingUser && (
            <CreatePasswordForm {...{ handleUpdateStep, setGlobalFormState, globalFormState, dispatch }} />
          )}
          {currentStep === FIVE_CONFIRM_EMAIL_CODE && !globalFormState.existingUser && (
            <ConfirmationAccountEmail {...{ handleUpdateStep, setGlobalFormState, globalFormState, dispatch }} />
          )}

        </div>
      </div>
    </FestivalProvider>
  );
}

export default FestivalRegister;

const AccountInfo = ({
  handleUpdateStep,
  setPotentialPlayer,
  setGlobalFormState,
  globalFormState,
  dispatch
}) => {

  const [signInFlow, setSignInFlow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const switchToSignIn = () => {
    setSignInFlow(true);
  }

  async function handleSubmit(event) {
    setError(true);
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const formIsValid = Object.values(fieldValues).every(
      (value) => !getFieldError(value),
    );

    if (formIsValid) {
      setGlobalFormState((s) => ({
        ...s,
        ...fieldValues
      }));

      const response = await getECFPlayer(
        `${fieldValues.firstName} ${fieldValues.lastName}`
      );
      if (response?.success) {
        setPotentialPlayer(response.players);
      } else {
        console.log(response);
      }
      setIsLoading(false);
      handleUpdateStep(TWO_ENTRY_DETAILS);
    } else {
      setIsLoading(false);
      setError(true);
    }
  }


  const SignUpFlow = () => {
    return (<form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
      <div>
        <label
          htmlFor="first-name"
          className="block text-sm font-medium text-blue-brand"
        >
          First name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="firstName"
            id="firstName"
            autoComplete="given-name"
            required
            className="py-3 px-4 block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="last-name"
          className="block text-sm font-medium text-blue-brand"
        >
          Last name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="lastName"
            id="lastName"
            autoComplete="family-name"
            className="py-3 px-4 block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-blue-brand"
        >
          Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="py-3 px-4 block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
          />
        </div>

      </div>

      {isError && (
        <div className="sm:col-span-2 mx-auto">
          <span className="text-center items-center font-medium tracking-wide text-red-500 text-xs">
            Oops, please check you have filled out all the fields correctly.
          </span>
        </div>
      )}

      <div className="sm:col-span-2 mt-6">
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          {isLoading ? "Loading..." : "Next"}
        </button>
      </div>
      <div className="sm:col-span-2">
        <Link
          to="/festival"
          className="w-full inline-flex items-center justify-center text-sm text-blue-brand hover:underline"
        >
          back
        </Link>
      </div>
    </form>)
  }

  return (
    <div className="mt-10 mb-20">
      <div className="text-sm text-center font-medium text-blue-brand mb-8">
        Already have an account? <button className="text-teal-600 font-medium hover:underline" onClick={() => switchToSignIn()}>Sign In</button>
      </div>
      {signInFlow ? <SignInFlow
        {...{
          handleUpdateStep,
          setGlobalFormState,
          globalFormState,
          dispatch
        }} /> : <SignUpFlow />}
    </div>
  );
};

const EntryInfo = ({ handleUpdateStep, potentialPlayer, setGlobalFormState, globalFormState }) => {
  const [selectedECFId, setSelectedECFId] = useState(globalFormState.ecfId);
  const [selectedSection, setSelectedSection] = useState(globalFormState.section || "Open");
  const [selectedRoundOne, setSelectedRoundOne] = useState(!!globalFormState?.byes?.find(rd => rd === 1) || false);
  const [selectedRoundTwo, setSelectedRoundTwo] = useState(!!globalFormState?.byes?.find(rd => rd === 2) || false);
  const [selectedRoundThree, setSelectedRoundThree] = useState(!!globalFormState?.byes?.find(rd => rd === 3) || false);
  const [selectedRoundFour, setSelectedRoundFour] = useState(!!globalFormState?.byes?.find(rd => rd === 4) || false);

  const handleNextClick = () => {
    const byes = [];

    if (selectedRoundOne) {
      byes.push(1);
    }

    if (selectedRoundTwo) {
      byes.push(2);
    }

    if (selectedRoundThree) {
      byes.push(3);
    }

    if (selectedRoundFour) {
      byes.push(4);
    }

    setGlobalFormState((s) => ({
      ...s,
      section: selectedSection,
      ecfId: selectedECFId,
      byes: [...byes],
    }));

    handleUpdateStep(THREE_CONFIRM_INFO);
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        {potentialPlayer && potentialPlayer.length > 0 && (
          <div className="sm:col-span-2">
              <RatingRadio {...{ potentialPlayer, setSelectedECFId }} />
          </div>
        )}

        <div className="sm:col-span-1">
          <label
            htmlFor="section"
            className="block text-sm font-medium text-blue-brand"
          >
            Section
          </label>
          <select
            onChange={(e) => setSelectedSection(e.target.value)}
            defaultValue={selectedSection}
            id="section"
            name="section"
            className="mt-1 block w-full text-lg pl-3 pr-10 py-3 text-teal-600 border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md"

          >
            <option>Open</option>
            <option>Major</option>
            <option>Intermediate</option>
            <option>Minor</option>
          </select>
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="ecf-id"
            className="block text-sm font-medium text-blue-brand"
          >
            ECF ID <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="ecf-id"
              id="ecf-id"
              defaultValue={selectedECFId}
              onChange={(e) => setSelectedECFId(e.currentTarget.value)}
              autoComplete="ecf-id"
              className="py-3 px-4 block w-full shadow-sm text-teal-600 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="space-y-5 col-span-1 sm:col-span-2 sm:inline-flex space-x-5">
          <legend className="block text-sm font-medium text-blue-brand">
            Half Point Bye(s){" "}
            <span className="font-normal text-gray-500">(optional)</span>
          </legend>
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                defaultChecked={selectedRoundOne}
                onChange={(e) => setSelectedRoundOne(e.currentTarget.checked)}
                id="round-one"
                name="round-one"
                type="checkbox"
                className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-xs">
              <label htmlFor="comments" className="font-medium text-blue-brand">
                Round 1
              </label>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                defaultChecked={selectedRoundTwo}
                onChange={(e) => setSelectedRoundTwo(e.currentTarget.checked)}
                id="round-two"
                name="round-two"
                type="checkbox"
                className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-xs">
              <label
                htmlFor="candidates"
                className="font-medium text-blue-brand"
              >
                Round 2
              </label>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                defaultChecked={selectedRoundThree}
                onChange={(e) => setSelectedRoundThree(e.currentTarget.checked)}
                id="round-three"
                name="round-three"
                type="checkbox"
                className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-xs">
              <label htmlFor="offers" className="font-medium text-blue-brand">
                Round 3
              </label>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                defaultChecked={selectedRoundFour}
                onChange={(e) => setSelectedRoundFour(e.currentTarget.checked)}
                id="round-four"
                name="round-four"
                type="checkbox"
                className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-xs">
              <label htmlFor="offers" className="font-medium text-blue-brand">
                Round 4
              </label>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <button
            onClick={() => handleNextClick()}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Next
          </button>
        </div>
        <div className="sm:col-span-2">
          <button
            onClick={() => handleUpdateStep(ONE_ACCOUNT_INFO)}
            className="w-full inline-flex items-center justify-center text-sm text-blue-brand hover:underline"
          >
            back
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmInfo = ({ handleUpdateStep, globalFormState }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div className="sm:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-blue-brand">
                Entry
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-blue-brand sm:mt-0 sm:col-span-2">
                    {globalFormState.firstName} {globalFormState.lastName}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email Address
                  </dt>
                  <dd className="mt-1 text-sm text-blue-brand sm:mt-0 sm:col-span-2">
                    {globalFormState.email}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Section</dt>
                  <dd className="mt-1 text-sm text-blue-brand sm:mt-0 sm:col-span-2">
                    {globalFormState.section}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    ECF Id
                  </dt>
                  <dd className="mt-1 text-sm text-blue-brand sm:mt-0 sm:col-span-2">
                    {globalFormState.ecfId}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Byes</dt>
                  <dd className="mt-1 text-sm text-blue-brand sm:mt-0 sm:col-span-2">
                    {globalFormState.byes.join(", ")}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="text-6xl text-center text-blue-brand font-bold mt-4">
            £{globalFormState.price} <span className="text-xs -ml-3 text-gray-400">entry fee</span>
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-start text-center">
            <div className="flex-shrink-0">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? "bg-teal-600" : "bg-gray-200",
                  "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? "translate-x-5" : "translate-x-0",
                    "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  )}
                />
              </Switch>
            </div>
            <div className="ml-3">
              <p className="mt-1 text-sm text-blue-brand">
                By selecting this, you agree to the{" "}
                <a
                  href="/"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Terms &#x26; Conditions
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <button
            onClick={() => handleUpdateStep(FOUR_PASSWORD_INPUT)}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Confirm
          </button>
        </div>
        <div className="sm:col-span-2">
          <button
            onClick={() => handleUpdateStep(TWO_ENTRY_DETAILS)}
            className="w-full inline-flex items-center justify-center text-sm text-blue-brand hover:underline"
          >
            back
          </button>
        </div>
      </div>
    </div>
  );
};

const Steps = ({ stepState }) => {
  const steps = stepState;

  return (
    <nav aria-label="Progress">
      <ol className="relative rounded-md mx-auto flex md:divide-y-0">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative md:flex-1 md:flex">
            {step.status === "complete" ? (
              <div className="group flex items-center w-full">
                <span className="px-1 sm:px-6 py-4 flex items-center text-sm font-medium">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-teal-600 rounded-full group-hover:bg-teal-800">
                    <CheckIcon
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-2 sm:ml-4 text-xs sm:text-sm font-medium text-teal-600">
                    {step.name}
                  </span>
                </span>
              </div>
            ) : step.status === "current" ? (
              <div className="group flex items-center">
                <span
                  className="px-1 sm:px-6 py-4 flex items-center text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-teal-600 rounded-full">
                    <span className="text-teal-600">{step.id}</span>
                  </span>
                  <span className="ml-2 sm:ml-4 text-xs sm:text-sm font-medium text-teal-600">
                    {step.name}
                  </span>
                </span>
              </div>
            ) : (
              <div className="group flex items-center">
                <span className="px-1 sm:px-6 py-4 flex items-center text-sm font-medium">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                    <span className="text-gray-500 group-hover:text-gray-900">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-2 sm:ml-4 text-xs sm:text-sm font-medium text-gray-500 group-hover:text-gray-900">
                    {step.name}
                  </span>
                </span>
              </div>
            )}

            {stepIdx !== steps.length - 1 && (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className="hidden md:block absolute top-0 right-0 h-full w-5"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-teal-brand"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

const RatingRadio = ({ potentialPlayer, setSelectedECFId }) => {
  const [selected, setSelected] = useState("");
  const handleSelected = (s) => {
    setSelected(s);
    setSelectedECFId(s);
  };

  return (
    <RadioGroup value={selected} onChange={handleSelected}>
      <RadioGroup.Label className="block text-sm font-medium text-blue-brand mb-2">
        Quick ECF search{" "}
        <span className="font-normal text-gray-500">(select if relevant)</span>
      </RadioGroup.Label>
      <div className="bg-white rounded-md -space-y-px max-h-60 overflow-y-scroll">
        {potentialPlayer.map((player, playerIdx) => (
          <RadioGroup.Option
            key={playerIdx}
            value={player.ECF_code}
            className={({ checked }) =>
              classNames(
                playerIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                playerIdx === potentialPlayer.length - 1
                  ? "rounded-bl-md rounded-br-md"
                  : "",
                checked ? "bg-teal-50 border-teal-200 z-10" : "border-gray-200",
                "relative border p-4 flex cursor-pointer focus:outline-none"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={classNames(
                    checked
                      ? "bg-teal-600 border-transparent"
                      : "bg-white border-gray-300",
                    active ? "ring-2 ring-offset-2 ring-teal-500" : "",
                    "h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center"
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <div className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={classNames(
                      checked ? "text-teal-900" : "text-gray-900",
                      "block text-sm font-medium"
                    )}
                  >
                    {player.full_name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={classNames(
                      checked ? "text-teal-700" : "text-gray-500",
                      "block text-sm"
                    )}
                  >
                    <div className="flex gap-2 w-fill text-blue-brand font-medium">
                      {player.club_name && (
                        <div>
                          Club:{" "}
                          <span className="font-normal">
                            {player.club_name}
                          </span>
                        </div>
                      )}
                      {player.category && (
                        <div>
                          Membership:{" "}
                          <span className="font-normal">{player.category}</span>
                        </div>
                      )}
                      {player.date_last_game && (
                        <div>
                          Last Game:{" "}
                          <span className="font-normal">
                            {moment(player.date_last_game).format("Do MMM YY")}
                          </span>
                        </div>
                      )}
                    </div>
                  </RadioGroup.Description>
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

const CreatePasswordForm = ({ handleUpdateStep, globalFormState, dispatch }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {

    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const formIsValid = Object.values(fieldValues).every(
      (value) => !getFieldError(value),
    );
    const passwordValid = formIsValid && (fieldValues.password !== fieldValues.passwordConfirm);

    if (passwordValid) {
      const user = await signUpUser(dispatch,
        globalFormState.email,
        fieldValues.password,
        globalFormState.firstName,
        globalFormState.lastName
      );
      if (user) {
        handleUpdateStep(FIVE_CONFIRM_EMAIL_CODE);
      }
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-10">
      <div className="text-sm text-center font-medium text-blue-brand mb-8">
        Create your password for your account entry
      </div>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div className="sm:col-span-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-blue-brand"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="email"
              required
              className="py-3 px-4 block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="password_confirm"
            className="block text-sm font-medium text-blue-brand"
          >
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="password_confirm"
              name="password_confirm"
              type="password"
              autoComplete="email"
              required
              className="py-3 px-4 block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
            />
          </div>

        </div>
        {isError && (
          <div className="sm:col-span-2 mt-10">
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              The passwords must match. Please use at least 1 number and 1 upper case letter.
            </span>
          </div>
        )}
        <div className="sm:col-span-2 mt-10">
          <button
            disabled={isLoading}
            type="submit"
            className={classNames(isLoading && "disabled", " w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500")}
          >
            {isLoading ? "Loading..." : "Create"}
          </button>
        </div>
        <div>

        </div>
        <div className="sm:col-span-2">
          <button
            onClick={() => handleUpdateStep(THREE_CONFIRM_INFO)}
            className="w-full inline-flex items-center justify-center text-sm text-blue-brand hover:underline"
          >
            back
          </button>
        </div>
      </div>
    </form>
  )
}

const ConfirmationAccountEmail = ({ handleUpdateStep, globalFormState, dispatch }) => {

  const stripe = useStripe();
  const { eventId, loadingEvent } = useFestivalContext()
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const formIsValid = Object.values(fieldValues).every(
      (value) => !getFieldError(value),
    );

    if (formIsValid) {

      console.log(globalFormState.email, fieldValues.code);

      const response = await confirmEmail(dispatch, globalFormState.email, fieldValues.code);
      if (response) {
        const result = await register(eventId, stripe);
      }
    } else {
      setIsError(true);
      console.log("form not valid");
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-10">
      <div className="text-sm text-center font-medium text-blue-brand mb-8">
        Sorry, last thing. We've sent you a confirmation code. Grab that from your email and paste here!
      </div>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div className="sm:col-span-2">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-blue-brand"
          >
            Confirmation Code
          </label>
          <div className="mt-1">
            <input
              id="code"
              name="code"
              type="code"
              autoComplete="email"
              required
              className="py-3 px-4 block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
            />
          </div>
          {isError && (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              Something went wrong. This code isn't accepted.
            </span>
          )}
        </div>

        <div className="sm:col-span-2 mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className={classNames(isLoading && "disabled", " w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500")}
          >
            {isLoading ? "Loading..." : "Pay"}
          </button>
        </div>
        <div>

        </div>
        <div className="sm:col-span-2">
          <button
            onClick={() => handleUpdateStep(FOUR_PASSWORD_INPUT)}
            className="w-full inline-flex items-center justify-center text-sm text-blue-brand hover:underline"
          >
            back
          </button>
        </div>
      </div>
    </form>
  )
}

/**
 * EXISTING USER FLOW
 */
const SignInFlow = ({ handleUpdateStep, setGlobalFormState, globalFormState, dispatch }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const formIsValid = Object.values(fieldValues).every(
      (value) => !getFieldError(value),
    );

    if (!formIsValid) {
      setError(true);
      return;
    }

    setError(false);
    setIsLoading(true);
    const loggedInUser = await loginUser(dispatch, fieldValues.email, fieldValues.password);
    if (loggedInUser) {
      const member = await getMemberBySub(loggedInUser.attributes.sub);
      const sectionChecker = (rating) => {
        switch (rating) {
          case rating <= 1500:
            return "Minor";
          case rating <= 1750:
            return "Intermediate";
          case rating <= 2000:
            return "Major";
          case rating > 2000:
            return "Open";
          default:
            return "Open"
        }
      }
      setGlobalFormState(s => {
        return {
          ...s,
          firstName: loggedInUser.attributes.given_name,
          lastName: loggedInUser.attributes.family_name,
          ecfId: member.ecfId,
          ecfRating: member.ecfRating,
          email: member.email,
          existingUser: true,
          section: sectionChecker(Number(member.ecfRating))
        }
      });
      handleUpdateStep(TWO_ENTRY_DETAILS);
    } else {
      setError(true);
    }
    setIsLoading(false);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-10">
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-blue-brand"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="py-3 px-4 block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-blue-brand"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="email"
              required
              className="py-3 px-4 block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
            />
          </div>
        </div>
        {isError && (
          <div className="sm:col-span-2 mt-10">
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              Oops, something went wrong. Please make sure your login details are correct.
            </span>
          </div>
        )}
        <div className="sm:col-span-2 mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={classNames(isLoading && "disabled", " w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500")}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
        <div className="sm:col-span-2">
          <Link
            to="/festival"
            className="w-full inline-flex items-center justify-center text-sm text-blue-brand hover:underline"
          >
            back
          </Link>
        </div>
      </div>
    </form>)
}


const register = async (eventId, stripe, section) => {
  try {
    const redirectTo = `${window.location.origin}/festival`;
    const { sessionId } = await API.post("public", "/event/register", {
      body: {
        eventId,
        section,
        successUrl: redirectTo,
        cancelUrl: redirectTo,
      },
    });
    await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
    console.log(error);
  }
};