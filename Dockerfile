FROM node:18-alpine

WORKDIR /app

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 344d261 (Update Dockerfile to copy .env file before project files)
# Copy env file first
COPY .env .env

# Copy entire project
<<<<<<< HEAD
=======
# Copy entire project first
>>>>>>> afea12c (Add Docker configuration and example environment file)
=======
>>>>>>> 344d261 (Update Dockerfile to copy .env file before project files)
COPY . .

# Install dependencies
RUN npm install

EXPOSE 9000

CMD ["npm", "run", "dev"]
