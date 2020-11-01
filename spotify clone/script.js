let bot = document.createElement("div");
bot.setAttribute("class", "row blink");

let ab= document.getElementById("about");
ab.onclick = () => bot.innerHTML = "This is a music app, which uses Spotify's web api. You can search your favourite songs, albums or artists. Also you can create your own playlist. ";

document.body.append(bot);

let cd = document.getElementById("search");
cd.onclick = searchFav;




function searchFav() {

  bot.innerHTML = "";

  let row1 = document.createElement("div");
  row1.setAttribute("class", "row align");

  let bt1 = document.createElement("button");
  bt1.setAttribute("class", "btn aligned");
  bt1.id = "bta";
  bt1.innerHTML = "Search by song";

  let bt2 = document.createElement("button");
  bt2.setAttribute("class", "btn aligned");
  bt2.id = "btb";
  bt2.innerHTML = "Seach by album";

  let bt3 = document.createElement("button");
  bt3.setAttribute("class", "btn aligned");
  bt3.id = "btc";
  bt3.innerHTML = "Search by artist";

  let row2 = document.createElement("div");
  row2.setAttribute("class", "row align");

  let sea = document.createElement("input");
  sea.setAttribute("class", "searchBox");
  sea.id = "inp";
  
  row1.append(sea);

  row2.append(bt1, bt2, bt3);

 
  bt3.onclick = getToken3;
  

  bot.append(row1,row2);

  
}



async function getToken3() { 
  try {
      var clientId = "ca35594961a548d89ef2f833faf529c8";
      var clientSecret = "caeeab2657c247bf872604fcbb5dcc82";
      const result = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
              'Content-Type' : 'application/x-www-form-urlencoded', 
              'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
          },
          body: 'grant_type=client_credentials'
      });
  
  const tokenData = await result.json();
  var token = tokenData.access_token;
  byArtist();

 
  async function byArtist() {
  
    try {  
      
      var artist = document.getElementById("inp").data;
     
      const result = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
      });
    
      const data = await result.json();
     
      for(var i = 0; i<data.artists.items.length; i++) {

      var artistId = data.artists.items[i].id;
    

      art();
      async function art() {
  
        try {  
          
          
          const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
              method: 'GET',
              headers: { 'Authorization' : 'Bearer ' + token}
          });
        
          const data1 = await result.json();
          
          let row3 = document.createElement("div");
          row3.setAttribute("class", "row bott");

          for(var j = 0; j<data1.items.length; j++) {
          
          let c2 = document.createElement('div');
       c2.setAttribute('class', 'col');

       let lp1 = document.createElement('img');
       lp1.setAttribute('class', 'card-img-top');
       lp1.src = data1.items[j].images[2];


       let tdiv1 = document.createElement('h3');
       tdiv1.setAttribute('class', 'card-title');
       tdiv1.innerHTML = data1.items[j].name;

       let p11 = document.createElement('a');
       p11.setAttribute('class', 'card-text');
       p11.innerHTML = "Listen";
       p11.href = data1.items[j].href;


       
       c2.append(lp1, tdiv1, p11);
       row3.append(c2);

      }
          document.body.append(row3);
          

        }
      
        catch(error){
          console.log(error);
        }  
        }  
      }
    }
  
    catch(error){
      console.log(error);
    }  
    }  
      
      
    } catch(error) {
      console.log(error);
    }
    
    
  }

  
  

  
  
  


  
  
   


