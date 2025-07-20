<template>
  <table>
    <colgroup>
      <col width="160" />
      <col width="150" />
    </colgroup>
    <thead>
      <tr>
        <th>事件</th>
        <th>默认行为</th>
        <th>说明</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in events" :key="row.prop">
        <td>{{ row.type }}</td>
        <td>{{ row.prevent ?? '--' }}</td>
        <td>{{ row.desc }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const events = [
  { type: 'created', desc: '窗口组件创建时触发' },
  { type: 'beforeShow', prevent: '可阻止窗口显示', desc: '窗口显示前触发' },
  { type: 'show', desc: '窗口显示后触发' },
  { type: 'beforeClose', prevent: '可阻止窗口关闭', desc: '窗口关闭前触发' },
  { type: 'close', desc: '窗口关闭时触发' },
  { type: 'beforeDestroy', desc: '窗口销毁前触发' },

  { type: 'dragStart', prevent: '可阻止窗口拖动', desc: '窗口开始拖动时触发' },
  { type: 'dragging', desc: '窗口拖动时触发' },
  { type: 'dragEnd', desc: '窗口拖动结束时触发' },

  { type: 'resizeStart', prevent: '可阻止窗口调整尺寸', desc: '窗口开始调整尺寸时触发' },
  { type: 'resizing', desc: '窗口调整尺寸时触发' },
  { type: 'resizeEnd', desc: '窗口结束调整尺寸时触发' },

  { type: 'maximizeChange', desc: '窗口最大化状态改变时触发' },

  { type: 'confirm', desc: '调用窗口的confirm方法后触发，可通过此事件返回窗体的内容' },
  { type: 'cancel', desc: '调用窗口的cancel方法后触发' },
]
</script>
