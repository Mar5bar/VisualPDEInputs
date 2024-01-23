class VPDEInput extends HTMLElement {
  constructor() {
    super();
    // If the constructor is being called a second time (iff the element has children), remove the children.
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    // Get the associated iframe(s), and create a message template to send to it.
    this.frameIDs = this.getAttribute("iframe").split(" ");
    this.message = {};
    // Specify a custom host if one is provided, otherwise use the default.
    this.host = this.getAttribute("host") || "https://visualpde.com";
  }

  // Send an update to the associated simulation.
  sendUpdate() {
    this.frameIDs.forEach((frameID) => {
      document
        .getElementById(frameID)
        ?.contentWindow.postMessage(this.message, this.host);
    });
  }
}

// Parameter sliders.
class VPDESlider extends VPDEInput {
  constructor() {
    super();

    // Modify the message to include the parameter name and the type of message.
    this.message.name = this.getAttribute("name");
    this.message.type = "updateParam";

    // Generate a random id for the slider.
    const id = "id" + Math.random().toString(16).slice(2);

    // Create a slider and a name tag in a span.
    const wrapper = document.createElement("span");
    wrapper.style.setProperty("white-space", "nowrap");

    // If a min label is provided, add it to the wrapper.
    if (this.getAttribute("min-label")) {
      const minLabel = wrapper.appendChild(document.createElement("span"));
      minLabel.innerHTML = this.getAttribute("min-label");
      minLabel.classList.add("vpde-slider-valLabel");
      minLabel.classList.add("left");
    }

    // Create a slider input element in a further wrapper, set its attributes, add it to the wrapper, and add an input event listener to it.
    const inputWrapper = wrapper.appendChild(document.createElement("span"));
    inputWrapper.style.setProperty("position", "relative");

    // If a label is provided, add it to the input wrapper.
    if (this.getAttribute("label")) {
      const label = inputWrapper.appendChild(document.createElement("label"));
      label.innerHTML = this.getAttribute("label");
      label.setAttribute("for", id);
      label.classList.add("vpde-slider-label");
      // If a label position is provided, add it to the label. Default is below.
      if (this.getAttribute("label-position") == "above") {
        label.classList.add("above");
        wrapper.style.setProperty("margin-top", "1em");
      } else {
        wrapper.style.setProperty("margin-bottom", "1em");
      }
    }

    const slider = inputWrapper.appendChild(document.createElement("input"));
    slider.type = "range";
    slider.setAttribute("id", id);

    // Set the min, max, and step of the slider first.
    const initValue = this.getAttribute("value") || 0.5;
    slider.min = this.getAttribute("min") || initValue - 0.5;
    slider.max = this.getAttribute("max") || initValue + 0.5;
    slider.step = this.getAttribute("step") || (slider.max - slider.min) / 20;
    slider.value = initValue;

    slider.addEventListener("input", this.onInput.bind(this));
    // Update the message with the initial value.
    this.message.value = slider.value;

    // If a max label is provided, add it to the label.
    if (this.getAttribute("max-label")) {
      const maxLabel = wrapper.appendChild(document.createElement("span"));
      maxLabel.innerHTML = this.getAttribute("max-label");
      maxLabel.classList.add("vpde-slider-valLabel");
      maxLabel.classList.add("right");
    }

    // Configure the slider for formatting.
    slider.classList.add("vpde-slider");
    slider.classList.add("slider-progress");
    slider.style.setProperty("--value", slider.value);
    slider.style.setProperty("--min", slider.min);
    slider.style.setProperty("--max", slider.max);

    // Store the slider in the element.
    this.slider = slider;

    // Add the wrapper to the element.
    this.append(wrapper);

    // If MathJax is loaded, typeset the label.
    if (MathJax.typesetPromise != undefined) {
      MathJax.typesetPromise();
    }

    // Add an event listener to the iframe so that it gets sent the current value when loaded.
    this.frameIDs.forEach((frameID) => {
      document
        .getElementById(frameID)
        ?.addEventListener("load", this.sendUpdate.bind(this));
    });
  }

  onInput() {
    // Update the slider's value and send an update to the simulation.
    this.slider.style.setProperty("--value", this.slider.value);
    this.message.value = this.slider.value;
    this.sendUpdate();
  }
}

class VPDEButton extends VPDEInput {
  constructor() {
    super();

    // The button will be in a span.
    const span = document.createElement("span");
    span.style.setProperty("white-space", "nowrap");
    span.classList.add("vpde-button");
    this.span = span;
    this.append(span);

    // Listen for click events.
    this.addEventListener("click", this.onclick.bind(this));
  }

  onclick() {
    this.sendUpdate();
  }
}

class VPDEReset extends VPDEButton {
  constructor() {
    super();

    this.message.type = "resetSim";
    this.symbol = this.span.appendChild(document.createElement("i"));
    this.symbol.classList.add("fa-solid", "fa-arrow-rotate-left");
  }
}

class VPDEPlayPause extends VPDEButton {
  constructor() {
    super();

    // Get the initial state of the button.
    this.state = this.getAttribute("action") || "play";
    this.message.type = this.state == "play" ? "playSim" : "pauseSim";

    // Create two symbols, one for play and one for pause, each in wrappers.
    this.playWrapper = this.span.appendChild(document.createElement("div"));
    const play = this.playWrapper.appendChild(document.createElement("i"));
    play.classList.add("fa-solid", "fa-play");
    this.span.append(this.playWrapper);
    this.pauseWrapper = this.span.appendChild(document.createElement("div"));
    const pause = this.pauseWrapper.appendChild(document.createElement("i"));
    pause.classList.add("fa-solid", "fa-pause");
    this.span.append(this.pauseWrapper);

    this.setDisplay();
  }

  onclick() {
    super.onclick();
    // Update the button for next click.
    if (this.state == "play") {
      this.state = "pause";
      this.message.type = "pauseSim";
    } else {
      this.state = "play";
      this.message.type = "playSim";
    }
    // Configure the displayed symbol.
    this.setDisplay();
  }

  setDisplay() {
    if (this.state == "play") {
      this.pauseWrapper.style.display = "none";
      this.playWrapper.style.display = "inline-flex";
    } else {
      this.playWrapper.style.display = "none";
      this.pauseWrapper.style.display = "inline-flex";
    }
  }
}

customElements.define("vpde-slider", VPDESlider);
customElements.define("vpde-reset", VPDEReset);
customElements.define("vpde-playpause", VPDEPlayPause);
