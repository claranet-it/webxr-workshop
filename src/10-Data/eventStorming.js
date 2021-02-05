const extendDeep = AFRAME.utils.extendDeep
const meshMixin = AFRAME.primitives.getMeshMixin()

AFRAME.registerPrimitive('a-post-it', extendDeep({}, meshMixin, {
  defaultComponents: {
    geometry: {
      primitive: 'plane',
      height: 0.076,
      width: 0.076
    },
    material: {
      shader: 'flat',
      side: 'double'
    },
    rotation: {
      x: 0,
      y: 90,
      z: 0
    }
  },
  mappings: {
    color: 'material.color'
  }
}))

const TYPES = {
  external: '#FC67B9',
  command: '#3799FE',
  aggregate: '#FBD32D',
  event: '#FA992A'
}

AFRAME.registerComponent('type', {
  schema: { type: 'string' },
  init: function () {
    const color = TYPES[this.data] || TYPES.event
    this.el.setAttribute('color', color)
  }
})
