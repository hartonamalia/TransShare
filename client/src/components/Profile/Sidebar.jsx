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
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-green-200 border-l-2 border-l-green-500 text-green-700 font-semibold p-2">Profilul meu</li>
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-green-200 border-l-2 border-l-green-500  p-2">Cereri trimise</li>
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-green-200 border-l-2 border-l-green-500  p-2">Rezervări confirmate</li>
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-green-200 border-l-2 border-l-green-500  p-2">Informații esențiale</li>
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-green-200 border-l-2 border-l-green-500  p-2">Cereri primite</li>
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-green-200 border-l-2 border-l-green-500  p-2">Mașini rezervate</li>
        <li className="cursor-pointer hover:border-l-0 hover:rounded-md hover:bg-red-200 border-l-2 border-l-red-500  p-2" onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
