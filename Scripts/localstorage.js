var app = app || {};

$(function(){
	"use strict";
	
  app.Instance();
  app.LoadLocaldata();
  app.BindEnterKey();
	app.ClearAll();
});

app.Instance = function(){
	app.AppendItem();
};

app.LocalStorageWorks = function(){	
	try{
		return 'localStorage' in window && window['localStorage'] !== null;
	   }
	catch(e) {
		alert('Seu browser não suporta localStorage e não poderá usar isto.');
		return false;
	}	
};

app.AppendItem = function(){
	
	$("#enviar").click(function(){
		if(!app.LocalStorageWorks()){return false;}
			
		var itemTodo = $("#item").val();
		if(itemTodo === '') return false;	

		  $("<li></li>").text(itemTodo).appendTo("#listTodo");
		
		app.SaveDataLocalStorage();
		$("#item").val('').focus();
	});
};

app.SaveDataLocalStorage = function(){
$('#enviar').click(function(){
	
var mylist = [];

$("#listTodo > li").each(function () {
    mylist.push({
        "id": $(this).attr("value"),
            "title": $(this).text()
    });
});
	
	localStorage.setItem(app.LocalStorageName, JSON.stringify(mylist));
	console.log("data saved");	
});
}

app.LoadLocaldata = function(){
	if(!app.LocalStorageWorks()){return false;}
	
	var itens = JSON.parse(localStorage.getItem('itemTodo'));
	
	if(itens){		
		$(itens).each(function(){
  			$("<li></li>").text(this.title).appendTo("#listTodo");
		});
	}
} 

app.ClearAll = function(){
 $("#limpar").click(function(){
   localStorage.clear();
    $('#listTodo').empty();
	 $("#item").val('').focus();
 });
}

app.BindEnterKey = function(){
	
	$(window).keydown(function(event){
  		if(event.keyCode == 13){
			$("#enviar").click();
		}
	});
};

app.LocalStorageName = 'itemTodo'
