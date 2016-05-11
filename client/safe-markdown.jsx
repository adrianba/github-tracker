import marked from 'marked';

export default (md) => {
	var options = { sanitize: true };
	var tokens = marked.lexer(md,options);
	//TODO: turn @name and #issue into links
	var rawMarkup = marked.parser(tokens,options);
	return { __html: rawMarkup };
};