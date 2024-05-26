import React from "react";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    console.log(event.target.value);
    if (event.target.value === "/logout") {
      handleLogout();
      return;
    }
    navigate(event.target.value);
  };
  return (
    <>
      <div className="w-64 h-[16rem] border-t-8 border-t-violet-500 bg-white p-5 mt-10 rounded-md hidden md:block shadow-lg">
        <ul className="space-y-2 my-auto">
          <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-blue-200 border-l-2 border-l-surface-blue text-surface-blue font-semibold p-2">
            My profile
          </li>
          <Link to="/sent-requests">
            <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-blue-200 border-l-2 border-l-surface-blue text-surface-blue p-2">
              Sent requests
            </li>
          </Link>
          {/* <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-blue-200 border-l-2 border-l-surface-blue text-surface-blue p-2">
            Confirmed reservations
          </li> */}
          <Link to="/received-requests">
            <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-purple-300 border-l-2 border-l-violet-500 text-violet-500 p-2">
              Received requests
            </li>
          </Link>
          {/* <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-purple-300 border-l-2 border-l-violet-500 text-violet-500  p-2">
            Reserved cars
          </li> */}
          <li
            className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-red-200 border-l-2 border-l-red-500 text-red-500 font-semibold p-2"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>
      <select
        onChange={handleChange}
        value={location.pathname}
        className="md:hidden w-52 mt-2 bg-violet-500 border text-white border-gray-300 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-400 dark:focus:border-violet-500"
      >
        <option value="/profile">My profile</option>
        <option value="/sent-requests">Sent requests</option>
        {/* <option value="/confirmed-reservations">Confirmed reservations</option> */}
        <option value="/received-requests">Received requests</option>
        {/* <option value="/reserved-cars">Reserved cars</option> */}
        <option value="/logout">Logout</option>
      </select>
    </>
  );
};

export default Sidebar;
