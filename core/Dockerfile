FROM node:16-alpine

WORKDIR /src/app

RUN apk add --no-cache wget curl base-devel

# copying project into container
COPY package.json yarn.lock /src/app/
RUN yarn install
COPY --chown=node . .
RUN chmod +x init.sh

USER node
ENTRYPOINT [ "./init.sh" ]
