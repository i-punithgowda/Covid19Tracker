const confirmedHtml=document.querySelector('.confirmed');
const recoveredHtml=document.querySelector('.recovered');
const criticalHtml=document.querySelector('.critical');
const deathHtml=document.querySelector('.deaths');

function fetchFlag(data){
countryCode=(data[0].code).toLowerCase();
img=document.querySelector('.imgFlag');
img.src="https://flagcdn.com/256x192/"+countryCode+".png"

}


countryDropdown=document.querySelector('#country');

countryDropdown.addEventListener('change',e=>{
    let newCountry=countryDropdown.value;
    console.log(newCountry);
    fetch('https://www.covid19-api.com/country?name='+newCountry+'&format=json')
    .then((response=>response.json()))
    .then(data=>{
        fetchFlag(data)
    fetchdata(data)
    }
        )
    .catch(err=>console.log(err));
    
})

function fetchdata(data){
    console.log(data)
    updateHtml(data[0].confirmed,data[0].recovered,data[0].critical,data[0].deaths)
}

function updateHtml(confirmed,recovered,critical,deaths){
 confirmedHtml.innerHTML=`<span>${confirmed}</span><br><span>Confirmed</span>`
 criticalHtml.innerHTML=`<span>${critical}</span><br><span>Critical</span>`
 recoveredHtml.innerHTML=`<span>${recovered}</span><br><span>Recovered</span>`
 deathHtml.innerHTML=`<span>${deaths}</span><br><span>Deaths</span>`
document.querySelector('.details').style.display="flex";
}
