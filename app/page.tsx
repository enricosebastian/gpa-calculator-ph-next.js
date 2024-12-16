'use client'

import { CourseContextProvider } from "@/_context/CourseContext"
import { TermContextProvider } from "@/_context/TermContext"
import { MainContextProvider } from "@/_context/MainContext";
import Toolbar from "@/_components/Toolbar/Toolbar";
import Table from "@/_components/Table/Table";
import Sidebar from "@/_components/Sidebar/Sidebar";
import RetroTable from "@/_components/RetroTable/RetroTable";

export default function Home() {
  return (
    <CourseContextProvider>
      <TermContextProvider>
        <MainContextProvider>
          <div className="main--container">
            <div className="nes-container with-title is-centered press-start-2p">
              <p className="title">PH UNIVERSITY GPU ESTIMATOR</p>

              <div className="main--contents">
                <Sidebar/>
                <RetroTable/>
              </div>
              
            </div>
          </div>
        </MainContextProvider>
      </TermContextProvider>
    </CourseContextProvider>
  );
}