/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: 'myapp-',
    // The content section is where you configure the paths to all of your HTML templates, 
    // JS components, and any other files that contain Tailwind class names.
    content: [
        './src/components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        colors: {
            'white': '#fff',
            'dark': '#333'
        }
    },
}