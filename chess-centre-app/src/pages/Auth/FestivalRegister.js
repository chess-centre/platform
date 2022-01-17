import React, { useState } from "react";
import { Link } from "react-router-dom";
import ValidateEmail from "../../utils/ValidateEmail";
import { CheckIcon } from "@heroicons/react/solid";
import Logo from "../../assets/img/logo.svg";
import { Switch, RadioGroup } from "@headlessui/react";
import { getECFPlayer } from "../../api/profile/chess";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function FestivalRegister(props) {
  const [potentialPlayer, setPotentialPlayer] = useState([]);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    ecfId: "",
    section: "",
    byes: [],
    price: "30"
  });

  const [stepState, setStepState] = useState([
    { id: "01", name: "Account info", href: "#", status: "current" },
    { id: "02", name: "Entry details", href: "#", status: "upcoming" },
    { id: "03", name: "Payment", href: "#", status: "upcoming" },
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
    <div className="bg-gray-50 h-full py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
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
          <img alt="logo" src={Logo} className="max-h-32" />
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
        {currentStep === 0 && (
          <AccountInfo {...{ handleUpdateStep, setPotentialPlayer, setFormState }} />
        )}
        {currentStep === 1 && (
          <EntryInfo {...{ handleUpdateStep, potentialPlayer, setFormState }} />
        )}
        {currentStep === 2 && <ConfirmInfo {...{ handleUpdateStep, formState }} />}
      </div>
    </div>
  );
}

export default FestivalRegister;

const AccountInfo = ({ handleUpdateStep, setPotentialPlayer, setFormState }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountEmail, setAccountEmail] = useState("");
  const [isEmailError, setEmailError] = useState(false);

  const [accountFirstName, setAccountFirstName] = useState("");
  const [isFirstNameError, setFirstNameError] = useState(false);

  const [accountLastName, setAccountLastName] = useState("");
  const [isLastNameError, setLastNameError] = useState(false);

  const isValid = () => {

    let valid = true;

    if (!accountEmail) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!accountFirstName) {
      setFirstNameError(true);
      valid = false;
    } else {
      setFirstNameError(false);
    }

    if (!accountLastName) {
      setLastNameError(true);
      valid = false;
    } else {
      setLastNameError(false);
    }

    if(!ValidateEmail(accountEmail)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    return valid;
  };

  const handleNextClick = async () => {
    setIsLoading(true);
    if (!isValid()) {
      setIsLoading(false);
      return;
    } 
    const response = await getECFPlayer(
      `${accountFirstName} ${accountLastName}`
    );
    if (response?.success) {
      setPotentialPlayer(response.players);
    }

    setFormState(s => ({
      ...s,
      firstName: accountFirstName,
      lastName: accountLastName,
      email: accountEmail
    }));

    setIsLoading(false);
    handleUpdateStep(1);
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
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
              name="first-name"
              id="first-name"
              onChange={(event) =>
                setAccountFirstName(event.currentTarget.value)
              }
              autoComplete="given-name"
              required
              className="py-3 px-4 block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
            />
          </div>
          {isFirstNameError && (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              Invalid first name field
            </span>
          )}
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
              name="last-name"
              id="last-name"
              autoComplete="family-name"
              required
              onChange={(event) =>
                setAccountLastName(event.currentTarget.value)
              }
              className="py-3 px-4 block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
            />
          </div>
          {isLastNameError && (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              Invalid last name field
            </span>
          )}
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
              onChange={(event) => setAccountEmail(event.currentTarget.value)}
              autoComplete="email"
              required
              className="py-3 px-4 block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
            />
          </div>
          {isEmailError && (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              Invalid email field
            </span>
          )}
        </div>

        <div className="sm:col-span-2 mt-10">
          <button
            onClick={handleNextClick}
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
      </div>
    </div>
  );
};

const EntryInfo = ({ handleUpdateStep, potentialPlayer, setFormState }) => {
  const [selectedECFId, setSelectedECFId] = useState("");
  const [selectedSection, setSelectedSection] = useState("Open");
  const [selectedRoundOne, setSelectedRoundOne] = useState(false);
  const [selectedRoundTwo, setSelectedRoundTwo] = useState(false);
  const [selectedRoundThree, setSelectedRoundThree] = useState(false);
  const [selectedRoundFour, setSelectedRoundFour] = useState(false);


  const handleNextClick = () => {
    const byes = [];

    if(selectedRoundOne) {
      byes.push(1);
    }

    if(selectedRoundTwo) {
      byes.push(2);
    }

    if(selectedRoundThree) {
      byes.push(3);
    }

    if(selectedRoundFour) {
      byes.push(4)
    }

    setFormState(s => ({
      ...s,
      section: selectedSection,
      ecfId: selectedECFId,
      byes: [...byes]
    }))

    handleUpdateStep(2)

  }


  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div className="sm:col-span-2">
          <RatingRadio {...{ potentialPlayer, setSelectedECFId }} />
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="section"
            className="block text-sm font-medium text-blue-brand"
          >
            Section
          </label>
          <select
            onChange={e => setSelectedSection(e.target.value)}
            id="section"
            name="section"
            className="mt-1 block w-full text-lg pl-3 pr-10 py-3 text-teal-600 border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md"
            defaultValue="Open"
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
              value={selectedECFId}
              defaultValue={selectedECFId}
              onChange={(e) => setSelectedECFId(e.currentTarget.value)}
              autoComplete="ecf-id"
              className="py-3 px-4 block w-full shadow-sm text-teal-600 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="space-y-5 sm:col-span-2 inline-flex space-x-5">
          <legend className="block text-sm font-medium text-blue-brand">
            Half Point Bye(s){" "}
            <span className="font-normal text-gray-500">(optional)</span>
          </legend>
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                value={selectedRoundOne}
                defaultValue={selectedRoundOne}
                onChange={(e) => setSelectedRoundOne(e.currentTarget.checked)}
                id="round-one"
                name="round-one"
                type="checkbox"
                className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="comments" className="font-medium text-blue-brand">
                Round 1
              </label>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                value={selectedRoundTwo}
                defaultValue={selectedRoundTwo}
                onChange={(e) => setSelectedRoundTwo(e.currentTarget.checked)}
                id="round-two"
                name="round-two"
                type="checkbox"
                className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="candidates" className="font-medium text-blue-brand">
                Round 2
              </label>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                value={selectedRoundThree}
                defaultValue={selectedRoundThree}
                onChange={(e) => setSelectedRoundThree(e.currentTarget.checked)}
                id="round-three"
                name="round-three"
                type="checkbox"
                className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="offers" className="font-medium text-blue-brand">
                Round 3
              </label>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                value={selectedRoundFour}
                defaultValue={selectedRoundFour}
                onChange={(e) => setSelectedRoundFour(e.currentTarget.checked)}
                id="round-four"
                name="round-four"
                type="checkbox"
                className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
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
            onClick={() => handleUpdateStep(0)}
            className="w-full inline-flex items-center justify-center shadow-sm text-sm text-blue-brand hover:underline"
          >
            back
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmInfo = ({ handleUpdateStep, formState }) => {
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
                    { formState.firstName }{" "}{ formState.lastName }
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email Address
                  </dt>
                  <dd className="mt-1 text-sm text-blue-brand sm:mt-0 sm:col-span-2">
                    { formState.email }
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Section</dt>
                  <dd className="mt-1 text-sm text-blue-brand sm:mt-0 sm:col-span-2">
                   { formState.section }
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    ECF Rating
                  </dt>
                  <dd className="mt-1 text-sm text-blue-brand sm:mt-0 sm:col-span-2">
                    { formState.ecfId }
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Byes
                  </dt>
                  <dd className="mt-1 text-sm text-blue-brand sm:mt-0 sm:col-span-2">
                    { formState.byes.join(", ") }
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="text-6xl text-center text-blue-brand font-bold mt-4"></div>
          <div className="text-6xl text-center text-blue-brand font-bold mt-4">
            £{ formState.price }
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
                <a href="/" className="font-medium text-teal-700 hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/" className="font-medium text-teal-700 hover:underline">
                  Terms &#x26; Conditions
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <button
            onClick={() => handleUpdateStep(3)}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Pay
          </button>
        </div>
        <div className="sm:col-span-2">
          <button
            onClick={() => handleUpdateStep(1)}
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
      <ol className="border bg-gray-50 rounded-md divide-y divide-teal-600 md:flex md:divide-y-0">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative md:flex-1 md:flex">
            {step.status === "complete" ? (
              <div className="group flex items-center w-full">
                <span className="px-6 py-4 flex items-center text-sm font-medium">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-teal-600 rounded-full group-hover:bg-teal-800">
                    <CheckIcon
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium text-teal-600">
                    {step.name}
                  </span>
                </span>
              </div>
            ) : step.status === "current" ? (
              <div
                className="px-6 py-4 flex items-center text-sm font-medium"
                aria-current="step"
              >
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-teal-600 rounded-full">
                  <span className="text-teal-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-teal-600">
                  {step.name}
                </span>
              </div>
            ) : (
              <div className="group flex items-center">
                <span className="px-6 py-4 flex items-center text-sm font-medium">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                    <span className="text-gray-500 group-hover:text-gray-900">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                    {step.name}
                  </span>
                </span>
              </div>
            )}

            {stepIdx !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className="hidden md:block absolute top-0 right-0 h-full w-5"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-gray-400"
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
            ) : null}
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
        Quick search (select if relevant)
      </RadioGroup.Label>
      <div className="bg-white rounded-md -space-y-px">
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
                    {player.club_name}
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
