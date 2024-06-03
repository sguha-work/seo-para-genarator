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
        <div className="footer-top pt-20">
          <div className="max-w-[1640px] mx-auto px-5">
            <div className="flex flex-wrap justify-between -mx-8">
              {/* Upper Footer Section */}
              <div className="lg:w-4/12 w-full mb-8 px-8">
                  <div className="image mb-5">
                    <img src={logo} alt="logo" />
                  </div>

                  <p className="text-lg">Make your pics high resolution - HD, 4k and beyond. Enlarge and sharpen photos for printing and web in a single click.</p>
              </div>

              {/* Shop Now Section */}
              <div className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-6/12 mb-8 px-8">
                <div className="block">
                  <h4 className="mb-5 text-xl font-semibold leading-8">Product</h4>
                  <ul>
                    <li className="mb-5 text-lg"><a href="#" className="hover:text-neutral-400"> Pricing</a></li>
                    <li className="mb-5 text-lg"><a href="#" className="hover:text-neutral-400"> Changelog</a></li>
                    <li className="mb-5 text-lg"><a href="#" className="hover:text-neutral-400"> Help Center</a></li>
                    <li className="mb-5 text-lg"><a href="#" className="hover:text-neutral-400"> image.ai</a></li>
                  </ul>
                </div>
              </div>

              {/* Store Hours Section */}
              <div className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-6/12 mb-8 px-8">
                <div className="block time">
                  <h4 className="mb-5 text-xl font-semibold leading-8">Company</h4>
                  <ul>
                    <li className="mb-5 text-lg font-light"><a href="#" className="hover:text-neutral-400">Blog</a></li>
                    <li className="mb-5 text-lg font-light"><a href="#" className="hover:text-neutral-400">Jobs</a></li>
                    <li className="mb-5 text-lg font-light"><a href="#" className="hover:text-neutral-400">How to use</a></li>
                  </ul>
                </div>
              </div>

              {/* Contact Us Section */}
              <div className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-6/12 mb-8 px-8">
                <div className="block address">
                  <h4 className="mb-5 text-xl font-semibold leading-8">Legal</h4>
                  <ul>
                    <li className="mb-5 text-lg"><a href="#" className="hover:text-neutral-400">Terms of service</a></li>
                    <li className="mb-5 text-lg"><a href="#" className="hover:text-neutral-400">Text to Image Terms</a></li>
                    <li className="mb-5 text-lg"><a href="#" className="hover:text-neutral-400">Privacy policy</a></li>
                    <li className="mb-5 text-lg"><a href="#" className="hover:text-neutral-400">Master service agreement</a></li>
                  </ul>
                  <ul className="social-icon">{/* Your social media links */}</ul>
                </div>
              </div>

              <div className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-6/12 mb-8 px-8">
                <div className="block address">
                  <h4 className="mb-5 text-xl font-semibold leading-8">Community</h4>
                  <ul>
                    <li className="mb-5 text-lg"><a href="#" className="hover:text-neutral-400">Facebook</a></li>
                    <li className="mb-5 text-lg"><a href="#" className="hover:text-neutral-400">Linkedin</a></li>
                    <li className="mb-5 text-lg"><a href="#" className="hover:text-neutral-400">Twitter</a></li>
                    <li className="mb-5 text-lg"><a href="#" className="hover:text-neutral-400">Youtube</a></li>
                  </ul>
                  <ul className="social-icon">{/* Your social media links */}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
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
