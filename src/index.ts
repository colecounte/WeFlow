/**
 * WeFlow - A modern workflow automation tool
 * Fork of hicccc77/WeFlow
 *
 * Main entry point for the application.
 */

import { App } from './app';
import { Logger } from './utils/logger';
import { loadConfig } from './config';

const logger = new Logger('Main');

/**
 * Bootstrap the WeFlow application.
 */
async function bootstrap(): Promise<void> {
  try {
    logger.info('Starting WeFlow...');

    // Load application configuration
    const config = await loadConfig();

    // Initialize and start the application
    const app = new App(config);
    await app.initialize();
    await app.start();

    logger.info(`WeFlow is running on port ${config.port}`);

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('Received SIGINT, shutting down gracefully...');
      await app.stop();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM, shutting down gracefully...');
      await app.stop();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Failed to start WeFlow', error as Error);
    process.exit(1);
  }
}

bootstrap();
