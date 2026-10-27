/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(85);
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

// Optimasi Memori & Stabilitas Render (Mencegah Force Close / OOM di Linux)
Config.setConcurrency(1); // Gunakan 1 atau 2 browser instance agar RAM tidak jebol
Config.setDisallowParallelEncoding(true); // Hemat RAM: render frame dan encode tidak bersamaan
Config.setDisableSharedMemoryCapture(true); // Mencegah crash /dev/shm di Linux
Config.setChromiumOpenGlRenderer("angle"); // Mencegah crash driver GPU di Linux
