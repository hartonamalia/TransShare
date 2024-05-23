import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import profilePic from "../../../assets/profile_pic.png";
const Conversation = ({ data, currentUser }) => {
  const [userData, setUserData] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userId = data.members.find((member) => member !== currentUser);
    try {
      const response = await fetch(
        `http://localhost:8000/api/user/user-data/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setUserData(data.userDetails);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {userData && (
        <div className="follower conversation">
          <div className="flex items-center gap-2">
            {/* {online && <div className="online-dot"></div>} */}
            <img
              src={userData?.profilePictureURL}
              alt="Profile"
              className="rounded-full border-2 border-gray-500"
              style={{ width: "50px", height: "50px" }}
            />
            <div style={{ fontSize: "0.8rem" }}>
              <span className="text-black">{userData?.firstName} {userData?.lastName}</span>
              {/* <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span> */}
            </div>
          </div>
        </div>
      )}
      <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;