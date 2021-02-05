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

        window.requestAnimationFrame(() => {
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
      })
  }
})
