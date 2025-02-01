
# GEARNODE

[GEARNODE](https://gear-node.vercel.app)

## Overview

GEARNODE is an e-commerce site focused on motorbikes, specifically the scooter segment. It offers a wide variety of scooters to consumers.

## Features

1. Users can register and login, generating a JWT token with a default role (customer).
2. Anyone can explore all available products.
3. Only logged-in customers can purchase products within stock.
4. Customers can manage their orders and update profile information.
5. Admins can manage all users (customers), their orders, and GEARNODE products.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, TypeScript, ShadCN UI
- **Backend**: Node.js, Express, TypeScript, Mongoose
- **Database**: MongoDB
- **State Management**: Redux, RTK Query

## Resources

- [React Router](https://reactrouter.com/en/main)
- [ShadCN UI](http://ui.shadcn.com)
- [React Hook Form](https://reacthookform.com/)
- [Lottie React](https://lottiereact.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux](https://redux.dev)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

## How to Clone and Run

### 1. Clone Repositories

Clone both the client and server repositories to your computer:

```bash
git clone https://github.com/Md-Rashedul-Islam-Rajib/GearNode
git clone https://github.com/Md-Rashedul-Islam-Rajib/GearNode-The-Backend-Engine-for-Bike-Enthusiasts
```

### 2. Configure Backend Credentials

Replace the necessary environment variables in the `.env` file of the server repository:

```bash
PORT=Your Port
DB_URL=mongodb credentials
SALT_ROUND=12
JWT_ACCESS_SECRET=your secret
JWT_REFRESH_SECRET=your secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=10d
```

- Add your localhost URL to CORS in the `app.ts` file in the server repository.

### 3. Install Dependencies

Open both the client and server repository folders in the command line interface (CLI) and install the necessary npm packages by running:

```bash
pnpm install
```

### 4. Start the Server

Navigate to the server repository folder and start the server using `nodemon`:

```bash
cd GearNode-The-Backend-Engine-for-Bike-Enthusiasts
pnpm dev
```

### 5. Start the Client

Navigate to the client repository folder and start the client development server:

```bash
cd GearNode
pnpm dev
```

## Admin Credentials

- **Email**: admin@gearnode.com
- **Password**: 123456
