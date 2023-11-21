# Mon application

## Pour tester

Activer le HTTP avec le Live Server de VSCode, exemple de configuration au niveau du workspace:

```json
	"settings": {
		"liveServer.settings.multiRootWorkspaceName": "cozmixoff.github.io",
		"liveServer.settings.https": {
			"enable": true,
			"cert": "/Users/me/workspaces/certificate/localhost.pem",
			"key": "/Users/me/workspaces/certificate/localhost.key",
			"passphrase": "password"
			},
		"liveServer.settings.port": 5500,
		"liveServer.settings.AdvanceCustomBrowserCmdLine": ""
	}
```

Créer une application Twitch avec l'url de redirection: <https://127.0.0.1:5500/site/index.html>


## A lire

* Pour harmoniser le formatage des fichiers texte : <https://editorconfig.org/#overview>
* La table ASCII : <https://www.ascii-code.com/>
* D'autres vieux encodages : <https://www.alsacreations.com/astuce/lire/83-codages-ascii-latin1-etc.html>
* UTF-8 : <https://en.wikipedia.org/wiki/UTF-8>
* Markdown en ligne : <https://www.markdowntopdf.com/>
* Pleins d'exemples de diagrammes UML : <https://plantuml.com/>
* Docs des workflows de github: <https://docs.github.com/en/actions/using-workflows>
* Structure d'une requête HTTP: <https://www.pierre-giraud.com/http-reseau-securite-cours/requete-reponse-session/>
* Activer le HTTP avec le Live Server de VSCode: <https://graceydev.hashnode.dev/enabling-https-for-live-server-visual-studio-code-extension>
* Présentation du DOM HTML et de ses APIs accessibles en JavaScript: <https://www.pierre-giraud.com/javascript-apprendre-coder-cours/presentation-dom/>
