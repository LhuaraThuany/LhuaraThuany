FROM node:18-alpine

WORKDIR /app

# Copy root package.json
COPY package.json ./

# Install dependencies for both server and client
RUN npm install

# Copy server files
COPY server ./server
RUN cd server && npm install

# Copy client files  
COPY client ./client
RUN cd client && npm install && npm run build

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
