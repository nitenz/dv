# get the base node image
FROM node:alpine as builder
#Creating a new directory for app files and setting path in the container
RUN mkdir -p /client
# set the working dir for container
WORKDIR /client
COPY client/package.json /client
COPY client/yarn.lock /client
RUN npm install -g
RUN yarn install
COPY . .
#container exposed network port number
EXPOSE 3000
# build the folder
CMD [ "npm", "run", "start" ]