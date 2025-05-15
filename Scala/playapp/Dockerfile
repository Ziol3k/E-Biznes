FROM ubuntu:22.04
LABEL authors="jan_z"

RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    apt-get clean

WORKDIR /app

COPY . /app

RUN apt-get update && \
    apt-get install -y curl && \
    curl -L https://github.com/sbt/sbt/releases/download/v1.9.4/sbt-1.9.4.tgz | tar -xz -C /usr/local && \
    apt-get clean

ENV PATH="/usr/local/sbt/bin:${PATH}"

RUN sbt stage

CMD ["target/universal/stage/bin/playapp", "-Dplay.http.secret.key=your-secret-key"]

EXPOSE 9000
