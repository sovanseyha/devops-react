import React, { useState } from "react";
import { HiChartPie } from "react-icons/hi";
import { BiBook, BiCategory } from "react-icons/bi";
import { CgMenuRound, CgMenu } from "react-icons/cg";
import { TbClipboardList } from "react-icons/tb";
import { CiViewList } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import { RiUserShared2Line } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.js"></script>;

export default function SidebarComponent() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("token")
    navigate("/")
  }

  return (
    <div>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <CgMenu className="w-6 h-6" />
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-bg_secondary" aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
          <div className="mt-8 mx-3 mb-5">
            <di className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-li-400 rounded-full bg-bg_primary">
              <span className="font-normal text-xl text-white">Z</span>
            </di>
            <div className="inline-flex pl-5">
              <span className="font-bold text-xl">Workspace</span>
            </div>
          </div>

          <ul className="space-y-2 font-medium">

            <li>
              <NavLink to={"board"} className="flex items-center px-6 p-2 text-gray-900 rounded-lg dark:text-white"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#5C7F67" : ""
                  };
                }}
              >
                <BiBook className="w-6 h-6" />
                <span className="ml-3">Board</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"category"} className="flex items-center px-6 p-2 text-gray-900 rounded-lg dark:text-white"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#5C7F67" : ""
                  };
                }}
              >
                <BiCategory className="w-6 h-6" />
                <span className="ml-3">Category</span>
              </NavLink>
            </li>

            <li>
              <button
                onClick={() => setOpen(!open)}
                type="button"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group"
              >
                <span
                  className="flex-1 ml-3 px-6 text-left whitespace-nowrap"

                >
                  Status
                </span>
                <FiChevronDown className="w-6 h-6" />
              </button>
            </li>

            {open && (
              <div>
                <li>
                  <NavLink className="flex items-center w-full px-6 p-2 text-gray-900 transition duration-75 rounded-lg pl-16 group"
                    to={"task/done"}
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "#5C7F67" : ""
                      };
                    }}
                  >
                    <CgMenuRound className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap">Done</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink className="flex items-center w-full px-6 p-2 text-gray-900 transition duration-75 rounded-lg pl-16 group"
                    to={"task/progress"}
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "#5C7F67" : ""
                      };
                    }}
                  >
                    <HiChartPie className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap">Progress</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink className="flex items-center w-full px-6 p-2 text-gray-900 transition duration-75 rounded-lg pl-16 group"
                    to={"task/review"}
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "#5C7F67" : ""
                      };
                    }}
                  >
                    <TbClipboardList className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap">Reviews</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink className="flex items-center w-full px-6 p-2 text-gray-900 transition duration-75 rounded-lg pl-16 group"
                    to={"task/not_yet"}
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "#5C7F67" : ""
                      };
                    }}
                  >
                    <CiViewList className="w-6 h-6 font-bold" />
                    <span className="flex-1 ml-3 whitespace-nowrap">Not Yet</span>
                  </NavLink>
                </li>
              </div>
            )}

            <li>
              <label htmlFor="logout" className="flex items-center px-6 p-2 text-gray-900 rounded-lg dark:text-white cursor-pointer">
                <RiUserShared2Line className="w-6 h-6" />
                <span className="ml-3 text-red-600">Logout</span>
              </label>
            </li>
          </ul>


        </div>
      </aside>
      <input type="checkbox" id="logout" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label htmlFor="logout" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-lg">Logout!</h3>
          <p className="py-4">Are you sure, you want to logout?</p>
          <div className="modal-action">
            <button onClick={logout} className="btn bg-red-700 hover:bg-red-800 border-none">Logout</button>
          </div>
        </div>
      </div>
    </div>


  );
}


