'use client'

import { CourseContextProvider } from "@/_context/CourseContext"
import { TermContextProvider } from "@/_context/TermContext"
import Main from "@/_components/Main";
import { MainContextProvider } from "@/_context/MainContext";

export default function Home() {
  return (
    <CourseContextProvider>
      <TermContextProvider>
        <MainContextProvider>
          <div>hello homie</div>
        </MainContextProvider>
      </TermContextProvider>
    </CourseContextProvider>
  );
}