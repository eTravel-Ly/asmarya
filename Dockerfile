FROM node:18-alpine

# Create app directory
WORKDIR /usr/node-app

ENV NODE_SERVER_PORT=8080
ENV CYPRESS_INSTALL_BINARY=0

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

RUN npm run --workspace server build
RUN npm run --workspace client build
RUN npm cache clean --force
RUN rm -rf target tmp

EXPOSE 8080

ENTRYPOINT ["node", "/usr/node-app/server/dist/main.js"]
