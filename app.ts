import express from 'express';
import cors from 'cors';

import recipesRouter from './routes/recipe.routes';

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/recipes', recipesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
