require('dotenv').config();
const express = require('express');
const path = require('path');
const { getCityInfo, getJobs } = require('./util');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/city/:city', async (req, res) => {
    const city = req.params.city;

    try {
        const [cityInfo, jobs] = await Promise.all([
            getCityInfo(city),
            getJobs(city)
        ]);

        if (cityInfo === 401 && jobs === 401) {
            return res.status(404).json({ error: 'Unauthorized access' });
        }
        if (cityInfo === 403 && jobs === 403) {
            return res.status(404).json({ error: 'Forbidden access' });
        }
        if (cityInfo === 404 && jobs === 404) {
            return res.status(404).json({ error: 'Not Found' });
        }
        if (cityInfo === 500 && jobs === 500) {
            return res.status(404).json({ error: 'Server Error' });
        }

        if (cityInfo === 401) {
            return res.status(200).json({ cityInfo: false, jobs });
        }
        if (jobs === 401) {
            return res.status(200).json({ cityInfo, jobs: false });
        }
        if (cityInfo === 403) {
            return res.status(200).json({ cityInfo: false, jobs });
        }
        if (jobs === 403) {
            return res.status(200).json({ cityInfo, jobs: false });
        }
        if (cityInfo === 404) {
            return res.status(200).json({ cityInfo: false, jobs });
        }
        if (jobs === 404) {
            return res.status(200).json({ cityInfo, jobs: false });
        }
        if (cityInfo === 500) {
            return res.status(200).json({ cityInfo: false, jobs });
        }
        if (jobs === 500) {
            return res.status(200).json({ cityInfo, jobs: false });
        }

        if (cityInfo && jobs) {
            return res.status(200).json({ cityInfo, jobs });
        }
        if (cityInfo) {
            return res.status(200).json({ cityInfo, jobs: false });
        }
        if (jobs) {
            return res.status(200).json({ cityInfo: false, jobs });
        }

        return res.status(404).json({ error: 'City data not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = app;
