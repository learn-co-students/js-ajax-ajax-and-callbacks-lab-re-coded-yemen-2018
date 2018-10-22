$(document).ready(function (){

});

function displayError (){
$('#errors').html("There's an error.")
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


function renderSearchResult (result){
  return `
      <div>
        <h1><a href="${result.html_url}">${result.name}</a></h1>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>

    `
}
var renderSearchResults = function(data){
  data.items.map( result => renderSearchResult(result));
}

function searchRepositories(searchTerms){
  const url = 'https://api.github.com/search/repositories?q=';
  const searchTerm = $('#searchTerm');
  $.get(url+searchTerm, function (data){
    $('#results').html(renderSearchResults(data))
  }).fail(function(error){
    displayError()
  })

}
