export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        if (url.pathname.startsWith('/gallery')) {
            let path = url.pathname.replace(/^\/gallery\/?/, '/');
            if (path === '/' || path === '') path = '/index.html';
            return env.ASSETS.fetch(new Request(new URL(path, url.origin), request));
        }

        return new Response('Not Found', { status: 404 });
    }
};