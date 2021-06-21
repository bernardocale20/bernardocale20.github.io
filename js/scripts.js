function openNav() {
	var x = document.getElementById("navigation"); 

	if (x.className === "navigation") {  
		x.className += " menujs"; 
		document.getElementById("threeline-icon").innerHTML = "&Cross;"; //Muda oq esta dentro do html no caso troca o threeline por um x
	} 

	else 
	{
		x.className = "navigation";
		document.getElementById("threeline-icon").innerHTML = "&#9776;"; 
	}

}