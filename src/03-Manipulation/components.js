AFRAME.registerPrimitive('a-shoe', {
  defaultComponents: {
    scale: { x: 3, y: 3, z: 3 }
  },
  mappings: {
    src: 'gltf-model'
  }
})

const move = component => {
  switch (component.data) {
    case 'N':
      component.el.setAttribute('rotation', {
        x: 0,
        y: -90,
        z: 0
      })
      break
    case 'S':
      component.el.setAttribute('rotation', {
        x: 0,
        y: 90,
        z: 0
      })
      break
    case 'W':
      component.el.setAttribute('rotation', {
        x: 0,
        y: 180,
        z: 0
      })
      break
    case 'E':
      component.el.setAttribute('rotation', {
        x: 0,
        y: 0,
        z: 0
      })
      break
  }
}

AFRAME.registerComponent('point-to', {
  schema: { type: 'string' },
  init: function () {
    move(this)
  },
  update: function () {
    move(this)
  }
})
