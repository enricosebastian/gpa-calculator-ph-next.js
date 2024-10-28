'use client'

import { CourseContextProvider } from "@/_context/CourseContext"
import { TermContextProvider } from "@/_context/TermContext"
import { MainContextProvider } from "@/_context/MainContext";
import Toolbar from "@/_components/Toolbar/Toolbar";
import Table from "@/_components/Table/Table";

export default function Home() {
  return (
    <CourseContextProvider>
      <TermContextProvider>
        <MainContextProvider>
          <Toolbar/>
          <Table/>
        </MainContextProvider>
      </TermContextProvider>
    </CourseContextProvider>
  );
}