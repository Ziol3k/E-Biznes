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

Link do obrazu na Docker Hub: [Obraz dockerhub](https://hub.docker.com/r/ziol3k/ex1-image)

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


https://github.com/user-attachments/assets/93548ffa-b33f-4ae0-9f47-5f5dd9ce9558



## Zadanie 4 GO + GORM

✅ 3.0 [Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD](https://github.com/Ziol3k/E-Biznes/commit/682e9b5da0fd94e9948e023d2cc6563117d8ef23)

✅ 3.5 [Należy stworzyć model Produktów wykorzystując gorm oraz wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast listy)](https://github.com/Ziol3k/E-Biznes/commit/682e9b5da0fd94e9948e023d2cc6563117d8ef23)

✅ 4.0  [Należy dodać model Koszyka oraz dodać odpowiedni endpoint](https://github.com/Ziol3k/E-Biznes/commit/e39431f27b683df669f8b5f58562fc72748058d3)

✅ 4.5 [Należy stworzyć model kategorii i dodać relację między kategorią, a produktem](https://github.com/Ziol3k/E-Biznes/commit/f9fe1f73bc53dede97daa8c0791922eb3bcf358b)

✅ 5.0 [pogrupować zapytania w gorm’owe scope'y](https://github.com/Ziol3k/E-Biznes/commit/8e9a64e30a4137597ff5fe3827d6049b59b847bf)

[Kod:](https://github.com/Ziol3k/E-Biznes/tree/master/Go_GROM)

[Demo](https://github.com/Ziol3k/E-Biznes/blob/master/Demos/Zadanie_4_Demo.mp4)


https://github.com/user-attachments/assets/8ef10fc3-dc47-475e-b49b-6494897f2d41


## Zadanie 5 Frontend

✅ 3.0 [3.0 W ramach projektu należy stworzyć dwa komponenty: Produkty oraz Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach z aplikacji serwerowej](https://github.com/Ziol3k/E-Biznes/commit/4c306deb30fc9a89256c29d74420425efb64bc1c)

✅ 3.5 [Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing](https://github.com/Ziol3k/E-Biznes/commit/66aca90a34766e1e784c121ac0f05b779fea1515)

✅ 4.0  [Dane pomiędzy wszystkimi komponentami powinny być przesyłane za pomocą React hooks](https://github.com/Ziol3k/E-Biznes/commit/66aca90a34766e1e784c121ac0f05b779fea1515)

✅ 4.5 [Należy dodać skrypt uruchamiający aplikację serwerową oraz kliencką na dockerze via docker-compose](https://github.com/Ziol3k/E-Biznes/commit/4c8dec64174026954fe697981d1e54a3fa820679)

✅ 5.0 [Należy wykorzystać axios’a oraz dodać nagłówki pod CORS](https://github.com/Ziol3k/E-Biznes/commit/4c8dec64174026954fe697981d1e54a3fa820679)

[Kod:](https://github.com/Ziol3k/E-Biznes/tree/master/React)

[Obraz dockerhub klient](https://hub.docker.com/r/ziol3k/react-client)

[Obraz dockerhub server](https://hub.docker.com/r/ziol3k/react-server)

[Demo](Demos/Demo_zadanie_5.mp4)


https://github.com/user-attachments/assets/e7e195b5-6a45-455a-824a-08b734f58511


## Zadanie 6 Testy

✅ 3.0 [3.0 Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium (Kotlin, Python, Java, JS, Go, Scala)](https://github.com/Ziol3k/E-Biznes/commit/7a93896fc03c7d15bb964c5ea0a43a623e07a120)

✅ 3.5 [Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50 asercji](https://github.com/Ziol3k/E-Biznes/commit/7a93896fc03c7d15bb964c5ea0a43a623e07a120)

❌ 4.0  [Należy stworzyć testy jednostkowe do wybranego wcześniejszego projektu z minimum 50 asercjami]()

❌ 4.5 [Należy dodać testy API, należy pokryć wszystkie endpointy z minimum jednym scenariuszem negatywnym per endpoint]()

❌ 5.0 [Należy uruchomić testy funkcjonalne na Browserstacku]()

[Kod:](https://github.com/Ziol3k/E-Biznes/tree/master/tests)

[Demo](Demos/Demo_zadanie_6.mp4)


https://github.com/user-attachments/assets/f3c7782e-ba2e-4ed4-a79f-657f52092939


## Zadanie 7 Sonar
❗❗❗ W tym zadaniu poprawiłem całe repozytorium E-Biznes, Sonar pokazuje duże potworzenie kodu, które zostawiam ze względu na rozdzielenie kodu na posszczególne zadania - tak żeby nie było wątpliwości kiedy je wykonywałem ❗❗❗

Do polecenia poprawiłem kod serweera i klienta z zadania 5 - link do kodu poniżej

✅ 3.0 [Należy dodać litera do odpowiedniego kodu aplikacji serwerowej w hookach gita](https://github.com/Ziol3k/E-Biznes/commit/a84fb54511591c708747e3e283a4deee33579245)
    [Commit 2](https://github.com/Ziol3k/E-Biznes/commit/9b0f834624493c8c7079a96bbed1d993c5a3672e)

✅ 3.5 [Należy wyeliminować wszystkie bugi w kodzie w Sonarze (kod aplikacji serwerowej](https://github.com/Ziol3k/E-Biznes/commit/5c59c48c06dffaee9d1487c9f857b728e78112b2)

✅ 4.0  [Należy wyeliminować wszystkie zapaszki w kodzie w Sonarze (kod aplikacji serwerowej)](https://github.com/Ziol3k/E-Biznes/commit/5c59c48c06dffaee9d1487c9f857b728e78112b2)

✅ 4.5 [Należy wyeliminować wszystkie podatności oraz błędy bezpieczeństwa w kodzie w Sonarze (kod aplikacji serwerowej)](https://github.com/Ziol3k/E-Biznes/commit/5c59c48c06dffaee9d1487c9f857b728e78112b2)

✅ 5.0 [Należy wyeliminować wszystkie błędy oraz zapaszki w kodzie aplikacji klienckiej](https://github.com/Ziol3k/E-Biznes/commit/5c59c48c06dffaee9d1487c9f857b728e78112b2)

Ze względu na poprawianie błędów etapami podaję pozostaałe commity tutaj:

[commit 1](https://github.com/Ziol3k/E-Biznes/commit/e6f1acaeb52a481dc8d1df0099aac6a7bce5a39f)

[commit 2](https://github.com/Ziol3k/E-Biznes/commit/d734ed8ea485c784f229ca4463eca78b79532b82)

[commit 3](https://github.com/Ziol3k/E-Biznes/commit/44d14d60e124ea89b5a87c5dc731dd399696f77b)

[Kod serwera:](https://github.com/Ziol3k/E-Biznes/tree/master/React/server)

[Kod klienta:](https://github.com/Ziol3k/E-Biznes/tree/master/React/client)

[Demo](Demos/Demo_zadanie_7.mp4)


https://github.com/user-attachments/assets/92133d8c-ddf8-4fcb-988f-b5530ebe1efd


## Zadanie 8 Oauth2

❌ 3.0 [logowanie przez aplikację serwerową (bez Oauth2)]()

❌ 3.5 [rejestracja przez aplikację serwerową (bez Oauth2)]()

❌ 4.0  [logowanie via Google OAuth2]()

❌ 4.5 [logowanie via Facebook lub Github OAuth2]()

❌ 5.0 [zapisywanie danych logowania OAuth2 po stronie serwera]()

[Kod:]()

[Demo]()
