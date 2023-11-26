FROM node:18.17.1-alpine3.18

# Create app directory
WORKDIR /usr/src/marketplace-backend

# Install app dependencies
COPY package*.json ./

RUN npm install -g npm@latest
#RUN npm install --production

# Copy your application code
COPY . .

# Expose the port
EXPOSE 3001

# Start your application
CMD ["npm", "start"]




