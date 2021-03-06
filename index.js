
var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")

// $('.submit').onClick(function() {searchRepositories(this.val)})

function searchRepositories(){
  const searchTerms = $('#searchTerms').val()
 $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
   $('#results').html(renderSearchResults(data))
 }).fail(error => {
   displayError()
 })
}

var showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data =>  {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}


var renderCommit = (commit) => {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

var renderCommits = (data) => {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}


var renderSearchResults = (data) => data.items.map(result => renderSearchResult(result))

var renderSearchResult = (result) => {
  return `
    <div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p>${result.description}</p>
    </div>
  `
}

$(document).ready(function (){
});

// Add a "Show Commits" link to each repository result that will call a showCommits function that gets the repository's commits from the GitHub API and display them in the details div.
// For each commit, list the SHA, the author, the author's login, and the author's avatar as an image.
