const SPACING = 0.07
const LEFT_PADDING = -0.75
const WIDTH = 0.1

const createColumn = (index, element) => {
  const {
    value,
    color
  } = element

  const height = (value / 100) * 0.8
  const geometry = new THREE.BoxGeometry(WIDTH, height, 0.1)
  const material = new THREE.MeshBasicMaterial({ color })

  const column = new THREE.Mesh(geometry, material)

  const x = LEFT_PADDING + ((SPACING + WIDTH) * index)

  column.position.set(x, (height / 2) - 0.5 + 0.1, 0.1)

  return column
}

const cleanup = component => {
  Array(10)
    .fill()
    .map((_, index) => component.el.getObject3D(`column-${index}`))
    .filter(maybeObject3D => Boolean(maybeObject3D))
    .forEach((_, index) => {
      component.el.removeObject3D(`column-${index}`)
    })
}

const printData = component => {
  const {
    colors,
    values
  } = component.data

  const {
    el
  } = component

  if (!values) {
    return
  }

  values
    .map((value, index) => {
      return {
        value,
        color: colors[index]
      }
    })
    .map((element, index) => createColumn(index, element))
    .forEach((column, index) => el.setObject3D(`column-${index}`, column))
}

AFRAME.registerComponent('column-chart', {
  schema: {
    values: { type: 'array', default: [] },
    colors: { type: 'array', default: [] }
  },
  init: function () {
    printData(this)
  },
  update: function () {
    cleanup(this)
    printData(this)
  }
})
