import React, { useState } from "react";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/",
  },
  {
    id: 2,
    name: "LIST",
    link: "/list",
  },
  {
    id: 3,
    name: "RENT",
    link: "/rent",
  },
  {
    id: 4,
    name: "PROFILE",
    link: "/profile",
  },
];
const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="relative z-10 shadow-md w-full duration-300 bg-violet-500">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <span
              className="text-3xl font-bold cursor-pointer"
              onClick={handleClick}
            >
              TransShare
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link, index }) => (
                <li key={id} className="py-4">
                  <Link
                    to={link}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500  "
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden ">
            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </div>
  );
};

export default Navbar;
