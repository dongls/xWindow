import Introduction from './Introduction.md'
import QuickStart from './QuickStart.md'
import Use from './Use.md'
import Example from './Example.md'
import Api from './Api.md'

const arr = [
  { name: '简介', content: Introduction },
  { name: '快速开始', content: QuickStart },
  { name: '进阶应用', content: Use },
  { name: 'API', content: Api },
  { name: '示例', content: Example, guide: false },
]

const docs = arr.map((i, index) => {
  return { id: index, ...i }
})

export default docs
