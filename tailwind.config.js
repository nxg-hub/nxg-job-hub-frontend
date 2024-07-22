/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        AboutGroup: "url('/src/static/images/AboutGroup.png')",
        AboutCoWorkers: "url('/src/static/images/AboutBgCoworkers.png')",
        ServicesBusiness: "url('/src/static/images/ServicesBusiness.png')",
      },
    },
  },
  plugins: [],
};
