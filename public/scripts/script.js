document.addEventListener('DOMContentLoaded', () => {
  fetch(`/api/profiles`).then(res => res.json().then(json => {
    json.forEach((user, index) => {
      const userLink = `https://discord.com/users/${user.user.id}/`;
      const profile = createprofile(index, userLink);
      const profileContainer = document.querySelector('.profile-container');
      profileContainer.appendChild(profile);
      setTimeout(() => {
        atualizarprofile(index, user);
      }, 100 * index);
    })
  }))
 }
);

function atualizarprofile(index, userData) {

  const imgElement = document.getElementById(`avatar${index + 1}`);
  const nameElement = document.getElementById(`name${index + 1}`);
  const tagElement = document.createElement('p');
  var flagsElement = document.getElementById(`flags${index + 1}`);
  const connsElement = document.getElementById(`conns${index + 1}`);
  connsElement.className = (userData.connected_accounts && userData.connected_accounts.length > 0)
    ? 'conn-container'
    : 'conn-container no-connections';
  tagElement.className = 'tag';
  let avatarUrl = userData.user.avatar
    ? (userData.user.avatar.startsWith('a_')
        ? `https://cdn.discordapp.com/avatars/${userData.user.id}/${userData.user.avatar}.gif`
        : `https://cdn.discordapp.com/avatars/${userData.user.id}/${userData.user.avatar}.png`)
    : "https://cdn.discordapp.com/embed/avatars/2.png";
  tagElement.textContent = `@${userData.user.username}`;
  imgElement.src = avatarUrl;
  nameElement.textContent = userData.user.global_name || userData.user.username || ' ';

  const flags = {
    active_developer: "<img class='flag-icon' title='Desenvolvedor(a) Ativo(a)' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/activedeveloper.svg'>",
    early_supporter: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordearlysupporter.svg' alt='Premium Early Supporter' title='Apoiador Inicial'>",
    hypesquad_house_1: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbravery.svg' alt='HypeSquad Online House 1' title='Bravery'>",
    hypesquad_house_2: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbrilliance.svg' alt='HypeSquad Online House 2' title='Brilliance'>",
    hypesquad_house_3: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbalance.svg' alt='HypeSquad Online House 3' title='Balance'>",
    premium: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordnitro.svg' alt='Nitro' title='Nitro'>",
    guild_booster_lvl1: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost1.svg' alt='Boost Level 1' title='Boost Nível 1'>",
    guild_booster_lvl2: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost2.svg' alt='Boost Level 2' title='Boost Nível 2'>",
    guild_booster_lvl3: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost3.svg' alt='Boost Level 3' title='Boost Nível 3'>",
    guild_booster_lvl4: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost4.svg' alt='Boost Level 4' title='Boost Nível 4'>",
    guild_booster_lvl5: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost5.svg' alt='Boost Level 5' title='Boost Nível 5'>",
    guild_booster_lvl6: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost6.svg' alt='Boost Level 6' title='Boost Nível 6'>",
    guild_booster_lvl7: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost7.svg' alt='Boost Level 7' title='Boost Nível 7'>",
    guild_booster_lvl8: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost8.svg' alt='Boost Level 8' title='Boost Nível 8'>",
    guild_booster_lvl9: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost9.svg' alt='Boost Level 9' title='Boost Nível 9'>",
    legacy_username: `<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/username.png' alt='Legacy Username Badge' title='Originalmente ${userData.legacy_username}'>`,
    verified_developer: `<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbotdev.svg' alt='Verified Developer' title='Desenvolvedor Verificado de bots Pioneiro'>`,
    hypesquad: `<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadevents.svg' alt='HypeSquad' title='HypeSquad Events'>`,
    partner: `<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordpartner.svg' alt='Partner' title='Dono(a) de servidor parceiro'>`,
    certified_moderator: `<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordmod.svg' alt='Moderador' title='Moderator'>`,
    bug_hunter_level_2: `<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbughunter2.svg' alt='BugHunter' title='BugHunter 2'>`,
    quest_completed: `<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/quest.png' alt='Completou uma missão' title='Completou uma missão'>`,
  }
  let vencordElements = [
    { element: `<img class='flag-icon' src='assets/new.png' alt='Leviatan' title='Leviatan'>`, title: 'Leviatan' },
    { element: `<img class='flag-icon' src='assets/Stealer.png' alt='Leviatan Stealer' title='Leviatan Stealer'> `, title: 'Leviatan Stealer'},
    { element: `<img class='flag-icon' src='assets/sqssa.png' alt='Ndk' title='Ndk'>`, title: `Ndk` }
  ]
  /* if(userData.user.id == '475890440042840074') for(let i of vencordElements) {
    flagsElement.innerHTML += `<div class="tooltip" style="white-space: nowrap;">${i.element}<span class="tooltiptext">${i.title}</span></div>`
  } */
  flagsElement.innerHTML += (userData.badges && userData.badges.length > 0)
    ? userData.badges.map((flag) => {
      const flagHtml = flags[flag.id];
      const titleText = flagHtml.match(/title='(.*?)'/);
      const title = titleText ? titleText[1] : '';
      return `<div class="tooltip" style="white-space: nowrap;">${flagHtml}<span class="tooltiptext">${title}</span></div>`;
    }).join('')
    : ``;


  const connections = {
    paypal: {
      icon: "<img class='conn-icon' src='https://discord.com/assets/c44f32fe60d6657fda9f.svg'>",
      off: false
    },
    domain: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/domain.svg'>",
      link: 'https://',
    },
    steam: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/steam.svg'>",
      link: 'https://steamcommunity.com/profiles/',
    },
    epicgames: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/epicgames.svg'>",
      off: false
    },
    spotify: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/spotify.svg'>",
      link: 'https://open.spotify.com/user/',
    },
    battlenet: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/battlenet.svg'>",
      off: false
    },
    crunchyroll: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/crunchyroll.svg'>",
      off: false
    },
    ebay: {
      icon: "<img class='conn-icon' src='https://imgs.search.brave.com/nQ7AtwyADC8mef_tXONU1tR8ThOndczIm2RDAoPec5w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzA1/NTgvNjQxMy8xNzY0/L2ZpbGVzL1Jld3Jp/dGVfZUJheV9Mb2dv/X0Rlc2lnbl9IaXN0/b3J5X0V2b2x1dGlv/bl8wXzEwMjR4MTAy/NC5qcGc_dj0xNjk0/NzA5MzI2'>",
      off: false
    },
    facebook: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/facebook.svg'>",
      link: 'https://www.facebook.com/@',
    },
    github: {
      icon: "<img class='conn-icon'src='https://ogp.lol/assets/connections/github.svg'>",
      link: 'https://github.com/',
      user: false
    },
    leagueoflegends: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/leagueoflegends.svg'>",
      off: false
    },
    playstation: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/playstation.svg'>",
      off: false
    },
    reddit: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/reddit.svg'>",
      link: 'https://www.reddit.com/user/',
      user: false
    },
    riotgames: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/riot.svg'>",
      off: false
    },
    tiktok: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/tiktok.svg'>",
      link: 'https://www.tiktok.com/@',
      user: false
    },
    twitch: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/twitch.svg'>",
      link: 'https://www.twitch.tv/',
      user: false
    },
    twitter: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/twitter.svg'>",
      link: 'https://twitter.com/',
      user: false
    },
    xbox: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/xbox.svg'>",
      off: false
    },
    youtube: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/youtube.svg'>",
      link: 'https://www.youtube.com/channel/',
    },
    instagram: {
      icon: "<img class='conn-icon' src='https://ogp.lol/assets/connections/instagram.svg'>",
      link: 'https://www.instagram.com/',
      user: true
    },
    discord: {
      icon: "<img class='conn-icon' src='./assets/discord.svg'>",
      link: 'https://discord.gg/',
      user: false
    },
  };

  connsElement.innerHTML = (userData.connected_accounts && userData.connected_accounts.length > 0)
    ? userData.connected_accounts.map((conn) => {
      const lowerCaseType = conn.type.toLowerCase();
      if (lowerCaseType in connections) {
        const connection = connections[lowerCaseType];
        if (connection.off) {
          return `<a title="${conn.name || ''}" class="tooltip">${connection.icon}<span class="tooltiptext">${conn.name || ''}</span></a>`;
        }
        if (connection.user) {
          return `<a href="${connection.link}${conn.name}" target="_blank" class="tooltip">${connection.icon}<span class="tooltiptext">${conn.name || ''}</span></a>`;
        } else {
          return `<a href="${connection.link}${conn.id}" target="_blank" class="tooltip">${connection.icon}<span class="tooltiptext">${conn.name || ''}</span></a>`;
        }
      }
      return '';
    }).join(' ')
    : "<img class='conn-icon' src='https://ogp.lol/assets/connections/invis.png' alt=' '>";

  nameElement.appendChild(tagElement);

  imgElement.addEventListener('load', () => {
    const profileElement = document.querySelector(`.profile:nth-child(${index + 1}`)
    profileElement.classList.add('loaded');
  });
}

function createprofile(index, userLink) {
  const profile = document.createElement('div');
  profile.className = 'profile'
  const link = document.createElement('a');
  link.href = userLink || `https://discord.com/users/${index + 1}`;
  link.target = "_blank";
  link.title = `Clique para ir para o profile.`;

  const avatar = document.createElement('img');
  avatar.id = `avatar${index + 1}`;
  avatar.alt = '';

  const nameContainer = document.createElement('div');
  nameContainer.className = 'name-container';

  const nameParagraph = document.createElement('p');
  nameParagraph.id = `name${index + 1}`;
  nameParagraph.textContent = ' ';

  const flagsParagraph = document.createElement('p');
  flagsParagraph.id = `flags${index + 1}`;
  flagsParagraph.innerHTML = ' ';

  const connsParagraph = document.createElement('p');
  connsParagraph.id = `conns${index + 1}`;
  connsParagraph.innerHTML = ' ';

  link.appendChild(avatar);
  nameContainer.appendChild(nameParagraph);
  nameContainer.appendChild(flagsParagraph);
  nameContainer.appendChild(connsParagraph);
  profile.appendChild(link);
  profile.appendChild(nameContainer);
  avatar.addEventListener('load', () => {
    VanillaTilt.init(profile, {
      max: 25,
      speed: 1000,
      glare: false,
      "max-glare": 0.2,
      gyroscope: false,
    });
  });

  return profile;
}

function removeOverlay() {
  var overlay = document.querySelector('.black-overlay');
  Musica();
  overlay.style.transition = 'opacity 1s';
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000);
}

function Musica() {
  const audio = document.getElementById('audio');
  audio.volume = 1;
  audio.play();
}

function getKey(e) {
  var n = e.keyCode;
  if (console.log(n), 16 != n && 17 != n || (mode = 2), 1 == mode) {
    if (123 == n)
      return !1
  } else {
    if (73 == n || 74 == n || 85 == n)
      return !1;
    if (123 == n)
      return !1
  }
}
var rev = "fwd";
function titlebar(t) {
    var e = "90i"
      , i = t
      , r = (e = "" + e).length;
    if ("fwd" == rev)
        i < r ? (i += 1,
        scroll = e.substr(0, i),
        document.title = scroll,
        timer = window.setTimeout("titlebar(" + i + ")", 145)) : (rev = "bwd",
        timer = window.setTimeout("titlebar(" + i + ")", 145));
    else if (i > 0) {
        var a = r - (i -= 1);
        scrol = e.substr(a, r),
        document.title = scrol,
        timer = window.setTimeout("titlebar(" + i + ")", 145)
    } else
        rev = "fwd",
        timer = window.setTimeout("titlebar(" + i + ")", 145)
}
titlebar(0);
let mode = 1;
document.oncontextmenu = new Function("return true;");
// window.onkeydown = getKey;

document.querySelector('.profile-container').onmousemove = e => {
  for (const profile of document.querySelectorAll('.profile')) {
    const rect = profile.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("audio");
  var muteButton = document.getElementById("muteButton");
  var muteIcon = document.getElementById("muteIcon");
  var unmuteIcon = document.getElementById("unmuteIcon");

  if (!audio.muted) {
    muteIcon.style.display = "none";
    unmuteIcon.style.display = "inline-block";
  }
  muteButton.addEventListener("click", function () {
    if (audio.muted) {
      audio.muted = false;
      muteIcon.style.display = "none";
      unmuteIcon.style.display = "inline-block";
    } else {
      audio.muted = true;
      muteIcon.style.display = "inline-block";
      unmuteIcon.style.display = "none";
    }
  });
});


