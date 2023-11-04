# VisualPDESliders
A tiny Javascript file that enables you to include HTML sliders that can interact directly with VisualPDE.com simulations running in iframes. Just include it in your document and away you go.

## Examples
A set of examples is provided in ``index.html``, which can be explored live [here](https://mar5bar.github.io/VisualPDESliders/).

## Usage
Include ``vpde-sliders.js`` or ``vpde-sliders.min.js`` in your HTML.
```
<script src="path/to/vpde-sliders.js" defer></script>
```

This defines a new ``vpde-slider`` HTML element that posts messages to VisualPDE simulations running in iframes.

Sliders can then be created and configured with simple syntax.
```<vpde-slider
      iframe="myIframe"
      name="a"
      label="$a$:"
      min="0"
      max="1"
      value="0.5"
      step="0.01"
    ></vpde-slider>
``` 

Sample (customisable) styles can be included via ``vpde-sliders.css``.
```
<link rel="stylesheet" href="vpde-sliders.css" />
```

### Properties
| Name | Description | Default|
|---|---|---|
|``iframe`` | IDs of the iframes containing simulations, separated by spaces. | N/A (required)|
|``name`` | Name of the parameter to control. Must exactly match the name in the simulation. | N/A (required)|
|``label`` | Label that appears before the slider element. | "" |
|``min`` | Minimum value of the slider. | "0" |
|``max`` | Maximum value of the slider. | "1" |
|``value`` | Initial value of the slider, which will be set in the simulation on load. | "0.5" |
|``step`` | Step size (increment) of the slider. | ``(max - min)/20``|

