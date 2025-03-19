'use client'

import { CourseContextProvider } from "@/_context/CourseContext"
import { TermContextProvider } from "@/_context/TermContext"
import { MainContextProvider } from "@/_context/MainContext";
import Toolbar from "@/_components/Toolbar/Toolbar";
import Table from "@/_components/Table/Table";
import Sidebar from "@/_components/Sidebar/Sidebar";
import Main from "@/_components/Main/Main";
import { ReactNode, useEffect, useState } from "react";
import RetroDiv from "@/_components/RetroDiv/RetroDiv";

export default function Home() {

  const [isCompactMode, setIsCompactMode] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsCompactMode(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const content = isCompactMode? showCompactMode() : showDesktopMode();

  return (
    <CourseContextProvider>
      <TermContextProvider>
        <MainContextProvider>
          {content}
        </MainContextProvider>
      </TermContextProvider>
    </CourseContextProvider>
  );
}

function showCompactMode() : ReactNode {
  return (
    <>
      <div className="main--viewport">
        <RetroDiv/>
      </div>
      
    </>
  );


} 

function showDesktopMode() : ReactNode {
  return (
    <>
      <div className="main--header">PH UNIVERSITY GPA ESTIMATOR</div>
      <div className="main--viewport">
        <div className="main--content">
          <Sidebar/>
          <Main/>
        </div>
      </div>
    </>
  );
}