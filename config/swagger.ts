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
  apis: ['src/api/v1/routes/*.ts'] // adjust path as needed
};

const specs = swaggerJsDoc(options);

const swaggerDocs = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerDocs;

