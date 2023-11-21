function getClientId() {
    return '5wg5kc0sri459uyvu1lupkzdxih8av';
}

function getLogin() {
    return 'cozmix_off';
}

async function getToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        return accessToken;
    }
    const clientId = getClientId();
    const clientSecret = '3e4ezdlrgmi8qmvc6pp77rq7s8pkid';
    const scope = 'user:read:email';

    const tokenEndpoint = 'https://id.twitch.tv/oauth2/token';

    try {
        const response = await axios.post(tokenEndpoint, null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials',
                scope: scope,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        localStorage.setItem('accessToken', response.data.access_token);

        return response.data.access_token;
    } catch (error) {
        console.error('Erreur lors de la récupération du token :', error);
    }
}

async function getEmail() {
    const accessToken = await getToken();

    axios.get('https://api.twitch.tv/helix/users', {
        params: {
            login: getLogin(),
        },
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-Id': getClientId()
        }
    })
        .then(response => {
            // Les informations de l'utilisateur seront dans response.data.data[0]
            const userData = response.data.data[0];
            const userId = userData.id;
            console.log('User ID:', userId);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations utilisateur:', error);
        });
}

async function updateDebug() {
    debugAccessToken = document.getElementById('accessToken')
    if (debugAccessToken != null) {
        debugAccessToken.textContent = await getToken();
    }

    debugUserEmail = document.getElementById('userEmail')
    if (debugUserEmail != null) {
        debugUserEmail.textContent = await getEmail();
    }
}
