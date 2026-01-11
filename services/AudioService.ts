
class AudioService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying = false;

  private init() {
    if (typeof window === 'undefined') return;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  public startTriste() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    this.stopAll();
    this.isPlaying = true;

    this.createPad(146.83, 0.1); // D3
    this.createPad(174.61, 0.05); // F3
    this.createPad(220.0, 0.05); // A3

    this.masterGain.gain.linearRampToValueAtTime(
      0.3,
      this.ctx.currentTime + 2
    );
  }

  public startLetterMusic() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    this.masterGain.gain.linearRampToValueAtTime(
      0.4,
      this.ctx.currentTime + 3
    );

    this.createPad(293.66, 0.05); // D4
    this.createPad(369.99, 0.03); // F#4
    this.createPad(440.0, 0.03); // A4
  }

  private createPad(freq: number, gainVal: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    g.gain.setValueAtTime(0, this.ctx.currentTime);
    g.gain.linearRampToValueAtTime(gainVal, this.ctx.currentTime + 2);

    osc.connect(g);
    g.connect(this.masterGain);

    osc.start();
    this.oscillators.push(osc);
  }

  public stopAll() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(
        0,
        this.ctx.currentTime + 1
      );
    }

    setTimeout(() => {
      this.oscillators.forEach(o => o.stop());
      this.oscillators = [];
    }, 1100);

    this.isPlaying = false;
  }
}

let audioService: AudioService | null = null;

export const getAudioService = () => {
  if (!audioService) {
    audioService = new AudioService();
  }
  return audioService;
};
