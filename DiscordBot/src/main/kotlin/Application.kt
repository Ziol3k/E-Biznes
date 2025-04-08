package bot

import com.typesafe.config.ConfigFactory
import kotlinx.coroutines.runBlocking


fun main() {
    val config = ConfigFactory.load()
    val botToken = config.getString("discord.token")
    val channelId = config.getString("discord.channelId")

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

    DiscordBotListener(botToken)

}
