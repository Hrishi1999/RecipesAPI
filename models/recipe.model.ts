interface Recipe {
  name: string;
  ingredients: Array<String>;
  instructions: Array<String>;
  nutrients: Array<String>;
  tags: Array<String>;
  servings: string;
  image: string;
  time: {
    prepration_time: string;
    cooking_time: string;
    additional_time: string;
    total: string;
  };
}
