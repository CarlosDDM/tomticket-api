FROM node:23.6.1-alpine3.20

ENV PORT_DEAFULT=9443

WORKDIR /app

COPY  . .

RUN npm install

RUN npm install pm2 -g

VOLUME ["/app"]

EXPOSE ${PORT_DEAFULT}

CMD [ "pm2-runtime", "start", "--name", "tomticket-api", "npm", "--", "start" ]
