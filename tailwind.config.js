import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                accent: {
                    DEFAULT: '#FF5722',
                    hover: '#E64A19',
                    muted: 'rgba(255, 87, 34, 0.1)',
                },
                ivory: '#F9F6F0',
                charcoal: '#0A0A0A',
                cardLight: '#FFFFFF',
                cardDark: '#121212',
            },
            fontFamily: {
                display: ['Clash Display', ...defaultTheme.fontFamily.sans],
                sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                'marquee-slow': 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },

    plugins: [forms],
};
