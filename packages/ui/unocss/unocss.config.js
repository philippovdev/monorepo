import { defineConfig, presetAttributify, presetUno, transformerDirectives, transformerVariantGroup, } from 'unocss';
export default defineConfig({
    presets: [presetUno(), presetAttributify()],
    theme: {
        colors: {
            brand: {
                primary: '#000',
                grey: {
                    1: '#717171',
                    2: '#cccccc',
                    3: '#e0e0e0',
                    4: '#ebebeb',
                    5: '#f6f6f6',
                    6: '#e6e6e6',
                },
                black: '#141414',
            },
            grey: {
                custom: { light: '#F0F0F3' },
                1: '#717171',
                2: '#ccc',
                30: '#bfbfbf',
                lightest: '#fefefe',
                light: '#ececec',
                default: '#ccc',
                dark: '#191919',
                placeholder: '#333333',
            },
            smed: { primary: { default: '#000', hover: '#333333' } },
            mono: { 10: '#E6E6E6' },
            warning: {},
            secondary: {
                red: '#e30611',
                green: '#3C984B',
                green10: '#3c984b1a',
                darkgreen: '#00B2AC',
                yellow: '#D5AD1D',
                blue: '#0097FD',
            },
        },
    },
    shortcuts: {
        centered: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        'flex-centered': 'flex justify-center items-center',
        'ghost-white': 'bg-transparent border-white hover:border-secondary text-white hover:text-secondary focus:text-white',
    },
    transformers: [transformerDirectives(), transformerVariantGroup()],
});
