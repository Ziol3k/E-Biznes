package bot

import com.typesafe.config.ConfigFactory
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext
import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Message(val content: String)

class DiscordBotClient(private val botToken: String, private val channelId: String) {
    private val client = HttpClient(CIO)

    suspend fun sendMessage(message: String): HttpResponse {
        val jsonMessage = Json.encodeToString(Message(message))

        return withContext(Dispatchers.IO) {
            client.post("https://discord.com/api/v10/channels/$channelId/messages") {
                headers {
                    append(HttpHeaders.Authorization, "Bot $botToken")
                }
                contentType(ContentType.Application.Json)
                setBody(jsonMessage)
            }
        }
    }
}

fun main() {
    val config = ConfigFactory.load()
    val botToken = config.getString("bot.token")
    val channelId = config.getString("bot.channelId")

    if (botToken.isEmpty() || channelId.isEmpty()) {
        println("Błąd: Token bota lub ID kanału nie zostały ustawione.")
        return
    }

    val discordClient = DiscordBotClient(botToken, channelId)
    val message = "Hello from my bot!"

    runBlocking {
        try {
            val response = discordClient.sendMessage(message)
            println("Wiadomość wysłana: ${response.status}")
        } catch (e: Exception) {
            println("Wystąpił błąd: ${e.message}")
        }
    }
}
