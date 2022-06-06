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
],
paths: {
'/api/testSwagger': {
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
},
"components": {
  "schemas": {
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
    }
  }
}

}

docrouter.use('/', serve, setup(options));

export default docrouter;