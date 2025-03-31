This is a GPA calculator I made for my girlfriend. She kept bugging me about calculating her CGPA cause she's grade conscious, plus she wanted to know whether she was cum laude or not. Decided to publicize it in case anyone else wants to experiment or predict their GPA

Deployed app: https://thisstudent.isbr0ke.org

# No DB necessary
Essentially what I wanted to do was a sort of save/import/export type of deal. Every user can simply export the results of the GPA calculator via an Excel sheet. Conversely, if you have an Excel sheet that supports the CGPA calculator's format, you can just use the import feature to do so. All your courses will be imported directly!

# How to run locally
- Clone this repository
- Remember the directory of the cloned repo
- `cd` to this repo's local version and run `npm install` to install all dependencies in your local environment
- Run `npm run dev`

# How to run in Vercel
- Fork the branch
- Run (no setup needed)

# Libraries/frameworks used
- React.js and Next.js
- TypeScript (cause numbers and calculations)
- Next-themes
- Sass (for styling)
- Sheets.js (for Excel import/export)
- UUID

# Todo
- Add more universities (need to read their handbooks lmao)
- Add unit testing
- Improve error handling for Sheet.js

# Universities supported (as of now. Please message me if you more schools to be supported)
- DLSU