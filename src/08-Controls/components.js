AFRAME.registerPrimitive('a-shoe', {
  defaultComponents: {
    scale: { x: 0.3, y: 0.3, z: 0.3 }
  },
  mappings: {
    src: 'gltf-model'
  }
})

const tick = () => {
  window.requestAnimationFrame((time) => {
    window.TWEEN.update(time)
    tick()
  })
}

tick()

const rotations = {
  N: {
    x: 0,
    y: -90,
    z: 0
  },
  S: {
    x: 0,
    y: 90,
    z: 0
  },
  W: {
    x: 0,
    y: 180,
    z: 0
  },
  E: {
    x: 0,
    y: 0,
    z: 0
  }
}

const move = component => {
  const targetRotation = rotations[component.data]
  if (!targetRotation) {
    return
  }

  const rotation = component.el.getAttribute('rotation')

  return new window.TWEEN.Tween(rotation)
    .to(targetRotation, 500)
    .easing(window.TWEEN.Easing.Quadratic.Out)
    .onUpdate(function () {
      component.el.setAttribute('rotation', rotation)
    })
    .start()
}

AFRAME.registerComponent('point-to', {
  schema: { type: 'string' },
  init: function () {
    this.animation = move(this)
  },
  update: function () {
    if (this.animation) {
      this.animation.stop()
    }
    this.animation = move(this)
  }
})
