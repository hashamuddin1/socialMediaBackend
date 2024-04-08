# First Install Nodejs parent or base image.
FROM node:latest

# Install Nodemon
RUN npm i -g nodemon

# SET WORKING DIRECTORY
WORKDIR /src

# Now write COPY <SOURCE: MEANS WHERE IS YOUR CODE . MEANS ROOT DIRECTORY> <DESTINATION: MEANS WHERE YOU WANT TO INSERT YOUR CODE IN YOUR IMAGE . MEANS IN ROOT DIRECTORY>
COPY . .

# Install all dependencies and node_modules
RUN npm i

# ASSIGN PORT NUMBER TO THIS APP
EXPOSE 6000

# TO RUN THIS PROJECT IN COMMAND LINE
CMD ["npm", "run","start"]

# To Create Image of this Project write this command on terminal
# docker build -t basic-node-project .
