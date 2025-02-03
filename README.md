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

**Available Endpoints:**

- **GET** `/api/satellite-images`: Retrieve all satellite images.
- **GET** `/api/satellite-images/:id`: Retrieve a specific satellite image by ID.
- **GET** `/api/orders`: Retrieve all orders.
- **POST** `/api/orders`: Create a new order.

**Example Request:**

To create a new order, send a POST request to `/api/orders` with the following JSON body:

```json
{
  "customerName": "John Doe",
  "orderDate": "2025-02-03T16:49:23Z",
  "satelliteImage": 1
}
```

Ensure that the `satelliteImage` ID corresponds to an existing satellite image in your database.

## Additional Information

- **TypeORM Configuration**: The `ormconfig.json` file contains the configuration for TypeORM and PostgreSQL.
- **Docker Compose**: The `docker-compose.yml` file defines the PostgreSQL service and the application container.

For more detailed information on setting up a Node.js, TypeScript, PostgreSQL, and Docker environment, you can refer to this tutorial: ([dev.to](https://dev.to/chandrapantachhetri/docker-postgres-node-typescript-setup-47db?utm_source=chatgpt.com))

## License

This project is licensed under the MIT License.

Feel free to modify and distribute the code as per your requirements.

## Acknowledgments

This project was inspired by various tutorials on setting up Node.js applications with TypeScript and PostgreSQL.

Special thanks to the contributors of the [Docker, Postgres, Node, Typescript Setup](https://dev.to/chandrapantachhetri/docker-postgres-node-typescript-setup-47db) tutorial for their valuable insights.

For a visual walkthrough of setting up a Node.js, TypeScript, PostgreSQL application with Docker, you might find this video helpful:

[Ultimate Typescript/Node/Docker Setup: Step-by-Step (2023)](https://www.youtube.com/watch?v=yuTrHeDYY3E&utm_source=chatgpt.com) 