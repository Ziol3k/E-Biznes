package bot

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.coroutines.Dispatchers
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


