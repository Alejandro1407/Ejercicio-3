window.onload = function(){
    obtenerDatos()
}

document.getElementById("Form").addEventListener("submit", function (event) {
    event.preventDefault()
    let datos = [] 
    datos = JSON.parse(sessionStorage.getItem("Datos"));
    if (datos == null){ datos = []}
    let formData = {
        'Id':datos.length + 1  ,
        'Nombre':document.getElementById("txtNombre").value,
        'NIT':document.getElementById('txtNIT').value,
        'FechaFundacion': document.getElementById('txtFecha').value,
        'Direccion':document.getElementById('txtDireccion').value
    }

    let id = document.getElementById("txtID").value

    if(id != ""){
        formData.Id = id
        datos.splice(id-1,1,formData)
        console.log(formData)
    }else{
        datos.push(formData);
    }    
    sessionStorage.setItem("Datos",JSON.stringify(datos))
    limpiar()
    obtenerDatos()
})

function limpiar(){
    document.getElementById("txtID").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtNIT").value = "";
    document.getElementById("txtFecha").value = "";
    document.getElementById("txtDireccion").value = "";
}

function obtenerDatos(){

    let datos = []
    datos  = JSON.parse(sessionStorage.getItem("Datos"));
    if (datos == null){datos = []}
    let tableBody = document.getElementById("body");
    tableBody.innerHTML = "";
    datos.forEach( (empresa)  =>{
        var container = document.createElement("tr");
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(empresa.Id);
            celda.appendChild(textoCelda);
            container.appendChild(celda);
            var celda2 = document.createElement("td");
            var textoCelda2 = document.createTextNode(empresa.Nombre);
            celda2.appendChild(textoCelda2);
            container.appendChild(celda2);
            var celda3 = document.createElement("td");
            var textoCelda3 = document.createTextNode(empresa.NIT);
            celda3.appendChild(textoCelda3);
            container.appendChild(celda3);
            var celda4 = document.createElement("td");
            var textoCelda4 = document.createTextNode(empresa.FechaFundacion);
            celda4.appendChild(textoCelda4);
            container.appendChild(celda4);
            var celda5 = document.createElement("td");
            var textoCelda5 = document.createTextNode(empresa.Direccion);
            celda5.appendChild(textoCelda5);
            container.appendChild(celda5);

            var button = document.createElement("button")
            button.textContent = "Eliminar"
            button.id = empresa.Id
            button.onclick = function(event){
                eliminarDato(event.target.id);
            }
            var deletebutton = document.createElement("button")
            deletebutton.textContent = "Editar"
            deletebutton.id = empresa.Id
            deletebutton.onclick = function(event){
                editarDatos(empresa);
            }
            container.appendChild(button)
            container.appendChild(deletebutton)
            tableBody.appendChild(container);

        }

    )}

function editarDatos(empresa){

    document.getElementById("txtID").value = empresa.Id
    document.getElementById("txtNombre").value = empresa.Nombre
    document.getElementById("txtNIT").value = empresa.NIT
    document.getElementById("txtFecha").value = empresa.FechaFundacion
    document.getElementById("txtDireccion").value = empresa.Direccion
}



function eliminarDato(Id){
    if(!confirm("¿Seguro que desea eliminar?")){return;}
    let datos = [] 
    datos = JSON.parse(sessionStorage.getItem("Datos"));
    if (datos == null){ return;} 

    datos.forEach( (empresa) => {
        if (empresa.Id == Id){
            datos.splice(datos.indexOf(empresa),1);
        } 
    })
    sessionStorage.setItem("Datos",JSON.stringify(datos))
    obtenerDatos()

}