import React from "react";
import { CheckIcon, ThumbUpIcon, CakeIcon } from '@heroicons/react/solid'

const timeline = [
  {
    id: 1,
    content: 'We open our doors for the',
    target: 'Grand Opening',
    href: '#',
    date: 'May 18',
    datetime: '2021-05-18',
    icon: CakeIcon,
    iconBackground: 'bg-orange-brand',
  },
  {
    id: 2,
    content: 'Our first',
    target: 'Junior Coaching Club',
    href: '#',
    date: 'May 18',
    datetime: '2021-05-18',
    icon: CheckIcon,
    iconBackground: 'bg-teal-500',
  },
  {
    id: 3,
    content: 'Our first',
    target: 'Social Night',
    href: '#',
    date: 'May 20',
    datetime: '2021-05-20',
    icon: CheckIcon,
    iconBackground: 'bg-teal-500',
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const CentreRoadmap = () => {
  return (
    <div className="flow-root mt-6  mr-0 sm:mr-10">
      <ul className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      event.iconBackground,
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}
                  >
                    <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      {event.content}{' '}
                      <a href={event.href} className="font-medium text-gray-900">
                        {event.target}
                      </a>
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={event.datetime}>{event.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
