// Get all the tab links
const tabLinks = document.querySelectorAll(".sidebar li a");
// Get all the tab content
const tabContents = document.querySelectorAll(".tabcontent");

// Add event listeners to the tab links
tabLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    if (link.parentElement.classList.contains("disabled")) return;
    // Remove the active class from all tab links
    tabLinks.forEach((link) => {
      link.parentElement.classList.remove("active");
    });
    // Add the active class to the clicked tab link's parent li
    link.parentElement.classList.add("active");
    // Hide all the tab content
    tabContents.forEach((content) => {
      content.style.display = "none";
    });
    // Show the corresponding tab content
    const target = link.getAttribute("href");
    const tabContent = document.querySelector(target);
    tabContent.style.display = "block";
  });
});

const hashParams = window.location.hash
  .substr(1)
  .split("&")
  .reduce(function (result, item) {
    var parts = item.split("=");
    result[parts[0]] = parts[1];
    return result;
  }, {});
var accessToken = hashParams.access_token;
if (!accessToken | (accessToken == "")) {
  var accessToken = getCookie("access_token");
  if (accessToken == null) {
    window.location.href = "/login";
  }
} else {
  let expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  document.cookie =
    "access_token=" +
    encodeURIComponent(accessToken) +
    "; expires_in=" +
    expirationDate.toUTCString();
  +"; path=/";
  window.location.href = "/panel";
}

const serverList = document.querySelector("#serverlist");

fetch("https://discord.com/api/users/@me/guilds", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then((response) => response.json())
  .then((guilds) => {
    if (guilds.message == "You are being rate limited.") {
      alert(
        "Please stop reloading the page. You are being rate limited by Discord. You will be redirected soon."
      );
      setTimeout(() => {
        window.location.reload();
      }, guilds.retry_after * 1000 + 100);
      return;
    }
    if (!guilds) return (window.location.href = "/login");
    const manageableGuilds = guilds.filter((guild) => {
      const permissions = BigInt(guild.permissions);
      return (
        (permissions & BigInt(0x0000000000000008)) ===
        BigInt(0x0000000000000008)
      );
    });
    serverList.removeChild(serverList.firstChild);

    manageableGuilds.forEach((guild) => {
      const option = document.createElement("option");
      option.textContent = guild.name;
      option.value = guild.id;
      serverList.appendChild(option);
    });
    tabLinks.forEach((link) => {
      link.parentElement.classList.remove("disabled");
    });
    tabLinks[0].click();
  });

serverList.addEventListener("change", () => {
  const selectedValue = serverList.value;
  if (selectedValue) {
    fetch(`https://discord.com/api/guilds/${selectedValue}/members/${"1104159289196675173"}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (response.ok) {
        // User is a member of the guild
        console.log("User is a member of the guild");
      } else if (response.status === 404) {
        // User is not a member of the guild
        console.log("User is not a member of the guild");
      } else {
        // Some other error occurred
        console.error("Error:", response.statusText);
      }
    });
  }
});

function getCookie(name) {
  var cookieArr = document.cookie.split(";");

  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    if (name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return null;
}
function deleteCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
