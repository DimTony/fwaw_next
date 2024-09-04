/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "home-button-gradient":
          "linear-gradient(to bottom, #9c703e, rgba(255, 254, 237, 0.5))",
        "cancel-button-gradient":
          "linear-gradient(to bottom, #b33b57, rgba(255, 254, 237, 0.5))",
      },
      fontSize: {
        "custom-xs": "0.65rem", // Custom extra small size
        "custom-base": "0.9rem", // Custom small size
        "custom-lg": "1.4rem", // Custom large size
        "custom-xl": "2.0rem", // Custom extra large size
        // Add more custom sizes as needed
      },
    },
  },
  plugins: [],
};
