import 'babel-polyfill'
let news;


document.addEventListener('DOMContentLoaded', ()=>{
  news = document.getElementById('news');
  let search = document.getElementById('search')

  search.addEventListener('keyup', (event)=>{
    // console.log(event)/
    if(event.key == 'Enter') 
    {
      history.pushState({},"".search.value)
      getNews(search.value)
     // window.location.pathname= search.value
     let searchterm=window.location.pathname;
console.log(searchterm);
    }
  })

getNews('iraq')

 
})

async function getNews(query) {
  let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=978d6c3818ff431b8c210ae86550fb1f`)
  let content = await response.json()
//  console.log(content)
  updateUI(content.articles.map(createArticle).join('\n'))
}

function updateUI(content) 
{
  news.innerHTML = content
    // select all the div with class name of upvote 
    let upvote = document.getElementsByClassName('upvote')
    let downvote = document.getElementsByClassName('downvote')
    for (let index = 0; index < upvote.length; index++) {
      upvote[index].addEventListener('click', (event)=>{
        let varable='counter'+event.target.id
       // console.log(document.getElementById(varable).innerText)
       document.getElementById(varable).innerHTML=parseInt(document.getElementById(varable).innerText)+1
        
       
      })   
     //===============================================================================================
     downvote[index].addEventListener('click', (event)=>{
      let varable='counter'+event.target.id
     // console.log(document.getElementById(varable).innerText)
     if(parseInt(document.getElementById(varable).innerText)!==0)
    {
      document.getElementById(varable).innerHTML=parseInt(document.getElementById(varable).innerText)-1
    }
   
      
     
    })   
  
    }
}

function createArticle(article, i) {
  article.counter = 0
  return `

    <article id="${i}">
    <div width="124px" height="150px" position: relative display: inline-block>
      <img width="124px" height="150px" src="${article.urlToImage}" alt="">
      </div>
      <div id="text">
        <h1>${article.title}</h1>
       
        <div>
        <p>${article.description}</p>
        </div>
        <time>${article.publishedAt}</time>
      </div>
      <div id="voter" >
        <img height="13px" id="${i}" class="upvote" src="${require('./assets/upvote.svg')}" alt="">
        <div id="counter${i}">${article.counter}</div>
        <img  height="13px" id="${i}" class="downvote" src="${require('./assets/downvote.svg')}" alt="">
      </div>
    </article>
  `
}