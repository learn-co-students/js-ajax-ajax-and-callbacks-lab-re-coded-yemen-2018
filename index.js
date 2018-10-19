$(document).ready(function (){
  let searchRepositories = () => {
  const searchTerms  = $('#searchTerms ').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      $('#results').html(showSearchResults(data))
    }).fail(error => {
      displayError()
    })
  }
  
  let showSearchResults = (data) => data.items.map( result => showSearchResult(result))
  
  let showSearchResult = (result) => {
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
    `
  }
  
  let showCommit = (commit) => {
    return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
  }

  let renderCommits = (data) => {
    let result = data.map((commit)=>showCommit(commit)).join('')
    return `<ul>${result}</ul>`
  }

  let showCommits = (el) => {
    $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
      $('#details').html(renderCommits(data))
    }).fail(error => {
      displayError()
    })
  }
  
  let displayError  = () => $('#errors').html("there's been an error. Please try again.")
});
