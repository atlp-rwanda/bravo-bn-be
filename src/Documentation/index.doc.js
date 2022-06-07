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
  {name: 'Admin', description: 'update user role'}
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
'/api/v1/user/roles': {
  put: {
    tags: ['Admin'],
    description: 'Updating user roles',
    security: [
      {
        Authorization: []
      }
    ],
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/userRole',
          },
        },
      },
      required: true,
    },
    responses: {
      200: {
        description: 'success'
      },
      500: {
        description: 'Internal server error'
      }
    }
  }
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
'/api/v1/user/auth/signup': {
  post: {
    tags: ['authentication'],
    description: 'user signup with JWT',
    "requestBody": {
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/SignupAuthShema"
          },
          "example": {
            "firstName":"eddy",
            "lastName":"leftie",
            "username":"leftie",
            "phoneNumber":"0785632478",
            "role":"requester",
            "gender":"male",
            "email":"uwambajeddy@gmail.com",
            "password":"leftie",
            "repeat_password":"leftie"
          }
        }
      }
    },
    responses: {
      200: {
        description: 'success status',
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
  }
}
},
components: {
  schemas: {
    "SignupAuthShema": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string"
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "phoneNumber": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "repeat_password": {
          "type": "string"
        },
        "email": {
          "type": "string"
        }
      }
    },
    userRole: {
      type:"object",
      properties:{
        email: {
          type: 'string',
          description: 'user email',
        },
        role: {
          type: 'string',
          description: 'new role to set to user',
        },
      }
    },
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
    Authorization: {
      type: "apiKey",
      name: "Authorization",
      description: "Value: Bearer ",
      in: "header",
      scheme: "bearer"
    }
  },
}
}


docrouter.use('/', serve, setup(options));

export default docrouter;
