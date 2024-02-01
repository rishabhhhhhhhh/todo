# How to test this todo project?

This project is deployed on vercel. To test feature of this project you can either run it locally as mentioned below or you can visit deployed version(https://todo-three-pink.vercel.app).

# How to run frontend?

1. update constants.js file to comment vercel SERVER_URL and uncomment local one.
2. npm run install-client
3. npm run start-client

# How to run server?

1. Add .env file in server directory
   (a.) Add "PORT" value (3001).
   (b.) Add "JWT_SECRET" (any random string).
   (c.) Add "MONGO_URL" (connection string to Mongo DB).
2. npm run install-server
3. npm run start-server
