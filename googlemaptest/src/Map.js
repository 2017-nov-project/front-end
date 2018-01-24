import React from 'react';
import ReactDOM from 'react-dom';

const google = window.google;


class Map extends React.Component {

  state = {
    center: {
      lat:  53.486051,
      lng: -2.239902
    },
    zoom: 16,
    isHeatmap: false
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: this.state.center,
      zoom: this.state.zoom
    });
    this.map.addListener('zoom_changed', () => {
      this.setState({
        zoom: this.map.getZoom(),
      });
    });
    this.map.addListener('center_changed', () => {
    let newMap = this.map.getCenter()
    let newLat = newMap.lat()
    let newLng = newMap.lng()
    console.log(newMap)
    console.log(newLat)
    console.log(newLng)
    let center = {...this.state.center}
    center.lat = newMap.lat()
    center.lng = newMap.lng()
      this.setState({center});
    });
  }



loadHeatmap = (event) => {

let heatmap;
 
const heatmapData = [
  {location: new google.maps.LatLng(53.48555146035955, -2.2417929573555366), weight: 1},
  {location: new google.maps.LatLng(53.485541884457135, -2.2418345315952615), weight: 1},
  {location: new google.maps.LatLng(53.48553151056602, -2.24180502729609776), weight: 1},
  {location: new google.maps.LatLng(53.4855331065493, -2.2418144150276498), weight: 1},
  {location: new google.maps.LatLng(53.48552432863974, -2.2417862518329934), weight: 1},
  {location: new google.maps.LatLng(53.48559295588437, -2.241860012580903), weight: 1},
  {location: new google.maps.LatLng(53.485535500524485, -2.241838554908784), weight: 1},
  {location: new google.maps.LatLng(53.48551794470432, -2.241833190490754), weight: 1},
  {location: new google.maps.LatLng(53.48554146035945, -2.2418224576513368), weight: 1},
  {location: new google.maps.LatLng(53.485535501527485, -2.241838554906784), weight: 1},
  {location: new google.maps.LatLng(53.48551794570532, -2.241833190491654), weight: 1},
  {location: new google.maps.LatLng(53.48554146135845, -2.2418224576512368), weight: 1},
  {location: new google.maps.LatLng(53.485535500724123, -2.241838554908784), weight: 1},
  {location: new google.maps.LatLng(53.48551794452432, -2.241833190490754), weight: 1},
  {location: new google.maps.LatLng(53.48554146057941, -2.2418224576513678), weight: 1},
  {location: new google.maps.LatLng(53.485535501573652, -2.241838554906986), weight: 1},
  {location: new google.maps.LatLng(53.48551794820535, -2.241833190491347), weight: 1},
  {location: new google.maps.LatLng(53.48544452937429, -2.2418278260723242), weight: 1},
  {location: new google.maps.LatLng(53.48544452937529, -2.2418278260723342), weight: 1},
  {location: new google.maps.LatLng(53.48544452937629, -2.2418278260724142), weight: 1},
  {location: new google.maps.LatLng(53.48547166114405, -2.241828496624968), weight: 1},
  {location: new google.maps.LatLng(53.48547724709367, -2.241833190490794), weight: 1},
  {location: new google.maps.LatLng(53.485493206945684, -2.2417647941608793), weight: 1},
  {location: new google.maps.LatLng(53.48547166154405, -2.241828496644978), weight: 1},
  {location: new google.maps.LatLng(53.48547724759367, -2.241833190480759), weight: 1},
  {location: new google.maps.LatLng(53.485493206745684, -2.2417647941908793), weight: 1},
  {location: new google.maps.LatLng(53.485657630477625, -2.2414415879745797), weight: 1},
  {location: new google.maps.LatLng(53.485667690977625, -2.2414415879945197), weight: 1},
  {location: new google.maps.LatLng(53.48565639608746, -2.241455669571908), weight: 1},
  {location: new google.maps.LatLng(53.48565635125546, -2.241455656231208), weight: 1},
  {location: new google.maps.LatLng(53.48565934333446, -2.241455754238242), weight: 1},
  {location: new google.maps.LatLng(53.48565832233546, -2.241455554235235), weight: 1},
  {location: new google.maps.LatLng(53.48565733223646, -2.241462375094445), weight: 1},
  {location: new google.maps.LatLng(53.48562248152532, -2.241472433378251), weight: 1},
  {location: new google.maps.LatLng(53.485630461424776, -2.2414637161989526), weight: 1},   
  {location: new google.maps.LatLng(53.48543255947655, -2.2414348824520425), weight: 1}, 
  {location: new google.maps.LatLng(53.48540542768588, -2.2414617045421914), weight: 1}, 
  {location: new google.maps.LatLng(53.4854413374053, -2.2414442701835946), weight: 1}, 
  {location: new google.maps.LatLng(53.485630431423376, -2.2434260171989926), weight: 1}, 
  {location: new google.maps.LatLng(53.485630451924971, -2.2414637161989526), weight: 1},
  {location: new google.maps.LatLng(53.48539186178345, -2.2414469523926095), weight: 1}, 
  {location: new google.maps.LatLng(53.48537669988807, -2.2414657278557137), weight: 1}, 
  {location: new google.maps.LatLng(53.48541580160753, -2.2414898677368478), weight: 1}, 
  {location: new google.maps.LatLng(53.48541739759532, -2.241520713140519), weight: 1},
  {location: new google.maps.LatLng(53.48552113667269, -2.2411224051018075), weight: 1},
  {location: new google.maps.LatLng(53.485680734757445, -2.2437456055183724), weight: 1},
  {location: new google.maps.LatLng(53.48566956291132, -2.243402282764466), weight: 1},
  {location: new google.maps.LatLng(53.48572542211388, -2.2432493968506173), weight: 1},
  {location: new google.maps.LatLng(53.48571552291245, -2.2432493866522253), weight: 1},
  {location: new google.maps.LatLng(53.48558497597269, -2.2435712619324044), weight: 1},
  {location: new google.maps.LatLng(53.48565519910353, -2.2435444398422555), weight: 1},
  {location: new google.maps.LatLng(53.48565520010353, -2.2435444398322515), weight: 1},
  {location: new google.maps.LatLng(53.48565520110353, -2.2435444398322525), weight: 1},
  {location: new google.maps.LatLng(53.48565420210353, -2.2435444398322535), weight: 1},
  {location: new google.maps.LatLng(53.48562620410353, -2.2435444398323515), weight: 1},
  {location: new google.maps.LatLng(53.48562630410453, -2.2435444398325525), weight: 1},
  {location: new google.maps.LatLng(53.48562640410553, -2.2435444398329535), weight: 1},
  {location: new google.maps.LatLng(53.48562880110853, -2.2435444368328525), weight: 1},
  {location: new google.maps.LatLng(53.48562880213953, -2.2435444368328535), weight: 1},
  {location: new google.maps.LatLng(53.48562880710353, -2.2435444368328515), weight: 1},
  {location: new google.maps.LatLng(53.48562480713453, -2.2435444378325525), weight: 1},
  {location: new google.maps.LatLng(53.4856248070553, -2.2435444398329538), weight: 1},
  {location: new google.maps.LatLng(53.4856248070607, -2.2435444398329535), weight: 1},
  {location: new google.maps.LatLng(53.4856248070653, -2.2435444398329595), weight: 1},
  {location: new google.maps.LatLng(53.4856248070707, -2.2435444398329635), weight: 1},
  {location: new google.maps.LatLng(53.4856248070754, -2.2435444398329695), weight: 1},
  {location: new google.maps.LatLng(53.4856248070857, -2.2435444398329735), weight: 1},
  {location: new google.maps.LatLng(53.4856248070958, -2.2435444398329738), weight: 1},
  {location: new google.maps.LatLng(53.48574776577359, -2.2434747024078683), weight: 1},
  {location: new google.maps.LatLng(53.485766917473136, -2.2434961600799874), weight: 1},
  {location: new google.maps.LatLng(53.48581160473846, -2.2435390754242257), weight: 1},
  {location: new google.maps.LatLng(53.48569988648748, -2.2435565097828225), weight: 1},
  {location: new google.maps.LatLng(53.484335304098686, -2.242256979515107), weight: 1},
  {location: new google.maps.LatLng(53.48432737359137, -2.2422650861421317), weight: 1},
  {location: new google.maps.LatLng(53.48430737359137, -2.2422650261421517), weight: 1},
  {location: new google.maps.LatLng(53.484328304035686, -2.242256979815107), weight: 1},
  {location: new google.maps.LatLng(53.48428183711116, -2.242234851290734), weight: 1},
  {location: new google.maps.LatLng(53.48427744802715, -2.2428650261421517), weight: 1},
  {location: new google.maps.LatLng(53.4847573735913, -2.24229237399257), weight: 1},
  {location: new google.maps.LatLng(53.48574776571359, -2.2434747024278283), weight: 1},
  {location: new google.maps.LatLng(53.485763917423136, -2.2434961604795874), weight: 1},
  {location: new google.maps.LatLng(53.48581760474846, -2.2435390754642957), weight: 1},
  {location: new google.maps.LatLng(53.48565988646748, -2.2435565097828725), weight: 1},
  {location: new google.maps.LatLng(53.484335304078682, -2.242256979215707), weight: 1},
  {location: new google.maps.LatLng(53.48435737353137, -2.2422650862421717), weight: 1},
  {location: new google.maps.LatLng(53.48435737355137, -2.2422650266422517), weight: 1},
  {location: new google.maps.LatLng(53.484328304015682, -2.242256979835107), weight: 1},
  {location: new google.maps.LatLng(53.48428583719116, -2.242234854290734), weight: 1},
  {location: new google.maps.LatLng(53.48427744809712, -2.2428650261429517), weight: 1},
  {location: new google.maps.LatLng(53.4847575735313, -2.24229237397257), weight: 1},
  {location: new google.maps.LatLng(53.485763817429136, -2.2434961694795874), weight: 1},
  {location: new google.maps.LatLng(53.48581360474246, -2.2435390794649957), weight: 1},
  {location: new google.maps.LatLng(53.48565288646748, -2.2435565027828725), weight: 1},
  {location: new google.maps.LatLng(53.484339304072682, -2.242256279215707), weight: 1},
  {location: new google.maps.LatLng(53.48435337353137, -2.2422650262421717), weight: 1},
  {location: new google.maps.LatLng(53.48435237355137, -2.2422650226422517), weight: 1},
  {location: new google.maps.LatLng(53.484328304015682, -2.242256929835107), weight: 1},
  {location: new google.maps.LatLng(53.48428583713116, -2.242234854290734), weight: 1},
  {location: new google.maps.LatLng(53.48427744809712, -2.2428650221429517), weight: 1},
  {location: new google.maps.LatLng(53.4847575795313, -2.24229237327257), weight: 1},
  {location: new google.maps.LatLng(53.486170227308936, -2.243378142883332), weight: 1},
  {location: new google.maps.LatLng(53.48656994428191, -2.244708518584789), weight: 1},
  {location: new google.maps.LatLng(53.486170247348936, -2.243378142888332), weight: 1},
  {location: new google.maps.LatLng(53.48656294428891, -2.244708518558819), weight: 1},
  {location: new google.maps.LatLng(53.486672120715844, -2.2439253135223702), weight: 1},
  {location: new google.maps.LatLng(53.486525242014756, -2.2433459563751534), weight: 1},
  {location: new google.maps.LatLng(53.48658299428291, -2.244708518558889), weight: 1},
  {location: new google.maps.LatLng(53.486692620716844, -2.2439253135283702), weight: 1},
  {location: new google.maps.LatLng(53.486565742018756, -2.2437459568758534), weight: 1},
  {location: new google.maps.LatLng(53.486825242084756, -2.2433459563751534), weight: 1},
  {location: new google.maps.LatLng(53.48688299428891, -2.244708518558889), weight: 1},
  {location: new google.maps.LatLng(53.486892620786844, -2.2439253135283702), weight: 1},
  {location: new google.maps.LatLng(53.486865742088756, -2.2437459568758534), weight: 1},
  {location: new google.maps.LatLng(53.486825242084756, -2.2438459563759534), weight: 1},
  {location: new google.maps.LatLng(53.48688299428891, -2.244788598558889), weight: 1},
  {location: new google.maps.LatLng(53.486892620786844, -2.2435259835289702), weight: 1},
  {location: new google.maps.LatLng(53.486865742088756, -2.2436459568758534), weight: 1},
  {location: new google.maps.LatLng(53.486646576690164, -2.2444402976532196), weight: 1},
  {location: new google.maps.LatLng(53.486646576680164, -2.2444402976532496), weight: 1},
  {location: new google.maps.LatLng(53.486646576670164, -2.2444402976532596), weight: 1},
  {location: new google.maps.LatLng(53.486646576660164, -2.2444402976532696), weight: 1},
  {location: new google.maps.LatLng(53.486646576650164, -2.2444402976532796), weight: 1},
  {location: new google.maps.LatLng(53.486646976690164, -2.2444404976532196), weight: 1},
  {location: new google.maps.LatLng(53.486646976680164, -2.2444404976532496), weight: 1},
  {location: new google.maps.LatLng(53.486646599670164, -2.2444404976532596), weight: 1},
  {location: new google.maps.LatLng(53.486646596660564, -2.2444404976532691), weight: 1},
  {location: new google.maps.LatLng(53.486646596655164, -2.2444404976532791), weight: 1},
  {location: new google.maps.LatLng(53.486875576670164, -2.2434402976532596), weight: 1},
  {location: new google.maps.LatLng(53.486676976663124, -2.2434502976532696), weight: 1},
  {location: new google.maps.LatLng(53.486875576653224, -2.2434402976532796), weight: 1},
  {location: new google.maps.LatLng(53.486676976693314, -2.2434504976532196), weight: 1},
  {location: new google.maps.LatLng(53.48675976683164, -2.2434404976532496), weight: 1},
  {location: new google.maps.LatLng(53.486676999673884, -2.2434504976532596), weight: 1},
  {location: new google.maps.LatLng(53.486875596663564, -2.2434404976532691), weight: 1},
  {location: new google.maps.LatLng(53.486676596655199, -2.2434504976532791), weight: 1},
  {location: new google.maps.LatLng(53.4855658241963, -2.2417621119518554), weight: 0.9},
  {location: new google.maps.LatLng(53.4855658241964, -2.2417621119528564), weight: 0.9},
  {location: new google.maps.LatLng(53.4855658241965, -2.2417621119528574), weight: 0.9},
  {location: new google.maps.LatLng(53.4855658241966, -2.2417621112528584), weight: 0.9},
  {location: new google.maps.LatLng(53.4855658241967, -2.2417621113528594), weight: 0.9},
  {location: new google.maps.LatLng(53.4855658241968, -2.2417621114522624), weight: 0.9},
  {location: new google.maps.LatLng(53.4855258241962, -2.2417621115522544), weight: 0.9},
  {location: new google.maps.LatLng(53.4855258241963, -2.2417621116523554), weight: 0.9},
  {location: new google.maps.LatLng(53.4855258241964, -2.2417621117573564), weight: 0.9},
  {location: new google.maps.LatLng(53.4855258241965, -2.2417621118578574), weight: 0.9},
  {location: new google.maps.LatLng(53.4855258241966, -2.2417621119578584), weight: 0.9},
  {location: new google.maps.LatLng(53.4855258241967, -2.2417621119528594), weight: 0.9},
  {location: new google.maps.LatLng(53.4855258241968, -2.2417621119526624), weight: 0.9},
  {location: new google.maps.LatLng(53.485616895595044, -2.241854648162873), weight: 0.9},
  {location: new google.maps.LatLng(53.485616895595044, -2.245854648162873), weight: 0.5},
  {location: new google.maps.LatLng(53.486746597655164, -2.2484404976532791), weight: 1},
  {location: new google.maps.LatLng(53.486875572670164, -2.2464402976532596), weight: 1},
  {location: new google.maps.LatLng(53.486776979663124, -2.2444502976532696), weight: 1},
  {location: new google.maps.LatLng(53.486875576653224, -2.2494402976532796), weight: 1},
  {location: new google.maps.LatLng(53.486776976693314, -2.2434504976532196), weight: 1},
  {location: new google.maps.LatLng(53.48685976683164, -2.2434474976532496), weight: 1},
  {location: new google.maps.LatLng(53.486776992673884, -2.2434904976532596), weight: 1},
  {location: new google.maps.LatLng(53.486975592663564, -2.2434404976532691), weight: 1},
  {location: new google.maps.LatLng(53.486976592655199, -2.2434504977532791), weight: 1},

  {location: new google.maps.LatLng(53.486326929663724, -2.2484502936532696), weight: 1},
  {location: new google.maps.LatLng(53.486395526657224, -2.2484402936532796), weight: 1},
  {location: new google.maps.LatLng(53.486386926697314, -2.2484504936532196), weight: 1},
  {location: new google.maps.LatLng(53.48635972683664, -2.2438474973532496), weight: 1},
  {location: new google.maps.LatLng(53.486346922673584, -2.2484904936532596), weight: 1},
  {location: new google.maps.LatLng(53.486335522663864, -2.2484404936532691), weight: 1},
  {location: new google.maps.LatLng(53.486326522655999, -2.2484504937532791), weight: 1},
];


heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatmapData
});
heatmap.setMap(this.map);
}












  render() {
    const mapStyle = {
      width: 700,
      height: 500,
      border: '1px solid black'
    };
    
    return (
      <div>
      <div>
      <div className='buttonRow'>
      <i title='heatmap' className="fa fa-map" onClick={this.loadHeatmap}></i>
      <i title='property type' className="fa fa-home" onClick={this.loadCrimeChart}></i>
      <i title='crime data' className="fa fa-balance-scale"></i>
      <i title='broadband speed' className="fa fa-wifi"></i>
      <i title='natural disaster risk' className="fa fa-bolt"></i>
      </div>
        <div ref="map" style={mapStyle}></div>
      </div>
      <div>
       <p>props and state provided by google maps event handlers</p>
       <p>current long:  {this.state.center.lat}</p>
       <p>current lat:  {this.state.center.lng}</p>
       <p>current zoom: {this.state.zoom}</p>
      </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Map />,
  document.getElementById('root')
);


export default Map;