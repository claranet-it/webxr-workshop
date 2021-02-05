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

AFRAME.registerComponent('rotation-emitter', {
  init: function () {
    this.lastPosition = JSON.stringify({
      rotation: this.el.object3D.rotation,
      position: this.el.object3D.position
    })
  },
  tick: function () {
    const nowPosition = JSON.stringify({
      rotation: this.el.object3D.rotation,
      position: this.el.object3D.position
    })

    if (nowPosition === this.lastPosition) {
      return
    }

    this.lastPosition = nowPosition

    const event = new window.CustomEvent('change', {
      detail: {
        rotation: this.el.object3D.rotation,
        position: this.el.object3D.position
      }
    })

    this.el.dispatchEvent(event)
  }
})

const radToDeg = (radians) => radians * (180 / Math.PI)

AFRAME.registerComponent('rotation-receiver', {
  init: function () {
    const component = this
    document
      .querySelector('[rotation-emitter]')
      .addEventListener('change', ({ detail }) => {
        const {
          rotation,
          position
        } = detail

        component.el.setAttribute('position', {
          x: -position.x,
          y: position.y,
          z: -position.z
        })

        component.el.setAttribute('rotation', {
          x: -90 + radToDeg(rotation.x),
          y: radToDeg(rotation.y),
          z: 180 + radToDeg(rotation.z)
        })
      })
  }
})
