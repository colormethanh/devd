"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import useOutsideClick from "../hooks/useOutsideClick";

export default function Navbar() {
  const router = useRouter();
  const user_id = useSelector((state) => state.auth.user_id);
  const user = useSelector((state) => state.auth.user);
  const needs_login = useSelector((state) => state.auth.needs_login);
  const { dispatchLogout } = useAxios();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const dropdownClickRef = useOutsideClick(() => setIsOpen(false));

  const handleLogout = () => {
    dispatchLogout();
    router.push("/");
  };

  return (
    <nav className="w-[100vw] bg-black border-b border-white px-2 py-1 mr-1">
      <div className="container mx-auto flex flex-row md:flex-col items-center justify-between md:justify-center">
        <div className="text-center text-xl md:text-3xl">Devd</div>

        <ul className="hidden md:flex text-xs md:mb-1">
          <li
            onClick={() => {
              router.push("/");
            }}
            className="text-white mx-3 hover:underline underline-offset-4 hover:cursor-pointer"
          >
            Home
          </li>

          {needs_login === false ? (
            <>
              <li
                onClick={() => {
                  router.push("/projects");
                }}
                className="text-white mx-3 hover:underline underline-offset-4 hover:cursor-pointer"
              >
                My Projects
              </li>
              <li
                onClick={() => {
                  router.push(`/user/${user?.username}`);
                }}
                className="text-white mx-3 hover:underline underline-offset-4 hover:cursor-pointer"
              >
                My Info
              </li>
              <li
                onClick={handleLogout}
                className="text-white mx-3 hover:underline underline-offset-4 hover:cursor-pointer"
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  router.push("/auth");
                }}
                className="text-white mx-3 hover:underline underline-offset-4 hover:cursor-pointer"
              >
                Login
              </li>
              <li
                onClick={() => {
                  router.push("/auth/signup");
                }}
                className="text-white mx-3 hover:underline underline-offset-4 hover:cursor-pointer"
              >
                Signup
              </li>
            </>
          )}
        </ul>

        {/* Dropdown Menu Sandwich */}
        <div
          ref={dropdownClickRef}
          className="relative inline-block md:hidden text-left p-2 rounded-md hover:bg-gray-500"
        >
          <div>
            <button
              onClick={toggleDropdown}
              className={`flex justify-between w-full text-white focus:outline-none focus:ring-0`}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className={`absolute right-0
               z-50 mt-2 w-32 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <ul className="md:flex text-xs">
                <li
                  onClick={() => {
                    router.push("/");
                    setIsOpen(false);
                  }}
                  className="text-black mx-3 my-1 hover:underline underline-offset-4 hover:cursor-pointer"
                >
                  Home
                </li>

                {needs_login === false ? (
                  <>
                    <li
                      onClick={() => {
                        router.push("/projects");
                        setIsOpen(false);
                      }}
                      className="text-black mx-3 my-1 hover:underline underline-offset-4 hover:cursor-pointer"
                    >
                      My Projects
                    </li>
                    <li
                      onClick={() => {
                        router.push(`/user/${user?.username}`);
                        setIsOpen(false);
                      }}
                      className="text-black mx-3 my-1 hover:underline underline-offset-4 hover:cursor-pointer"
                    >
                      My Info
                    </li>
                    <li
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="text-black mx-3 my-1 hover:underline underline-offset-4 hover:cursor-pointer"
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      onClick={() => {
                        router.push("/auth");
                        setIsOpen(false);
                      }}
                      className="text-black mx-3 my-1 hover:underline underline-offset-4 hover:cursor-pointer"
                    >
                      Login
                    </li>
                    <li
                      onClick={() => {
                        router.push("/auth/signup");
                        setIsOpen(false);
                      }}
                      className="text-black mx-3 my-1 hover:underline underline-offset-4 hover:cursor-pointer"
                    >
                      Signup
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
