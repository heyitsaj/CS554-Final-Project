FROM node:18-alpine
WORKDIR /react
COPY public/ /react/public
COPY src/ /react/src
COPY package.json /react/
COPY index.html /react/
COPY vite.config.js /react/
EXPOSE 5173
RUN npm install
CMD ["npm", "run", "dev"]
