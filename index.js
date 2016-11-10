const AUDIO_SRC = require('./cena.js');

module.exports.decorateTerm = (Term, {React, notify}) => {
  return class extends React.Component {
    constructor (props, context) {
      super(props, context)
      this._onTerminal = this._onTerminal.bind(this);
      this._audio = new Audio(AUDIO_SRC);
      this._audio.onended = this._onAudioEnded.bind(this);
      this._audio.onplay = this._onAudioPlay.bind(this);
    }
  
    _onAudioPlay () {
      this._audioPlaying = setInterval(() => {
        this._shake();
      }, 200);
    }

    _resetShake() {
      if (this._div) this._div.style.transform = '';
    }

    _resetAudio() {
      this._audio.pause();
      this._audio.currentTime = 0;
      clearInterval(this._audioPlaying);
    }

    _onAudioEnded () {
      this._resetAudio();
      this._resetShake();
    }

    //based on shake from 
    // https://github.com/zeit/hyperpower/blob/master/index.js
    _shake () {
      const x = (Math.random() * this._window.innerWidth);
      const y = (Math.random() * this._window.innerHeight);
      this._div.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      setTimeout(() => {
        this._resetShake();
      }, 75);
    }

    _onTerminal (term) {
      this._div = term.div_;
      this._window = term.document_.defaultView;

      const johnIndex = Math.floor(Math.random() * 9);
      if (johnIndex === 1) {
        this._audio.play();
      }

      if (this.props.onTerminal) {
        this.props.onTerminal(term);
      }
    }

    componentWillUnmount () {
      this._resetShake();
      this._resetAudio();
    }

    render () {
      return React.createElement(Term, Object.assign({}, this.props, {
        onTerminal: this._onTerminal
      }))
    }
  }
}
