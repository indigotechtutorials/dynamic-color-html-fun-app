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

(async function waitForDynamicImports() {
  await dynamicIncludeJSFile("javascript/helpers/colors.js")
  await dynamicIncludeJSFile("javascript/modules/update_preview.js")
  initializeDynamicColors()
})()