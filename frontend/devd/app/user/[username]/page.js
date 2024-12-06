"use client";
import React, { useEffect } from "react";
import useUser from "@/app/hooks/useUser";
import useAuth from "@/app/hooks/useAuth";
import TextAndInputContainer from "@/app/components/utilities/TextAndInputContainer";
import TextAndTextBox from "@/app/components/utilities/TextAndTextBox";

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
        if (needsLogin === true) router.push("/auth");
      }
    };
    setupPage();
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-2/3 flex flex-col gap-4">
        <div>
          <h1 className="text-4xl underline">User Info Page</h1>
          <p>
            {" "}
            Customize the info on this page to modify make changes to your info
            in the showcase{" "}
          </p>
        </div>

        <div>
          <p className="text-2xl"> Username: </p>
          <p className="text-xl"> {user?.username} </p>
        </div>

        <div>
          <p className="text-2xl"> Email: </p>
          <TextAndInputContainer
            text={user?.email ? user.email : "Oh no! Add a email now!"}
            updateCallback={handleEmailUpdate}
          />
        </div>

        <div>
          <p className="text-2xl"> First Name: </p>
          <TextAndInputContainer
            text={user?.fName ? user.fName : "Oh no! Add a first name now!"}
            updateCallback={handleFirstNameUpdate}
          />
        </div>

        <div>
          <p className="text-2xl"> Last Name: </p>
          <TextAndInputContainer
            text={user?.lName ? user.lName : "Oh no! Add a last name now!"}
            updateCallback={handleLastNameUpdate}
          />
        </div>

        <div>
          <h2 className="text-2xl"> Bio: </h2>
          <TextAndTextBox
            text={user?.bio ? user.bio : "Oh no! Add a user Bio now!"}
            updateCallback={handleBioUpdate}
          />
        </div>
      </div>
    </div>
  );
}
