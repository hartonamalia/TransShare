import React from 'react';
import { useLogout } from '../../hooks/useLogout';

const Sidebar = () => {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  }
  return (
    <div className="w-64 h-[23rem] border-t-8 border-t-violet-500 bg-white p-5 mt-10 rounded-md hidden md:block shadow-lg">
      <ul className="space-y-2 my-auto">
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-blue-200 border-l-2 border-l-surface-blue text-surface-blue font-semibold p-2">My profile</li>
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-blue-200 border-l-2 border-l-surface-blue text-surface-blue p-2">Sent requests</li>
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-blue-200 border-l-2 border-l-surface-blue text-surface-blue p-2">Confirmed reservations</li>
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-blue-200 border-l-2 border-l-surface-blue text-surface-blue p-2">Essential information</li>
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-purple-300 border-l-2 border-l-violet-500 text-violet-500 p-2">Received requests</li>
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-purple-300 border-l-2 border-l-violet-500 text-violet-500  p-2">Reserved cars</li>
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-red-200 border-l-2 border-l-red-500 text-red-500 font-semibold p-2" onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
