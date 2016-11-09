const AUDIO_SRC = require('./cena.js');

module.exports.decorateTerm = (Term, {React, notify}) => {
  return class extends React.Component {
    constructor (props, context) {
      super(props, context)
      this._onTerminal = this._onTerminal.bind(this);
      this._audio = new Audio(AUDIO_SRC);
    }

    _onTerminal (term) {
      if (Math.floor(Math.random() * 9) === 1) {
        this._audio.play();
      }

      if (this.props.onTerminal) {
        this.props.onTerminal(term);
      }
    }

    render () {
      return React.createElement(Term, Object.assign({}, this.props, {
        onTerminal: this._onTerminal
      }))
    }
  }
}
