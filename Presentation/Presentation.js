export async function init() {
    const client = "Salon";

    setTimeout(() => {
        try {

            const message = "Bonjour Monsieur ! Je suis votre majordome AVATAR";

            info(message);
            Avatar.speak(message, client);

        } catch (err) {
            info("Erreur lors du message de bienvenue :", err);
        }
    }, 5000);

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

