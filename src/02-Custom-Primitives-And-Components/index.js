AFRAME.registerPrimitive('a-shoe', {
  defaultComponents: {
    scale: { x: 3, y: 3, z: 3 }
  },
  mappings: {
    src: 'gltf-model'
  }
})

AFRAME.registerComponent('point-to', {
  schema: { type: 'string' },
  init: function () {
    switch (this.data) {
      case 'N':
        this.el.setAttribute('rotation', {
          x: 0,
          y: -90,
          z: 0
        })
        break
      case 'S':
        this.el.setAttribute('rotation', {
          x: 0,
          y: 90,
          z: 0
        })
        break
      case 'W':
        this.el.setAttribute('rotation', {
          x: 0,
          y: 180,
          z: 0
        })
        break
    }
  }
})
