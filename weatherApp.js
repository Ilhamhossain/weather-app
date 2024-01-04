const countryName = document.querySelector("#country");
const apiHost = {
    method: 'GET',
    headers: {},
 };
const cities = document.querySelector(".city")
const currentTemperature = document.querySelector(".inner-temp"); 
const searchBtn = document.getElementById("searchIcon")
const times = document.querySelectorAll(".time")
const searchBar = document.querySelector(".searchBar")
const othertemp = document.querySelectorAll(".temperatures");
const windSpeed = document.querySelector("#windSpeed")
const humidity =  document.querySelector("#realFeel");
const condiTions = document.querySelector("#conditions");
const main = document.querySelector(".main");
const suncloud = document.querySelector(".sunCloud")  
const WeatherConditions = document.querySelectorAll(".conditions");
const innerToggle = document.querySelector(".inner-toggle");







function textAnimate(){

times.forEach(function(time){
    time.classList.add('timeAnimate');

    setTimeout(() => {
      time.classList.remove('timeAnimate');
    },2000)
})



othertemp.forEach(function(temp){
   temp.classList.add("tempAnimate");
  

   setTimeout(() => {
      temp.classList.remove("tempAnimate");
     },2000);

  })


suncloud.classList.add("sunAni")

setTimeout(() => {
   suncloud.classList.remove("sunAni")
},10098);



cities.classList.add("cityAnimate")
 
setTimeout(() => {
   cities.classList.remove("cityAnimate");
  },2000);




WeatherConditions.forEach(function(conditions){
    conditions.classList.add("conAnimate")

    setTimeout(() => {
      conditions.classList.remove("conAnimate")
    },2000)
})

}


window.addEventListener("load", () => {
    const storedWeatherData =  localStorage.getItem("weatherData");
   if(storedWeatherData){
      const weatherData = JSON.parse(storedWeatherData)
      updateUi(weatherData)
   }
})



searchBtn.addEventListener("click", () => {
      getWeatherData()
})


searchBar.addEventListener("keyup", (e) => {
     if(e.key === "Enter"){
        getWeatherData()
       
     }
})


async function getWeatherData(){
   const searchText = searchBar.value;
   const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchText}?unitGroup=metric&key=YYPZUXE6NQRVPNE847F3H256V&contentType=json`;
   const request =  await fetch(apiUrl,apiHost)
   try{
     
      if(request.ok){
         const response = await request.json();
         localStorage.setItem("weatherData", JSON.stringify(response))
         updateUi(response)
          textAnimate()
         searchBar.value = ""
      }
      
      else{
         throw new Error(failedToFetchData());
       
      }
   }

   catch(error){
      console.error("not working !")
   }

}





function failedToFetchData(){
    
   const mainError = document.createElement("div");
   mainError.className =  "mainError";
   main.append(mainError)
   mainError.classList.remove("mainError");
   mainError.classList.add("mainErrorAnimate");
  
   const errorPng = document.createElement("div");
   const errorMsg = document.createElement("div");
   const cut = document.createElement("i");
   cut.classList.add("fa-solid", "fa-circle-xmark");
   mainError.appendChild(cut)
   errorMsg.className =  "errorMsg";
   errorPng.className = "errorPng";
   mainError.appendChild(errorPng);
   mainError.appendChild(errorMsg);
   const img = document.createElement("img");
   img.src = "serverError.png";
   img.className = "serverPng";
   errorPng.appendChild(img);
   errorMsg.textContent = "unable to fetch data ! " 
   
   cut.addEventListener("click", () => {
      mainError.remove()
   })
}





function updateUi(weatherData){
   cities.innerHTML = weatherData.resolvedAddress;
  setTimeout(() => {
   
    

   currentTemperature.innerHTML = weatherData.currentConditions.temp + "º";
  },3000);



   times[0].innerHTML = weatherData.days[0].datetime;
   times[1].innerHTML = weatherData.days[1].datetime;
   times[2].innerHTML = weatherData.days[2].datetime;
   times[3].innerHTML = weatherData.days[3].datetime;
 
   othertemp[0].innerHTML = weatherData.days[1].temp + "º";
   othertemp[1].innerHTML = weatherData.days[1].temp + "º";
   othertemp[2].innerHTML = weatherData.days[2].temp + "º";
   othertemp[3].innerHTML = weatherData.days[3].temp + "º";
 
   windSpeed.textContent = weatherData.currentConditions.pressure

   condiTions.innerHTML  = weatherData.currentConditions.conditions;
   humidity.textContent  = weatherData.currentConditions.humidity;
}





















