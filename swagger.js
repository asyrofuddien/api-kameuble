const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'Kameuble API', // Title for your API
      version: '1.0.0',
      description: 'API documentation for the Kameuble Marketplace API', // Add a description
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your base URL
        description: 'Development Server',
      },
    ],
  },
  apis: ['./users/*.js'], // Point to your route files
};

// Generate Swagger documentation
const userSwaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/users', swaggerUi.serve, swaggerUi.setup(userSwaggerSpec));

// Example route
app.get('/api/v1/products', (req, res) => {
  res.json([{ name: 'Product 1' }, { name: 'Product 2' }]);
});

const port = 3500;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
});
