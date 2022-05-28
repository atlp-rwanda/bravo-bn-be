import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';

const docrouter = Router();

const local = process.env.LOCAL_HOST;
const heroku = process.env.DB_CONNECT;

const options = {
  openapi: '3.0.1',
  info: {
    title: 'Barefoot Nomad API Documentation',
    version: '1.0.0',
    description:
      'This is the backend api for Barefoot Nomad project.',
  },
  host: process.env.NODE_ENV === 'production' ? heroku : local,
  basePath: '/api',
security: [
  {
    bearerAuth: [],
  }
],
tags: [
  {name: 'setup swagger', description: 'Testing swagger setup'},
  {name: 'User', description: 'users endpoint'},
],
paths: {
'/api/v1/testSwagger': {
  get: {
    tags: ['setup swagger'],
    description: 'testing swagger setup',
    security: [],
    parameters: [],
   
    responses: {
      200: {
        description: 'success status',
      },
      500: {
          description: 'Internal Server Error'
      }
    },
  },
},
'/api/v1/users/login': {
  post: {
    tags: ['User'],
    description: 'login user',
    security: [],
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User',
          },
          example: {
            email: 'john@gmail.com',
            password: '123456',
          },
        },
      },
      required: true,
    },
    responses: {
      200: {
        description: 'successfully',
      },
      400: {
        description: 'Invalid credation',
      },
      500: {
          description: 'Internal Server Error'
      }
    }, 
  }
}
},
components: {
  schemas: {
    User: {
      type: 'object',

      properties: {
        id: {
          type: 'string',
          description: 'The auto-generated id of the user',
        },
        fullname: {
          type: 'string',
          description: "User's fullname",
        },
        username: {
          type: 'string',
          description: "User's username",
        },
        password: {
          type: 'string',
          description: "User's password",
        },
        email: {
          type: 'string',
          description: "User's email",
        },
        role: {
          type: 'string',
          description: "User role",
        },
      },
    },
  },
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
}
}


docrouter.use('/', serve, setup(options));

export default docrouter;