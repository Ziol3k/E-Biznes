package bot

import net.dv8tion.jda.api.EmbedBuilder
import net.dv8tion.jda.api.JDABuilder
import net.dv8tion.jda.api.entities.Message
import net.dv8tion.jda.api.hooks.ListenerAdapter
import net.dv8tion.jda.api.events.message.MessageReceivedEvent
import javax.security.auth.login.LoginException

class DiscordBotListener(private val botToken: String) : ListenerAdapter() {

    init {
        try {
            JDABuilder.createDefault(botToken)
                .addEventListeners(this)
                .build()
        } catch (e: LoginException) {
            println("Nie udało się zalogować: ${e.message}")
        }
    }

    override fun onMessageReceived(event: MessageReceivedEvent) {
        val message: Message = event.message
        if (message.author.isBot) {
            return
        }

        val receivedMessage = message.contentRaw
        println("Otrzymano wiadomość: $receivedMessage")

    }
}
