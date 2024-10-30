"use client";
import Button from "./components/utilities/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-100 text-center justify-center">
      <div className="">
        <p> A app for all things... </p>
        <h1 className="text-6xl font-bold"> Devd </h1>
      </div>
      <div className="home-options flex flex-col items-center mt-3">
        <Button
          clickCallback={() => {
            console.log("going to projects page clicked");
          }}
        >
          Enter as guest
        </Button>
        <Button
          clickCallback={() => {
            console.log("Going to Login page clicked");
            router.push("/auth");
          }}
          addStyle="mt-3"
        >
          Login
        </Button>
        <Button
          clickCallback={() => {
            console.log("Going to signup page clicked");
          }}
          addStyle="mt-3"
        >
          Signup
        </Button>
      </div>
    </div>
  );
}
