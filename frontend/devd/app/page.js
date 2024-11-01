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
          Enter as guest
        </Button>
        <Button
          clickCallback={() => {
            router.push("/auth");
          }}
          addStyle="mt-3"
        >
          Login
        </Button>
        <Button
          clickCallback={() => {
            router.push("/auth/signup");
          }}
          addStyle="mt-3"
        >
          Signup
        </Button>
      </div>
    </div>
  );
}
