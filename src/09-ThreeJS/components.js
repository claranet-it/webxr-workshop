AFRAME.registerComponent('crate', {
  init: function () {
    const texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/crate.gif')

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ map: texture })

    const mesh = new THREE.Mesh(geometry, material)

    this.el.setObject3D('create', mesh)
  }
})
