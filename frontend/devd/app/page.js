"use client";
import Button from "./components/utilities/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-100 text-center justify-center">
      <div className="">
        <p> An app for all things... </p>
        <h1 className="text-6xl font-bold"> Devd </h1>
      </div>
      <div className="home-options flex flex-col items-center mt-3">
        <Button
          clickCallback={() => {
            router.push("/projects");
          }}
        >
          <div className="w-full flex justify-between">
            Enter as guest
            <div className="mr-3 grid place-items-center">{">"} </div>
          </div>
        </Button>
        <Button
          clickCallback={() => {
            router.push("/auth");
          }}
          addStyle="mt-3"
        >
          <div className="w-full flex justify-between">
            Login
            <div className="mr-3 grid place-items-center">{">"} </div>
          </div>
        </Button>
        <Button
          clickCallback={() => {
            router.push("/auth/signup");
          }}
          addStyle="mt-3"
        >
          <div className="w-full flex justify-between">
            Signup
            <div className="mr-3 grid place-items-center">{">"} </div>
          </div>
        </Button>
      </div>
    </div>
  );
}
