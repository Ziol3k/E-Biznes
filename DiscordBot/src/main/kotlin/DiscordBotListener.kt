package bot

import net.dv8tion.jda.api.JDABuilder
import net.dv8tion.jda.api.hooks.ListenerAdapter
import net.dv8tion.jda.api.events.message.MessageReceivedEvent
import javax.security.auth.login.LoginException


data class Category(val id: String, val name: String, val products: List<Product>)
data class Product(val id: String, val name: String)



class DiscordBotListener(private val botToken: String) : ListenerAdapter() {

    private val categories = listOf(
        Category(
            "1", "Elektronika", listOf(
                Product("1", "Laptop"),
                Product("2", "Smartfon")
            )
        ),
        Category(
            "2", "Książki", listOf(
                Product("3", "Książka o Kotlinie"),
                Product("4", "Książka o JavaScript")
            )
        ),
        Category(
            "3", "Odzież", listOf(
                Product("5", "T-shirt"),
                Product("6", "Dżinsy")
            )
        )
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
        } else if (command.startsWith("!getProducts", true)) {
            val categoryName = command.replace("!getProducts", "").trim()
            respondWithProductsForCategory(event, categoryName)
        }

    }

    private fun respondWithCategories(event: MessageReceivedEvent) {
        val categoryList = categories.joinToString("\n") { "- ${it.name}" }
        val responseMessage = "Dostępne kategorie:\n$categoryList"
        event.channel.sendMessage(responseMessage).queue()
    }

    private fun respondWithProductsForCategory(event: MessageReceivedEvent, categoryName: String) {
        val category = categories.find { it.name.equals(categoryName, true) }

        if (category != null) {
            val productList = category.products.joinToString("\n") { "- ${it.name}" }
            val responseMessage = "Produkty w kategorii ${category.name}:\n$productList"
            event.channel.sendMessage(responseMessage).queue()
        } else {
            event.channel.sendMessage("Nie znaleziono kategorii o nazwie '$categoryName'").queue()
        }
    }
}
