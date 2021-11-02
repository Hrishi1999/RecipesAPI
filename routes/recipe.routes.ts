import express from 'express';
import ScraperService from '../services/scraper.service';
const recipeScraper = require('recipe-scraper');
const bing = require('bing-scraper');

var router = express.Router();

router.route('/:id').get(async (req, res) => {
    let searchScrapper = new ScraperService();

    bing.search(
        {
            q: 'allrecipes ' + req.params.id,
            enforceLanguage: true
        },
        function (err: any, response: any) {
            if (err) {
                throw err;
            } else {
                console.log(response['results'][0]['url']);
                recipeScraper(response['results'][0]['url'])
                    .then((recipe: any) =>
                        res.json({ statusCode: 200, data: recipe })
                    )
                    .catch((error: any) => {
                        return res.status(500).json({
                            statusCode: 500,
                            message: 'Recipe not found'
                        });
                    });
            }
        }
    );
    let url = await searchScrapper.scrape(req.params.id);
});

export default router;
