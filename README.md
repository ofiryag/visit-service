# Overview
This backend service is designed to track and store URL visits for different organizations.
The service provides two primary endpoints for interacting with the data:

- **POST /api/v1/visit**: To insert a batch of new visits.
- **GET /api/v1/visit**: To fetch a list of vists for an organization using a pagination.

## Endpoints
* please note that you must provide a JWT token within the request's headers.

### 1. `POST /api/v1/visit`
**Request body example:**
```json
[
  {
    "url": "https://chatgpt.com",
    "time": "2024-11-30T09:25:00Z"
  }
]
```
**Response example:**
```json
{
    "successes": [
        {
            "url": "https://chatgpt.com",
            "time": "2024-11-30T09:25:00.000Z",
            "_id": "6750c1552167ba3beffce374"
        }
    ],
    "failures": [],
    "status": "success"
}
```

### 1. `GET /api/v1/visit`
**Request example:**
```json
http://localhost:3000/api/v1/visit?limit=5&offset=0
```
**Response example:**
```json
{
    "data": [
        {
            "url": "https://gemini.google.com/",
            "time": "2024-12-04T20:38:44.000Z"
        },
        {
            "url": "https://chatgpt.com/",
            "time": "2024-12-04T20:39:40.000Z"
        }
    ],
    "totalCount": 2,
    "totalPages": 1
}
```


# How to use:
## 1. Deploy mongo-db instance
```bash
$ docker-compose up --build -d
```
## 2. Install dependencies
```bash
$ npm install
```
## 3. Run the service
```bash
$ npm run start
```

### In order to execute unit tests execute:
```bash
$ npm run test
```