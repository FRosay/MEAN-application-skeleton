FROM node:slim as builder-front
WORKDIR /front
COPY ./front /front
ENV INITSYSTEM on
RUN cd /front && npm install && npm run-script build

FROM node:slim
WORKDIR /app
COPY ./back /app/back/
COPY --from=builder-front front/dist /app/front/dist/
COPY --from=builder-front front/node_modules /app/front/dist/
ENV INITSYSTEM on
ENV NODE_ENV=prod
RUN cd /app/back && npm install
CMD cd /app/back && node bin/www
EXPOSE 3000