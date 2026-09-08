// The whole site is static content, so prerender every route at build time.
export const prerender = true;

// Emit every route as a directory with an index.html (e.g. blog/foo/index.html)
// instead of blog/foo.html. Plain static file servers resolve `/blog/foo/` to an
// index.html automatically, the same way they resolve `/` — but they won't map
// `/blog/foo` to `blog/foo.html` without extra rewrite config, which is what was
// causing direct navigation to a page to 404 after upload.
export const trailingSlash = 'always';
