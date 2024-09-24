let torrents = require("./torrents")();

async function combo(query, page = 1) {
    let comboTorrent = [];
    let functions = [];

    for (let torrent in torrents) {
        // Start a timer for each provider function
        console.time(torrent); // Use the torrent name as the label for the timer

        for (let index = 1; index <= page; index++) {
            console.time(`${torrent}-${index}`);
            functions.push(
                torrents[torrent](query, index).then(result => {
                    // End the timer when the function finishes
                    console.timeEnd(`${torrent}-${index}`);
                    return result;
                })
            );
        }


    }

    await Promise.all(functions).then((key) => {
        for (let provider of key) {
            if (provider !== null && provider.length !== 0) {
                comboTorrent.push(...provider);
            }
        }
    });

    return comboTorrent;
}

module.exports = combo;
