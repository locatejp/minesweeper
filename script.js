// GLOBALS
const totalBlocks = 100

function initialSetup() {
  createBoard()
  addMinesToBoard()
  addCountToBlocks()
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
    if (block.dataset.status === "mine") {
      i--
      continue
    }
    block.dataset.status = "mine"
  }
}

function handleClick(event) {
  const block = event.target
  if (block.dataset.status === "mine") {
    block.classList.add("mine")
    block.innerText = "💣"
    alert("You lost!")
  } else {
    block.classList.add("revealed")
    block.dataset.status = "revealed"
    block.innerHTML = countMines(block)
  }
}

function addCountToBlocks() {
  const board = document.querySelector(".board")
  const blocks = [...board.children]
  blocks.forEach((block) => {
    const mineCount = countMines(block)
    block.innerText = mineCount
  })
}

function countMines(block) {
  const mineCount = getAdjacentBlocks(block).filter(
    (block) => block.dataset.status === "mine"
  ).length
  return mineCount
}

function getAdjacentBlocks(block) {
  const index = block.dataset.index
  const sqrt = Math.sqrt(totalBlocks)
  const row = Math.floor(index / sqrt)
  const col = index % sqrt
  const adjacentBlocks = []
  const center = getBlock(row, col)
  const topLeft = getBlock(row - 1, col - 1)
  const top = getBlock(row - 1, col)
  const topRight = getBlock(row - 1, col + 1)
  const left = getBlock(row, col - 1)
  const right = getBlock(row, col + 1)
  const bottomLeft = getBlock(row + 1, col - 1)
  const bottom = getBlock(row + 1, col)
  const bottomRight = getBlock(row + 1, col + 1)
  adjacentBlocks.push(
    center,
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
