import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { useFetchDataQuery } from "../../../../app/appApi";
import { setProfilePicAvailable } from "../../../../slices/authslice";
import { useDispatch, useSelector } from "react-redux";

const COLOR_BG_CODE = [
  "bg-lightpurple",
  "bg-lightyellow",
  "bg-darkgrey1",
  "bg-lightblue",
  "bg-lightred",
  "bg-lightpink",
];
const COLOR_TEXT_CODE = [
  "text-darkpurple",
  "text-darkyellow",
  "text-darkgreen",
  "text-darkblue",
  "text-red",
  "text-darkpink",
];
const Profilepic = ({ classData, textClass, user, id }) => {
  const dispatch = useDispatch();
  const { profilePicAvailable } = useSelector((state) => state?.loginAuth);

  const {
    data: image,
    isLoading,
    isSuccess,
  } = useFetchDataQuery({
    __config__: {
      url: id ? `/user-profile/profilePhoto?person_id=${id}` : "/user-profile/profilePhoto",
      dataType: "dataUrl",
      providesTags: () => ["profilepic"],
    },
  });

  useEffect(() => {
    dispatch(setProfilePicAvailable(isSuccess));
  }, [isSuccess]);
  const getCharAscii =
    user?.first_name && user?.last_name
      ? user?.first_name.charCodeAt(0) + user?.last_name.charCodeAt(0)
      : undefined;

  const colorIndex = getCharAscii % 6;

  return (
    <>
      <div
        className={`res-circle ${classData} ${COLOR_BG_CODE[colorIndex]} rounded-full leading-[0] relative`}
      >
        {image && image !== undefined && image !== 'data:' && profilePicAvailable ? (
          <img
            src={image}
            alt=""
            className={`rounded-full object-cover ${classData}`}
          />
        ) : (
          <div
            className={`font-Inter ${textClass} bottom-1/2 absolute leading-[0] w-full text-center ${COLOR_TEXT_CODE[colorIndex]}`}
          >
            {user?.first_name && user?.last_name
              ? `${user?.first_name?.charAt(0)}${user?.last_name?.charAt(0)}`
              : ""}
          </div>
        )}
      </div>
    </>
  );
};

Profilepic.prototype = {
  classData: PropTypes.string,
  textClass: PropTypes.string,
};

Profilepic.defaultProps = {
  classData: "",
  textClass: "xs",
};
export default Profilepic;
