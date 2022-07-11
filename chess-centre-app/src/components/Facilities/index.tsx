const Refreshments = () => {
  return (
    <div className="prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify">
      <h3>Refreshments</h3>
      <ul>
        <li>Hot Tea &amp; Coffee</li>
        <li>Cold Drinks</li>
        <li>Snacks</li>
      </ul>
      <p className="prose prose-teal text-gray-500">
        All food and drink purchases greatly help towards the support and
        continued running of our dedicated Chess Centre.
      </p>
    </div>
  );
};

const Facilities = ({ openingTime = "9:30am Saturday Morning" }) => {
  return (
    <div className="mt-2 prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify">
      <h3>Facilities</h3>
      <p className="prose prose-teal text-gray-500">
        <i className="fad fa-wheelchair text-teal-500"></i> We apologise, our
        venue is located on the 1st floor with no wheelchair access. Please{" "}
        <a href="mailto:info@chesscentre.online">contact us</a> with any
        specific requests or enquiries.
      </p>
      <p className="prose prose-teal text-gray-500">
        Our venue will be open from <span className="font-medium">{ openingTime }</span>{" "} to welcome you all.
      </p>
    </div>
  );
};

interface VenueInfoProps {
  openingTime?: string | undefined
}

export default function VenueInfo(props: VenueInfoProps) {
  return (
    <>
      <Refreshments />
      <Facilities openingTime={props.openingTime} />
    </>
  )
}
