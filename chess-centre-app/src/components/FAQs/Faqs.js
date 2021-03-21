import React from "react";

const data = [
  {
    question: "Do I need a chess grade to participate in an event?",
    answer:
      "Nope. Anyone can register to play in our events, we try to skill match players so the games are hard fought and competitive!",
  },
  {
    question: "Do I need to be a member to join an event?",
    answer:
      "Our members get first pick on our upcoming events. Our venue is relatively small so we may not have capacity to offer entry to non-members.",
  },
  {
    question: "Can I just turn up to for a casual game?",
    answer:
      "Absolutely! We will be running all kinds of events but our Thursday Club night will be the best time to just come done and see what is going on.",
  },
  {
    question: "Will my games be FIDE rated?",
    answer:
      "Not initially, this requires a registered FIDE Arbiter to officiate the games. We do plan to visit this in the near future to provide more to our members.",
  },
  {
    question: "What if I am unable to make an event I am registered for?",
    answer:
      `We know at times things won't always go to plan. No problem, 
      <a class="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline" href="mailto:support@chesscentre.online">send us a message</a> 
      and we'll do our best to re-work our event.`,
  }
];

function FAQs({ questions }) {
  if (!questions) questions = data;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Frequently asked questions
        </h2>
        <div className="mt-12">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
            {questions.map(({ question, answer }) => {
              return (
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    <span dangerouslySetInnerHTML={{ __html: question }}></span>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500"><span dangerouslySetInnerHTML={{ __html: answer }}></span></dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
