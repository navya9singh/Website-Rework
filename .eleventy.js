const path = require("path");
const { readFile } = require("fs/promises");

const markdownIt = require("markdown-it");
const md = markdownIt({
	html: true,
});
// const markdownItToc = require("markdown-it-table-of-contents");

module.exports = function(eleventyConfig) {
    markdownTemplateEngine: "njk",
    eleventyConfig.addPassthroughCopy("./src/pages/");
    eleventyConfig.addPassthroughCopy("./src/style");
    eleventyConfig.addPassthroughCopy("./src/images");
    //eleventyConfig.addPlugin(require("libs/shikiji"));
    // eleventyConfig.addNunjucksShortcode(
    //     "markdown", 
    //     content => { 
    //         const renderedContent = markdown.render(content);
    //         const toc = renderedContent.match(/<div class="md-toc">[\s\S]*?<\/div>/);
    //     return `<div class="md-block"><div class="md-content">${renderedContent}</div><div class="md-toc-displayed" style="display: block>${toc}</div></div>`;;
    // }
    //  );
    eleventyConfig.addShortcode("md", (/** @type {string} */ content) => {
		return md.render(content);
	});
    eleventyConfig.setLibrary("md", md);
    eleventyConfig.amendLibrary("md", async (/** @type {import("markdown-it")} */md) => {
        const { getHighlighter } = await import("shikiji");
		const { fromHighlighter } = await import("markdown-it-shikiji/core");
        const { transformerNotationDiff } = await import("shikiji-transformers");
        const { transformerNotationErrorLevel} = await import("shikiji-transformers");
        const { transformerNotationWordHighlight } = await import("shikiji-transformers");
        const highlighter = await getHighlighter({
			langAlias: { kdl: "KDL" }, 
		});
		const theme = JSON.parse(await readFile(path.join(__dirname, "github_light_default.json"), "utf8"));
		await highlighter.loadTheme(theme);
		await highlighter.loadLanguage("css", "js", "json", "shell", "tsx", "typescript");
        md.use(
			fromHighlighter(highlighter, {
				theme: "github-light-default",
				transformers: [transformerNotationErrorLevel(), transformerNotationWordHighlight()],
			}),
		);

        md.use(require("markdown-it-table-of-contents"), {
            includeLevel: [2, 3],
            containerClass: "md-toc",
        });
        md.use(require("markdown-it-anchor"), {});



        // const { getHighlighter } = await import("shikiji");
        // const highlighter = await getHighlighter({
        //     themes: ['vitesse-dark'],
        //     langs: ['javascript'],
        // })
        
        // const code = highlighter.codeToHtml('const a = 1', {
        //     theme: 'vitesse-dark',
        //     lang: 'javascript'
        // }) 

        // md.set({
        //     highlighter: (code, lang) => {
        //         return highlighter.codeToHtml(code, {
        //             theme: 'vitesse-dark',
        //             lang: 'javascript'
        //         })
        //     }
        // });
        
    });

    return {
        dir: {
            includes: "_includes",
            input: "src",
            output: "dist"
        },
        markdownTemplateEngine: "njk",
    }
}