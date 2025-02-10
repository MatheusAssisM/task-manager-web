FROM node:18-alpine

WORKDIR /app

<<<<<<< HEAD
# Copy env file first
COPY .env .env

# Copy entire project
=======
# Copy entire project first
>>>>>>> afea12c (Add Docker configuration and example environment file)
COPY . .

# Install dependencies
RUN npm install

EXPOSE 9000

CMD ["npm", "run", "dev"]
