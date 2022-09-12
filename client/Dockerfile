# get the base node image
FROM node:alpine as builder
# set the working dir for container
WORKDIR /client
COPY package.json .
COPY yarn.lock .
RUN npm install -g
RUN yarn install
COPY . ./
#container exposed network port number
EXPOSE 3000
# build the folder
CMD [ "npm", "run", "start" ]