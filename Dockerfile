FROM node:18-alpine

WORKDIR /app

# Copy entire project first
COPY . .

# Install dependencies
RUN npm install

EXPOSE 9000

CMD ["npm", "run", "dev"]
