FROM node:18-alpine
WORKDIR /server
COPY package*.json /server/
COPY config/ /server/config
COPY tasks/ /server/tasks
COPY package*.json /server/
COPY helpers.js /server/
COPY resolvers.js /server/
COPY server.js /server/
COPY typeDefs.js /server/

RUN npm install
 
EXPOSE 4000

# Run the app when the container launches
CMD ["npm", "start"]