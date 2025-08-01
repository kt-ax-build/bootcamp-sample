FROM gradle:8.10.2-jdk17-focal AS build
WORKDIR /build

COPY build.gradle settings.gradle /build/
COPY src ./src

RUN gradle build -x test --build-cache
RUN ls -al /build/build/libs/

FROM mcr.microsoft.com/openjdk/jdk:17-mariner
COPY --from=build /build/build/libs/bootcamp-sample-be-0.0.1-SNAPSHOT.jar /app/bin/app.jar

CMD ["java", "-jar", "/app/bin/app.jar"]
