class VPDESlider extends HTMLElement {
  constructor() {
    super();

    // Get the associated iframe, and create a message template to send to it.
    this.attachedFrame = document.getElementById(this.getAttribute("iframe"));
    this.message = { name: this.getAttribute("name") };

    // Create a slider and a name tag in a span.
    const wrapper = document.createElement("span");
    const label = wrapper.appendChild(document.createElement("span"));
    label.innerHTML = this.getAttribute("label") || "";

    // Create a slider input element, set its attributes, add it to the wrapper, and add an input event listener to it
    const slider = wrapper.appendChild(document.createElement("input"));
    slider.type = "range";
    slider.setAttribute("min", this.getAttribute("min") || 0);
    slider.setAttribute("max", this.getAttribute("max") || 1);
    slider.setAttribute("value", this.getAttribute("value") || 0.5);
    slider.step = this.getAttribute("step") || (slider.max - slider.min) / 20;
    slider.addEventListener("input", this.onInput.bind(this));

    // Configure the slider for formatting.
    slider.classList.add("styled-slider");
    slider.classList.add("slider-progress");
    slider.style.setProperty("--value", slider.value);
    slider.style.setProperty("--min", slider.min);
    slider.style.setProperty("--max", slider.max);

    this.slider = slider;

    // Add an event listener to the iframe so that it gets sent the current value when loaded.
    this.attachedFrame.addEventListener("load", this.sendUpdate.bind(this));

    this.append(wrapper);

    // If MathJax is loaded, typeset the label.
    if (MathJax.typesetPromise != undefined) {
      MathJax.typesetPromise();
    }
  }

  onInput() {
    this.slider.style.setProperty("--value", this.slider.value);
    this.sendUpdate();
  }

  // Send an update to the associated simulation.
  sendUpdate() {
    this.message.value = this.slider.value;
    this.attachedFrame.contentWindow.postMessage(
      this.message,
      "https://visualpde.com"
    );
  }
}

customElements.define("vpde-slider", VPDESlider);
