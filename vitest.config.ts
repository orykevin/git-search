import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
    },
    test: {
        globals: true, // This will make test, expect, etc. available globally
        environment: 'jsdom',
    },
});