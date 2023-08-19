/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    colors: {
      bg_primary: '#4ECDC4',
      bg_secondary : '#EFFAF9',
      bg_status_progress: "#9ECDF8",
      bg_status_done: "#A3EDAA",
      bg_status_review: "#FCBE9F",
      bg_status_not_yet: "#E5E5E5",

    }
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui"),
    
  ],
  daisyui: {
    themes: ["garden"]
  },

}

