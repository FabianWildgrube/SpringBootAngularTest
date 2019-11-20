# SE QPlix Projekt Team02 - Small test App

Diese App ist ein kleiner Test, der unsere Infrastruktur prototypisch modelliert. Das Backend wird von einem Springboot MVC Server bereitgestellt und served das Frontend (Angular App). Das Frontend ist als separates Projekt gehalten und wird über den Gradle Build-Prozess in ein jar verpackt, welches der Server als Dependency angibt.

## CI/CD Setup

* Travis für Automatisierte Builds & Tests bei jedem Push.
* Heroku zum hosten des aktuell laufenden builds.

Travis CI führt automatisch Build&Tests aus, wenn ein neuer Push auf den master kommt. Falls der build problemlos durchläuft deployed es die neue Version nach Heroku.

Live Heroku Deployment: https://fabians-first-spring-angular.herokuapp.com/

## Travis CI
CI Service, der eng mit Github verknüpft ist. Repos, für die man Travis aktiviert werden nach jedem push automatisch in einem virtualisierten Environment gebaut, welches komplett clean ist und bei jedem Build neu hoch gefahren wird.

Man meldet sich mit seinem Github Account an, gewährt Travis Zugriff auf das Repo, das man continuous integrieren will und dann ist man auch schon größtenteils fertig, was setup über die Weboberfläche angeht.

Um ein Projekt "CI-ready" zu machen, muss man jetzt ein ```.travis.yml``` File im root des Repos anlegen. Dieses File erklärt Travis wie das Projekt gebaut werden soll, bzw. worauf es Umgebungstechnisch dependet (sprich ist es ein Ruby/Node/Java/... Projekt. Falls Java, welches JDK braucht es, etc.

Für eine sehr basic Spring Boot MVC Applikation (sprich ein webserver basierend auf Spring) sieht die .travis.yml sehr einfach aus:

```
language: java
jdk: openjdk8
```

Travis erkennt automatisch, dass es sich um eine mit gradle gemanagedte Applikation handelt und baut sie entsprechend.

## Heroku
Heroku ist eine Deployment-Plattform. Sprich ein Repo wird gebaut und dann auf einem Server mit einer public url am laufen gehalten, sodass man die Website/-app benutzen kann. Das coole ist, dass man Heroku mit einem Github-Repo verbinden kann und automatisch in verschiedene Environments (Staging/Production) deployen kann, wenn zB auf ```master``` ein neuer push erfolgt ist.

PROBLEM: Heroku lässt per Default keine Tests laufen. Heroku bietet zwar auch CI Funktionalität wie Jenkins an, allerdings nur zu einem Preis von >10%/Monat.

=> Netterweise kann man Travis sagen, dass ein Projekt nach erfolgreichem Build&Test bitte nach Heroku deployed werden soll. 

## Links
* [Travis CI](https://travis-ci.org/)
* [Travis Terminal Client](https://github.com/travis-ci/travis.rb)
* [Heroku](https://www.heroku.com/)
* [Heroku Terminal Client](https://devcenter.heroku.com/articles/heroku-cli)
* [Deploy from Travis to Heroku](https://docs.travis-ci.com/user/deployment/heroku/)

_________________________________

## Gotchas, die aufgefallen sind

* To build angular app on Travis make fsevents dependency optional. This dependency is not available on linux, however, it is not critical for a angular build. So making it optional prevents npm from throwing an error when it can't install it
```npm i fsevents@latest -f --save-optional```

* Da das Projekt ein Multi-Projekt Gradle Projekt ist, checkt Heroku nicht von alleine, was es machen soll. Man muss den default Task von "stage" zu "build" ändern und ein Procfile hinterlegen, damit Heroku das Server-jar findet und richtig ausführt

