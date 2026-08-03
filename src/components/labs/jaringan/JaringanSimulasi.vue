<template>
  <div>
    <h2 class="section-title">Simulasi Topologi Jaringan</h2>
    <p class="section-subtitle">Klik dua node → pilih pengirim &amp; penerima → Kirim Paket</p>

    <div class="sim-controls mb-md">
      <select v-model="topology" @change="buildTopology(); audio.click()" aria-label="Pilih Topologi">
        <option value="star">⭐ Topologi Star</option>
        <option value="ring">🔁 Topologi Ring</option>
        <option value="bus">🚌 Topologi Bus</option>
      </select>
      <button class="btn btn-primary" @click="sendPacket" :disabled="animating">📦 Kirim Paket</button>
      <button class="btn btn-warning" @click="broadcast" :disabled="animating">📡 Broadcast</button>
      <button class="btn btn-danger" @click="reset">🔄 Reset</button>
    </div>

    <div class="svg-box">
      <svg ref="svgRef" viewBox="0 0 700 300" class="net-svg" aria-label="Diagram Topologi Jaringan"></svg>
    </div>

    <div class="status-bar mt-md">
      <div class="status-item"><span class="label">Topologi:</span><span class="value">{{ topoNames[topology] }}</span></div>
      <div class="status-item"><span class="label">Node:</span><span class="value">{{ nodes.length }}</span></div>
      <div class="status-item"><span class="label">Paket Terkirim:</span><span class="value">{{ packetCount }}</span></div>
      <div class="status-item"><span class="label">Rute:</span><span class="value">{{ routeLabel }}</span></div>
    </div>
    <div class="info-panel mt-md">{{ infoText }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
const audio = inject('audio')
const toast = inject('toast')

const svgRef = ref(null)
const topology = ref('star')
const nodes = ref([])
const selected = ref([])
const packetCount = ref(0)
const animating = ref(false)
const routeLabel = ref('—')
const infoText = ref('Klik dua node untuk memilih pengirim & penerima, lalu klik Kirim Paket.')
const topoNames = { star: 'Star', ring: 'Ring', bus: 'Bus' }

const NS = 'http://www.w3.org/2000/svg'
let conns = []

function mk(tag, attrs = {}) {
  const el = document.createElementNS(NS, tag)
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
  return el
}

function buildTopology() {
  nodes.value = []; conns = []; selected.value = []
  const cx = 350, cy = 150
  const t = topology.value

  if (t === 'star') {
    nodes.value.push({ id: 0, x: cx, y: cy, label: 'Switch', type: 'switch', color: '#f59e0b' })
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2
      nodes.value.push({ id: i+1, x: cx + 120*Math.cos(a), y: cy + 110*Math.sin(a), label:`PC ${i+1}`, type:'pc', color:'#6366f1' })
      conns.push([0, i+1])
    }
  } else if (t === 'ring') {
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2
      nodes.value.push({ id: i, x: cx + 120*Math.cos(a), y: cy + 110*Math.sin(a), label:`PC ${i+1}`, type:'pc', color:'#10b981' })
    }
    for (let i = 0; i < 6; i++) conns.push([i, (i+1)%6])
  } else {
    const sx = cx - 240, sp = 100
    nodes.value.push({ id: 0, x: sx - 60, y: cy, label:'Server', type:'server', color:'#f43f5e' })
    for (let i = 0; i < 5; i++)
      nodes.value.push({ id: i+1, x: sx + i*sp, y: cy, label:`PC ${i+1}`, type:'pc', color:'#22d3ee' })
    for (let i = 0; i < nodes.value.length-1; i++) conns.push([i, i+1])
  }
  render()
}

function render() {
  const svg = svgRef.value; if (!svg) return
  svg.innerHTML = ''

  // glow filter
  const defs = mk('defs')
  const flt = mk('filter', { id:'glow' })
  const blur = mk('feGaussianBlur', { stdDeviation:'3', result:'b' })
  const merge = mk('feMerge')
  ;['b','SourceGraphic'].forEach(v => {
    const mn = mk('feMergeNode'); if (v==='b') mn.setAttribute('in','b'); merge.appendChild(mn)
  })
  flt.append(blur, merge); defs.appendChild(flt); svg.appendChild(defs)

  // connections
  conns.forEach(([a, b]) => {
    const na = nodes.value[a], nb = nodes.value[b]
    const l = mk('line', { x1:na.x, y1:na.y, x2:nb.x, y2:nb.y,
      stroke:'rgba(99,102,241,0.3)', 'stroke-width':'2', id:`conn-${a}-${b}` })
    svg.appendChild(l)
  })

  // nodes
  nodes.value.forEach(n => {
    const g = mk('g'); g.setAttribute('transform', `translate(${n.x},${n.y})`)
    g.style.cursor = 'pointer'; g.id = `node-${n.id}`

    if (selected.value.includes(n.id)) {
      const ring = mk('circle', { r:'26', fill:'none',
        stroke: selected.value[0]===n.id ? '#f59e0b':'#22d3ee',
        'stroke-width':'2.5', filter:'url(#glow)' })
      g.appendChild(ring)
    }
    g.appendChild(mk('circle', { r:'20', fill: n.color+'22', stroke:n.color, 'stroke-width':'2', filter:'url(#glow)' }))
    const icon = mk('text'); icon.setAttribute('text-anchor','middle'); icon.setAttribute('dominant-baseline','central')
    icon.setAttribute('font-size','14')
    icon.textContent = n.type==='switch'?'🔀':n.type==='server'?'🖥':'💻'
    g.appendChild(icon)
    const lbl = mk('text'); lbl.setAttribute('text-anchor','middle'); lbl.setAttribute('y','34')
    lbl.setAttribute('font-size','10'); lbl.setAttribute('fill','#94a3b8')
    lbl.setAttribute('font-family','Inter,sans-serif'); lbl.setAttribute('font-weight','600')
    lbl.textContent = n.label; g.appendChild(lbl)

    g.addEventListener('click', () => clickNode(n.id))
    svg.appendChild(g)
  })
}

function clickNode(id) {
  audio.click()
  if (selected.value.includes(id)) selected.value = selected.value.filter(x=>x!==id)
  else if (selected.value.length < 2) selected.value.push(id)
  else selected.value = [id]
  render()
  if (selected.value.length===2) {
    const a = nodes.value.find(n=>n.id===selected.value[0])
    const b = nodes.value.find(n=>n.id===selected.value[1])
    routeLabel.value = `${a?.label} → ${b?.label}`
  } else if (selected.value.length===1) {
    routeLabel.value = `${nodes.value.find(n=>n.id===selected.value[0])?.label} (pilih penerima)`
  } else routeLabel.value = '—'
}

function getPath(from, to) {
  const t = topology.value
  if (t === 'star') {
    const sw = nodes.value.find(n=>n.type==='switch')
    if (!sw) return [from, to]
    if (from===sw.id) return [from, to]
    if (to===sw.id)   return [from, to]
    return [from, sw.id, to]
  }
  if (t === 'ring') {
    const n = nodes.value.length, path = []
    let cur = from; while (cur!==to) { path.push(cur); cur=(cur+1)%n }; path.push(to); return path
  }
  if (t === 'bus') {
    if (from<=to) { const p=[]; for(let i=from;i<=to;i++)p.push(i); return p }
    else { const p=[]; for(let i=from;i>=to;i--)p.push(i); return p }
  }
  return [from, to]
}

async function animPath(path, color) {
  const svg = svgRef.value; if (!svg) return
  for (let i = 0; i < path.length - 1; i++) {
    const a = nodes.value.find(n=>n.id===path[i])
    const b = nodes.value.find(n=>n.id===path[i+1])
    if (!a||!b) continue
    const cid = [`conn-${path[i]}-${path[i+1]}`, `conn-${path[i+1]}-${path[i]}`]
    const cEl = cid.map(id=>document.getElementById(id)).find(Boolean)
    if (cEl) { cEl.setAttribute('stroke', color); cEl.setAttribute('stroke-width','3') }
    const dot = mk('circle', { r:'8', fill:color, cx:a.x, cy:a.y, filter:'url(#glow)' })
    svg.appendChild(dot); audio.packetSend()
    await animate(dot, a.x, a.y, b.x, b.y, 450)
    svg.removeChild(dot); audio.packetReceive()
    if (cEl) { cEl.setAttribute('stroke','rgba(99,102,241,0.3)'); cEl.setAttribute('stroke-width','2') }
    await sleep(80)
  }
}

function animate(el, x1, y1, x2, y2, dur) {
  return new Promise(res => {
    const t0 = performance.now()
    function f(now) {
      const p = Math.min((now-t0)/dur, 1), e = p<.5?2*p*p:-1+(4-2*p)*p
      el.setAttribute('cx', x1+(x2-x1)*e); el.setAttribute('cy', y1+(y2-y1)*e)
      p<1 ? requestAnimationFrame(f) : res()
    }
    requestAnimationFrame(f)
  })
}
function sleep(ms) { return new Promise(r=>setTimeout(r, ms)) }

async function sendPacket() {
  if (animating.value) return
  if (selected.value.length < 2) { audio.error(); toast.error('⚠️ Pilih 2 node terlebih dahulu'); return }
  const [f,t] = selected.value
  const na = nodes.value.find(n=>n.id===f), nb = nodes.value.find(n=>n.id===t)
  animating.value = true; packetCount.value++
  const path = getPath(f, t)
  infoText.value = `📦 Mengirim: ${na?.label} → ${nb?.label} via ${path.map(id=>nodes.value.find(n=>n.id===id)?.label).join(' → ')}`
  await animPath(path, '#22d3ee')
  audio.success(); toast.success(`✅ Paket terkirim: ${na?.label} → ${nb?.label}`)
  infoText.value = `✅ Terkirim! ${na?.label} → ${nb?.label}. Total: ${packetCount.value} paket.`
  animating.value = false
}

async function broadcast() {
  if (animating.value || selected.value.length < 1) { audio.error(); toast.error('⚠️ Pilih 1 sumber'); return }
  const f = selected.value[0], src = nodes.value.find(n=>n.id===f)
  animating.value = true
  for (const n of nodes.value) {
    if (n.id===f) continue
    await animPath(getPath(f, n.id), '#f59e0b'); packetCount.value++; await sleep(100)
  }
  audio.success(); toast.success(`📡 Broadcast dari ${src?.label} selesai`); animating.value = false
}

function reset() {
  selected.value = []; packetCount.value = 0; animating.value = false
  infoText.value = 'Klik dua node untuk memilih pengirim & penerima, lalu klik Kirim Paket.'
  routeLabel.value = '—'; audio.reset(); buildTopology(); toast.info('🔄 Jaringan direset')
}

defineExpose({ reset })
onMounted(() => buildTopology())
</script>

<style scoped>
.section-title { font-size:1.25rem; font-weight:800; margin-bottom:6px; }
.section-subtitle { font-size:0.85rem; color:var(--text-secondary); margin-bottom:16px; }
.mb-md { margin-bottom:12px; }
.mt-md { margin-top:12px; }
.svg-box { background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:10px; }
.net-svg { width:100%; display:block; }
</style>
