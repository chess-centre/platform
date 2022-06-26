import React, { Link } from "react-router-dom";
import moment from "moment";
const TOPIC = {
  BEGINNERS: "beginners",
  RATING: "rating",
  GAMES: "games",
  MEMBERSHIP: "membership",
  GENERAL: "general",
  JUNIORS: "juniors",
  COACHING: "coaching",
  EVENTS: "events",
};
const TYPE = {
  INTERNAL: "internal",
  PUBLIC: "public",
};

export const faqData = (type) =>
  [
    {
      question: `Do you teach beginners?`,
      Answer: () => (
        <span>
          Yes, absolutely! We welcome anyone to come visit us on our{" "}
          <Link
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            to={`/events/club`}
          >
            Thursday club night
          </Link>
          , here we can show you the basics and go from there! Alternatively, we
          also have our{" "}
          <Link
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            to={`/events/junior-club`}
          >
            Junior Club
          </Link>{" "}
          for children aged 6 to 16.
        </span>
      ),
      tags: [TOPIC.BEGINNERS],
      type: TYPE.PUBLIC,
    },
    {
      question: `Do I need a chess rating to participate in an event?`,
      Answer: () => (
        <span>
          No. Anyone can register to play in our events, we try to skill match
          players so the games are hard fought and competitive. Most of our
          events will be ECF rated so once you've played a few official games
          you'll get a rating.
        </span>
      ),
      tags: [TOPIC.RATING],
      type: TYPE.PUBLIC,
    },
    {
      question: `Do I need to be a member to play in an event?`,
      Answer: () => (
        <span>
          No. All our events are open for all to join, register your free account to the sign up for any of our published{" "}
          <Link
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            to={`/events`}
          >events</Link>
        </span>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: TYPE.PUBLIC,
    },
    {
      question: `Can I just turn up to for a casual game?`,
      Answer: () => (
        <span>
          Absolutely! We will be running all kinds of events but our{" "}
          <Link
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            to="/events/club"
          >
            Thursday club night
          </Link>{" "}
          will be the best time to just come down, have a drink and see what is
          going on. There is no charge or expectation to sign-up for your first
          few visits
        </span>
      ),
      tags: [TOPIC.RATING],
      type: TYPE.PUBLIC,
    },
    {
      question: `Will my games be FIDE rated?`,
      Answer: () => (
        <span>
          Not initially, this requires a registered FIDE Arbiter to officiate
          the games. We do plan to visit this in the near future to provide more
          to our members.
        </span>
      ),
      tags: [TOPIC.RATING],
      type: TYPE.PUBLIC,
    },
    {
      question: `What if I am unable to make an event I am registered for?`,
      Answer: () => (
        <span>
          We know at times things won't always go to plan. No problem,{" "}
          <a
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            href="mailto:support@chesscentre.online"
          >
            send us a message
          </a>{" "}
          and we'll do our best to re-work our event.
        </span>
      ),
      tags: [TOPIC.RATING],
      type: TYPE.PUBLIC,
    },
    {
      question: `Can I pay my membership annually?`,
      Answer: () => (
        <span>
          Sure! This functionality is not yet available via our website but talk
          to us when you are next in the club and we will process this for you.
        </span>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: TYPE.PUBLIC,
    },
    {
      question: `Do you offer any discounts?`,
      Answer: () => (
        <span>
          To provide the absolute best value whilst ensuring your whole
          experience is a great one we continually review our offering and
          pricing. This means we offer special discounts to students, senior
          citizens and family memberships. Being part of The Chess Centre is
          about being part of a wider community who supports the growth of
          Chess.
        </span>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: TYPE.PUBLIC,
    },
    {
      question: `Do I need to sign up before coming down to the Junior Club?`,
      Answer: () => (
        <span>
          We encourage you to drop us an{" "}
          <a
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            href="mailto:info@chesscentre.online?subject=Junior%20Club%20Enquiry"
          >
            email
          </a>{" "}
          before hand as our classes fill up fast! The first few sessions are{" "}
          <span className="font-medium">completely free</span> with no
          obligation to sign up. Come down, see what we have to offer and take
          it from there.
        </span>
      ),
      tags: [TOPIC.JUNIORS],
      type: TYPE.PUBLIC,
    },
    {
      question: `How can I improve my game outside of The Chess Centre`,
      Answer: () => (
        <span>
          There are many fantastic resources on the web which can help players
          improve. We are planning to collate some recommended online sites and
          learning materials to support our own teaching and coaching efforts.
        </span>
      ),
      tags: [TOPIC.JUNIORS],
      type: TYPE.PUBLIC,
    },
    {
      question: `Can I cancel my membership anytime?`,
      Answer: () => (
        <span>
          Of course! We have no contract or painful 30-day notice periods. We
          want you to love being part of our community and what we represent.
          You can cancel your membership from your profile under "Subscription"
          anytime you wish, your membership will be valid until your next
          payment period. And, you are always welcome back!
        </span>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: TYPE.PUBLIC,
    },
    {
      question: `How can I find my live games or results?`,
      Answer: () => (
        <span>
          As almost all our congress and rapidplay games will be played on
          Digital Game Technology (DGT) boards, the pgn games will be uploaded
          against your profile. These will appear once the result is published
          on the app.
        </span>
      ),
      tags: [TOPIC.GAMES],
      type: TYPE.PUBLIC,
    },
    {
      question: `How can I find the venue?`,
      Answer: () => (
        <span>
          We are based in the centre of Ilkely. Our address is Unit 8, Crescent
          Court, Ilkely LS29 8DE.
        </span>
      ),
      tags: [TOPIC.GENERAL],
      type: TYPE.PUBLIC,
    },
    {
      question: `Is there nearby parking?`,
      Answer: () => (
        <span>
          Yes. There are a number of large car parks within a few minutes walk
          of us. Some will require you to pay, this depends on when you are
          visiting the club.
        </span>
      ),
      tags: [TOPIC.GENERAL],
      type: TYPE.PUBLIC,
    },
    {
      question: `Is there nearby train station?`,
      Answer: () => (
        <span>
          Yes. The central Ilkley train station is only 2 minutes walk from us
          with regular Trains to Bradford and Leeds.
        </span>
      ),
      tags: [TOPIC.GENERAL],
      type: TYPE.PUBLIC,
    },
    {
      question: `Do I need to be a member to play?`,
      Answer: () => (
        <span>
          No. We accept one-off entries into our events. However, to join The
          Chess Centre and participate in team events, individual competitions
          and other unique events. These are for our subscribed members.
        </span>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: TYPE.PUBLIC,
    },
    {
      question: `How old are "Juniors"?`,
      Answer: () => <span>Under 16 from September { moment().format("YYYY") }.</span>,
      tags: [TOPIC.JUNIORS],
      type: TYPE.PUBLIC,
    },
    {
      question: `Can I join a team?`,
      Answer: () => (
        <span>
          Yes. We would be delighted for you to join one of our teams, to do so
          you would be required to sign up as a subscribed member. Not only
          that, we are also in close contact with many other club captains
          around the Bradford and Leeds area so, should there a more convenient
          venue for you to join a league team, we will happily put you in touch
          with that club captain.
        </span>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: TYPE.PUBLIC,
    },
    {
      question: `What is a "rating"?`,
      Answer: () => (
        <span>
          A rating is something used to help calculate a players playing
          strength and ability. The higher the number, the stronger the player.
          Players acquire a rating after participating in a minimum number of
          officially timed games. You are given a rating separately for
          Rapidplay and Standard play time controls.
        </span>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: TYPE.PUBLIC,
    },
    {
      question: `How long are games?`,
      Answer: () => (
        <span>
          This depends on the event to what time control is used. This can range
          and be different across leagues, individual competitions and event
          types like congresses or rapidplays. Each event will specify the time
          control for the games. Our standard congresses for example has a limit
          of <span className="font-bold">60 minutes</span> on the clock per
          player. Our rapidplays conversly are{" "}
          <span className="font-bold">25 minutes</span> on the clock per player.
        </span>
      ),
      tags: [TOPIC.GAMES],
      type: TYPE.PUBLIC,
    },
    {
      question: `What if I run out of time on my clock during a game?`,
      Answer: () => (
        <span>
          In most cases this means you lose the game. The only exception here is
          when your opponent has insufficient material (pieces on the board)
          left to checkmate you. This would then be a draw.
        </span>
      ),
      tags: [TOPIC.GAMES],
      type: TYPE.PUBLIC,
    },
    {
      question: `Do you offer private 1-2-1 Chess coaching?`,
      Answer: () => (
        <span>
          Yes. We do treat each enquiry individually depending on your
          requirements and availablity. Please speak to us in the club or{" "}
          <a
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            href="mailto:info@chesscentre.online?subject=Coaching"
          >
            send us a message
          </a>
          .
        </span>
      ),
      tags: [TOPIC.COACHING],
      type: TYPE.PUBLIC,
    },
    {
      question: `Does your venue provide disabled access?`,
      Answer: () => (
        <span>
          We regrettably cannot offer wheelchair access to our patrons. Our
          premises is based on the first floor with only acess by stairs. We
          apologise to those who this impacts.
        </span>
      ),
      tags: [TOPIC.GENERAL],
      type: TYPE.PUBLIC,
    },
    {
      question: `How much is a membership?`,
      Answer: () => (
        <span>
          You can find our membership pricing here:{" "}
          <Link
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            to={`/membership`}
          >
            membership
          </Link>
        </span>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: TYPE.PUBLIC,
    },
    {
      question: `How do I find what time each round starts for an event?`,
      Answer: () => (
        <span>
          Look out for the{" "}
          <i className="text-teal-500 hover:text-gray-600 fa fa-flag"></i> icon,
          click on this to reveal the details of the round times or see the{" "}
          <Link
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            to={`/events`}
          >
            more info
          </Link>{" "}
          link via the main events page.
        </span>
      ),
      tags: [TOPIC.EVENTS],
      type: TYPE.PUBLIC,
    },
    {
      question: `Why don't all results from an event appear?`,
      Answer: () => (
        <span>
          This could be for a number of reasons. If an opponent is not rated,
          this can take longer to be registered with the ECF. If both players
          are rated and this still is not showing, let us know so we can check
          for you.{" "}
          <a
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            href="mailto:support@chesscentre.online?subject=Missing%20Games"
          >
            Send us a message
          </a>
        </span>
      ),
      tags: [TOPIC.GAMES],
      type: TYPE.INTERNAL,
    },
    {
      question: `Why don't all results have playable games?`,
      Answer: () => (
        <span>
          We do our best to capture as many{" "}
          <span className="font-medium">pgns</span> as possible. Sometimes these
          become corrupt i.e., if the pieces have been moved unintentionally to
          illegal squares or your round was not played on a live board. If we
          have captured it correctly then we make sure we add these to your
          profile. Feel free to contact us about adding any missing data.{" "}
          <a
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            href="mailto:support@chesscentre.online?subject=Add%20Games"
          >
            Send us a message
          </a>
        </span>
      ),
      tags: [TOPIC.GAMES],
      type: TYPE.INTERNAL,
    },
    {
      question: `How do I add my bullet and blitz ratings?`,
      Answer: () => (
        <span>
          You can add your <span className="font-medium">chess.com</span> and{" "}
          <span className="font-medium">lichess.com</span> via your{" "}
          <Link
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            to="/app/profile"
          >
            profile.
          </Link>
        </span>
      ),
      tags: [TOPIC.RATING],
      type: TYPE.INTERNAL,
    },
  ].filter((q) =>
    type === TYPE.INTERNAL
      ? /* ALL */ true
      : q.type === type
      ? /* SPECIFIC */ true
      : false
  );
