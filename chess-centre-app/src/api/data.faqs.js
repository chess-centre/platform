import { Link } from "react-router-dom";
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

export const faqData = (type) =>
  [
    {
      question: `Do you teach beginners?`,
      Answer: () => (
        <>
          Yes, absolutely! We welcome anyone to come visit us on our{" "}
          <Link
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            to={`${type !== "public" ? "/app" : ""}/events/club`}
          >
            Thursday club night
          </Link>, here we can show you the basics and go from there! Alternatively, we also have our
          <Link
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            to={`${type !== "public" ? "/app" : ""}/events/junior-club`}
          >
            Junior Club
          </Link>{" "}
          for children aged 6 to 16.
        </>
      ),
      tags: [TOPIC.BEGINNERS],
      type: "public",
    },
    {
      question: `Do I need a chess rating to participate in an event?`,
      Answer: () => (
        <>
          No. Anyone can register to play in our events, we try to skill match
          players so the games are hard fought and competitive. Most of our
          events will be ECF rated so once you've played a few official games
          you'll get a rating.
        </>
      ),
      tags: [TOPIC.RATING],
      type: "public",
    },
    {
      question: `Do I need to be a member to join an event?`,
      Answer: () => (
        <>
          No. Most of our events will be published to our members first. As we
          have limited numbers this means some events will likely be full before
          they are offered to non-members.
        </>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: "public",
    },
    {
      question: `Can I just turn up to for a casual game?`,
      Answer: () => (
        <>
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
        </>
      ),
      tags: [TOPIC.RATING],
      type: "public",
    },
    {
      question: `Will my games be FIDE rated?`,
      Answer: () => (
        <>
          Not initially, this requires a registered FIDE Arbiter to officiate
          the games. We do plan to visit this in the near future to provide more
          to our members.
        </>
      ),
      tags: [TOPIC.RATING],
      type: "public",
    },
    {
      question: `What if I am unable to make an event I am registered for?`,
      Answer: () => (
        <>
          We know at times things won't always go to plan. No problem,
          <a
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            href="mailto:support@chesscentre.online"
          >
            send us a message
          </a>
          and we'll do our best to re-work our event.
        </>
      ),
      tags: [TOPIC.RATING],
      type: "public",
    },
    {
      question: `Can I pay my membership annually?`,
      Answer: () => (
        <>
          Sure! This functionality is not yet available via our website but talk
          to us when you are next in the club and we will process this for you.
        </>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: "public",
    },
    {
      question: `Do you offer any discounts?`,
      Answer: () => (
        <>
          To provide the absolute best value whilst ensuring your whole
          experience is a great one we continually review our offering and
          pricing. This means we offer special discounts to students, senior
          citizens and family memberships. Being part of The Chess Centre is
          about being part of a wider community who supports the growth of
          Chess.
        </>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: "public",
    },
    {
      question: `Do I need to sign up before coming down to the Junior Club?`,
      Answer: () => (
        <>
          We encourage you to drop us an{" "}
          <a
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            href="mailto:info@chesscentre.online"
          >
            email
          </a>{" "}
          before hand as our classes fill up fast! The first few sessions are
          completely free with no obligation to sign up. Come down, see what we
          have to offer and take it from there.
        </>
      ),
      tags: [TOPIC.JUNIORS],
      type: "public",
    },
    {
      question: `How can I improve my game outside of The Chess Centre`,
      Answer: () => (
        <>
          There are many fantastic resources on the web which can help players
          improve. We are planning to collate some recommended online sites and
          learning materials to support our own teaching and coaching efforts.
          Coming soon!
        </>
      ),
      tags: [TOPIC.JUNIORS],
      type: "public",
    },
    {
      question: `Can I cancel my membership anytime?`,
      Answer: () => (
        <>
          Of course! We have no contract or painful 30-day notice periods. We
          want you to love being part of our community and what we represent.
          You can cancel your membership from your profile under "Subscription"
          anytime you wish, your membership will be valid until your next
          payment period. And, you are always welcome back!
        </>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: "public",
    },
    {
      question: `How can I find my live games or results?`,
      Answer: () => (
        <>
          As almost all our congress and rapidplay games will be played on
          Digital Game Technology (DGT) boards, the pgn games will be uploaded
          against your profile. These will appear once the result is published
          on the app.
        </>
      ),
      tags: [TOPIC.GAMES],
      type: "public",
    },
    {
      question: `How can I find the venue?`,
      Answer: () => (
        <>
          We are based in the centre of Ilkely. Our address is Unit 8, Crescent
          Court, Ilkely LS29 8DE.
        </>
      ),
      tags: [TOPIC.GENERAL],
      type: "public",
    },
    {
      question: `Is there nearby parking?`,
      Answer: () => (
        <>
          Yes. There are a number of large car parks within a few minutes walk
          of us. Some will require you to pay, this depends on when you are
          visiting the club.
        </>
      ),
      tags: [TOPIC.GENERAL],
      type: "public",
    },
    {
      question: `Is there nearby train station?`,
      Answer: () => (
        <>
          Yes. The central Ilkley train station is only 2 minutes walk from us
          with regular Trains to Bradford and Leeds.
        </>
      ),
      tags: [TOPIC.GENERAL],
      type: "public",
    },
    {
      question: `Do I need to be a member to play?`,
      Answer: () => (
        <>
          No. We accept one-off entries into our events. However, to join The
          Chess Centre and participate in team events, individual competitions
          and other unique events. These are for our subscribed members.
        </>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: "public",
    },
    {
      question: `How old are "Juniors"?`,
      Answer: () => <>Under 16 from September 2021.</>,
      tags: [TOPIC.JUNIORS],
      type: "public",
    },
    {
      question: `Can I join a team?`,
      Answer: () => (
        <>
          Yes. We would be delighted for you to join one of our teams, to do so
          you would be required to sign up as a subscribed member. Not only
          that, we are also in close contact with many other club captains
          around the Bradford and Leeds area so, should there a more convenient
          venue for you to join a league team, we will happily put you in touch
          with that club.
        </>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: "public",
    },
    {
      question: `What is a "rating"?`,
      Answer: () => (
        <>
          A rating is something used to help calculate a players playing
          strength and ability. The higher the number, the stronger the player.
          Players acquire a rating after participating in a minimum number of
          officially timed games.
        </>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: "public",
    },
    {
      question: `How long are games?`,
      Answer: () => (
        <>
          This depends on the event to what time control is used. This can range
          and be different across leagues, individual competitions and event
          types like congresses or rapidplays. Each event will specify the time
          control for the games. Our standard congresses for example has a limit
          of
          <span className="text-teal-500 font-bold">60 minutes</span> on the
          clock per player. Our rapidplays conversly are{" "}
          <span className="text-teal-500 font-bold">25 minutes</span> on the
          clock per player.
        </>
      ),
      tags: [TOPIC.GAMES],
      type: "public",
    },
    {
      question: `What if I run out of time on my clock during a game?`,
      Answer: () => (
        <>
          In most cases this means you lose the game. The only exception here is
          when your opponent has insufficient material (pieces on the board)
          left to checkmate you. This would then be a draw.
        </>
      ),
      tags: [TOPIC.GAMES],
      type: "public",
    },
    {
      question: `Do you offer private 1-2-1 Chess coaching?`,
      Answer: () => (
        <>
          Yes. We do treat each enquiry individually depending on your
          requirements and availablity. Please speak to us in the club or{" "}
          <a
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            href="mailto:info@chesscentre.online"
          >
            send us a message
          </a>
          .
        </>
      ),
      tags: [TOPIC.COACHING],
      type: "public",
    },
    {
      question: `Does your venue provide disabled access?`,
      Answer: () => (
        <>
          We regrettably cannot offer wheelchair access to our patrons. Our
          premises is based on the first floor with only acess by stairs. We
          apologise to those who this impacts.
        </>
      ),
      tags: [TOPIC.GENERAL],
      type: "public",
    },
    {
      question: `How much is a membership?`,
      Answer: () => (
        <>
          You can find our membership pricing here:{" "}
          <Link
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            to={`${type !== "public" ? "/app" : ""}/membership`}
          >
            membership
          </Link>
        </>
      ),
      tags: [TOPIC.MEMBERSHIP],
      type: "public",
    },
    {
      question: `How do I find what time each round starts for an event?`,
      Answer: () => (
        <>
          Look out for the <i className="text-teal-500 fa fa-flag"></i> icon,
          click on this to reveal the details of the round times or see the{" "}
          <Link
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            to={`${type !== "public" ? "/app" : ""}/events`}
          >
            more info
          </Link>{" "}
          link via the main events page.
        </>
      ),
      tags: [TOPIC.EVENTS],
      type: "public",
    },
    {
      question: `Why don't all results from an event appear?`,
      Answer: () => (
        <>
          This could be for a number of reasons. If an opponent is not rated,
          this can take longer to be registered with the ECF. 
          If both players are rating and this still is not showing, let us know so we can add the data!{" "}
          <a
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            href="mailto:support@chesscentre.online?subject=Missing%20Games"
          >
            Send us a message
          </a>
        </>
      ),
      tags: [TOPIC.GAMES],
      type: "internal",
    },
    {
      question: `Why don't all results have playable games?`,
      Answer: () => (
        <>
          We do our best to capture as many pgns as possible. Sometimes this are
          corrupt (if the pieces have been moved unintentionally) or your round
          was not on a live board. If we have captured it correctly then we make
          sure we add these to your profile. Feel free to contact us about
          adding any missing data.{" "}
          <a 
            className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline"
            href="mailto:support@chesscentre.online?subject=Add%20Games"
          >
            Send us a message
          </a>
        </>
      ),
      tags: [TOPIC.GAMES],
      type: "internal",
    },
    {
      question: `How do I add my bullet and blitz ratings?`,
      Answer: () => (
        <>
          You can add your <span className="font-bold">chess.com</span> and{" "}
          <span className="font-bold">lichess.com</span> via your{" "}
          <Link className="text-base font-medium text-teal-600 dark:text-teal-700 hover:underline" to="/app/profile">profile.</Link>
        </>
      ),
      tags: [TOPIC.RATING],
      type: "internal",
    }
  ].filter((q) =>
    type === "internal"
      ? /* ALL */ true
      : q.type === type
      ? true
      : /* SPECIFIC */ false
  );
