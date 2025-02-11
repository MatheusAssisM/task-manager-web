# Task Manager Web Application

A modern task management application built with Vue.js and Quasar Framework, featuring user authentication and real-time task management capabilities.

## Features

- User authentication (login, register, password reset)
- Task management (create, read, update, delete)
- Task status toggling
- Responsive design
- Real-time notifications
- Protected routes

## Tech Stack

- Vue.js 3
- Quasar Framework
- Pinia for state management
- Vue Router for navigation
- Axios for API communication

## Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm package manager
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` file and adjust the variables if needed:
```
API_URL=http://localhost:8000
```

## Running the Application

### Development Mode

1. Using NPM/Yarn:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:9000`

2. Using Docker Compose:
```bash
# Build and start the containers
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d

# Stop the containers
docker-compose down

# View logs
docker-compose logs -f
```

The application will be available at `http://localhost:9000`

### Production Build

1. Using NPM/Yarn:
```bash
npm run build
# or
yarn build
# or
pnpm build
```

2. Using Docker:
```bash
# Build the image
docker build -t task-manager-web .

# Run the container
docker run -p 9000:9000 task-manager-web
```

## Project Structure

- `/src` - Application source code
  - `/assets` - Static assets
  - `/boot` - Boot files (Axios configuration, etc.)
  - `/components` - Reusable Vue components
  - `/layouts` - Application layouts
  - `/pages` - Application pages/views
  - `/router` - Vue Router configuration
  - `/stores` - Pinia stores for state management
  - `/css` - Global CSS styles

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
