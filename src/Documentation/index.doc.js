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
    '/api/v1/docs': {
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
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/User',
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
    '/api/v1/user/notification/get': {
      get: {
        tags: ['Notification'],
        description: 'Get all notifications',
        parameters: [],
        responses: {
          200: {
            description: 'success',
          },
        },
      },
    },
    '/api/v1/user/notification/read': {
      put: {
        tags: ['Notification'],
        description: 'Read all notifications',
        parameters: [],
        responses: {
          200: {
            description: 'success',
          },
        },
      },
    },
    '/api/v1/user/notification/{id}': {
      patch: {
        tags: ['Notification'],
        description: 'Read notification',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'notification id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'success',
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

     '/api/v1/user/auth/logout': {
      get: {
        tags: ['authentication'],
        description: 'logout user',
        responses: {
          200: {
            description: 'successfully',
          },
        },
      },
    },
    
    '/api/v1/accomodation': {
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
            taken: 'string',
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
    '/api/v1/location/create': {
      post: {
        tags: ['locations'],
        summary: 'Creating user location',
        description: 'You have to create a location that will be accessed ',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/locations',
              },
            },
          },
          required: true,
        },

        responses: {
          200: {
            description: 'location was successfully created',
          },
        },
      },
    },
    '/api/v1/location': {
      get: {
        tags: ['locations'],
        summary: 'Get all locations',
        description: 'list of all locations',
        OperationId: 'List of all locations',
        responses: {
          200: {
            description: 'received all locations',
          },
        },
      },
    },
    '/api/v1/location/{id}': {
      get: {
        tags: ['locations'],
        summary: 'Fetch a single location',
        description: 'Fetch a single location',
        operationId: 'Fetch a single location',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'location id',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'a single location received successfully',
          },
        },
      },
      put: {
        tags: ['locations'],
        summary: 'update location with room id',
        description: 'update location  found',
        operationId: 'update locationId ',

        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'location Id',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/locations',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'Location Updated Successfully',
          },
        },
      },
      delete: {
        tags: ['locations'],
        summary: 'Delete a location',
        description: 'Delete an location',
        OperationId: 'Delete an location',

        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'Location ID',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Location deleted successful',
          },
          404: {
            description: 'Not Found',
          },
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
                leavingFrom: 'kigali',
                goingTo: 1,
                travelDate:
                  'Wed Jun 29 2022 04:44:15 GMT+0200 (Central Africa Time)',
                returnDate:
                  'Fri Jul 1 2022 04:44:15 GMT+0200 (Central Africa Time)',
                travelReason: 'marketing',
                accomodationId: 1,
                roomId: 1,
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
            description: 'Unauthorized',
          },
          403: {
            description: 'Unauthorized',
          },
          500: {
            description: 'Server Error',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
    },

    '/api/v1/user/trip/get': {
      get: {
        tags: ['Trip Request'],
        description: 'get all trip requests',
        parameters: [],
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/api/v1/user/trip/get/{id}': {
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
          },
        ],
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/api/v1/user/trip/update/{id}': {
      patch: {
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
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/tripRequest',
              },
              example: {
                leavingFrom: 'kigali',
                travelDate:
                  'Wed Jun 29 2022 04:44:15 GMT+0200 (Central Africa Time)',
                returnDate:
                  'Fri Jul 1 2022 04:44:15 GMT+0200 (Central Africa Time)',
                travelReason: 'leasure',
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
            description: 'Unauthorized',
          },
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
            description: 'Unauthorized',
          },
        },
      },
    },
    '/api/v1/user/trip/multi': {
      post: {
        tags: ['Multi city trip Request'],
        description: 'Create multi city trip request',
        consumes: ['application/json'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/multiTripRequest',
              },
              example: [
                {
                  leavingFrom: 'kigali',
                  goingTo: 1,
                  travelDate:
                    'Wed Jun 29 2022 04:44:15 GMT+0200 (Central Africa Time)',
                  returnDate:
                    'Fri Jul 1 2022 04:44:15 GMT+0200 (Central Africa Time)',
                  travelReason: 'marketing',
                  accomodationId: 1,
                  roomId: 3,
                },
                {
                  leavingFrom: 'kigali',
                  goingTo: 3,
                  travelDate:
                    'Wed Jun 29 2022 04:44:15 GMT+0200 (Central Africa Time)',
                  returnDate:
                    'Fri Jul 1 2022 04:44:15 GMT+0200 (Central Africa Time)',
                  travelReason: 'marketing',
                  accomodationId: 2,
                  roomId: 4,
                },
              ],
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'success status',
          },
          401: {
            description: 'Unauthorized',
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
      multiTripRequest: {
        type: 'object',
        properties: {
          leavingFrom: {
            type: 'string',
            description: 'current location',
          },
          goingTo: {
            type: 'string',
            description: 'destination',
          },
          travelDate: {
            type: 'string',
            description: 'start date of trip',
          },
          returnDate: {
            type: 'string',
            description: 'end date of trip',
          },
          travelReason: {
            type: 'string',
          },
          accomodationId: {
            type: 'integer',
          },
          roomId: {
            type: 'integer',
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
          username: {
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
          taken: {
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
          locationId: {
            name: 'locationId',
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

      locations: {
        type: 'object',
        properties: {
          locationName: {
            type: 'string',
          },
        },
      },
      tripRequest: {
        type: 'object',

        properties: {
          leavingFrom: {
            type: 'string',
            description: 'current location',
          },
          goingTo: {
            type: 'string',
            description: 'destination',
          },
          travelDate: {
            type: 'string',
            description: 'start date of trip',
          },
          returnDate: {
            type: 'string',
            description: 'end date of trip',
          },
          travelReason: {
            type: 'string',
          },
          accomodationId: {
            type: 'integer',
          },
          roomId: {
            type: 'integer',
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
