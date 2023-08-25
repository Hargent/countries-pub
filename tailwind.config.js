/** @type {import('tailwindcss').Config} */

const customStyle = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        "conic-gradient-primary":" conic-gradient(#0000 10%, hsl(200, 15%, 8%))",
        "conic-gradient-secondary":" conic-gradient(#0000 10%, hsl(0, 0%, 100%))",
        "radial-gradient" :"radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0)"
      },
      colors:{
        primary:{
          100:"hsl(209, 23%, 22%)",
          200:"hsl(207, 26%, 17%)",
          300:"hsl(200, 15%, 8%)"
        },
        secondary:{
          100:"hsl(0, 0%, 100%)",
          200:"hsl(0, 0%, 98%)",
          300:"hsl(0, 0%, 52%)"
        }
      },
      fontFamily:{
        body:['Nunito Sans']
      },
      gridTemplateColumns: {
      
        // Complex site-specific column configuration
        'filter': '9fr 1fr',
      }
    },
    keyframes:{
        rotate: {
              to: {
                transform: "rotate(1turn)"
              }
            }
    },
    animation: {
      rotate:"rotate 1.5s infinite linear"
    },
    
  },
  plugins: [],
}
export default customStyle