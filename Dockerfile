#############
### build ###
#############

# base image
FROM node:12.2.0 as build

ENV ENVIROMENT  production

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /src

# add `/app/node_modules/.bin` to $PATH
ENV PATH /src/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /src/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.22

RUN npm install -g rxjs@5.5.0
RUN npm install -g zone.js@0.8.4

RUN npm install -g @angular/core@5.0.0
RUN npm install -g @angular/common@5.0.0
RUN npm install -g ajv@^6.9.1

EXPOSE 80

# add app
COPY . /src
# run tests
#RUN ng test --watch=false
#RUN ng e2e --port 4202

# generate build
RUN ng build --output-path=dist --prod --aot --configuration ${ENVIROMENT}

############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine

COPY nginx/default.conf /etc/nginx/conf.d/

# copy artifact build from the 'build environment'
COPY --from=build /src/dist /usr/share/nginx/html

# expose port 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]