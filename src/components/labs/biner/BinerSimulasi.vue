<template>
  <div>
    <h2 class="section-title">Konverter Biner 8-bit</h2>
    <p class="section-subtitle">Klik bit untuk mengubah nilai 0/1</p>

    <div class="bin-container">
      <div class="bit-row">
        <div v-for="(bit, i) in bits" :key="i" class="bit-col">
          <div class="bit-box" :class="{ on: bit === 1 }" @click="toggleBit(i)" role="button" tabindex="0">
            {{ bit }}
          </div>
          <div class="bit-val">2<sup>{{ 7 - i }}</sup></div>
          <div class="bit-val-dec">{{ Math.pow(2, 7 - i) }}</div>
        </div>
      </div>
      <div class="dec-result">
        Desimal: <span class="val">{{ decimalValue }}</span>
      </div>
      <button class="btn btn-danger mt-sm" @click="resetBits">🔄 Reset Biner</button>
    </div>

    <hr class="divider" />

    <h2 class="section-title">Simulator Gerbang Logika</h2>
    <div class="logic-container">
      <div class="logic-controls">
        <select v-model="gate" @change="audio.click()" aria-label="Pilih Gerbang Logika">
          <option value="AND">Gerbang AND</option>
          <option value="OR">Gerbang OR</option>
          <option value="NOT">Gerbang NOT</option>
          <option value="NAND">Gerbang NAND</option>
          <option value="NOR">Gerbang NOR</option>
          <option value="XOR">Gerbang XOR</option>
        </select>
      </div>

      <div class="logic-circuit">
        <div class="inputs">
          <div class="inp-group">
            <span class="lbl">Input A</span>
            <button class="logic-btn" :class="{ on: inA }" @click="toggleA">{{ inA ? 1 : 0 }}</button>
          </div>
          <div class="inp-group" :class="{ disabled: gate === 'NOT' }">
            <span class="lbl">Input B</span>
            <button class="logic-btn" :class="{ on: inB }" @click="toggleB" :disabled="gate === 'NOT'">
              {{ gate === 'NOT' ? '-' : (inB ? 1 : 0) }}
            </button>
          </div>
        </div>

        <div class="gate-symbol">
          <div class="wire w-in-a" :class="{ on: inA }"></div>
          <div class="wire w-in-b" :class="{ on: inB }" v-if="gate !== 'NOT'"></div>
          <div class="gate-box">{{ gate }}</div>
          <div class="wire w-out" :class="{ on: outVal }"></div>
        </div>

        <div class="output">
          <span class="lbl">Output</span>
          <div class="lamp" :class="{ on: outVal }"></div>
          <div class="out-val" :class="outVal ? 'text-emerald' : 'text-rose'">{{ outVal ? 1 : 0 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'

const audio = inject('audio')

// --- Biner 8-bit ---
const bits = ref([0, 0, 0, 0, 0, 0, 0, 0])

const decimalValue = computed(() => {
  return bits.value.reduce((acc, bit, idx) => {
    return acc + bit * Math.pow(2, 7 - idx)
  }, 0)
})

function toggleBit(i) {
  bits.value[i] = bits.value[i] === 1 ? 0 : 1
  audio.bitFlip(bits.value[i] === 1)
}

function resetBits() {
  bits.value = [0, 0, 0, 0, 0, 0, 0, 0]
  audio.reset()
}

// --- Logic Gates ---
const gate = ref('AND')
const inA = ref(false)
const inB = ref(false)

function toggleA() { inA.value = !inA.value; audio.gateToggle(inA.value) }
function toggleB() { inB.value = !inB.value; audio.gateToggle(inB.value) }

const outVal = computed(() => {
  const a = inA.value, b = inB.value
  switch (gate.value) {
    case 'AND': return a && b
    case 'OR':  return a || b
    case 'NOT': return !a
    case 'NAND':return !(a && b)
    case 'NOR': return !(a || b)
    case 'XOR': return a !== b
    default: return false
  }
})

function reset() {
  resetBits()
  gate.value = 'AND'; inA.value = false; inB.value = false
}
defineExpose({ reset })
</script>

<style scoped>
.section-title { font-size:1.25rem; font-weight:800; margin-bottom:6px; }
.section-subtitle { font-size:0.85rem; color:var(--text-secondary); margin-bottom:20px; }
.mt-sm { margin-top: 12px; }

/* Biner */
.bin-container {
  background: var(--bg-base); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg); padding: 24px;
  display: flex; flex-direction: column; align-items: center; gap: 20px;
}
.bit-row { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.bit-col { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.bit-box {
  width: 50px; height: 60px;
  background: var(--bg-elevated); border: 2px solid var(--border-subtle);
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; font-family: var(--font-mono); font-weight: 700;
  cursor: pointer; transition: all var(--transition-fast); user-select: none;
}
.bit-box:hover { border-color: var(--accent-primary); transform: translateY(-2px); }
.bit-box.on {
  background: rgba(16,185,129,0.15); border-color: var(--accent-emerald);
  color: var(--accent-emerald); box-shadow: var(--glow-emerald);
}
.bit-val { font-size: 0.75rem; color: var(--text-muted); }
.bit-val-dec { font-size: 0.8rem; font-weight: 700; color: var(--accent-cyan); }
.dec-result { font-size: 1.2rem; font-weight: 600; }
.dec-result .val { font-size: 1.8rem; font-weight: 800; color: var(--accent-primary); font-family: var(--font-mono); margin-left: 10px; }

/* Logic */
.logic-container {
  background: var(--bg-base); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg); padding: 24px;
}
.logic-controls { display: flex; justify-content: center; margin-bottom: 30px; }
.logic-circuit { display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap; }
.inputs { display: flex; flex-direction: column; gap: 20px; }
.inp-group { display: flex; align-items: center; gap: 12px; }
.inp-group.disabled { opacity: 0.3; pointer-events: none; }
.lbl { font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; width: 60px; text-align: right; }
.logic-btn {
  width: 44px; height: 44px; border-radius: var(--radius-md); border: 2px solid var(--border-subtle);
  background: var(--bg-elevated); color: var(--text-primary);
  font-size: 1.2rem; font-family: var(--font-mono); font-weight: 700;
  cursor: pointer; transition: all var(--transition-fast);
}
.logic-btn:hover { border-color: var(--accent-cyan); }
.logic-btn.on { background: rgba(34,211,238,0.15); border-color: var(--accent-cyan); color: var(--accent-cyan); box-shadow: var(--glow-cyan); }
.gate-symbol { position: relative; width: 120px; height: 80px; display: flex; align-items: center; justify-content: center; margin: 0 20px; }
.gate-box {
  width: 80px; height: 50px; background: var(--bg-card); border: 2px solid var(--accent-primary);
  border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-family: var(--font-mono); z-index: 2; box-shadow: var(--glow-primary);
}
.wire { position: absolute; height: 4px; background: var(--bg-elevated); z-index: 1; transition: background 0.3s; }
.wire.on { background: var(--accent-emerald); box-shadow: 0 0 10px var(--accent-emerald); }
.w-in-a { left: -30px; top: 20px; width: 50px; }
.w-in-b { left: -30px; bottom: 20px; width: 50px; }
.w-out { right: -30px; top: 38px; width: 50px; }
.output { display: flex; flex-direction: column; align-items: center; gap: 10px; width: 70px; }
.lamp {
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--bg-elevated); border: 2px solid var(--border-subtle);
  transition: all 0.3s;
}
.lamp.on { background: #facc15; border-color: #facc15; box-shadow: var(--glow-amber); animation: lampGlow 2s infinite; }
.out-val { font-size: 1.5rem; font-family: var(--font-mono); font-weight: 800; }
</style>
