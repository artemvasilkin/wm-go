const file = 'src/style.css'

const original = [/\.section {\n\s\smin-width:\s320px;\n\s\spadding:\s30px\s0;/]

const replacement = [
  `.section {
  min-width: 320px;
  padding: 30px 0;`
]

module.exports = {
  file: file,
  original: original,
  replacement: replacement
}
