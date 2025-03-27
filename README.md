# Dot Test - Next.js Application

A modern web application built with Next.js 15, featuring authentication, shop functionality, and task management.

## Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Y0SH4/dot-test.git
cd dot-test
```

2. Install dependencies:
```bash
pnpm install
# or
npm install

```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dummy Data

### Authentication
You can use these dummy accounts for testing:

```json
{
  "user": {
    "email": "user@example.com",
    "password": "user123"
  }
}
```

### Products (Shop)
Sample product data structure:
```json
{
  "products": [
    {
      "id": "1",
      "name": "Sample Product 1",
      "price": 1499000,
      "description": "This is a sample product description",
      "image": "https://images.unsplash.com/photo-1"
    },
    {
      "id": "2",
      "name": "Sample Product 2",
      "price": 2499000,
      "description": "Another sample product description",
      "image": "https://images.unsplash.com/photo-2"
    }
  ]
}
```

### Tasks
Sample task data structure:
```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Complete project documentation",
      "description": "Write comprehensive documentation for the project",
      "status": "pending",
      "dueDate": "2024-03-30"
    },
    {
      "id": "2",
      "title": "Implement user authentication",
      "description": "Set up NextAuth.js with proper authentication flow",
      "status": "completed",
      "dueDate": "2024-03-25"
    }
  ]
}
```

## Project Structure

```
dot-test/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (shop)/            # Shop related routes
│   ├── tasks/             # Task management routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── common/           # Common UI components
│   ├── layout/           # Layout components
│   ├── shop/             # Shop related components
│   ├── tasks/            # Task related components
│   └── ui/               # UI components (shadcn)
├── lib/                   # Utility functions and hooks
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand store
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── types/                # TypeScript type definitions
└── middleware.ts         # Next.js middleware
```

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

# dot-test
# dot-test
