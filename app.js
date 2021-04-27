
const stateName=document.querySelector('#state')
let selectTag=document.querySelector('#state');
var states = new Array("Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal");
for(var i=0; i<states.length; i++){
    let option=document.createElement('option');
option.text=states[i];
selectTag.add(option);
}
stateName.addEventListener('change',e=>{
    fetchData();
})

const fetchData=()=>{
    fetch('https://api.covid19india.org/data.json')
    .then((response) =>response.json())
    .then(data=>fetchStatewise(data))
    .catch(err=>console.log(err));
   
}

let statesName ="";
let confirmed="";
let active="";
let recovered="";
let deaths="";

const fetchStatewise=(data)=>{
    //console.log(stateName.value);
    console.log(data.statewise);
    for(var i=0;i<data.statewise.length;i++){
       if(stateName.value===data.statewise[i].state)
       {
         statesName=data.statewise[i].state
         confirmed=data.statewise[i].confirmed
         active =data.statewise[i].active
        recovered=data.statewise[i].recovered
     deaths=data.statewise[i].deaths
       }
    }
    buildHtml(statesName,confirmed,active,recovered,deaths);
}


function buildHtml(st,con,act,rec,dea){
    let stateHtml=document.querySelector('.state');
    let confirmedHtml=document.querySelector('.confirmed');
    let activeHtml=document.querySelector('.active');
    let recoveredHtml=document.querySelector('.recovered');
    let deathHtml=document.querySelector('.death');

    stateHtml.innerHTML=st;
    confirmedHtml.innerHTML=con;
    activeHtml.innerHTML=act;
    recoveredHtml.innerHTML=rec;
    deathHtml.innerHTML=dea;
 document.querySelector('.details').style.display="inline-block";
}

addEventListener('load',e=>{
    fetch('https://api.covid19india.org/data.json')
    .then((response) =>response.json())
    .then(data=>updateCountryData(data.statewise[0]))
    .catch(err=>console.log(err));
})

function updateCountryData(countryData){
   const infected=document.querySelector('.Cinfected');
   const active=document.querySelector('.Cactive');
   const recovered=document.querySelector('.Crecoveries');
   const death=document.querySelector('.Cdeaths');
let infectedHtml=`<span>${countryData.confirmed}</span><br><span>Infected</span>`
let activeHtml=`<span>${countryData.active}</span><br><span>Active</span>`
let recoveredHtml=`<span>${countryData.recovered}</span><br><span>Recovered</span>`
let deathsHtml=`<span>${countryData.deaths}</span><br><span>Deaths</span>`
   infected.innerHTML=infectedHtml;
   active.innerHTML=activeHtml;
   recovered.innerHTML=recoveredHtml;
   death.innerHTML=deathsHtml;
}