"use client";
import Button from "./components/utilities/Button";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-100 text-center justify-center">
      <div className="">
        <p> A app for all things... </p>
        <h1 className="text-6xl font-bold"> Devd </h1>
      </div>
      <div className="home-options flex flex-col items-center mt-3">
        <Button
          clickCallback={() => {
            console.log("button clicked");
          }}
        >
          Enter as guest
        </Button>
        <Button
          clickCallback={() => {
            console.log("button clicked");
          }}
          addStyle="mt-3"
        >
          Login
        </Button>
        <Button
          clickCallback={() => {
            console.log("button clicked");
          }}
          addStyle="mt-3"
        >
          Signup
        </Button>
      </div>
    </div>
  );
}
