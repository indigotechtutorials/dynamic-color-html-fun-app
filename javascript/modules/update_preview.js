const updatePreview = (name, value) => {
  document.querySelector(`[data-var-name='${name}']`).textContent = value
}

const setDefaultInputColor = () => {
  const dynamicColorInput = document.querySelector("input[name='dynamic-color']")
  const primaryColor = getColor("--primary")
  const rgbColor = convertHSLToRGB(primaryColor)
  let [r, g, b] = extractRGBValues(rgbColor)
  const hexColor = convertRGBToHex(r, g, b)
  dynamicColorInput.value = hexColor
}

const updateCSSVarPreviewValues = () => {
  let values = ["primary", "header", "text"] 
  values.forEach(val => {
    let valAsVar = `--${val}`
    updatePreview(valAsVar, getColor(valAsVar))
  })
}

const colorValueChanged = (e) => {
  let newValue = e.target.value
  let rgbColor = convertHEXToRGB(newValue)
  let hslColor = convertRGBToHSL(rgbColor.r, rgbColor.g, rgbColor.b)
  setColor("--primary", hslColor)
  storeColor(hslColor)
  updateCSSVarPreviewValues()
}

const initializeDynamicColors = () => {
  let savedColor = retrieveColor()
  if (savedColor) {
    setColor("--primary", savedColor)
  }
  setDefaultInputColor()

  let dynamicColorInput = document.querySelector("input[name='dynamic-color']")
  dynamicColorInput.addEventListener("input", colorValueChanged)

  updateCSSVarPreviewValues()
}