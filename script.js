// GLOBALS
const totalBlocks = 100

function initialSetup() {
  createBoard()
  addMinesToBoard()
  addCountToBlocks()
  // setEventListeners()
}
initialSetup()

function createBoard() {
  const board = document.querySelector(".board")
  console.log(board)
  for (let i = 0; i < totalBlocks; i++) {
    const block = document.createElement("div")
    block.classList.add("board")
    block.dataset.status = "hidden"
    block.dataset.index = i
    block.addEventListener("click", handleClick)
    block.addEventListener("mouseup", handleMouseClick)
    block.addEventListener("contextmenu", handleContextMenu)
    board.appendChild(block)
  }
}

function addMinesToBoard() {
  const board = document.querySelector(".board")
  const remainingBlocks = Number(totalBlocks) // MAKE A COPY OF THE TOTAL BLOCKS
  const mines = Math.floor(totalBlocks / 10)
  for (let i = 0; i < mines; i++) {
    const randomBlock = Math.floor(Math.random() * remainingBlocks)
    const block = board.children[randomBlock]
    if (block.dataset.identity === "💣") {
      i--
      continue
    }
    block.dataset.identity = "💣"
  }
}

function handleContextMenu(event) {
  event.preventDefault()
}

function handleMouseClick(event) {
  const buttonClicked = event.button
  const block = event.target
  const status = block.dataset.status
  if (status !== "hidden") {
    return
  }
  console.log(buttonClicked)
  if (buttonClicked === 2) {
    console.log("right click detected")
    block.dataset.status = "marked"
  }
  return
}

function handleClick(event) {
  const block = event.target
  revealBlock(block)
  const identity = block.dataset.identity
  switch (identity) {
    case "💣":
      showEntireBoard()
      break
    case "0":
      clearAdjacentBlocks(block)
      break
    default:
      break
  }
}

function handleRightClick(event) {
  console.log("right click detected")
  event.preventDefault()
  const block = event.target
  block.dataset.status === "marked"
}

function showEntireBoard() {
  const board = document.querySelector(".board")
  const blocks = [...board.children]
  blocks.forEach((block) => {
    revealBlock(block)
  })
}

function revealBlock(block) {
  const identity = block.dataset.identity
  switch (identity) {
    case "💣":
      block.dataset.status = "mine"
      block.innerHTML = "💣"
      break
    case "0":
      block.dataset.status = "number"
      break
    default:
      block.dataset.status = "number"
      block.innerHTML = identity
  }
}

function clearAdjacentBlocks(block) {
  const adjacentBlocks = getAdjacentBlocks(block)
  adjacentBlocks.forEach((block) => {
    if (block.dataset.identity === "0" && block.dataset.status !== "number") {
      block.dataset.status = "number"
      clearAdjacentBlocks(block)
    }
  })
  block.dataset.status = "number"
}

function addCountToBlocks() {
  const board = document.querySelector(".board")
  const blocks = [...board.children]
  blocks.forEach((block) => {
    const mineCount = countMines(block)
    block.dataset.identity = mineCount
  })
}

function countMines(block) {
  const identity = block.dataset.identity
  if (identity === "💣") {
    return identity
  }
  const mineCount = getAdjacentBlocks(block).filter(
    (block) => block.dataset.identity === "💣"
  ).length
  return mineCount
}

function getAdjacentBlocks(block) {
  const index = block.dataset.index
  const sqrt = Math.sqrt(totalBlocks)
  const row = Math.floor(index / sqrt)
  const col = index % sqrt
  const adjacentBlocks = []
  const topLeft = getBlock(row - 1, col - 1)
  const top = getBlock(row - 1, col)
  const topRight = getBlock(row - 1, col + 1)
  const left = getBlock(row, col - 1)
  const right = getBlock(row, col + 1)
  const bottomLeft = getBlock(row + 1, col - 1)
  const bottom = getBlock(row + 1, col)
  const bottomRight = getBlock(row + 1, col + 1)
  adjacentBlocks.push(
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomLeft,
    bottom,
    bottomRight
  )
  return adjacentBlocks.filter((block) => block !== null)
}

function getBlock(row, col) {
  if (col < 0 || col > 9) {
    return null
  }
  const index = row * 10 + col
  const block = document.querySelector(`[data-index="${index}"]`)
  if (block === null) {
    return null
  }
  return block
}

function handleRightClick(event) {
  event.preventDefault()
  const block = event.target
  if (block.dataset.status === "revealed") {
    return
  }
}
