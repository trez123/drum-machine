import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';
import Heater1 from './Audio/Heater-1.mp3'
import Heater2 from './Audio/Heater-2.mp3'
import Heater3 from './Audio/Heater-3.mp3'
import Heater4 from './Audio/Heater-4_1.mp3'
import Clap from './Audio/Heater-6.mp3'
import OpenHH from './Audio/Dsc_Oh.mp3'
import KickNHeat from './Audio/Kick_n_Hat.mp3'
import Kick from './Audio/RP4_KICK_1.mp3'
import ClosedHH from './Audio/Cev_H2.mp3'

class App extends React.Component {
  constructor(props){
    super(props);
    this.audioRef = React.createRef();
    this.state={
      status: true,
      kit: 'Heater Kit',
      volume: '0.2',
      slider: false
    }
    this.checkChange = this.checkChange.bind(this)
    this.playAudio = this.playAudio.bind(this);
    this.playAudio2 = this.playAudio2.bind(this);
    this.volumeChange = this.volumeChange.bind(this);
    this.MouseUp = this.MouseUp.bind(this);
  }

  checkChange(event){
    this.setState({
      status: event.target.checked
    });
  }

  playAudio(kit){
    const audioElement = this.audioRef.current;
    if(this.state.status){
      audioElement.play();
    }
    this.setState({
      kit: kit
    })
  }

  playAudio2(play, kit){
    const audio = new Audio(play);
    audio.volume = this.state.volume;
    if(this.state.status){
      audio.play();
    }
    this.setState({
      kit: kit
    })
  }

  volumeChange(event){
    this.setState({
      volume: event.target.value,
      slider: true
    });
  }

  MouseUp(){
    this.setState({
      slider: false
    });
  }

  render(){
    return (
      <div className="App">
        <div className="App-header">
          <div className='Drum-container' id="drum-machine">
            <div className='Drums'>
              <button className='drum-pad' onClick={() => this.playAudio('Header 1')}>Q <audio src={Heater1} controls={false} ref={this.audioRef}/></button>
              <button className='drum-pad' onClick={() => this.playAudio2(Heater2, 'Header 2')}>W</button>
              <button className='drum-pad' onClick={() => this.playAudio2(Heater3, 'Header 3')}>E</button>
              <button className='drum-pad' onClick={() => this.playAudio2(Heater4, 'Header 4')}>A</button>
              <button className='drum-pad' onClick={() => this.playAudio2(Clap, 'Clap')}>S</button>
              <button className='drum-pad' onClick={() => this.playAudio2(OpenHH, 'Open-HH')}>D</button>
              <button className='drum-pad' onClick={() => this.playAudio2(KickNHeat, "Kick-n'-hat")}>Z</button>
              <button className='drum-pad' onClick={() => this.playAudio2(Kick, 'kick')}>X</button>
              <button className='drum-pad' onClick={() => this.playAudio2(ClosedHH, 'Closed-HH')}>C</button>
            </div>
            <div className='Controls'>
              <div className='Label'>
                <h1>SMC</h1> <FontAwesomeIcon icon={faJedi}/>
              </div>
              <h2 className='Title-label'>Power</h2>
              <label className='Switch'>
                <input type='checkbox' checked={this.state.status} onChange={this.checkChange}/>
                <span className='Slider Round'></span>
              </label>
              <div className='Display' id="display">
                {(this.state.status && this.state.slider) && <h2 className='Title-label'>{this.state.volume * 100}</h2>}
                {(this.state.status && !this.state.slider) && <h2 className='Title-label'>{this.state.kit}</h2>}
              </div>
              <div className='Slider-container'>
              <h2 className='Title-label'>Volume</h2>
                <input type='range' min="0" step="0.1" max="1" value={this.state.volume} onChange={this.volumeChange} onMouseUp={this.MouseUp}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
