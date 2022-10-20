import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: 'c7bc1f881a54483cb53e2e41c46ec73c'
});


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }
    onInputChange = (event) => {
      console.log(event.target.value);
  }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      })
      .catch((err) => {
        console.log(err);
      })
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
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    )
  }
}

export default App;
