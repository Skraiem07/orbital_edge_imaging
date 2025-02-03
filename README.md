# Orbital Edge Imaging API

This project is a RESTful API designed to manage satellite images and orders. It utilizes Node.js with TypeScript, PostgreSQL for data storage, and Docker for containerization.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js and npm**: Download and install from [nodejs.org](https://nodejs.org/).
- **Docker**: Download and install from [docker.com](https://www.docker.com/).

## Setup Instructions

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone git@github.com:Skraiem07/orbital_edge_imaging.git
cd orbital-edge-imaging
```

### 2. Install Dependencies

Install the necessary Node.js packages:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```
PORT=3000
DB_USER=postgres
DB_HOST=db
DB_NAME=orbital_imaging
DB_PASSWORD=yourpassword
DB_PORT=5432
```

Replace `yourpassword` with a secure password of your choice.

### 4. Set Up Docker Containers

Build and start the Docker containers:

```bash
docker-compose up --build
```

This command will:

- Build the Node.js application container.
- Start the PostgreSQL container.

The application will be accessible at `http://localhost:3000/api`.

### 5. Run the Application

With the Docker containers running, the application should be live.

You can test the endpoints using tools like Postman or `curl`.


**API Endpoints Documentation**

Below is a list of available API endpoints for managing satellite images and orders:

1. **Get All Satellite Images**

   - **Endpoint:** `GET /api/satellite-images`
   - **Description:** Retrieves a list of all satellite images, with optional filters and pagination.
   - **Query Parameters:**
     - `acquisitionDateStart` (optional): Start date for image acquisition.
     - `acquisitionDateEnd` (optional): End date for image acquisition.
     - `sensor` (optional): Sensor type used for image capture.
     - `minResolution` (optional): Minimum resolution of the images.
     - `maxResolution` (optional): Maximum resolution of the images.
     - `maxCloudCoverage` (optional): Maximum allowable cloud coverage percentage.
     - `areaOfInterest` (optional): GeoJSON Polygon representing the area of interest.
     - `page` (optional): Page number for pagination (default is 1).
     - `limit` (optional): Number of items per page (default is 10).
   - **Responses:**
     - `200 OK`: Returns a list of satellite images with pagination metadata.
     - `400 Bad Request`: Invalid query parameters.
     - `500 Internal Server Error`: Error fetching images.
   - **Example Request:**
     ```bash
     curl -X GET "http://localhost:3000/api/satellite-images?acquisitionDateStart=2025-01-01&acquisitionDateEnd=2025-02-01&sensor=MODIS&page=1&limit=10"
     ```
   - **Example Response:**
     ```json
     {
       "images": [
         {
           "catalogID": "12345",
           "acquisitionDateStart": "2025-01-15T10:00:00Z",
           "acquisitionDateEnd": "2025-01-15T12:00:00Z",
           "sensor": "MODIS",
           "resolution": 250,
           "cloudCoverage": 10,
           "geometry": { ... }
         },
         ...
       ],
       "pagination": {
         "totalItems": 100,
         "totalPages": 10,
         "currentPage": 1,
         "itemsPerPage": 10
       }
     }
     ```

2. **Create a New Satellite Image**

   - **Endpoint:** `POST /api/satellite-images`
   - **Description:** Creates a new satellite image record.
   - **Request Body:**
     ```json
     {
       "catalogID": "12345",
       "acquisitionDateStart": "2025-01-15T10:00:00Z",
       "acquisitionDateEnd": "2025-01-15T12:00:00Z",
       "sensor": "MODIS",
       "resolution": 250,
       "cloudCoverage": 10,
       "geometry": { ... }
     }
     ```
   - **Responses:**
     - `201 Created`: Image successfully created.
     - `400 Bad Request`: Invalid request body.
     - `500 Internal Server Error`: Error creating image.
   - **Example Request:**
     ```bash
     curl -X POST "http://localhost:3000/api/satellite-images" -H "Content-Type: application/json" -d '{"catalogID":"12345","acquisitionDateStart":"2025-01-15T10:00:00Z","acquisitionDateEnd":"2025-01-15T12:00:00Z","sensor":"MODIS","resolution":250,"cloudCoverage":10,"geometry":{...}}'
     ```
   - **Example Response:**
     ```json
     {
       "catalogID": "12345",
       "acquisitionDateStart": "2025-01-15T10:00:00Z",
       "acquisitionDateEnd": "2025-01-15T12:00:00Z",
       "sensor": "MODIS",
       "resolution": 250,
       "cloudCoverage": 10,
       "geometry": { ... }
     }
     ```

3. **Get Satellite Image by ID**

   - **Endpoint:** `GET /api/satellite-images/{id}`
   - **Description:** Retrieves a specific satellite image by its catalog ID.
   - **Parameters:**
     - `id` (required): The catalog ID of the satellite image.
   - **Responses:**
     - `200 OK`: Returns the satellite image details.
     - `404 Not Found`: Image not found.
     - `500 Internal Server Error`: Error fetching image.
   - **Example Request:**
     ```bash
     curl -X GET "http://localhost:3000/api/satellite-images/12345"
     ```
   - **Example Response:**
     ```json
     {
       "catalogID": "12345",
       "acquisitionDateStart": "2025-01-15T10:00:00Z",
       "acquisitionDateEnd": "2025-01-15T12:00:00Z",
       "sensor": "MODIS",
       "resolution": 250,
       "cloudCoverage": 10,
       "geometry": { ... }
     }
     ```

4. **Get All Orders**

   - **Endpoint:** `GET /api/orders`
   - **Description:** Retrieves a list of all orders.
   - **Responses:**
     - `200 OK`: Returns a list of orders.
     - `500 Internal Server Error`: Error fetching orders.
   - **Example Request:**
     ```bash
     curl -X GET "http://localhost:3000/api/orders"
     ```
   - **Example Response:**
     ```json
     [
       {
        "id": 1,
        "customerEmail": "test@example.com",
        "orderDate": "2025-02-03T16:54:58.552Z",
         "satelliteImage": { ... }
       },
       ...
     ]
     ```

5. **Create a New Order**

   - **Endpoint:** `POST /api/orders`
   - **Description:** Creates a new order.
   - **Request Body:**
     ```json
     {
       "email": "test@example.com",
       "imageId": "SAT985784"
     }
     ```
   - **Responses:**
     - `201 Created`: Order successfully created.
     - `400 Bad Request`: Invalid request body.
     - `500 Internal Server Error`: Error creating order.
   - **Example Request:**
     ```bash
     curl -X POST "http://localhost:3000/api/orders" -H "Content-Type: application/json" -d '{"email":"test@example.com","imageId":SAT985784}'
     ```
    Ensure that the satelliteImage ID corresponds to an existing satellite image in your database.