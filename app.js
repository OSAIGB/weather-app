
// the html links
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='
const key = '&appid=12f4a4b0d0d04168478054c65966c9e8&units=metric'
const name = document.getElementById('name');
const generate = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const content = document.getElementById('content');
const temp = document.getElementById('temp');
const d = new Date();
const daten = document.getElementById('date')
const date = d.toDateString();
// tshe event listener for the click in the generate button
generate.addEventListener('click', (event) => {
// default is pevented so it wont go back to its initial
    event.preventDefault()
    // the URL
const madeURL = `${baseUrl}${zip.value}${key}`
// the function works on this.preve
getData(madeURL)
// this is used to cure data, as in, used to choose which data is needed among all that is supplied
.then((data) => {
filterData(data)
.then((info) =>{
    postData('/add', info)
    .then(() => {
        retrieveData('/all')
          .then((data) => {
            updateUI(data)
        });
    });
});
})
});
// the async function to get the baseURL
const getData = async(url) => {
    try{
        const result = await fetch(url);
    const data = await result.json();
    if(data.cod == 200){
        console.log(data)
    }
    else console.log(data.message)
return data;} 
    catch(e){
        console.log(e);
    }
}
// After displaying the data, some selected data are picked out

const filterData = async(data) =>{
    try{
        if(data.message){
    return data; }
    else {
        const info = {
        date:date,
        feelings: feelings.value,
        temp: data.main.temp,
        name : data.name
    }
    return info;

}
}
catch(error){
(console.error(error))
}
}

// the data from this is giving to the get route
// this will take parameter from the add route and info
const postData = async(url = "", data={}) => {
// try to fetch information that  will be sent to the server
try{
const result = await fetch(url, {
    // Post from the app.js
    method: "POST",
credentials: "same-origin",
headers: {
    "Content-Type": "application/json"
},
body: JSON.stringify(data)
});
return result;
}
catch(err){
    console.log(err);
}
}
//data retrieved from the server
// asking the url to retrieve data drom the server
const retrieveData = async(url) => {
    const data = await fetch(url);
    try{
        const response = await data.json();
        console.log(response);
    }
    catch(err){
        console.error(err);
    }
}

const updateUI = async() => {
   const  request = await fetch('/all');
    try{
    const allData = await request.json();
    console.log(allData);
    if (allData.date){
        const icon = allData.icon;
        document.getElementById('entryHolder').style.display='block';
        document.getElementById('error').style.display= 'none' 
        name.innerHTML = allData.name+'.';
  daten.innerHTML = allData.date+'.';
  temp.innerHTML = ` ${allData.temp}°C`;
  content.innerHTML = allData.feelings? allData.feelings: 'Please write how you are feeling today.';
backGround(icon);

}
    else {

           document.getElementById('entryHolder').style.display='none';
                
        document.getElementById('error').style.display='block';
         document.getElementById('error').innerHTML = allData.message;
  }
}
catch(err){
    console.log('error,,: '+ err);
}
}

const backGround = async (icon) => {
    await icon;
    if (icon == "03d" || icon == "04d" || icon == "03n" || icon == "04n"){
        let sky = document.querySelector("body");
        sky.style.backgroundImage = "url('https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?cs=srgb&dl=pexels-pixabay-53594.jpg&fm=jpg')";
        sky.style.backgroundRepeat = "no-repeat";
        sky.style.backgroundSize = "cover";
    }
    else if (icon == "09d" || icon == "10d" || icon == "09n" || icon == "10n") {
        let sky = document.querySelector("body");
        sky.style.backgroundImage = "url('https://media.istockphoto.com/photos/transparent-umbrella-under-rain-against-water-drops-splash-background-picture-id1257951336?b=1&k=20&m=1257951336&s=170667a&w=0&h=N_dkdVEznSiN43vNpVzjnnk8xUi4lg1IFK19JXxo5Zg=)";
        sky.style.backgroundRepeat = "no-repeat";
        sky.style.backgroundSize = "cover";
} 
    else if (icon == "11d" || icon == "11n") {
        let sky = document.querySelector("body");
        sky.style.backgroundImage = "url('https://d3q33rbmdkxzj.cloudfront.net/1589466137456_aFz3CE.png')";
        sky.style.backgroundRepeat = "no-repeat";
        sky.style.backgroundSize = "cover";
    }
    else if (icon == "13d" || icon == "13n") {
        let sky = document.querySelector("body");
        sky.style.backgroundImage = "url('https://wallpapercave.com/wp/sS1W57t.jpg')";
        sky.style.backgroundRepeat = "no-repeat";
        sky.style.backgroundSize = "cover";
    }
    else if(icon == "50d" || icon == "50n"){
        let sky = document.querySelector("body");
        sky.style.backgroundImage = "url('https://www.zocalopublicsquare.org/wp-content/uploads/2010/05/mist-682x512.jpg')";
        sky.style.backgroundRepeat = "no-repeat";
        sky.style.backgroundSize = "cover";    
    } else {
        let sky = document.querySelector("body");
        sky.style.backgroundImage = "url('https://wallpapercave.com/wp/wp5544455.jpg')";
        sky.style.backgroundRepeat = "no-repeat";
        sky.style.backgroundSize = "cover";
    }
}
