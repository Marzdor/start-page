window.onload = function () {
    getStreams();
}

function getStreams() {
    const following = ["kitboga", "adam13531", "day9tv", "purgegamers", "sodapoppin",
        "dansgaming", "lirik", "giantwaffle", "sevadus", "annemunition"
    ];
    for (let i = 0; i < following.length; i++) {
        let request = new XMLHttpRequest();
        let callUrl = "https://api.twitch.tv/kraken/streams/" + following[i] + "?client_id=mvk2wo7a14satb8zdehas656gz9q8k";
        request.open("GET", callUrl);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                let data = request.responseText;
                data = JSON.parse(data);
                data = data.stream

                if (data !== null) {
                    data = data.channel;
                    genTwitchHtml(data);
                }
            } else {
                console.log("Getting followers reached server but returned error: " + request.status);
            }
        };
        request.onerror = function () {
            console.log("Getting followers never connected to server.");
        };
        request.send();
    }
}

function genTwitchHtml(data) {
    let alt = data.display_name + " logo";
    let gameName = data.game;
    if (gameName.length > 22) {
        gameName = gameName.slice(0, 22);
    }
    const markup = `
    <a class="content-stream" href="${data.url}">        
        <img class="content-stream-logo" src="${data.logo}" alt="${alt}">
        <h4 class="content-stream-name">${data.display_name}</h4>
        <h6 class="content-stream-game">${gameName}</h6>              
    </a>
    `;
    let target = document.querySelector(".container-twitch");
    target.insertAdjacentHTML("beforeend", markup);
}