plugins {
    kotlin("jvm") version "1.9.10"
    kotlin("plugin.serialization") version "1.9.10" // Zaktualizowana wersja pluginu
    application
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-client-core:$ktorVersion")
    implementation("io.ktor:ktor-client-cio:$ktorVersion")
    implementation("io.ktor:ktor-client-content-negotiation:$ktorVersion")
    implementation("io.ktor:ktor-serialization-kotlinx-json:$ktorVersion")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:$serializationVersion")
    implementation("ch.qos.logback:logback-classic:$logbackVersion")
    implementation("com.typesafe:config:$configVersion")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:$coroutinesVersion")
    implementation("net.dv8tion:JDA:$jdaVersion")
}

tasks.test {
    useJUnitPlatform()
}

application {
    mainClass.set("bot.ApplicationKt")
}

kotlin {
    jvmToolchain(17)
}
