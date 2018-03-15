FROM node:slim as builder-front
COPY ./front /front
WORKDIR /front
RUN cd /front && npm install && npm run-script build

FROM node:slim
WORKDIR /app
COPY ./back /app/back/
COPY --from=builder-front front/dist /app/front/dist/
COPY --from=builder-front front/node_modules /app/front/dist/
RUN cd /app/back && npm install
CMD cd /app/back && npm run-script start-prod

EXPOSE 3000