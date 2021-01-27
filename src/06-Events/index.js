let i = 0

const stringToHtml = string => {
  const div = document.createElement('div')
  div.innerHTML = string
  return div.firstElementChild
}

const add = (i) => {
  const scene = document.querySelector('a-scene')
  scene.appendChild(
    stringToHtml(`<a-shoe src="../assets/Sneaker-test-texturing.gltf" position="${5 * i} 1 -5" point-to="N" scale="10 10 10"></a-shoe>`)
  )
}

const moveTo = direction => {
  Array
    .from(document.querySelectorAll('a-shoe'))
    .forEach(shoe => shoe.setAttribute('point-to', direction))
}

document.addEventListener('keyup', ({ key }) => {
  if (key === '+') {
    i++
    add(i)
  }

  if (key === 'ArrowRight') {
    return moveTo('E')
  }

  if (key === 'ArrowUp') {
    return moveTo('S')
  }

  if (key === 'ArrowDown') {
    return moveTo('N')
  }

  if (key === 'ArrowLeft') {
    return moveTo('W')
  }
})

const playMusic = () => {
  const sound = document.querySelector('[sound]')
  sound.components.sound.playSound()
}

const exitVR = () => {
  const scene = document.querySelector('a-scene')
  scene.exitVR()
}

window.application = {
  playMusic,
  exitVR,
  add: () => {
    i++
    add(i)
  },
  moveTo
}
