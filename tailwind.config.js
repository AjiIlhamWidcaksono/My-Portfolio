const defaultTheme = require('tailwindcss/defaultTheme');
const forms = require('@tailwindcss/forms');

module.exports = {
    darkMode: 'class',
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './index.html',
    ],

    theme: {
        extend: {
            colors: {
                farline: {
                    bg: '#fbfbf9',
                    surface: '#ffffff',
                    dark: '#14130e',
                    muted: '#6f6e69',
                    border: 'rgba(20, 19, 14, 0.08)',
                    borderStrong: 'rgba(20, 19, 14, 0.16)',
                    accent: '#14130e',
                },
                accent: {
                    DEFAULT: '#14130e',
                    hover: '#333333',
                    muted: 'rgba(20, 19, 14, 0.05)',
                },
            },
            fontFamily: {
                display: ['Anton', ...defaultTheme.fontFamily.sans],
                mono: ['"Fragment Mono"', 'monospace', ...defaultTheme.fontFamily.mono],
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                'farline-card': '0 10px 30px -10px rgba(20, 19, 14, 0.08), 0 20px 40px -15px rgba(20, 19, 14, 0.05)',
                'farline-lift': '0 25px 50px -12px rgba(20, 19, 14, 0.15)',
                'farline-nav': '0 8px 32px 0 rgba(20, 19, 14, 0.08)',
            }
        },
    },

    plugins: [forms],
};
