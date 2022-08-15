import Express from "express";
import router from "./src/routes/scrap_route";
import swaggerUi from "swagger-ui-express";

const port = process.env.PORT ?? 3000;
const app = Express();

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "./swagger.json",
    },
  })
);

app.use("/search", router);

app.listen(port, () => {
  console.log(`running in http://localhost:${port}`);
});
