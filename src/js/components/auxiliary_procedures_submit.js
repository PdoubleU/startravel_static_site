export default (String.prototype.stripHTML = function() {
	let reTag = /<(?:.|\s)*?>/g;
	return this.replace(reTag, '');
});
