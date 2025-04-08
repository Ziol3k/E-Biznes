package bot

import net.dv8tion.jda.api.EmbedBuilder
import net.dv8tion.jda.api.JDABuilder
import net.dv8tion.jda.api.entities.Message
import net.dv8tion.jda.api.hooks.ListenerAdapter
import net.dv8tion.jda.api.events.message.MessageReceivedEvent
import javax.security.auth.login.LoginException

class DiscordBotListener(private val botToken: String) : ListenerAdapter() {

    private val categories = listOf(
        Category("1", "Elektronika"),
        Category("2", "Książki"),
        Category("3", "Odzież")
    )

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

        val command = receivedMessage.replace(Regex("<@!?\\d+>"), "").trim()

        if (command.equals("!getCategories", true)) {
            respondWithCategories(event)
        }

    }

    private fun respondWithCategories(event: MessageReceivedEvent) {
        val categoryList = categories.joinToString("\n") { "- ${it.name}" }
        val responseMessage = "Dostępne kategorie:\n$categoryList"
        event.channel.sendMessage(responseMessage).queue()
    }
}
