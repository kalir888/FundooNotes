import { createClient } from 'redis';
import logger from './logger';

export const client = createClient();

const clientRedis = async () => {
    try {
        await client.connect();
        logger.info('Connected to the reddis database.');
    }catch(error) {
        logger.error('Could not connect to the reddis database.', error);
    }
}

export default clientRedis;