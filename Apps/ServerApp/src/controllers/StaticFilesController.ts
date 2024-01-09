import express, { RequestHandler } from 'express';
import { PUBLIC_DIR } from '../config/AppConfig';
import { ONE_YEAR_IN_SECONDS } from '../constants/TimeConstants';

const StaticFilesController: RequestHandler = async (req, res, next) => {
    const serve = express.static(PUBLIC_DIR, { maxAge: '1y' });

    // Set a cache-control header
    res.setHeader('Cache-Control', `public, max-age=${ONE_YEAR_IN_SECONDS}`);

    // Use the express.static middleware to serve the file
    serve(req, res, next);
}

export default StaticFilesController;