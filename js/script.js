const TWITCH_CHANNEL = "cozmix_off";

const CLIENT_ID = "5wg5kc0sri459uyvu1lupkzdxih8av";
// const CLIENT_ID = "kbhuxxksdr5py4z2xfnts4qdkw0xt0";

const REDIRECT_URI = "https://cozmixoff.github.io/index.html";
// const REDIRECT_URI = "https://localhost:5500/index.html";

const SCOPES = [
    "user:read:email",
];

const helpers = {
    encodeQueryString: function (params) {
        const queryString = new URLSearchParams();
        for (let paramName in params) {
            queryString.append(paramName, params[paramName]);
        }
        return queryString.toString();
    },

    decodeQueryString: function (string) {
        const params = {};
        const queryString = new URLSearchParams(string);
        for (let [paramName, value] of queryString) {
            params[paramName] = value;
        }
        return params;
    },

    getUrlParams: function () {
        return helpers.decodeQueryString(location.hash.slice(1));
    },

    wait: function (seconds) {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, seconds * 1000);
        });
    },

};

const request = {

    getJson: function (url, params = null, headers = {}) {
        requestUrl = url;

        if (params) {
            requestUrl = `${url}?${helpers.encodeQueryString(params)}`
        }

        const req = new Request(requestUrl, {
            method: "GET",
            headers: headers,
        });

        return fetch(req)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                return response.json();
            });
    },

};

const twitch = {

    _lastFollowersIds: null,

    // Check if the user is already authenticated
    isAuthenticated: function () {
        const params = helpers.getUrlParams();
        return params["access_token"] !== undefined;
    },

    // Retirect the user to the Twitch auth page with all required params
    authentication: function () {
        const params = {
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: "token",
            scope: SCOPES.join(" "),
        };
        const redirectUrl = `https://id.twitch.tv/oauth2/authorize?${helpers.encodeQueryString(params)}`;
        location.href = redirectUrl;
    },

    // [Promise] Get the user ID from its nickname
    // "trucmuche" -> 12345678
    getUserMe: function (username) {
        const params = helpers.getUrlParams();
        return request.getJson("https://api.twitch.tv/helix/users", {
        }, {
            "client-id": CLIENT_ID,
            "Authorization": `Bearer ${params["access_token"]}`,
        }).then(function (data) {
            if (data.data.length != 1) {
                throw new Error("The API returned unexpected data");
            }
            return data.data[0];
        });
    },

    // [Promise] Get the user ID from its nickname
    // "trucmuche" -> 12345678
    getUserId: function (username) {
        const params = helpers.getUrlParams();
        return request.getJson("https://api.twitch.tv/helix/users", {
            login: username,
        }, {
            "client-id": CLIENT_ID,
            "Authorization": `Bearer ${params["access_token"]}`,
        }).then(function (data) {
            if (data.data.length != 1) {
                throw new Error("The API returned unexpected data");
            }
            return data.data[0];
        });
    },

    // [Promise] Get the user streams
    // "trucmuche" -> 12345678
    getStreams: function (user_id) {
        const params = helpers.getUrlParams();
        return request.getJson("https://api.twitch.tv/helix/streams", {
            user_id: user_id,
        }, {
            "client-id": CLIENT_ID,
            "Authorization": `Bearer ${params["access_token"]}`,
        }).then(function (data) {
            return data;
        });
    },

    // [Promise] Get the user followed channels
    // "trucmuche" -> 12345678
    getFollowedChannels: function (user_id) {
        const params = helpers.getUrlParams();
        return request.getJson("https://api.twitch.tv/helix/channels/followed", {
            user_id: user_id,
        }, {
            "client-id": CLIENT_ID,
            "Authorization": `Bearer ${params["access_token"]}`,
        }).then(function (data) {
            return data;
        });
    },

    // [Promise] Get the user stream markers
    // "trucmuche" -> 12345678
    getStreamMarkers: function (user_id) {
        const params = helpers.getUrlParams();
        return request.getJson("https://api.twitch.tv/helix/streams/markers", {
            user_id: user_id,
        }, {
            "client-id": CLIENT_ID,
            "Authorization": `Bearer ${params["access_token"]}`,
        }).then(function (data) {
            return data;
        });
    },
};

function main() {
    if (!twitch.isAuthenticated()) {
        twitch.authentication();
    } else {
        twitch.getUserMe(TWITCH_CHANNEL).then(function (data) {
            console.log("getUserMe: " + data)
            document.querySelector("#me_display_name").textContent = data.display_name;
            document.querySelector("#me_profile_image_url").src = data.profile_image_url;
            document.querySelector("#me_link").href = ("https://twitch.tv/" + data.login)
            twitch.getStreams(data.id).then(function (streams) {
                console.log("me-getStreams: " + streams)
            });
            twitch.getFollowedChannels(data.id).then(function (followed) {
                console.log("me-getFollowedChannels: " + followed)
            });
            twitch.getStreamMarkers(data.id).then(function (markers) {
                console.log("me-getStreamMarkers: " + markers)
            });
        });
        twitch.getUserId(TWITCH_CHANNEL).then(function (data) {
            console.log("getUserId: " + data)
            document.querySelector("#channel_display_name").textContent = data.display_name;
            document.querySelector("#channel_profile_image_url").src = data.profile_image_url;
            document.querySelector("#channel_link").href = ("https://twitch.tv/" + data.login)
            twitch.getStreams(data.id).then(function (streams) {
                console.log("channel-getStreams: " + streams)
            });
            twitch.getFollowedChannels(data.id).then(function (followed) {
                console.log("channel-getFollowedChannels: " + followed)
            });
            twitch.getStreamMarkers(data.id).then(function (markers) {
                console.log("channel-getStreamMarkers: " + markers)
            });
        });
    }
}

window.onload = main;
