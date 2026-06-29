export async function init() {
    setTimeout(() => {
        const clients = Avatar.Socket.getClients();

        if (clients.length === 0) {
            warn("Aucun client connecté.");
            return;
        }

        const message = "Bonjour Monsieur ! Je suis votre majordome AVATAR, Les clients sont connectés. Je suis prêt à vous assister";

        info(message);

        for (const client of clients) {
            Avatar.speak(message, client.name);
        }
    }, 4000);

    await Avatar.lang.addPluginPak('Presentation');
}

export async function action(data, callback) {

    try {

        const Locale = await Avatar.lang.getPak('Presentation', data.language);

        const tblActions = {
            sePresente: () => sePresente(data.client, Locale)
        };

        info("Presentation:", data.action.command, "from", data.client);

        if (tblActions[data.action.command]) {
            await tblActions[data.action.command]();
        }

    } catch (err) {
        if (data.client) {Avatar.Speech.end(data.client);}
        if (err.message) {error(err.message);
        }
    }

    callback();
}

const sePresente = (client, Locale) => {
    Avatar.speak(Locale.get('speech.answerSet'), client);
};

