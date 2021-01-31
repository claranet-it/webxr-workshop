const generateData = () => {
  window.requestAnimationFrame(() => {
    const howManyElements = faker.random.number({ min: 5, max: 10 })

    const values = Array(howManyElements)
      .fill()
      .map(() => faker.random.number({ min: 10, max: 100 }))

    const colors = Array(howManyElements)
      .fill()
      .map(() => faker.internet.color())

    const chart = document.querySelector('[column-chart]')

    chart.setAttribute('column-chart', { values, colors })
  })
}

window.setInterval(() => {
  generateData()
}, 5000)

generateData()
