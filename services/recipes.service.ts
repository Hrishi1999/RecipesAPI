const bing = require('bing-scraper');
const recipeScraper = require('recipe-scraper');

export default class RecipesService {
    async getRecipes(query: string) {
        let recipes: Array<Recipe> = [];

        await bing.search(
            {
                q: 'allrecipes ' + query,
                enforceLanguage: true
            },
            async (err: any, response: any) => {
                if (err) {
                    File;
                    throw err;
                } else {
                    for (let i = 0; i < response['results'].length; i++) {
                        await recipeScraper(response['results'][i]['url'])
                            .then((recipe: any) => {
                                recipes.push(recipe);
                            })
                            .catch((error: any) => {});
                    }
                }
            }
        );
        setTimeout(function () {
            return recipes;
        }, 3000);
    }
}
