FROM node:latest

# Start
WORKDIR ./app
COPY ./ ./

# Install
RUN npm install

# Expose ports 4200
EXPOSE 4200

# Finish
CMD npm start
