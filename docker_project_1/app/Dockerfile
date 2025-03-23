FROM ubuntu:24.04

RUN apt-get update && \
    apt-get install -y \
    openjdk-8-jdk \
    python3.10 \
    python3-pip \
    wget \
    unzip \
    curl \
    && apt-get clean

RUN wget https://github.com/JetBrains/kotlin/releases/download/v1.8.10/kotlin-compiler-1.8.10.zip && \
    unzip kotlin-compiler-1.8.10.zip -d /usr/local/ && \
    rm kotlin-compiler-1.8.10.zip

RUN wget https://services.gradle.org/distributions/gradle-7.5-bin.zip && \
    unzip gradle-7.5-bin.zip -d /opt/gradle && \
    rm gradle-7.5-bin.zip && \
    ln -s /opt/gradle/gradle-7.5/bin/gradle /usr/bin/gradle

ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV KOTLIN_HOME=/usr/local/kotlinc
ENV PATH="${JAVA_HOME}/bin:${KOTLIN_HOME}/bin:/opt/gradle/gradle-7.5/bin:${PATH}"

WORKDIR /app

COPY . .

RUN gradle build

CMD ["gradle", "run"]
