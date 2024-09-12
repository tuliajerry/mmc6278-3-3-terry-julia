require('dotenv').config();
const express = require('express');
const path = require('path');
const { getCityInfo, getJobs } = require('./util');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/city/:city', async (req, res) => {
    const city = req.params.city;

    try {
        const cityInfo = await getCityInfo(city);
        const jobs = await getJobs(city);

        if (cityInfo && jobs) {
            res.json({ cityInfo, jobs });
        } else {
            res.status(404).json({ message: 'City data not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = app;

