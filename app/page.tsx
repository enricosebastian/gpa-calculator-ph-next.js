'use client'

import { CourseContextProvider } from "@/_context/CourseContext"
import { TermContextProvider } from "@/_context/TermContext"
import { MainContextProvider } from "@/_context/MainContext";
import Sidebar from "@/_components/Sidebar/Sidebar";
import Main from "@/_components/Main/Main";
import { ReactNode, useEffect, useState } from "react";
import CompactMain from "@/_components/CompactMain/CompactMain";

export default function Home() {

  const [isCompactMode, setIsCompactMode] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      console.log(window.innerWidth);
      setIsCompactMode(window.innerWidth <= 800);
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
        <CompactMain/>
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