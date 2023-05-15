
//#movieTitleAutocomplete comes from the id specified in the movie search form (index.hbs)
document.querySelector('#movieTitleAutocomplete').onkeyup = event => {

    const { value } = event.target

    console.log('MANDAMOS A LA API', value, 'PARA TENER LAS OCPIONES DIPONIBLES')

    // MOSTRAMOS AL USUARIO LAS OPCIONES
    // CUANDO HAGA CLICK EN ALGUNA REDIRIGIMOS A SU ID ASI:


}