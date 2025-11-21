const dynamicIncludeJSFile = (jsPath) => {
  return new Promise((resolve) => {
    const scriptTag = document.createElement("script")
    scriptTag.src = jsPath
    scriptTag.addEventListener("load", (e) => {
      resolve()
    })
    document.body.appendChild(scriptTag)
  })
}

const getColor = (name) => {
  return window.getComputedStyle(document.documentElement).getPropertyValue(name);
}

const setColor = (name, value) => {
  document.documentElement.style.setProperty(name, value);
}

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

const initialize = () => {
  setDefaultInputColor()

  let dynamicColorInput = document.querySelector("input[name='dynamic-color']")
  dynamicColorInput.addEventListener("input", (e) => {
    let newValue = e.target.value
    let rgbColor = convertHEXToRGB(newValue)
    let hslColor = convertRGBToHSL(rgbColor.r, rgbColor.g, rgbColor.b)
    setColor("--primary", hslColor)
    updateCSSVarPreviewValues()
  })

  updateCSSVarPreviewValues()
}

(async function waitForDynamicImports() {
  await dynamicIncludeJSFile("javascript/helpers/colors.js")
  initialize()
})()

