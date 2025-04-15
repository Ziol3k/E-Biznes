# E-Biznes

## Zadanie 1: Docker

### Opis zadania

✅ 3.0 Obraz Ubuntu z Pythonem w wersji 3.10

✅ 3.5 Obraz Ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem

✅ 4.0 Do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC SQLite w ramach projektu na Gradle (build.gradle)

✅ 4.5 Stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz Gradle

❌ 5.0 Dodać konfigurację docker-compose

[Kod:](https://github.com/Ziol3k/E-Biznes/tree/master/docker_project_1/app)

### Link do obrazu

Link do obrazu na Docker Hub: [Obraz dockerhub](https://hub.docker.com/r/ziol3k/ex1-image/tags)

## Zadanie 2 Play + Scala

✅ 3.0 [Należy stworzyć kontroler do Produktów](https://github.com/Ziol3k/E-Biznes/commit/9382c9765e87b35db04b9e3245b5b17a2b063a2e)

✅ 3.5 [Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane pobierane z listy](https://github.com/Ziol3k/E-Biznes/commit/06a01831855dca412e6c354ce9d1395e2f092ca3)

✅ 4.0  [Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy zgodnie z CRUD](https://github.com/Ziol3k/E-Biznes/commit/857f153e93c12070fb525bfbccbbe63cd9db79dc#diff-49d22ae5b3cc23b77fa7c01b235c6729f858baf4a980d49318ac41b78086d373)

✅ 4.5 [Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać skrypt uruchamiający aplikację via ngrok](https://github.com/Ziol3k/E-Biznes/commit/e798dfd629cdaca3f24b3b108ea63fa245b6ec3c)

✅ 5.0 [Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD](https://github.com/Ziol3k/E-Biznes/commit/b6165e169bd2be45d51fa35e1dcad8cd7904c5d0)

[Kod:](https://github.com/Ziol3k/E-Biznes/tree/master/Scala/playapp)


## Zadanie 3 Discord Bot

✅ 3.0 [Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor, która pozwala na przesyłanie wiadomości na platformę Discord](https://github.com/Ziol3k/E-Biznes/commit/5698c64e8142bafebab8c57422caec1656eca4f6)

✅ 3.5 [Aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota)](https://github.com/Ziol3k/E-Biznes/commit/d755ae6fcb1f343051f150f81233a6a27039dc2e)

✅ 4.0  [Zwróci listę kategorii na określone żądanie użytkownika](https://github.com/Ziol3k/E-Biznes/commit/ec2a50a14b6d08c0256323f3644a7bc0ae05a5ec)

✅ 4.5 [Zwróci listę produktów wg żądanej kategorii](https://github.com/Ziol3k/E-Biznes/commit/a1e2e4a52f8c9f7f33fd55d0fa19b2acfc198f5d)

❌ 5.0 [Aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger, Webex]

[Kod:](https://github.com/Ziol3k/E-Biznes/tree/master/DiscordBot/src/main/kotlin)

[Demo](Demos/Demo_zadanie_3.mp4)


## Zadanie 4 GO + GORM
✅ 3.0 [Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD](https://github.com/Ziol3k/E-Biznes/commit/682e9b5da0fd94e9948e023d2cc6563117d8ef23)

✅ 3.5 [Należy stworzyć model Produktów wykorzystując gorm oraz wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast listy)](https://github.com/Ziol3k/E-Biznes/commit/682e9b5da0fd94e9948e023d2cc6563117d8ef23)

✅ 4.0  [Należy dodać model Koszyka oraz dodać odpowiedni endpoint](https://github.com/Ziol3k/E-Biznes/commit/e39431f27b683df669f8b5f58562fc72748058d3)

✅ 4.5 [Należy stworzyć model kategorii i dodać relację między kategorią, a produktem](https://github.com/Ziol3k/E-Biznes/commit/f9fe1f73bc53dede97daa8c0791922eb3bcf358b)

✅ 5.0 [pogrupować zapytania w gorm’owe scope'y](https://github.com/Ziol3k/E-Biznes/commit/8e9a64e30a4137597ff5fe3827d6049b59b847bf)

[Kod:](https://github.com/Ziol3k/E-Biznes/tree/master/Go_GROM)

[Demo](https://github.com/Ziol3k/E-Biznes/blob/master/Demos/Zadanie_4_Demo.mp4)
