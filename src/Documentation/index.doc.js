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
            password: 'aaaaaaaa',
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
'/api/v1/user/': {
  get: {
    tags: ['User'],
    description: 'get all user data',
    security: [],
    parameters: [],
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
},
'/api/v1/user/{id}': {
  get: {
    tags: ['User'],
    description: 'get all user data',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'user id',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
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
},
'/api/v1/user/update/{id}': {
  patch: {
    tags: ['User'],
    description: 'update user data',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'user id',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User',
          },
          example: {
            "firstName": "Samuel",
            "lastName": "Doe",
            "username": "johnDoe",
            "email": "john@gmail.com",
            "phoneNumber": "0780591269",
            "image": "",
            "provider": "",
            "gender": "male",
            "preferredLanguage": "kinyarwanda",
            "preferredCurrency": "RWF",
            "department": "developers",
            "lineManager": "Mugisha Eric",
            "role": "manager"
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