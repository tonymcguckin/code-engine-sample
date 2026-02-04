# hadolint ignore=DL3007
FROM registry.access.redhat.com/ubi8/nodejs-20-minimal:latest
USER root

RUN microdnf -y upgrade && microdnf clean all
# Install the application
COPY package.json /app/package.json
COPY app.js /app/app.js
COPY utils.js /app/utils.js
WORKDIR /app
RUN npm install

ENV PORT 8080

USER 1001
EXPOSE 8080
CMD ["node", "app.js"]
