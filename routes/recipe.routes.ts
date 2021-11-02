import express from 'express';
import RecipesService from '../services/recipes.service';

const recipeScraper = require('recipe-scraper');
const bing = require('bing-scraper');

var router = express.Router();

router.route('/:id').get(async (req, res) => {
    let service = new RecipesService();
    let recipes: Array<Recipe> = [];

    await bing.search(
        {
            q: 'allrecipes ' + req.params.id,
            enforceLanguage: true
        },
        async (err: any, response: any) => {
            if (err) {
                res.json({ statusCode: 500, data: 'Internal Server Error' });
            } else {
                for (let i = 0; i < response['results'].length; i++) {
                    await recipeScraper(response['results'][i]['url'])
                        .then((recipe: any) => {
                            let newRecipe: Recipe = {
                                name: recipe['name'],
                                ingredients: recipe['ingredients'],
                                instructions: recipe['instructions'],
                                tags: recipe['tags'],
                                servings: recipe['servings'],
                                image: recipe['image'],
                                time: {
                                    prepration_time: recipe['time']['prep'],
                                    cooking_time: recipe['time']['cook'],
                                    additional_time: recipe['time']['inactive'],
                                    total: recipe['time']['total']
                                }
                            };
                            recipes.push(newRecipe);
                        })
                        .catch((error: any) => {});
                }
                if (recipes.length === 0) {
                    res.status(500).json({ data: 'No recipes found' });
                }
                res.status(200).json({ data: recipes });
            }
        }
    );
});
export default router;
