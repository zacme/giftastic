//global variables

//var searchistory
// if(localStorage.getItem('giphy')){
//     searchistory = JSON.parse(...)
// }else{
//     searchistory = []
// }

var searchistory = localStorage.getItem('giphy') ? 
JSON.parse(localStorage.getItem('giphy')) : 
['puppy', 'kitty', 'baby', 'funny', 'cartoon']

appendbutton();
function appendbutton (){
    $("#btnDiv").empty()
for (var i = 0; i<searchistory.length ;i++){
    $("#btnDiv").append(`<button>${searchistory[i]}</button>`)
}
};

$("#submit").on('click',function(){
    //search for the giph of the text in search
    var searchterm = $("#searchterm").val().trim();
    console.log(searchterm);
    if(!searchistory.indexOf(searchterm)){
        searchistory.push(searchterm);
    }
    localStorage.setItem('giphy', JSON.stringify(searchistory))
    appendbutton()
    rungiphy(searchterm)
})

function rungiphy (term) {
var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&q=${term}`;
$.ajax({
    method: 'GET',
    url: queryURL
}).then(res=>{
    console.log(res)
res.data.map(img=>{
    console.log(img.url)
    $('#results').prepend(`<img src='${img.images.fixed_width.url}' style='width:300px; height:auto;'/>`)
})
})
}