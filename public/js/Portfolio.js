function unhighlight(tag) {
  tag.style.backgroundColor = "transparent";
}

function highlight(tag) {
  tag.style.backgroundColor = "rgba(134, 173, 232, 15%)";
}

window.addEventListener("load", limiterDescription);

function limiterDescription() {
  let value = document.getElementById("pRepoDescription").innerText;
  let text = value.substring(0, 125) + "...";

  document.getElementById("pRepoDescription").innerText = text;
}
