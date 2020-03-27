//
let pagAct = 1;
let cant = 10;
let cantPag = 0;

document.querySelector('#bin').addEventListener('click', GetImages);

// Llamado a Ajax e imprimir resultados
function GetImages() {
    
    // Leer las variables
    const cantidad = document.getElementById('cin').value;
    cant = cantidad;
    let url = '';
    url += `https://picsum.photos/v2/list?page=${pagAct}&`;
    
    // Si hay una cantidad agregarlo a la URL
    if(cantidad !== '') {
        url += `limit=${cantidad}&`;
    }
    
    // Conectar con ajax
    // Iniciar XMLHTTPRequest
    const xhr = new XMLHttpRequest();

    // Abrimos la conexion
    xhr.open('GET', url, true);
    
    // Datos e impresion del template
    xhr.onload = function() {
        if(this.status === 200) {
            const ima = JSON.parse( this.responseText ) ;
            
            // Generar el HTML
            let htmlIma = '';
            
            // Imprimir cada nombre
            ima.forEach(function(imag) {
                    htmlIma += `<div class="col-m-6 col-s-12 imrec" >
                        <img  class = "imag" src="${imag.download_url}" alt="">
                        
                        <div class="row">
                            <div class="col-m-12 col-s-12 info">
                                <ul>
                                    <li>Id : ${imag.id}</li>
                                    <li>Author : ${imag.author}</li>
                                    <li>Width: ${imag.width}</li>
                                    <li>Height : ${imag.height}</li>
                                </ul>
                            </div>
                        </div>

                        <div class="row butns" >
            
                            <div class="col-m-6 col-s-6">
                                <a target="_blank" href="${imag.url}">Url</a>
                            </div>
            
                            <div class="col-m-6 col-s-6">
                                <a target="_blank" href="${imag.download_url}">Download</a>
                            </div>
            
                        </div>
            
                    </div>`;
            })

            document.getElementById('ipt').innerHTML = htmlIma;
        }
    }
    
    // Enviar el Request
    xhr.send();

    cargPag();
}


function cargPag(){
    // Generar el HTML
    let htmlPg = '';

    let numPagi = Math.floor(100/cant);
    cantPag = numPagi;

    if(numPagi > 1)
    {
        htmlPg += `<a onclick="ChangePage(event)"; class="pgna" href="">${"Anterior"}</a>
                    `;
    }

    for(let i=0; i < numPagi ; i++)
    {
        if((i+1).toString() === pagAct.toString())
            htmlPg += `<a onclick="ChangePage(event)"; class="asel" href="">${i+1}</a>
                      `;
        else
            htmlPg += `<a onclick="ChangePage(event)"; class="pgna" href="">${i+1}</a>
                      `;
    }
    if(numPagi > 1)
    {
        htmlPg += `<a onclick="ChangePage(event)"; class="pgna" href="">${"Siguiente"}</a>
                    `;
    }

    document.getElementById('ipgn').innerHTML = htmlPg;
}


//Cambiar de pagina
function ChangePage(e) {
    e.preventDefault();

    window.scrollTo(0, 0); 


    let t = e.toElement.text;
    if(t === "Siguiente")
    {    
        if(parseInt(pagAct)+1 <= cantPag)
            pagAct++;
    }
    else
    {
        if(t === "Anterior")
        {
            if(parseInt(pagAct)-1  > 0)
                pagAct--;
        }
        else
        {
            pagAct = t; 
        }
    }   
    GetImages();
}