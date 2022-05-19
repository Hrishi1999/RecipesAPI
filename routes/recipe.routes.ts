import express from "express";

const recipeScraper = require("recipe-scraper");
const DDG = require("duck-duck-scrape");

var router = express.Router();

router.route("/:id").get(async (req, res) => {
  let recipes: Array<Recipe> = [];
  let maxRecipes = req.query.maxRecipes ?? 10;

  await DDG.search("allrecipes.com " + req.params.id, 10)
    .then(async (response: any) => {
      if (maxRecipes && maxRecipes > response["results"].length) {
        maxRecipes = response["results"].length;
      } else if (maxRecipes === null || maxRecipes === undefined) {
        maxRecipes =
          response["results"].length > 10 ? 10 : response["results"].length;
      }

      let addedRecipes = 0;
      for (let i = 0; i < response["results"].length; i++) {
        if (addedRecipes === Number(maxRecipes)) {
          break;
        }
        await recipeScraper(response["results"][i]["url"])
          .then((recipe: any) => {
            let newRecipe: Recipe = {
              name: recipe["name"],
              ingredients: recipe["ingredients"],
              instructions: recipe["instructions"],
              nutrients: recipe["nutrients"],
              tags: recipe["tags"],
              servings: recipe["servings"],
              image: recipe["image"],
              time: {
                prepration_time: recipe["time"]["prep"],
                cooking_time: recipe["time"]["cook"],
                additional_time: recipe["time"]["inactive"],
                total: recipe["time"]["total"],
              },
            };
            recipes.push(newRecipe);
            addedRecipes++;
          })
          .catch((error: any) => {});
      }
      if (recipes.length === 0) {
        return res.status(200).json({
          message: "No recipes found",
          data: recipes,
        });
      }
    })
    .catch(async (err: any) => {
      res.json({ statusCode: 500, data: "Internal Server Error" });
    });
  return res.status(200).json({ data: recipes });
});
export default router;
