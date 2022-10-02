const colorOuput = document.getElementById("color-output")
const seedColor = document.getElementById("seed-color")
const colorMode = document.getElementById("color-mode")
const colorPicker = document.getElementById("color-picker")
let isWaiting = false
let defaultColor = "f55A5A"
let defaultMode = "monochrome"
seedColor.value = "#".concat(defaultColor)


getColorScheme(defaultColor, defaultMode)

colorPicker.addEventListener("submit", function(e) {
    e.preventDefault()
    const selectedMode = colorMode.value
    const selectedColor = seedColor.value.slice(1)
    getColorScheme(selectedColor,selectedMode)
})



function getColorScheme(color, mode) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`, {method: "GET"}).then(res => res.json())
       .then(data =>  {
            const colorDataArr = data.colors
            renderColors(colorDataArr)
            })  
}


function renderColors(dataArr) {
    colorOuput.innerHTML = dataArr.map(color => {
           return `<div class="scheme">
                        <div class="scheme-color hex-color" style="background-color:${color.hex.value}">${color.hex.value}</div>
                        <p class="scheme-hex-code hex-color" id=${color.hex.value}>${color.hex.value}</p>
                  </div>`
            }).join("")
}


colorOuput.addEventListener("click", function(e) {
    if(!isWaiting) {
    const hexMatches = e.target.matches('.hex-color')
    const hex = e.target
    const colorHexValue = hex.textContent
    const hexValueDom = document.getElementById(colorHexValue)
    navigator.clipboard.writeText(colorHexValue)
                        .then(
                            () => {
                                alert('copied successfully')
                            },
                            () => {
                                alert('error copying')
                            })
    hexValueDom.textContent = "Hex Copied"
    hexValueDom.style.background = "#000000"
    hexValueDom.style.color = "#ffffff"
    isWaiting = true
    setTimeout(function() {
        hexValueDom.textContent = colorHexValue
        hexValueDom.style.background = "#ffffff"
        hexValueDom.style.color = "#000000"
        isWaiting = false
    }, 1200) 
    }
})
