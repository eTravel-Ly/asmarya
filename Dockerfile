# Use node:18-alpine as base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/node-app

# Set environment variables
ENV NODE_SERVER_PORT=8080
ENV CYPRESS_INSTALL_BINARY=0

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the project
RUN npm run --workspace server build
RUN npm run --workspace client build

# Clean npm cache and temporary files
RUN npm cache clean --force
RUN rm -rf target tmp

# Expose port
EXPOSE 8080

# Start the application
ENTRYPOINT ["node", "/usr/node-app/server/dist/main.js"]
