"use client";
import React, { useEffect } from "react";
import useUser from "@/app/hooks/useUser";
import useAuth from "@/app/hooks/useAuth";
import TextAndInputContainer from "@/app/components/utilities/TextAndInputContainer";
import TextAndTextBox from "@/app/components/utilities/TextAndTextBox";
import Image from "next/image";
import ShowcasePortfolioItem from "@/app/components/ShowcasePortfolioItem";

export default function page({ params }) {
  const { username } = React.use(params);
  const { user, handlePatchUser } = useUser(username);
  const { checkAndRefreshToken, accessToken, needsLogin } = useAuth();

  const handleEmailUpdate = (updatedEmail) => {
    handlePatchUser(user._id, { email: updatedEmail });
  };

  const handleFirstNameUpdate = (updatedName) => {
    handlePatchUser(user._id, { fName: updatedName });
  };

  const handleLastNameUpdate = (updatedName) => {
    handlePatchUser(user._id, { lName: updatedName });
  };

  const handleBioUpdate = (updatedBio) => {
    handlePatchUser(user._id, { bio: updatedBio });
  };

  useEffect(() => {
    const setupPage = async () => {
      if (accessToken !== undefined) {
        await checkAndRefreshToken(accessToken);
      }
    };
    setupPage();
  }, []);

  return (
    <div className="w-full h-[90vh] flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden ">
      {/* User info half */}
      <div className="lg:h-full lg:w-1/3 p-4 flex justify-center items-center bg-[url('/static/defaultPortfolioBanner-1.jpg')]  lg:bg-cover bg-center lg:bg-top">
        <div className="w-2/3 flex flex-col items-center lg:items-end gap-4">
          <div className="w-16 h-16">
            <Image
              src={"/static/defaultUser.png"}
              height={500}
              width={500}
              alt="user-icon"
            />
          </div>

          <div className="flex flex-wrap">
            <div>
              <TextAndInputContainer
                text={user?.fName ? user.fName : "Oh no! Add a first name now!"}
                updateCallback={handleFirstNameUpdate}
              />
            </div>

            <div className="hover:ml-3">
              <TextAndInputContainer
                text={user?.lName ? user.lName : "Oh no! Add a last name now!"}
                updateCallback={handleLastNameUpdate}
              />
            </div>
          </div>

          <div>
            <TextAndInputContainer
              text={user?.email ? user.email : "email coming soon!"}
              updateCallback={handleEmailUpdate}
            />
          </div>
        </div>
      </div>

      {/* User projects */}
      <div className="lg:w-2/3 lg:h-full lg:overflow-y-auto flex flex-col py-4 px-8 lg:px-10">
        <h1 className="text-xl lg:text-3xl mb-8 lg:mb-4">Hi!</h1>

        <div>
          <TextAndTextBox
            text={user?.bio ? user.bio : "Bio coming soon!"}
            updateCallback={handleBioUpdate}
            rows={8}
          />
        </div>
        <hr className="border border-gray-500 my-8"></hr>
        <h1 className="text-lg lg:text-3xl my-3">Portfolio</h1>
        <div className="h-max w-full flex flex-wrap md:justify-around gap-5">
          {user?.projects?.map((project) => (
            <ShowcasePortfolioItem
              key={`showcase-item-${project._id}`}
              project={project}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
