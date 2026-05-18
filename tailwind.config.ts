import type { Config } from "tailwindcss";

const { scrollbarGutter, scrollbarWidth, scrollbarColor } = require('tailwind-scrollbar-utilities');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-accent': '#000C62',
        'darker-accent':' #000946',
        'main': '#293692',
        'kiki-blue': '#1BA4B4',
        'wawa-pink': '#FF84A6',
        'lulu-yellow': '#FFC453',
        'kowl-orange': '#FF8227',
        'red-accent': '#F94747',
        'green-accent': '#4AC072',
        'yellow-accent': '#FDB222',

      },
      backgroundColor: {
        'darker-backgorund': '#F4F4F4',
        'background': '#FAFAFA',
        'default': '#FFFFFF'
      },
      backgroundImage: {
        'bg2': "url('/bg2.png')",
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },

  // plugins: [
  //   scrollbarGutter(), // no options to configure
	//   scrollbarWidth(), // no options to configure
	//   scrollbarColor(), // no options to configure
  // ],

  // plugins: [],

  plugins: [
    require('@tailwindcss/forms'),
    scrollbarGutter(),
	  scrollbarWidth(), 
	  scrollbarColor(), 
  ],
};
export default config;
