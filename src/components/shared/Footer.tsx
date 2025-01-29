import logo from "../../../public/assets/logo.png";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white py-10 px-5">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src={logo} alt="" />
          <div className="flex justify-evenly my-4">
            <Icon icon="ic:outline-facebook" width="32" height="32" />
            <Icon icon="mdi:gmail" width="32" height="32" />
            <Icon icon="mdi:instagram" width="32" height="32" />
            <Icon icon="bi:twitter-x" width="32" height="32" />
            <Icon icon="mdi:youtube" width="32" height="32" />
          </div>
        </div>
        {/* About Us Section */}
        {/* <div>
          <h2 className="text-xl font-bold mb-4">ABOUT US</h2>
          <p className="text-sm">
            We at GearNode dream of a better world where people, technology, and
            the environment live as one. That is why our products and processes
            are designed to put safe, efficient, economical, and
            environment-friendly technology at the service of people and the
            community. At our Batangas plant, once just a dream that is now a
            20-hectare reality, we push ahead with our efforts to provide our
            customers with life-building technology.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div> */}

        {/* Talk to Us Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">TALK TO US</h2>
          <ul className="text-sm">
            <li>1-800-10-GearNodeBD</li>
            <li>1-800-10-4663274</li>
            <br />
            <li>Landline Number</li>
            <li>(02)-8581-6700 to 6799</li>
            <br />
            <li>Mobile Number</li>
            <li>01917-88-GearNode</li>
            <li>01917-88-46632</li>
          </ul>
        </div>

        {/* GearNode Links Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">GearNode LINKS</h2>
          <ul className="text-sm mb-4">
            <li>
              <a href="#" className="hover:underline">
                Global GearNode
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Global Brand Slogan
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                GearNode History
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                GearNode Philosophy
              </a>
            </li>
          </ul>
          <select
            className="bg-white text-black px-2 py-1 rounded focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select Region
            </option>
            <option>Asia</option>
            <option>Europe</option>
            <option>North America</option>
            <option>South America</option>
          </select>
        </div>
      </div>
    </footer>
  );
}

export default Footer
