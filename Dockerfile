FROM resin/raspberry-pi-node:onbuild as builder-front
ENV INITSYSTEM on
COPY ./front /front
WORKDIR /front
RUN cd /front && npm install && npm run-script build

FROM resin/raspberry-pi-node:onbuild
ENV INITSYSTEM on
ENV NODE_ENV=prod
WORKDIR /app
COPY ./back /app/back/
COPY --from=builder-front front/dist /app/front/dist/
COPY --from=builder-front front/node_modules /app/front/dist/
RUN cd /app/back && npm install
CMD cd /app/back && node bin/www

EXPOSE 3000