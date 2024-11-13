"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Navbar() {
  const router = useRouter();
  const user_id = useSelector((state) => state.auth.user_id);
  const needs_login = useSelector((state) => state.auth.needs_login);

  return (
    <nav className="bg-black border-b border-white p-4 mr-1">
      <div className="container mx-auto flex items-center justify-center">
        <div className="text-white flex justify-center flex-col text-2xl font-bold">
          <div className="text-center">Devd</div>

          <div className="md:flex text-xs">
            <div
              onClick={() => {
                router.push("/");
              }}
              className="text-white mx-3 hover:underline underline-offset-4 hover:cursor-pointer"
            >
              Home
            </div>

            {needs_login === false ? (
              <div
                onClick={() => {
                  router.push("/projects");
                }}
                className="text-white mx-3 hover:underline underline-offset-4 hover:cursor-pointer"
              >
                My Projects
              </div>
            ) : (
              <>
                <div
                  onClick={() => {
                    router.push("/auth");
                  }}
                  className="text-white mx-3 hover:underline underline-offset-4 hover:cursor-pointer"
                >
                  Login
                </div>
                <div
                  onClick={() => {
                    router.push("/auth/signup");
                  }}
                  className="text-white mx-3 hover:underline underline-offset-4 hover:cursor-pointer"
                >
                  Signup
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
