import React from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import 'tachyons';

import Particles from 'react-particles-js';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import UrlFill from './components/UrlFill/UrlFill';
import { Component } from 'react';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';

const app = new Clarifai.App({
  apiKey: 'e5c67cdf4ea642e088957981867a5cd8'
 }); 


const particleOptions={
    particles: {
      number:
      {
        value:60,
        density:{
          enable:true,
          value_area:800
        }
      }
    }
}

 
class App extends Component
{

constructor()
{
  super();
  this.state={
    input: '',
    ImageUrl: '',//value ka naam
    box: {}
  }
}
calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
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
  
  this.setState({box: box});
}
onInputChange=(event) => 
{
 this.setState({input: event.target.value});
}

onSubmit = () =>
{
  this.setState({ImageUrl: this.state.input})
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
response => 
      this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
}
render()
{


return (
      <div className="App">
      <Particles className='particles' 
      params={particleOptions}
      />
      <Navigation/>
      <Logo/>
      <Rank/>
      <UrlFill onInputChange={this.onInputChange}
      onSubmit={this.onSubmit}/>
      <ImageRecognition box={this.state.box} ImageUrl={this.state.ImageUrl}/>
      </div>
     
     
    );
  } 
}

export default App;
