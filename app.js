const express = require("express");
const app = express();
const port = 3000;
const postsRouter = require('./routes/postRoutes');
const middleware = require('./middleware');

app.use(middleware.loggingMiddleware);
app.use(express.json());
app.use('/posts', postsRouter);
app.use(middleware.errorHandler);

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
})
