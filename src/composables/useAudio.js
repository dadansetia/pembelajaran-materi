/**
 * useAudio.js — Web Audio API composable
 * Lab Maya Informatika SMA
 */
import { ref } from 'vue'

let ctx = null
let masterGain = null
const enabled = ref(true)

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    masterGain = ctx.createGain()
    masterGain.gain.value = 0.4
    masterGain.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.3) {
  if (!enabled.value) return
  try {
    const c = getCtx()
    const osc = c.createOscillator()
    const g = c.createGain()
    osc.connect(g); g.connect(masterGain)
    osc.type = type
    osc.frequency.setValueAtTime(freq, c.currentTime)
    g.gain.setValueAtTime(gainVal, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
    osc.start(c.currentTime)
    osc.stop(c.currentTime + duration)
  } catch {}
}

export function useAudio() {
  return {
    enabled,
    toggle() { enabled.value = !enabled.value },
    click()  { playTone(800, 'sine', 0.06, 0.2) },
    swap()   { playTone(440, 'triangle', 0.08, 0.25); setTimeout(() => playTone(550, 'triangle', 0.06, 0.2), 60) },
    compare(){ playTone(660, 'sine', 0.05, 0.1) },
    sortDone() { [523,659,784,1047].forEach((f,i) => setTimeout(() => playTone(f,'sine',0.15,0.3), i*80)) },
    push()   { playTone(600, 'square', 0.08, 0.15) },
    pop()    { playTone(300, 'square', 0.1, 0.15) },
    gateToggle(on) { playTone(on ? 880 : 440, 'sine', 0.08, 0.2) },
    packetSend()   { playTone(1200,'sine',0.04,0.1); setTimeout(() => playTone(900,'sine',0.04,0.1), 40) },
    packetReceive(){ playTone(700,'sine',0.05,0.15); setTimeout(() => playTone(1000,'sine',0.08,0.2), 50) },
    error()  { playTone(200,'sawtooth',0.15,0.3); setTimeout(() => playTone(180,'sawtooth',0.15,0.3), 120) },
    success(){ playTone(880,'sine',0.1,0.2); setTimeout(() => playTone(1100,'sine',0.1,0.25),100); setTimeout(() => playTone(1320,'sine',0.15,0.3),200) },
    reset()  { playTone(400, 'sine', 0.15, 0.2) },
    tab()    { playTone(750, 'sine', 0.06, 0.15) },
    bitFlip(on) { playTone(on ? 1000 : 500, 'square', 0.06, 0.12) }
  }
}
