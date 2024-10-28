'use client'

import { CourseContextProvider } from "@/_context/CourseContext"
import { TermContextProvider } from "@/_context/TermContext"
import Main from "@/_components/Main";

export default function Home() {
  return (
    <CourseContextProvider>
        <TermContextProvider>
          <Main/>
        </TermContextProvider>
    </CourseContextProvider>
  );
}