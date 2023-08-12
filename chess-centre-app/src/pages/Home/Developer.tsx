import React, { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import FooterLanding from "../../components/Footer/LandingFooter";
import LandingNav from "../../components/Navigation/LandingNav";
import { useEventsLite } from "../../context/EventHook";
import moment from "moment";
import { Switch } from "@headlessui/react";
import "swagger-ui-react/swagger-ui.css";
import "../../assets/css/swagger-custom.css";
import { classNames } from "../../utils/Classes";

const Developer = () => {
  document.title = "Sheffield Chess Centre | Developer";

  const { isLoading, error, data } = useEventsLite();
  const [eventUrl, setEventUrl] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");
  const [embedCode, setEmbedCode] = useState<string>("");
  const [enabledLogo, setEnabledLogo] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);
  const [bgColor, setBgColor] = useState("Gray");

  useEffect(() => {
    if (data) {
      const defaultEvent = data[0];
      setEventUrl(
        `/widgets/event/${defaultEvent.id}?logo=${enabledLogo}&bgColor=${bgColor}&darkTheme=${darkTheme}`
      );
      setEventId(defaultEvent.id);
      setEmbedCode(
        getEmbedHTML({
          eventId: defaultEvent.id,
          bgColor,
          enabledLogo,
          darkTheme,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleEventSelect = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const eventId = optionElement.getAttribute("id");
    setEventUrl(
      `/widgets/event/${eventId}?logo=${enabledLogo}&bgColor=${bgColor}&darkTheme=${darkTheme}`
    );
    setEventId(eventId);
    setEmbedCode(getEmbedHTML({ eventId, bgColor, enabledLogo, darkTheme }));
  };

  const handleSelectColor = (colour) => {
    setBgColor(colour);
    setEventUrl(
      `/widgets/event/${eventId}?logo=${enabledLogo}&bgColor=${colour}&darkTheme=${darkTheme}`
    );
    setEmbedCode(
      getEmbedHTML({ eventId, bgColor: colour, enabledLogo, darkTheme })
    );
  };

  const handleLogoToggle = (enabled) => {
    setEnabledLogo(enabled);
    setEventUrl(
      `/widgets/event/${eventId}?logo=${enabled}&bgColor=${bgColor}&darkTheme=${darkTheme}`
    );
    setEmbedCode(
      getEmbedHTML({ eventId, bgColor, enabledLogo: enabled, darkTheme })
    );
  };

  const handleThemeToggle = (darkEnabled) => {
    setDarkTheme(darkEnabled);
    setEventUrl(
      `/widgets/event/${eventId}?logo=${enabledLogo}&bgColor=${bgColor}&darkTheme=${darkEnabled}`
    );
    setEmbedCode(
      getEmbedHTML({ eventId, bgColor, enabledLogo, darkTheme: darkEnabled })
    );
  };

  const getEmbedHTML = ({
    eventId,
    bgColor = "Gray",
    enabledLogo = true,
    darkTheme = false,
    width = 300,
    height = 600,
  }) => {
    const url = `https://chesscentre.online/widgets/event/${eventId}?logo=${enabledLogo}&bgColor=${bgColor}&darkTheme=${darkTheme}`;
    return `<iframe frameBorder="0" title="The Chess Centre" src="${url}" width="${width}" height="${height}"/>`;
  };

  return (
    <div>
      <div className="bg-white">
        <div className="relative bg-gray-50 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
          <LandingNav />
        </div>
        <div className="bg-white">
          <div className="relative">
            <svg
              className="hidden xl:block absolute top-0 right-0 md:-mr-32 2xl:-mr-4"
              width="500"
              height="300"
              fill="none"
              viewBox="0 0 500 300"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-100"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="500"
                height="300"
                fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
              />
            </svg>

            <svg
              className="hidden md:block absolute top-32 left-0 md:-ml-32 2xl:-ml-4"
              width="500"
              height="300"
              fill="none"
              viewBox="0 0 500 270"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-100"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="500"
                height="280"
                fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
              />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-28 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-yellow-500 tracking-wide uppercase">
                Developer
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Building the future
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Providing the tools to make chess events more accessible
              </p>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-50 mt-10">
          <div className="max-w-7xl mx-auto">
            <div className="mt-10 py-6 px-10 sm:px-32">
              <h2 className="text-base font-semibold text-yellow-500 tracking-wide uppercase">
                Widgets
              </h2>
              {!isLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-3 mt-4">
                  <div className="prose text-sm">
                    <p>Advertise one of our chess events, anywhere!</p>
                    <p>
                      Select from the below configuration and simply paste the
                      generated code into your website or blog.
                    </p>
                    <div>
                      <label
                        htmlFor="events"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Select Event
                      </label>
                      <div className="mt-2 sm:col-span-2">
                        <select
                          onChange={(event) => handleEventSelect(event)}
                          id="events"
                          name="events"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 max-w-xs text-sm"
                        >
                          {data.map((event) => (
                            <option
                              key={event.id}
                              id={event.id}
                              className="hover:bg-gray-200"
                            >
                              {event.name}{" "}
                              {moment(event.startDate).format("MMM Do, yyyy")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <label
                        htmlFor="colour"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Background Colour
                      </label>
                      <div className="mt-2 sm:col-span-2">
                        {!isLoading && !error && (
                          <select
                            onChange={(event) =>
                              handleSelectColor(event.target.value)
                            }
                            id="colour"
                            name="colour"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 max-w-xs text-sm"
                          >
                            <option>Gray</option>
                            <option>White</option>
                            <option>Black</option>
                            <option>Teal</option>
                          </select>
                        )}
                      </div>
                    </div>
                    <div className="pt-4">
                      <LogoToggle
                        enabled={enabledLogo}
                        setEnabled={handleLogoToggle}
                      />
                    </div>
                    <div className="pt-4">
                      <ThemeToggle
                        enabled={darkTheme}
                        setEnabled={handleThemeToggle}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="sm:px-4 mt-6 sm:mt-0">
                      <div className="mt-1 sm:col-span-2">
                        <textarea
                          id="embed"
                          name="embed"
                          rows={6}
                          className="block w-full max-w-lg rounded-md text-black border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 text-xs"
                          defaultValue={embedCode}
                        />
                      </div>
                      <label
                        htmlFor="embed"
                        className="block text-xs font-medium text-gray-500 sm:mt-px"
                      >
                        Generated Embed Code
                      </label>
                    </div>
                  </div>
                  <div className="sm:-mt-6 mt-4">
                    <h2 className="text-md text-gray-900 sm:tracking-tight">
                      Example output:
                    </h2>
                    {eventUrl && (
                      <iframe
                        title="Event Widget"
                        src={eventUrl}
                        width={300}
                        height={600}
                      />
                    )}
                  </div>
                </div>
              )}
              { isLoading && <div>Loading...</div> }
              { error && <div>Oops, an error occurred</div> }
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="py-2 sm:px-32">
            <SwaggerUI url="/swagger.json" />
          </div>
        </div>

        <FooterLanding />
      </div>
    </div>
  );
};

export default Developer;

function LogoToggle({ enabled, setEnabled }) {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-yellow-500" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">Show Logo</span>
      </Switch.Label>
    </Switch.Group>
  );
}

function ThemeToggle({ enabled, setEnabled }) {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-yellow-500" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">Dark Theme</span>
      </Switch.Label>
    </Switch.Group>
  );
}
