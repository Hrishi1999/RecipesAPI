const bing = require('bing-scraper');

export default class ScraperService {
    async scrape(query: string) {
        bing.search(
            {
                q: 'sugar pills idkhow',
                enforceLanguage: true
            },
            function (err: any, response: any) {
                if (err) {
                    throw err;
                } else {
                    return response['results'][0]['url'];
                }
            }
        );
    }
}
