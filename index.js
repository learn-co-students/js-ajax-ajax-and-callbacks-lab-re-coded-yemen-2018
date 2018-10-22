$(document).ready(function (){
  // let searchRepositories = () => {
  // const searchTerms  = $('#searchTerms ').val()
  // $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
  //     $('#results').html(showResults(data))
  //   }).fail(error => {
  //     displayError()
  //   })
  // }

});

function displayError (){
$('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function renderCommit (commit){
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}


function renderCommits (data) {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}


function showCommits (el){
  const url = 'https://api.github.com/repos/';
  $.get(`${url}${el.dataset.owner}/${el.dataset.repository}/commits`, function(data){
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}


function showResult (result){
  return `
      <div>
        <h1><a href="${result.html_url}">${result.name}</a></h1>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>

    `
}
var searchResults = function(data){
  data.items.map( result => searchResults(result));
}

let searchRepositories = (searchTerms) =>{
  const url = 'https://api.github.com/search/repositories?q=';
  const searchTerm = $('#searchTerm');
  $.get(url+searchTerm, function (data){
    $('#results').html(searchResults(data))
  }).fail(function(error){
    displayError()
  });

}
