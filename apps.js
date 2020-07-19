// getting the geolocation of the user
window.addEventListener('load',()=>{
    let long;
    let lat;
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let icons = document.querySelector('.icon');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');


    if(navigator.geolocation){           /*the inbuilt navigation and geolocation of the browser gets me the location.*/
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=670f3e77a04d973fbff83d6ed81bbf96`;
            
            
            fetch(api) 
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temp} = data.main;
                const{description, icon}=data.weather[0];

                //set DOM elements from Api

                temperatureDescription.textContent = description;
                locationTimezone.textContent = data.name;
                temperatureDegree.textContent = temp;
            //setting the formula for celcius 
             let celcius = (temperature - 32)*(5/9);
                icons.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;

                //change temperature to celcius 
                 temperatureSection.addEventListener('click',()=>{
                     if (temperatureSpan.textContent === "F"){
                         temperatureSpan.textContent = "C";
                         temperatureDegree.textContent = Math.floor(celcius);
                     }else{
                        temperatureSpan.textContent = "F";
                     }
                 })


            });
        });
      
    }else{
        alert("allow geolocation for this app to work properly");
    }
});



