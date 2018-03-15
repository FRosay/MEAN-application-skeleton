FROM arm32v7/node as builder-front
COPY ./front /front
WORKDIR /front
RUN cd /front && npm install && npm run-script build

FROM arm32v7/node
WORKDIR /app
COPY ./back /app/back/
COPY --from=builder-front front/dist /app/front/dist/
COPY --from=builder-front front/node_modules /app/front/dist/
RUN cd /app/back && npm install
CMD cd /app/back && export NODE_ENV=prod && node bin/www

EXPOSE 3000