# VisualPDEInputs
A tiny Javascript file that enables you to include HTML elements that can interact directly with VisualPDE.com simulations running in iframes. Just include it in your document and away you go.

## Examples
A set of examples is provided in ``index.html``, which can be explored live [here](https://mar5bar.github.io/VisualPDEInputs/).

## Useage
Include ``vpde-inputs.js`` or ``vpde-inputs.min.js`` in your HTML.
```
<script src="path/to/vpde-inputs.js" defer></script>
```

This defines new HTML elements: ``vpde-slider``, ``vpde-playpause``, ``vpde-reset``. Each posts messages to VisualPDE simulations running in iframes on your page.

Sample (customisable) styles can be included via ``vpde-inputs.css``.
```
<link rel="stylesheet" href="vpde-inputs.css" />
```

### Sliders

Sliders can be created and configured with simple syntax.
```
<vpde-slider
    iframe="myIframe"
    name="a"
    label="$a$:"
    label-position:"top"
    min="0"
    max="1"
    value="0.5"
    step="0.01"
    min-label="0"
    max-label="0"
></vpde-slider>
``` 

#### Properties
| Name | Description | Default|
|----|----|----|
|``iframe`` | IDs of the iframes containing simulations, separated by spaces. | N/A (required)|
|``name`` | Name of the parameter to control. Must exactly match the name in the simulation. | N/A (required)|
|``label`` | Label that appears before the slider element. | "" |
|``label-position`` | Location of the optional label ("above" or "below"). | "below" |
|``min`` | Minimum value of the slider. | "0" |
|``max`` | Maximum value of the slider. | "1" |
|``value`` | Initial value of the slider, which will be set in the simulation on load. | "0.5" |
|``step`` | Step size (increment) of the slider. | ``(max - min)/20``|
|``reversed`` | Should the slider be reversed ("true" or "false"). | "false" |
|``min-label`` | Label showing the minimum value of the slider. | unset |
|``max-label`` | Label showing the maximum value of the slider. | unset |
|``host`` | Host of the VisualPDE simulation. | ``https://visualpde.com``|

Regardless of the set `min`, `max`, and `value`, you will not be able to set parameter values outside the range enforced by the attached VisualPDE simulations.

### Buttons

Buttons (Play/Pause and Reset) use similar (simpler) syntax.
```
<vpde-reset
    iframe="myIframe"
></vpde-reset>

<vpde-playpause
    iframe="myIframe"
    action="play"
></vpde-playpause>
``` 

They are styled to match those found in VisualPDE simulations.

#### Properties
| Name | Description | Default|
|----|----|----|
|``iframe`` | IDs of the iframes containing simulations, separated by spaces. | N/A (required)|
|``action`` | Initial action performed by the button. Must be one of ``"play"`` and ``"pause"``. | "play" |
|``host`` | Host of the VisualPDE simulation. | ``https://visualpde.com``|