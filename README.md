# Chapters Frontend

This is a Next.js frontend application for the Chapters project. It includes configurations for both development and production environments using Docker and Docker Compose.

## Prerequisites

- Docker (for run the application in a container)
- Node.js (for local development)

## Getting Started

### Development

To run the application in development mode:

1. Clone the repository:

    ```sh
    git clone https://github.com/HRS0986/chapters-frontend.git
    cd chapters-frontend
    ```
2. Install the dependencies:

    ```sh
    npm install
    ```

3. Start the development server:
   + Using npm: 
    
       ```sh
       npm run dev
       ```
   + Using Docker Compose:
     
        ```sh
        docker-compose -f docker-compose.dev.yml up
        ```
      

4. Open your browser and navigate to `http://localhost:3000`.

### Running in a Container

To run the application in a container:

1. Pull the image from Docker Hub:

    ```sh
    docker pull hirushafernando/chapters-frontend
    ```
   
2. Run the container:

    ```sh
    docker run -d -p 3000:3000 hirushafernando/chapters-frontend
    ```

3. Open your browser and navigate to `http://localhost:3000`.