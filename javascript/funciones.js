function recuperarLineas()
{
	var idStop=document.getElementById("idStop").value;
	
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
	//alert(this.readyState);
    if (this.readyState == 4 && this.status == 200) {
		
    tratarJSON(this.responseText);
	
    }
}
xmlhttp.open("POST", "https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetArriveStop.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("idClient=WEB.SERV.ataraxa@hotmail.com&passKey=83D88CD0-8A9B-4CE6-B976-B922B61FAE6D&idStop="+idStop);

}
function inicializar()
{
	recuperarLineas();
	setInterval(function(){recuperarLineas();}, 3000);
}

function tratarJSON(string_json)
{
	//alert(string_json);
	objeto_JSON=JSON.parse(string_json);
	lista_arrives=objeto_JSON.arrives;//Un array de objetos Arrive
	aux="<table><tr><th>Línea</th><th>Tiempo</th></tr>";
	for(i=0; i<lista_arrives.length;i++)
	{
		objeto_arrive=lista_arrives[i];
		lineId=objeto_arrive.lineId;
		busTimeLeft=objeto_arrive.busTimeLeft;
		aux+="<tr><td>"+lineId+"</td><td>"+busTimeLeft+"</td></tr>";
		
	}
	aux+="</table>";
	document.getElementById("contenedor").innerHTML=aux;
}