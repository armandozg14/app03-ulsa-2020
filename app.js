const baseUrl = 'https://rickandmortyapi.com/api/';
const characterList = document.getElementById('characters-list');
const locationsList = document.getElementById('locations-list');

const GetCharacterList = async url =>{

    const resp= await fetch(`${baseUrl}${url}`);
    const data = await resp.json();
    const {results} = data;
    
    console.log(resp);

    const infoArr = results.map(element => {
        const {image,url} = element;
        return {characterImage:image, characterUrl: url};
    });

    await infoArr.forEach(element => {
        const imgElement = document.createElement('img');
        imgElement.src = element.characterImage;
        imgElement.onclick = ()=>{
            localStorage.setItem('characterUrl',element.characterUrl);
            window.location.href="file:///F:/Documents/programacion-hipermedia/app03-ulsa-2020/character.htm";
        };
        characterList.appendChild(imgElement);
    });

}

GetLocationsList = async url =>{
    const data = await fetch(`${baseUrl}${url}`);
    const dataJson = await data.json();
    const results = dataJson.results;

    console.log(dataJson);
    const locationResults = results.map(element =>{
        const {name, dimension} = element;
        return {locationName:name, locationDimension:dimension};
        
    })
    locationResults.forEach(element => {
        locationsList.innerHTML += `<div id="list-Style"> <li>${element.locationName}</li>
        <li>${element.locationDimension}</li> <br> </div>` 
    });
    ;

}
GetLocationsList('location');

GetCharacterList('character');