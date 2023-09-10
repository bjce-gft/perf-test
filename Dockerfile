FROM amazoncorretto:17.0.8-alpine3.18

# Add app user
ARG APPLICATION_USER=appuser
ARG APPLICATION_USER_ID=10001
RUN adduser --no-create-home -u $APPLICATION_USER_ID -D $APPLICATION_USER

# Configure working directory
RUN mkdir /app && \
    chown -R $APPLICATION_USER /app
USER $APPLICATION_USER_ID

WORKDIR /app
COPY --chown=$APPLICATION_USER_ID:$APPLICATION_USER_ID test-api/target/test-api-1.0-SNAPSHOT.jar app.jar

RUN ls /app

EXPOSE 3000 32500

ENTRYPOINT ["java", "-Dcom.sun.management.jmxremote.port=32500", "-Dcom.sun.management.jmxremote.rmi.port=32500", "-Dcom.sun.management.jmxremote.authenticate=false", "-Dcom.sun.management.jmxremote.ssl=false", "-Djava.rmi.server.hostname=127.0.0.1", "-jar", "app.jar"]