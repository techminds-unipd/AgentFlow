import dotenv from 'dotenv';
dotenv.config();
import { defineConfig } from "cypress";

export default defineConfig({ 
    e2e: { baseUrl: "http://localhost:5173", viewportWidth: 1920, viewportHeight: 1080, experimentalRunAllSpecs: true },
    env: {
        googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        googleClientId: process.env.CLIENT_ID,
        googleClientSecret: process.env.CLIENT_SECRET
    }
});
