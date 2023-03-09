import React, { useState } from "react";
import { Userprofile } from "../components/Userprofile";
import Inner from "../components/layout/inner";

function UserprofilePage() {
  const [isCollepse, setIsCollepse] = useState(true);
  const [isExpand, setIsExpand] = useState(false);
  const [project, setProject] = useState(false);
  const [flow, setflow] = useState([]);
  const collepsExpandeHandler = () => {
    setIsCollepse(!isCollepse);
    setIsExpand(!isExpand);
  };
  return (
    <Inner
      isCollepse={isCollepse}
      collepsExpandeHandler={collepsExpandeHandler}
      isExpand={isExpand}
      project={project}
      setProject={setProject}
      flow={flow}
      setflow={setflow}
    >
      <div
        className={
          isCollepse
            ? "main_dashboard duration-500 ease-in-out transition-all bg-[#f7f9ff] h-[100vh] pl-16"
            : "new_dashboard duration-500 ease-in-out transition-all bg-[#f7f9ff]  pb-[29px] h-[90vh] lg:pl-60"
        }
      >
        <Userprofile />
      </div>
    </Inner>
  );
}

export default UserprofilePage;