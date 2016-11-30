/**
 * Ce fichiercntient les services du controlleur comment_controller
 */

'use strict';

commentApp.service('commentService', ['$http', function($http){
	
	/**
	 * Ce services récupère les commentaires
	 */
	this.getComments = function(){
		return $http({
			 url: "http://localhost:8080/Commentaire/comment/list",
		     method: "GET"
		});
	};
	
	this.deleteComment = function(commentId){
		return $http({
			url: "http://localhost:8080/Commentaire/comment/delete?idComment="+commentId,
		    method: "POST"
		});
	}
	
	this.addComment = function(comment){
		return $http({
			data: comment,
			url: "http://localhost:8080/Commentaire/comment/add?comment="+comment,
		     method: "POST"
		});
	}
	
	this.updateComment = function(comment){
		return $http({
			data: comment,
			url: "http://localhost:8080/Commentaire/comment/save?comment="+comment,
		     method: "POST"
		});
	}
	
}]);