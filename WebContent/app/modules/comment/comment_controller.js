/**
 * Ce fichier contient les fonction de manipulation des commentaires
 */

'use strict';

commentApp.controller("commentController",['$state', '$scope','commentService', 'authService', '$rootScope', function($state, $scope,commentService, authService,$rootScope) {

	//Si l'utilisateur n'est pas connecté on le redirige à la page de connexion
	 if(!authService.isActiveSession()){
			$state.go('app.login');
			return;
	 }
	 
	 //Cette fonction supprime un commentaire
	 $scope.deleteComment = function(commentId){
		 if(confirm("Are you shure want to delete this comment")){
			 var deleteProvider = commentService.deleteComment(commentId);
			 deleteProvider.then(function mySucces(response) {
				 	$("#"+commentId).remove();	
					return;
					
			    }, function myError(response) {
			    	alert("ERROR ON THE SERVER!")
			    });
			 
			 return; 
		 }else{
			 return;
		 }
	 }
	 
	 //Cette fonction enregistre un nouveau commentaire
	 $scope.addComment = function(){
		 var comment = $("#comment").val();
		 if(comment.length < 3 ){
			 alert("The comment must containt more than 2 caracter!");
		 }else{
			 var commentSaveProvider = commentService.addComment(comment);
			 commentSaveProvider.then(function mySucces(response) {
					comment = response.data;
					$rootScope.comments.unshift(comment);
					$("#comment").val('');
					return;
					
			    }, function myError(response) {
			    	alert("ERROR ON THE SERVER!")
			    });
		 }
	 }
	 
	 //Cette fonction transforme une div en zone de texte
	 $scope.toggleDivToTextArray = function(id){
		 $("#div_"+id).addClass("hide");
		 $("#text_"+id).removeClass("hide");
	 }
	 
	 
	 //Cette fonction met à jour un commetaire
	 $scope.update = function($event,comment){
		 var keyCode = $event.which || $event.keyCode;
		 
		 if (keyCode === 13) {
			 var newComment = $("#text_"+comment.idComment).val()
			 comment.content = newComment;
			 comment.timeInserted = new Date(comment.timeInserted);

			 var commentSaveProvider = commentService.updateComment(comment);
			 commentSaveProvider.then(function mySucces(response) {
					comment = response.data;
					$("#div_"+comment.idComment).removeClass("hide");
					$("#text_"+comment.idComment).addClass("hide");
					
					$("#div_"+comment.idComment).val(newComment);
					return;
					
			    }, function myError(response) {
			    	alert("ERROR ON THE SERVER!")
			    });

		 }
	 }
	 
	 
	 $scope.commentGlobals = authService.getActiveSession(); 
	 
	 
	//On récupère la liste des commentaires
	var commentProvider = commentService.getComments();
	
	commentProvider.then(function mySucces(response) {
		$rootScope.comments = response.data.reverse();
		return;
		
    }, function myError(response) {
    	alert("ERROR ON THE SERVER!")
    });
	
}])