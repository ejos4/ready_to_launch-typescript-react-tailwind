/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./src/*.{html,tsx}",
        "./src/Components/**/*.tsx"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter vaar', ...defaultTheme.fontFamily.sans]
            }
        },
    },
    plugins: [],
}