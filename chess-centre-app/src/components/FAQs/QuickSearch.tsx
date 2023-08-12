import { Link } from "react-router-dom";
import { searchQuery } from "../../utils/UrlChange";

export default function QuickSearch(props) {
  const { tag } = props;
  const query = searchQuery({ tag });

  return (
    <div>
      <span className="text-xs text-gray-500">FAQ category: </span> 
      <Link to={`/app/faqs?${query}`} 
          className="inline-flex items-center px-2 py-0.5 mr-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-700 hover:text-white cursor-pointer">
        { tag } 
      </Link>
    </div>
  );
}