import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import './App.css';
import 'tachyons';

class App extends Component {
  render() {
    return(
      <div className="App">
        <ParticlesBg color='#ffffff' num={50} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    )
  }
}

export default App;
