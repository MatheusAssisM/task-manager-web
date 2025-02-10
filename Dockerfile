FROM node:18-alpine

WORKDIR /app

# Copy env file first
COPY .env .env

# Copy entire project
COPY . .

# Install dependencies
RUN npm install

EXPOSE 9000

CMD ["npm", "run", "dev"]
