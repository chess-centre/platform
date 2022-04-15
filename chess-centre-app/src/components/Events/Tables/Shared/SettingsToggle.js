import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings({ name, setEnabled, enabled }) {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch.Label as="span" className="mx-2 mr-3">
        <span className="text-xs font-medium text-gray-400">
          {name}
        </span>
      </Switch.Label>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-4 w-8 cursor-pointer"
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bg-cool-gray-800 w-full h-full rounded-md"
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "bg-cool-gray-900" : "bg-cool-gray-900",
            "pointer-events-none absolute h-3 w-8 mx-auto rounded-full transition-colors ease-in-out duration-200"
          )}
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none absolute left-0 inline-block h-4 w-4 border border-gray-200 rounded-full bg-cool-gray-800 shadow transform ring-0 transition-transform ease-in-out duration-200"
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
