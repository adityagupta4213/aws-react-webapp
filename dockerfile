# Use an official Node runtime as a base image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Set NODE_OPTIONS
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Install app dependencies
RUN npm install

# Copy the server code to the working directory
COPY . .

# Change to the client directory and build the React app
WORKDIR /app/client
RUN npm install
RUN npm run build

# Move back to the main working directory
WORKDIR /app

# Expose the port that the server will run on
EXPOSE 80

# Command to run the server
CMD ["npm", "run", "server"]
