const fs = require('fs')
const path = require('path')

const clientIndicators = [
  /use(State|Effect|Ref|LayoutEffect|Context|Reducer)/,
  /onClick=|onChange=|onMouse|onKey|onInput=/,
]

const isClientComponent = (content) => {
  return clientIndicators.some((regex) => regex.test(content))
}

const hasUseClient = (content) => {
  return /^['"]use client['"]/.test(content.trimStart())
}

const checkFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(process.cwd(), filePath)

  const needsClient = isClientComponent(content)
  const hasClientDirective = hasUseClient(content)

  if (needsClient && !hasClientDirective) {
    console.log(`❌ ${relativePath} precisa de 'use client'`)
  } else if (!needsClient && hasClientDirective) {
    console.log(`⚠️  ${relativePath} tem 'use client', mas talvez não precise`)
  } else {
    console.log(`✅ ${relativePath} está ok`)
  }
}

const walk = (dir) => {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      walk(fullPath)
    } else if (file.endsWith('.tsx')) {
      checkFile(fullPath)
    }
  }
}

walk('./src')
