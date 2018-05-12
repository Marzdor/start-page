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
    console.log(data);
    let alt = data.display_name + " logo";
    const markup = `
    <div class="twitch_stream">
        <a href="${data.url}"><img src="${data.logo}" alt="${alt}></a>
        <h4 class="twitch_stream-name">${data.display_name}</h4>
        <h6 class="twitch_stream-game">${data.game}</h6>
        <p class="twitch_stream-status">${data.status}</p>
    </div>
    `;
    let target = document.querySelector(".twitch");
    target.insertAdjacentHTML("beforeend", markup);
    console.log(target);
}