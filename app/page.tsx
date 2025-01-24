'use client'

import { CourseContextProvider } from "@/_context/CourseContext"
import { TermContextProvider } from "@/_context/TermContext"
import { MainContextProvider } from "@/_context/MainContext";
import Toolbar from "@/_components/Toolbar/Toolbar";
import Table from "@/_components/Table/Table";
import Sidebar from "@/_components/Sidebar/Sidebar";
import Main from "@/_components/Main/Main";

export default function Home() {
  return (
    <CourseContextProvider>
      <TermContextProvider>
        <MainContextProvider>
          <div className="main--header">PH UNIVERSITY GPA ESTIMATOR</div>
          <div className="main--viewport">
            <div className="main--content">
              <Sidebar/>
              <Main/>
            </div>
          </div>
        </MainContextProvider>
      </TermContextProvider>
    </CourseContextProvider>
  );
}