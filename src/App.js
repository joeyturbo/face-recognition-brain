import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation'
import Signin from './Components/Signin/Signin'
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
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

    calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage')
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }

    displayFaceBox = (box) => {
      console.log(box);
      this.setState({box: box})
    }

    onInputChange = (event) => {
      console.log(event.target.value);
  }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
      this.setState({route: route});
    }

  render() {
    return(
      <div className="App">
        <ParticlesBg color='#ffffff' num={50} type="cobweb" bg={true} />
        <Navigation onRouteChange={this.onRouteChange}/>
        { this.state.route === 'signin' 
        ? <Signin onRouteChange={this.onRouteChange}/>
        : <div>
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box}imageUrl={this.state.imageUrl}/>
        </div>}
      </div>
    )
  }
}

export default App;
