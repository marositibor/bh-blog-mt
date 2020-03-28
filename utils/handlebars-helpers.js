module.exports = {
	formatDate: function(date) {
		date = new Date(date);
		const year = date.getUTCFullYear();
		const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
		const day = ("0" + date.getUTCDate()).slice(-2);

		return `${year}/${month}/${day}`;
	},

	sortByYear: function(postList) {
		return postList.sort(comparePostListEntries);

		function comparePostListEntries(a, b) {
			if (a[0] < b[0]) {
				return 1;
			}
			if (a[0] > b[0]) {
				return -1;
			}
			// a must be equal to b
			return 0;
		}
	}
};
