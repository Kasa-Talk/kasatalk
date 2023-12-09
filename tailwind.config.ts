import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const baseConfig: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: "#D61F3B",
        background: "#FAFAFA",
      },
    },
  },
};

const extendedConfig = withUt(baseConfig);

export default extendedConfig;
