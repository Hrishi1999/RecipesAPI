interface Recipe {
  name: string;
  ingredients: Array<String>;
  instructions: Array<String>;
  tags: Array<String>;
  servings: string;
  image: string;
  time: {
    prepration_time: string;
    cooking_time: string;
    total: string;
  };
}
