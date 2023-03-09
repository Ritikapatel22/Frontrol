import React from "react";
import HeaderStats from "../Header/header";
import Sidebar from "../Sidebar/sidebar";

function Inner({
  children,
  isCollepse,
  collepsExpandeHandler,
  isExpand,
  project,
  setProject,
  setflow,
  flow,
}) {
  return (
    <>
      <div>
        <HeaderStats
          isCollepse={isCollepse}
          collepsExpandeHandler={collepsExpandeHandler}
          isExpand={isExpand}
        />
        {children}
        <Sidebar
          isCollepse={isCollepse}
          collepsExpandeHandler={collepsExpandeHandler}
          isExpand={isExpand}
          project={project}
          setProject={setProject}
          flow={flow}
          setflow={setflow}
        />
      </div>
    </>
  );
}

export default Inner;
