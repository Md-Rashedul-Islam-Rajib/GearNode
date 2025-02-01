# GEARNODE

-[GEARNODE](https://gear-node.vercel.app)

Overview : <br/> <br/>
GEARNODE is a e-commerce site focus on motor bikes specially scooter segment.It has wide variety of scooter to offer their consumers.

Features: 

1. User can register and login generate JWT token with a default role (customer).
2. Anyone can explore all of the products
3. Only logged in customer make purchase any product within the stock.
4. Customer make manage their orders and update profile info.
5. Admin can manage all the users (customers), their orders and GEARNODE products.


Technologies Used:

- Front End : React, Vite, Tailwind CSS, TypeScript, Shadcn UI
- Back End : NodeJs, Express, TypeScript, Mongoose
- Data Base :  MongoDB
- State Management : Redux, RTK Query


Resources :

- [React Router](https://reactrouter.com/en/main)
- [Shadcn UI](http://ui.shadcn.com)
- [React Hook Form](https://swiperjs.com/react)
- [Lottie React](https://lottiereact.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Redux](https://redux.dev)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)


## How to Clone and Run

1. **Clone Repositories**
   - Clone both repositories to your computer:
     ```bash
     git clone https://github.com/Md-Rashedul-Islam-Rajib/GearNode
     git clone https://github.com/Md-Rashedul-Islam-Rajib/GearNode-The-Backend-Engine-for-Bike-Enthusiasts
     ```


2. **Configure Backend Credentials**
   - Replace your necessary environment variables in `.env` file in the server repository like this
   ```bash
   PORT=Your Port
DB_URL=mongodb credentials
SALT_ROUND=12
JWT_ACCESS_SECRET=your secret
JWT_REFRESH_SECRET=your secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=10d
   ```

   - Add your localhost URL to CORS in `app.ts` file in the server repository.

3. **Install Dependencies**
   - Open both the clients and server repository folders in the command line interface (CLI).
   - Install necessary npm packages by running:
     ```bash
     pnpm install
     ```

4. **Start the Server**
   - Navigate to the server repository folder and start the server using nodemon:
     ```bash
     cd GearNode-The-Backend-Engine-for-Bike-Enthusiasts
     pnpm dev
     ```

6. **Start the Client**
   - Navigate to the clients repository folder and start the client development server:
     ```bash
     cd GearNode
     pnpm dev
     ```

     admin credentials: 
     email : admin@gearnode.com
     password : 123456
