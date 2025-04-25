import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Little Age Playway School Management API',
      version: '1.0.0',
      description: 'API documentation'
    }
  },
  apis: ['src/api/v1/routes/*.ts'] //
};

const specs = swaggerJsDoc(options);

const swaggerDocs = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export const swaggerSpec = swaggerJsDoc(options);
export const swaggerMiddleware = swaggerUi.serve;
export const swaggerHandler = swaggerUi.setup(swaggerSpec);
export default swaggerDocs;
