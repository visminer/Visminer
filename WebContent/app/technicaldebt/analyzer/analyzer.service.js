homeApp.service('tdAnalyzerService', function($http){

	this.loadData = function(tags, callback){
		localStorage.setItem('tdItems', JSON.stringify([]));
		var tagsIds = [];
		var tagsNames = [];
		for (i in tags) {
			tagsIds.push("'"+tags[i].id+"'");
			tagsNames.push(tags[i].name);
		}
		$http.get('TypeServlet', {params:{"action": "getDebtsByListOfTags", "ids": '['+tagsIds.join(',')+']'}})
		.success(function(data) {
			console.log('found', data.length, 'types');
			localStorage.setItem('typeData', JSON.stringify(data));
			$http.get('TagAnalysisServlet', {params:{"action": "getAllByTagsName", "tagsName": '['+tagsNames.join(',')+']'}})
			.success(function(data) {
				localStorage.setItem('duplicatedCodeData', JSON.stringify(data));
				callback();
			})
		});
	}

	this.getTypeData = function() {
		var typeData = JSON.parse(localStorage.getItem('typeData'));
		return (typeData == null) ? [] : typeData;
	}

	this.getDuplicatedCodeData = function() {
		var duplicatedCodeData = JSON.parse(localStorage.getItem('duplicatedCodeData'));
		return (duplicatedCodeData == null) ? [] : duplicatedCodeData;
	}
});