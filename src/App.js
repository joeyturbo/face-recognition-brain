import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import './App.css';
import 'tachyons';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    }
  }
    onInputChange = (event) => {
      console.log(event.target.value);
  }

    onButtonSubmit = () => {
      console.log('click');
    }

  render() {
    return(
      <div className="App">
        <ParticlesBg color='#ffffff' num={50} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        {/* <FaceRecognition /> */}
      </div>
    )
  }
}

export default App;
