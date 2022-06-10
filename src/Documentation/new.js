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
"/api/v1/accomodation/create": {
  post: {
    tags: [
      "Accomodation"
    ],
    summary: "Adding accomodation facility",
    description: "accomodation management of facility operation",
    operationId: "ADD_ACCOMODATION",
    consumes: [
      "multipart/form-data"
    ],
    "parameters": [
      {
        name: "name",
        in: "formData",
        type: "string"
      },
      {
        name: "description",
        in: "formData",
        type: "string"
      },
      {
        name: "location",
        in: "formData",
        type: "string"
      },
      {
        name: "image",
        in: "formData",
        type: "file",
        format: "image/jpeg"
      },
      {
        name: "availability",
        in: "formData",
        type: "string"
      },
      {
        name: "highlight",
        in: "formData",
        type: "string"
      },
      {
        name: "amenities",
        in: "formData",
        type: "string"
      }
    ],
    responses: {
      200: {
        description: "New Accomodation have been created"
      }
    }
  }
},
"/api/v1/accomodation": {
  get: {
    tags: [
      "Accomodation"
    ],
    summary: "Get all accomodation",
    description: "list of all accomodation",
    OperationId: "List of all accomodation",
    responses: {
      200: {
        description: "Retrieved"
      },
    },

  }
},
"/api/v1/accomodation/{id}": {
  get: {
    "tags": [
      "Accomodation"
    ],
    summary: "Fetch single accomodation",
    description: "Fetch single accomodation",
    operationId: "Fetch accomodation",
    produces: [
      "application/json"
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        type: "string",
        description: "accomodation Id",
        required: true
      }
    ],
    responses: {
      "200": {
        description: "a single accomodation received successfully"
      }
    }
  }
},
"/api/v1/accomodation/update/{id}": {
  put: {
    tags: [
        "Accomodation"
    ],
    summary: "update accomodation",
    description: "update accomodation",
    operationId: "update accomodation",

    produces: [
        "application/json"
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            type: "string",
            description: "Accomodation Id",
            required: true
        },
        {
          name: "name",
          in: "formData",
          type: "string"
        },
        {
          name: "description",
          in: "formData",
          type: "string"
        },
        {
          name: "location",
          in: "formData",
          type: "string"
        },
        {
          name: "image",
          in: "formData",
          type: "file"
        },
        {
          name: "availability",
          in: "formData",
          type: "string"
        },
        {
          name: "highlight",
          in: "formData",
          type: "string"
        },
        {
          name: "amenities",
          in: "formData",
          type: "string"
        }
    ],
    responses: {
        201: {
            description: "Accomodation Updated Successfully"
        }
    }
}
},
"/api/v1/accomodation/delete/{id}": {
  delete: {
    tags: [
      "Accomodation"
    ],
    summary: "Delete an Accomodation",
    description: "Delete an Accomodation",
    OperationId: "Delete an Accomodation",

    produces: [
      "application/json"
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        type: "string",
        description: "Accomodation Id",
        required: true
      }
    ],
    responses: {
      200: {
        description: "Accomodation deleted successful"
      },
      404: {
        description: "Not Found"
      }
    }
  }
},
"/api/v1/rooms/{accomodationId}": {
  post: {
    tags: [
      "room",
    ],
    summary: "Creating user using Accomodation id",
    description: "You have to create a room according to the facility you have where you use accomodation id",
    parameters: [
      {
        name: "accomodation Id",
        in: "path",
        type: "string",
        description: "Accomodation Id",
        required: true
      },
      {
        name: "body",
        in: "body",
        description: "Resource payload",
        required: true,
        schema: {
          type: "object",
          properties: {
            bedType: {
              type: "string"
            },
            bedCost: {
              type: "string"
            },
            bedDescription: {
              type: "string"
            }

          }
        }
      }
    ],
    responses: {
      200: {
        description: "Room was successfully created"
      }
    }
  }
},
"/api/v1/rooms": {
  get: {
    tags: [
      "room"
    ],
    summary: "Get all rooms",
    description: "list of all rooms",
    OperationId: "List of all rooms",
    responses: {
      200: {
        description: "received all rooms"
      },
    },

  }
},
"/api/v1/rooms/{id}": {
  "get": {
    "tags": [
      "room"
    ],
    summary: "Fetch a single room",
    description: "Fetch a single room",
    operationId: "Fetch a single room",
    produces: [
      "application/json"
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        type: "string",
        description: "room id",
        required: true
      }
    ],
    responses: {
      "200": {
        description: "a single room received successfully"
      }
    }
  }
},

// "/api/v1/rooms/{id}": {
//   "put": {
//     tags: [
//         "room"
//     ],
//     summary: "update room",
//     description: "update room",
//     operationId: "update room",

//     produces: [
//         "application/json"
//     ],
//     parameters: [
//         {
//             name: "id",
//             in: "path",
//             type: "string",
//             description: "room id",
//             required: true
//         },
//         {
//           name: "body",
//           in: "body",
//           description: "Resource payload",
//           required: true,
//           schema: {
//             type: "object",
//             properties: {
//               bedType: {
//                 type: "string"
//               },
//               bedCost: {
//                 type: "string"
//               },
//               bedDescription: {
//                 type: "string"
//               }
  
//             }
//           }
//         }
//     ],
//     responses: {
//         201: {
//             description: "Rooms Updated Successfully"
//         }
//     }
// }
// },
// }
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