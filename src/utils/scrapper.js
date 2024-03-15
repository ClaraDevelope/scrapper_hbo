const puppeteer = require('puppeteer')
const fs = require('fs')

const url = 'https://www.hbo.com/game-of-thrones/cast-and-crew'
const arrayData = { results: [] }

const scrapper = async (url) => {
  console.log(url)
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(url)

  const arrayCharacters = await page.$$('.card-container')

  for (const characterDiv of arrayCharacters) {
    let title = await characterDiv.$eval('.card-title', (el) => el.textContent)
    let img = await characterDiv.$eval(
      '.img.img-fluid.w-100.card-image',
      (el) => el.src
    )
    let characterUrl = await characterDiv.$eval(
      '.card-button.usePointer',
      (el) => el.href
    )
    const findDetails = async (url) => {
      let newPage = await browser.newPage()
      await newPage.goto(url)
      let description
      try {
        description = await newPage.$eval('.bandText.dataContent > p', (el) =>
          el.textContent.trim()
        )
        if (description === '') {
          description = 'Sin detalles disponibles'
        }
      } catch (error) {
        try {
          description = await newPage.$eval('.text-left', (el) =>
            el.textContent.trim()
          )
          if (description === '') {
            description = 'Sin detalles disponibles'
          }
        } catch (error) {
          description = 'Sin detalles disponibles'
        }
      }

      await newPage.close()
      return description
    }

    let details = await findDetails(characterUrl)
    const character = {
      title,
      img,
      details
    }
    arrayData.results.push(character)
  }

  await browser.close()
  write(arrayData)
}

const write = (array) => {
  fs.writeFile('characters.json', JSON.stringify(array), () => {
    console.log('archivo con personajes escrito')
  })
}

scrapper(url)
