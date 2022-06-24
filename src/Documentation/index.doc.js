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
    description: 'This is the backend api for Barefoot Nomad project.',
  },
  host: process.env.NODE_ENV === 'production' ? heroku : local,
  basePath: '/api',
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: 'setup swagger', description: 'Testing swagger setup' },
    { name: 'User', description: 'users endpoint' },
    { name: 'Admin', description: 'update user role' },
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
            description: 'Internal Server Error',
          },
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
            description: 'Internal Server Error',
          },
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
            description: 'Internal Server Error',
          },
        },
      },
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
            description: 'Internal Server Error',
          },
        },
      },
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
                firstName: 'Samuel',
                lastName: 'Doe',
                username: 'johnDoe',
                email: 'john@gmail.com',
                phoneNumber: '0780591269',
                image: '',
                gender: 'male',
                preferredLanguage: 'kinyarwanda',
                preferredCurrency: 'RWF',
                department: 'developers',
                lineManager: 'Mugisha Eric',
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
            description: 'Internal Server Error',
          },
        },
      },
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
            description: 'success',
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
    '/api/v1/user/auth/signup': {
      post: {
        security: [],
        tags: ['authentication'],
        description: 'user signup with JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignupAuthShema',
              },
              example: {
                firstName: 'eddy',
                lastName: 'leftie',
                username: 'leftie',
                phoneNumber: '0785632478',
                role: 'requester',
                gender: 'male',
                email: 'uwambajeddy@gmail.com',
                password: 'leftie',
                repeat_password: 'leftie',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'success status',
          },
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
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/api/v1/accomodation/create': {
      post: {
        tags: ['Accomodation'],
        summary: 'Adding accomodation facility',
        description: 'accomodation management of facility operation',
        operationId: 'ADD_ACCOMODATION',
        consumes: ['multipart/form-data'],
        parameters: [],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/accomodation',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'New Accomodation have been created',
          },
        },
      },
    },
    '/api/v1/accomodation': {
      get: {
        tags: ['Accomodation'],
        summary: 'Get all accomodation',
        description: 'list of all accomodation',
        OperationId: 'List of all accomodation',
        responses: {
          200: {
            description: 'Retrieved',
          },
        },
      },
    },
    '/api/v1/accomodation/{id}': {
      get: {
        tags: ['Accomodation'],
        summary: 'Fetch single accomodation',
        description: 'Fetch single accomodation',
        operationId: 'Fetch accomodation',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'accomodation Id',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'a single accomodation received successfully',
          },
        },
      },
    },
    '/api/v1/accomodation/update/{id}': {
      put: {
        tags: ['Accomodation'],
        summary: 'update accomodation',
        description: 'update accomodation',
        operationId: 'update accomodation',

        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'Accomodation Id',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/accomodation',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'Accomodation Updated Successfully',
          },
        },
      },
    },
    '/api/v1/accomodation/delete/{id}': {
      delete: {
        tags: ['Accomodation'],
        summary: 'Delete an Accomodation',
        description: 'Delete an Accomodation',
        OperationId: 'Delete an Accomodation',

        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'Accomodation Id',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Accomodation deleted successful',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
    },
    '/api/v1/rooms/{accomodationId}': {
      post: {
        tags: ['room'],
        summary: 'Creating user using Accomodation id',
        description:
          'You have to create a room according to the facility you have where you use accomodation id',
        parameters: [
          {
            name: 'accomodationId',
            in: 'path',
            type: 'string',
            description: 'Accomodation Id',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/rooms',
              },
            },
          },
          required: true,
        },

        responses: {
          200: {
            description: 'Room was successfully created',
          },
        },
      },
    },
    '/api/v1/rooms': {
      get: {
        tags: ['room'],
        summary: 'Get all rooms',
        description: 'list of all rooms',
        OperationId: 'List of all rooms',
        responses: {
          200: {
            description: 'received all rooms',
          },
        },
      },
    },
    '/api/v1/rooms/{id}': {
      get: {
        tags: ['room'],
        summary: 'Fetch a single room',
        description: 'Fetch a single room',
        operationId: 'Fetch a single room',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'room id',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'a single room received successfully',
          },
        },
      },
      put: {
        tags: ['room'],
        summary: 'update room with room id',
        description: 'update room found',
        operationId: 'update accomodation ',

        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'room Id',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/rooms',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'Room Updated Successfully',
          },
        },
      },
      delete: {
        tags: ['room'],
        summary: 'Delete a room',
        description: 'Delete an room',
        OperationId: 'Delete an room',

        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'Room ID',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Room deleted successful',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
    },
  },

  components: {
    schemas: {
      userRole: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'user email',
          },
          role: {
            type: 'string',
            description: 'new role to set to user',
          },
        },
      },
      SignupAuthShema: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
          },
          firstName: {
            type: 'string',
          },
          lastName: {
            type: 'string',
          },
          phoneNumber: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          repeat_password: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
        },
      },
      User: {
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
          },
          phoneNumber: {
            type: 'string',
            description: "User's phone number",
          },
          image: {
            type: 'string',
            description: "User's image url",
            format: 'binary',
          },
          gender: {
            type: 'string',
            description: "User's gender",
          },
          preferredLanguage: {
            type: 'string',
            description: "User's preferred language",
          },
          preferredCurrency: {
            type: 'string',
            description: "User's preferred currency",
          },
          department: {
            type: 'string',
            description: "User's department",
          },
          lineManager: {
            type: 'string',
            description: "User's line manager",
          },
        },
      },
      rooms: {
        type: 'object',
        properties: {
          bedType: {
            type: 'string',
          },
          bedCost: {
            type: 'string',
          },
          bedDescription: {
            type: 'string',
          },
        },
      },

      accomodation: {
        type: 'object',
        content: 'multipart/form-data',
        properties: {
          name: {
            name: 'name',
            in: 'formData',
            type: 'string',
          },
          description: {
            name: 'description',
            in: 'formData',
            type: 'string',
          },
          location: {
            name: 'location',
            in: 'formData',
            type: 'string',
          },
          image: {
            name: 'image',
            in: 'formData',
            type: 'file',
          },
          geoLocation: {
            name: 'geoLocation',
            in: 'formData',
            type: 'string',
          },
          highlight: {
            name: 'highlight',
            in: 'formData',
            type: 'string',
          },
          amenitiesList: {
            name: 'amenitiesList',
            in: 'formData',
            type: 'array',
            items: {
              type: 'string',
            },
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
  },
};

docrouter.use('/', serve, setup(options));

export default docrouter;
