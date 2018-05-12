window.onload = function () {
    getStreams();
}

function getStreams() {
    let following = ["kitboga", "adam13531", "relaxbeats", "day9tv", "purgegamers", "sodapoppin", "sinqnew",
        "dansgaming", "annemunition", "whilke", "lirik", "giantwaffle", "sevadus"
    ];
    for (let i = 0; i < following.length; i++) {
        let request = new XMLHttpRequest();
        let callUrl = "https://wind-bow.glitch.me/twitch-api/streams/" + following[i] + "?callback=?";

        request.open("GET", callUrl);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                let data = request.responseText;

                data = data.slice(32, data.length - 2); // make data valid json
                data = JSON.parse(data);
                data = data.stream

                if (data !== null) {
                    data = data.channel;
                    createHtml(data);
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

function createHtml(data) {
    let alt = data.display_name + " logo";
    let gameName = data.game;
    if (gameName.length > 22) {
        gameName = gameName.slice(0, 22);
    }
    const markup = `
    <a class="twitch_stream" href="${data.url}">        
        <img class="twitch_stream-logo" src="${data.logo}" alt="${alt}">
        <h4 class="twitch_stream-name">${data.display_name}</h4>
        <h6 class="twitch_stream-game">${gameName}</h6>              
    </a>
    `;
    let target = document.querySelector(".twitch");
    target.insertAdjacentHTML("beforeend", markup);
}