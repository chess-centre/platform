import { useEffect } from "react";
import FooterLanding from "../../components/Footer/LandingFooter";
import LandingNav from "../../components/Navigation/LandingNav";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "../../assets/css/swagger-custom.css";


const Developer = () => {

  useEffect(() => {
    document.title = "The Chess Centre | Developer"
  }, []);

  return (
    <div>
      <div className="bg-white">
        <div className="relative bg-gray-50 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
          <LandingNav />
        </div>

        <SwaggerUI url="/swagger.json" />

        <FooterLanding></FooterLanding>
      </div>
    </div>
  );
};

export default Developer;
