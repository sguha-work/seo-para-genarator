import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/logo.png";

import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <footer className="text-neutral-300 bg-[#333333]">
        <div className="footer-bottom py-5 border-t border-neutral-700">
          <div className="max-w-[1640px] mx-auto px-5">
            <div className="flex flex-wrap -mx-5">
              <div className="md:w-6/12 w-full px-5 py-4 md:text-right md:order-last">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="ml-4 text-white text-lg hover:text-gray-400"
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="ml-4 text-white text-lg hover:text-gray-400"
                />
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="ml-4 text-white text-lg hover:text-gray-400"
                />
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="ml-4 text-white text-lg hover:text-gray-400"
                />
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="ml-4 text-white text-lg hover:text-gray-400"
                />
              </div>
              <div className="md:w-6/12 w-full px-5 py-4 md:order-first">
                <p>Copyright © 2024 All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
