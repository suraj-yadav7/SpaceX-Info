import React from "react";
import { Link } from "react-router-dom";
import {SiSpacex} from "react-icons/si"

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between px-5 w-full">
        <div className="logo flex">
        <Link to="/"><h3 className="py-4">Space</h3></Link><SiSpacex size={50}className="text-8xl text-white" />
        </div>

        <nav>
          <ul>
            <li>
              <Link
                to="/capsules"
                className=" text-white text-sm lg:text-base"
              >
                Capsules
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
