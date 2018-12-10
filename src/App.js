import React, { Component } from 'react';
import './App.css';

import { load_google_maps,load_places } from './utils'
import Sidebar from './components/Sidebar'
//import InfoModal from './components/InfoModal';
import * as utils from './utils'


class App extends Component {

state= {
    query:'',
    showModal: false
  }




 constructor(props){
  super(props);
  console.log(props);
  this.handleShow = this.handleShow.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.toggleModal = this.toggleModal.bind(this);
 }




  handleClose () {
    this.setState({ showModal: false });
  }

  handleShow () {
    this.setState({ showModal: true });
  }



  toggleModal () {
    this.setState(state => ({ showModal: !state.showModal }));
  }



  componentDidMount(){
    let googleMapsPromise = load_google_maps();
    let placesPromise = load_places();

    Promise.all([
      googleMapsPromise,
      placesPromise
      ])
    .then(values => {
      let google =values[0];
      this.venues=values[1].response.venues;

      this.google=google;
      this.markers=[];
      this.info_boxes=[];

       this.infowindow = new google.maps.InfoWindow();
       this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        scrollwheel: true,
        center: { lat:this.venues[0].location.lat, lng:this.venues[0].location.lng }
      });



      this.venues.forEach(venue => {

      let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          animation: google.maps.Animation.DROP
        });

        let infoBox = '<div class="info_box">' +
        '<h4>' + venue.name + '</h4>' +
        '<p1>'+utils.aft(venue.location.formattedAddress)+'</p1> ' +
        '<img class="middlr" alt="' +
         venue.name + '" src="' + utils.getGoogleImage(venue) + '" />' +
    '</div>';

        marker.addListener('click', () => {
          if (marker.getAnimation() !== null) { marker.setAnimation(null); }
          else { marker.setAnimation(google.maps.Animation.BOUNCE); }
          setTimeout(() => { marker.setAnimation(null) }, 1500);
        });

        google.maps.event.addListener(marker, 'click', () => {
           this.infowindow.setContent(infoBox);
           this.map.setZoom(13);
           this.map.setCenter(marker.position);
           this.infowindow.open(this.map, marker);
           this.map.panBy(0, -125);
        }); 


      this.markers.push(marker);
      this.info_boxes.push({ id: venue.id, name: venue.name, contents: infoBox });
        });
      this.setState({filteredVenues:this.venues});

    })
  }

  listItemClick =(venue)=> {
  

    let marker=this.markers.filter(m => m.id === venue.id)[0];
     
let infoBox = this.info_boxes.filter(i => i.id === venue.id)[0];
           this.infowindow.setContent(infoBox.contents);
           this.map.setZoom(13);
           this.map.setCenter(marker.position);
           this.infowindow.open(this.map, marker);
           this.map.panBy(0, -125);
          if (marker.getAnimation() !== null) { marker.setAnimation(null); }
          else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
          setTimeout(() => { marker.setAnimation(null) }, 1500);
  }


  filterVenues=(query)=>{
    let k=this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
    this.markers.forEach(marker => {
    marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
    marker.setVisible(true):
    marker.setVisible(false);

    });
    
   this.setState({filteredVenues:k,query});
  }

  render() {
    return (
      <main>
       <div id="map" aria-label="Map of neighbourhood" role="application">
       </div>
       
       <Sidebar 
       filterVenues={this.filterVenues}
       filteredVenues={this.state.filteredVenues}
       listItemClick={this.listItemClick} />

      <TextComponent str="Neighbourhood Map"/>

      </main>
    )
  }
}

function TextComponent(props){
  return(
    <p>{props.str}</p>
    )
}
export default App;
