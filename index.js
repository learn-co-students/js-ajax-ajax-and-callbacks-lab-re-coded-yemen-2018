$(document).ready(function (){
  
 $('#ser').click(function(){
   var search=$('#searchTerms').val();
     $.get('https://api.github.com/users/'+search+'/repos', function(response) {
      
    let re= `<ul>
    ${response.map(r => 
    
     `<li>
     <a href=${r.html_url}> ${r.name} </a>
    
       <span>${r.owner.login}</span>
        <span><a href="" data-re=${r.name} onclick="showCommits ()">showCommits</a></span>
       <img src=${r.owner.avatar_url}/>
      
        
    </li>
    
    `)
    .join('')}</ul>`;
        $('#results').html(re);
       
        // console.log(response);
    }).fail(function(error) {
   
    $('#errors').html("I\'m sorry, there\'s been an error");
   
   
 });
   
});

});
