const baseUrl = 'https://rickandmortyapi.com/api/';
const characterList = document.getElementById('characters-list');
const locationList = document.getElementById('location-name');
const episodesList = document.getElementById('episode-info');

// const locationList = {
//     name: document.getElementById('location-name'),
//     type: document.getElementById('location-type'),
//     dimension: document.getElementById('location-dimension')
// }
// const episodesList = {
//     episode: document.getElementById('episode-num'),
//     name: document.getElementById('episode-name'),
//     air_date: document.getElementById('episode-date'),
//     characters: document.getElementById('episode-characters')
// }

const GetCharacterList = async url =>{
    // fetch(`${baseUrl}${url}`).then(res => console.log(res.json()));

    //Puede ser de las dos formas, ya sea con fetch o con async

    const response = await fetch(`${baseUrl}${url}`);
    const data = await response.json();
    const {results} = data;
    //console.log(await data.results);
    const infoArray = results.map(element =>{ //map devuelve arreglos
        //console.log(element);
        const{image, url}= element;
        return {characterImg: image, characterUrl: url};
        //console.log(image);
    });

    await infoArray.forEach(element => { //forEach recorre arreglos
        const imgElement = document.createElement('img');
        imgElement.src = element.characterImg;
        imgElement.onclick = ()=> {
            localStorage.setItem('characterUrl', element.characterUrl);
            window.location.href='file:///D:/Documentos/programacion-hipermedia/app03/character.htm';
        };
        characterList.appendChild(imgElement);
    });


    //console.log(await imgArray);
}

const GetLocation = async url =>{
    const res = await fetch(`${baseUrl}${url}`);
    const data = await res.json();
    const {results} = data;
    //console.log(await data.results);

    const locationArray = results.map(location =>{
         //console.log(location);
       
         const{name, type, dimension} = location;
         //locationList.name.innerHTML = name;
         //locationList.type.innerHTML = type;
         //locationList.dimension.innerHTML = dimension;
         return{ locationName: name, locationType: type, locationDimension: dimension};
      });


        await locationArray.forEach(element => {
            //console.log(element);

            locationList.innerHTML += 
            `<li>
                 Name: ${element.locationName}
                 <ul>
                        <div>-Location: ${element.locationType}</div>
                        <div>-Dimension: ${element.locationDimension}</div>
                 </ul>
            </li>`

            // locationList.name.innerHTML += `<li>${element.locationName}</li>`;
            // locationList.type.innerHTML += `<li>${element.locationType}</li>`;
            // locationList.dimension.innerHTML += `<li>${element.locationDimension}</li>`;
         });
}

const GetEpisodesList = async url =>{
    const res = await fetch(`${baseUrl}${url}`);
    const data = await res.json();
    const {results} = data;
    //console.log(await data.results);

    const episodeArray = results.map(ep =>{
        console.log(ep);
        const{episode, name, air_date, characters} = ep;
        return{episodeNum: episode, episodeName : name, episodeDate: air_date, episodeCharacters: characters};
    });

    //const episodeCharactersArray = results.map


    await episodeArray.forEach(element =>{

        episodesList.innerHTML +=
        `<tr>
                <td>${element.episodeNum}</td>
                <td> ${element.episodeName}</td>
                <td>${element.episodeDate}</td>
        </tr>`;
         //<td>-Characters: ${element.episodeCharacters}</td>


    });
};

GetCharacterList('character');
GetLocation('location');
GetEpisodesList('episode');