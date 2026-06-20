export async function init () {
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

