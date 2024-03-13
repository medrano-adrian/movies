window.addEventListener("load", ()=>{
    loadMovies()
})


let page = 1

let btnPrevious = document.querySelector("#btnPrevious")
let btnNext = document.querySelector("#btnNext")

btnPrevious.addEventListener("click", () => {
    if (page > 1) {
        page--
        loadMovies()//funcion que carga las peliculas
    }
})

btnNext.addEventListener("click", () => {
    if (page < 501) {
        page++
        loadMovies()//funcion que carga las peliculas
    }
})

const loadMovies = async () => {
    try {
        let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cea9bfd95c5344b2a13b19d375f7c6e4&language=en-US&page=${page}`)
        console.log(response)
        if (response.status === 200) {
            const data = await response.json()
            let movies = ""

            data.results.forEach(movie => {
                movies+=`<div class="pelicula" > <img class="poster" src= "https://image.tmdb.org/t/p/w500${movie.poster_path}">
                <h3 class="titulo">${movie.title}<h3>
                </div>
                `
            });
            
            document.querySelector("#container").innerHTML = movies

        } else if (response.status === 404) console.log("lo buscado no esta disponible");
    } catch (error) {
        console.log(error);
    }
    let titulo = document.querySelector("#title").innerHTML = `Pagina: ${page}`
}