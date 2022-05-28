function ShowClickEffect(tag) {
  const tagID = tag.id;
  let element;

  switch (tagID) {
    case "imgNode":
      document.getElementById(tagID).style.transition = "all 100ms ease-in";
      document.getElementById(tagID).style.opacity = "0.6";

      element = document.getElementById("clickNode");
      element.style.transition = "all 100ms ease-in";
      element.style.visibility = "visible";
      break;

    case "imgGit":
      document.getElementById(tagID).style.transition = "all 100ms ease-in";
      document.getElementById(tagID).style.opacity = "0.6";

      element = document.getElementById("clickGit");
      element.style.transition = "all 100ms ease-in";
      element.style.visibility = "visible";
      break;

    default:
      break;
  }
}

function RemoveClickEffect(tag) {
  const tagID = tag.id;
  let element;

  switch (tagID) {
    case "imgNode":
      document.getElementById(tagID).style.transition = "all 100ms ease-in";
      document.getElementById(tagID).style.opacity = "100";

      element = document.getElementById("clickNode");
      element.style.transition = "all 100ms ease-in";
      element.style.visibility = "hidden";
      break;

    case "imgGit":
      document.getElementById(tagID).style.transition = "all 100ms ease-in";
      document.getElementById(tagID).style.opacity = "100";

      element = document.getElementById("clickGit");
      element.style.transition = "all 100ms ease-in";
      element.style.visibility = "hidden";
      break;

    default:
      break;
  }
}
