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
'/api/v1/user/login': {
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
  }, 
  },
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
        firstName: {
          type: 'string',
          description: "User's fullname",
        },
        lastName: {
          type: 'string',
          description: "User's username",
        },
        email:{
          type: 'string',
          description: "User's email",
        },phoneNumber:{
          type: 'string',
          description: "User's phone number",
        },image:{
          type: 'string',
          description: "User's image url",
          format: 'binary'
        },provider:{
          type: 'string',
          description: "User's provider",
        },gender:{
          type:'string',
          description:"User's gender"
        },preferredLanguage:{
          type:'string',
          description:"User's preferred language"
        },preferredCurrency:{
          type:'string',
          description:"User's preferred currency"
        },department:{
          type:'string',
          description:"User's department"
        },lineManager:{
          type:'string',
          description:"User's line manager"
        },role:{
          type:'string',
          description:"User's role"
        }
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

// firstName,lastName,email,phoneNumber,image,provider,gender,preferredLanguage,preferredCurrency,department,lineManager,role