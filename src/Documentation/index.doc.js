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
    { name: 'setup swagger', description: 'Testing swagger setup' },
    { name: 'User', description: 'users endpoint' },
    { name: 'Admin', description: 'update user role' }
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
    '/api/v1/user/update': {
      patch: {
        tags: ['User'],
        description: 'update user data',
        parameters: [],
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
                "gender": "male",
                "preferredLanguage": "kinyarwanda",
                "preferredCurrency": "RWF",
                "department": "developers",
                "lineManager": "Mugisha Eric",
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
    },
    '/api/v1/user/roles': {
      put: {
        tags: ['Admin'],
        description: 'Updating user roles',
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
    '/api/v1/user/auth/signup': {
      post: {
        security: [],
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
                "firstName": "eddy",
                "lastName": "leftie",
                "username": "leftie",
                "phoneNumber": "0785632478",
                "role": "requester",
                "gender": "male",
                "email": "uwambajeddy@gmail.com",
                "password": "leftie",
                "repeat_password": "leftie"
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
    '/api/v1/user/trip': {
      post: {
        tags: ['Trip Request'],
        description: 'Create Trip Request',

        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/tripRequest',
              },
              example: {
                "leavingFrom": "kigali",
                "goingTo": 1,
                "travelDate": "2022-10-5",
                "returnDate": "2022-10-10",
                "travelReason": "marketing",
                "accomodationId": 5
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'success status',
          },
          401: {
            description: 'Unauthorized'
          }
        },
      },
    },

    '/api/v1/user/trip/get/allTrips': {
      get: {
        tags: ['Trip Request'],
        description: 'get all trip requests',
        parameters: [],
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
            description: 'Internal Server Error'
          },
        },
      },
    },
    '/api/v1/user/trip/{id}': {
      get: {
        tags: ['Trip Request'],
        description: 'get single trip request',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'requester id',
            required: true,
            schema: {
              type: 'string',
            },
          }
        ],
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
            description: 'Internal Server Error'
          },
        },
      },
    },
    '/api/v1/user/trip/{id}': {
      patch: {
        tags: ['Trip Request'],
        description: 'update trip request',
        parameters: [
          /*
          {
            name: 'id',
            in: 'path',
            description: 'requester id',
            required: true,
            schema: {
              type: 'string',
            },
          }*/
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/tripRequest',
              },
              example: {
                "leavingFrom": "kigali",
                "goingTo": 5,
                "travelDate": "2022-10-5",
                "returnDate": "2022-10-10",
                "travelReason": "leasure",
                "accomodationId": 9
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'success status',
          },
          401: {
            description: 'Unauthorized'
          }
        },
      },
    },

    '/api/v1/user/trip/{id}': {
      delete: {
        tags: ['Trip Request'],
        description: 'update trip request',

        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'requester id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          202: {
            description: 'success status',
          },
          401: {
            description: 'Unauthorized'
          }
        },
      },
    },

  },

  components: {
    schemas: {
      userRole: {
        type: "object",
        properties: {
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
      "User": {
        type: 'object',

        properties: {
          firstName: {
            type: 'string',
            description: 'new role to set to user',
          },
          lastName: {
            type: 'string',
            description: "User's fullname",
          },
          email: {
            type: 'string',
            description: "User's email",
          }, phoneNumber: {
            type: 'string',
            description: "User's phone number",
          }, image: {
            type: 'string',
            description: "User's image url",
            format: 'binary'
          }, gender: {
            type: 'string',
            description: "User's gender"
          }, preferredLanguage: {
            type: 'string',
            description: "User's preferred language"
          }, preferredCurrency: {
            type: 'string',
            description: "User's preferred currency"
          }, department: {
            type: 'string',
            description: "User's department"
          }, lineManager: {
            type: 'string',
            description: "User's line manager"
          }
        },
      },
      "tripRequest": {
        type: 'object',

        properties: {
          leavingFrom: {
            type: 'string',
            description: 'current location',
          },
          goingTo: {
            type: 'string',
            description: 'destination'
          },
          travelDate: {
            type: 'string',
            description: 'start date of trip'
          },
          returnDate: {
            type: 'string',
            description: 'end date of trip'
          },
          travelReason: {
            type: 'string',

          },
          accomodationId: {
            type: 'integer'
          }
        }
      }
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
