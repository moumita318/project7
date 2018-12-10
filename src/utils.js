 export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    }
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = 'AIzaSyAmYdar8v6iWQ2inq_P660FbW29zdSFqa8';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

export function load_places(){
   let city = 'Silver Spring, MD';
      let query = 'Shopping';
      var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=N1IAMKZUIK1AUHKRFGFBKPQ2YKDSBAKS4NTER5SYZN5CROR1&client_secret=4MKLXVLU2FGZQVRMAEDC15P0TFJGSCY3ZUYUZ0KHQQQLQ5R3&v=20130815%20&limit=50&near=' + city + '&query=' + query + '';
      return fetch(apiURL).then(resp => resp.json())
}




/* --- */

export function sort_by(array, property, direction) {
  let tempArray = array;
  tempArray.sort(function(a, b){
    var x = ((a[property].constructor === String) && (a[property].toLowerCase() || a[property]));
    var y = ((b[property].constructor === String) && (b[property].toLowerCase() || b[property]));
    let value = (direction && String(direction)) || ("asc");
    switch(value) {
      case "asc":
        // asc
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      case "desc":
        // desc
        if (x > y) {return -1;}
        if (x < y) {return 1;}
        return 0;
      default:
        // asc
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    }
  });
  return tempArray;
}

export function aft(l) {
  let s = "";
  let i = 0;
  let e = l.length - 1;
  for(i = 0; i < e; i++) {
    s += (l[i] + "<br/>")
  }
  s += l[i];
  return s;
}

/* --- */

export function getGoogleMaps() {
  return new Promise((resolve) => {
    window.resolveGoogleMapsPromise = () => {
      resolve(window.google);
      delete window.resolveGoogleMapsPromise;
    };
    const script = document.createElement("script");
    const API = 'AIzaSyB6N63ZIGH4b8Hgm9KhodA87Guuiem3C8Y';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

export function getGoogleImage(venue) {
  return 'https://maps.googleapis.com/maps/api/streetview?size=150x150&location=' + venue.location.lat + ',' + venue.location.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyB6N63ZIGH4b8Hgm9KhodA87Guuiem3C8Y'
}
