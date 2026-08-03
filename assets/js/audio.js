/**
 * audio.js - Web Audio API sound effects engine
 * Lab Maya Informatika SMA
 */

const AudioEngine = (() => {
  let ctx = null;
  let enabled = true;
  let masterGain = null;

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.4;
      masterGain.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.3) {
    if (!enabled) return;
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.connect(g);
      g.connect(masterGain);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, c.currentTime);
      g.gain.setValueAtTime(gainVal, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
      osc.start(c.currentTime);
      osc.stop(c.currentTime + duration);
    } catch (e) { /* silent fail */ }
  }

  function playNoise(duration = 0.05, type = 'white') {
    if (!enabled) return;
    try {
      const c = getCtx();
      const bufSize = c.sampleRate * duration;
      const buf = c.createBuffer(1, bufSize, c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource();
      src.buffer = buf;
      const g = c.createGain();
      g.gain.setValueAtTime(0.15, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
      const filter = c.createBiquadFilter();
      filter.type = type === 'white' ? 'lowpass' : 'highpass';
      filter.frequency.value = type === 'white' ? 800 : 1200;
      src.connect(filter);
      filter.connect(g);
      g.connect(masterGain);
      src.start();
    } catch (e) { /* silent fail */ }
  }

  return {
    toggle() {
      enabled = !enabled;
      return enabled;
    },

    get isEnabled() { return enabled; },

    // UI interaction
    click() {
      playTone(800, 'sine', 0.06, 0.2);
    },

    // Swap two elements during sort
    swap() {
      playTone(440, 'triangle', 0.08, 0.25);
      setTimeout(() => playTone(550, 'triangle', 0.06, 0.2), 60);
    },

    // Comparison during sort
    compare() {
      playTone(660, 'sine', 0.05, 0.1);
    },

    // Sort complete
    sortDone() {
      const notes = [523, 659, 784, 1047];
      notes.forEach((f, i) => {
        setTimeout(() => playTone(f, 'sine', 0.15, 0.3), i * 80);
      });
    },

    // Push to stack/queue
    push() {
      playTone(600, 'square', 0.08, 0.15);
    },

    // Pop from stack/queue
    pop() {
      playTone(300, 'square', 0.1, 0.15);
    },

    // Logic gate toggle
    gateToggle(isOn) {
      playTone(isOn ? 880 : 440, 'sine', 0.08, 0.2);
    },

    // Packet sent in network
    packetSend() {
      playTone(1200, 'sine', 0.04, 0.1);
      setTimeout(() => playTone(900, 'sine', 0.04, 0.1), 40);
    },

    // Packet received
    packetReceive() {
      playTone(700, 'sine', 0.05, 0.15);
      setTimeout(() => playTone(1000, 'sine', 0.08, 0.2), 50);
    },

    // Error/warning
    error() {
      playTone(200, 'sawtooth', 0.15, 0.3);
      setTimeout(() => playTone(180, 'sawtooth', 0.15, 0.3), 120);
    },

    // Success
    success() {
      playTone(880, 'sine', 0.1, 0.2);
      setTimeout(() => playTone(1100, 'sine', 0.1, 0.25), 100);
      setTimeout(() => playTone(1320, 'sine', 0.15, 0.3), 200);
    },

    // Reset
    reset() {
      playNoise(0.1, 'white');
      setTimeout(() => playTone(400, 'sine', 0.15, 0.2), 80);
    },

    // Navigation tab switch
    tab() {
      playTone(750, 'sine', 0.06, 0.15);
    },

    // Bit flip in binary lab
    bitFlip(isOn) {
      playTone(isOn ? 1000 : 500, 'square', 0.06, 0.12);
    }
  };
})();

window.AudioEngine = AudioEngine;
