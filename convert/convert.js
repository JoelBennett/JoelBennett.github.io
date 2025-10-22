function encode() {
  setText("rightText", "");
  setMessage("");

  let text = document.getElementById("leftText").value;

  if (text === "") {
    setMessage("Nothing to encode!");
    return;
  }

  try {
    let encodedText = btoa(text)
    setText("rightText", encodedText);
    addToRecentValues(text, encodedText);
  } catch (e) {
    setMessage(e.text);
  }
}

function decode() {
  setText("leftText", "");
  setMessage("");

  let text = document.getElementById("rightText").value;

  if (text === "") {
    setMessage("Nothing to decode!");
    return;
  }

  try {
    let decodedText = atob(text);
    setText("leftText", decodedText);
    addToRecentValues(text, decodedText);
  } catch (e) {
    if (e.message.includes("The string to be decoded is not correctly encoded.")) {
      setMessage("Input is not a valid base64 encoded string!")
    } else {
      setMessage(e.message);
    }
  }
}

function setText(elementId, text) { 
  let element = document.getElementById(elementId);
  element.value = text;
}

function setMessage(text) {
  let message = document.getElementById("message");
  message.textContent = text;
}

function addToRecentValues(leftText, rightText) {
  let recentValues = localStorage.getItem("recentValues");

  if (!recentValues) {
    recentValues = [];
  } else {
    recentValues = JSON.parse(recentValues)
  }

  recentValues.unshift([leftText, rightText]);

  if (recentValues.length > 10) {
    recentValues.pop();
  }

  localStorage.setItem("recentValues", JSON.stringify(recentValues));
  getRecentValues();
}

function getRecentValues() {
  let recentValues = localStorage.getItem("recentValues");
  
  if (recentValues) {
    recentValues = JSON.parse(recentValues);
    let tempString = "";
    tempString += "<ul>";
    
    recentValues.forEach((x) => {
      tempString += `<li>${x[0]}&nbsp;&nbsp;&nbsp;&nbsp; ${x[1]}</li>`
    })
    tempString += "</ul>";

    console.log("tempstring: ", tempString)

    const recentValuesElement = document.getElementById("recentValues");
    recentValuesElement.innerHTML = tempString;

    const temp = document.getElementById("recentValues");
  }
}

function clearRecentValues() {
  localStorage.setItem("recentValues", JSON.stringify([]));
  getRecentValues(); // To refresh the view
}

function copyToClipBoard(elementId) {
  const element = document.getElementById(elementId);
  element.select();

  navigator.clipboard.writeText(element.value);
}

function pasteFromClipBoard(elementId) {
  navigator.clipboard.readText().then(text => {
    const element = document.getElementById(elementId);
    element.value = text;
  })
  // const text = await navigator.clipboard.readText();
  // const element = document.getElementById(elementId);
  
  // element.value = text;
}

window.addEventListener("load", () => {
  getRecentValues();
})