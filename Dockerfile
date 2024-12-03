# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /visit-service/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the NestJS port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
