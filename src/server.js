const http = require('http');
const fs = require('fs');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const onRequest = (request, response) => {
    console.log(request.url);

    switch (request.url) {
        case '/': {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(index);
            response.end();
            break;
        }
        case '/style.css': {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(css);
            response.end();
            break;
        }
        case '/success': {

            if (request.headers.accept == "text/xml") {
                response.writeHead(200, { 'Content-Type': 'text/xml' });
                response.write("<response><message>This is a successful response</message></response>");
            } else {

                const json = {
                    message: 'This is a successful response',
                };

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(json));
            }

            response.end();
            break;
        }
        case '/badRequest?valid=true': {
            if (request.headers.accept == "text/xml") {
                response.writeHead(200, { 'Content-Type': 'text/xml' });
                response.write("<response><message>This request has the required parameters</message></response>");
            } else {

                const json = {
                    message: 'This request has the required parameters'
                };

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(json));
            }

            response.end();
            break;
        }
        case '/badRequest': {
            if (request.headers.accept == "text/xml") {
                response.writeHead(400, { 'Content-Type': 'text/xml' });
                response.write("<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>");
            } else {

                const json = {
                    message: 'Missing valid query parameter set to true',
                    id: 'badRequest'
                };

                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(json));
            }

            response.end();
            break;
        }
        case '/unauthorized?loggedIn=yes': {
            if (request.headers.accept == "text/xml") {
                response.writeHead(200, { 'Content-Type': 'text/xml' });
                response.write("<response><message>You have successfully viewed the content</message>></response>");
            } else {

                const json = {
                    message: 'You have successfully viewed the content'
                };

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(json));
            }

            response.end();
            break;

        }
        case '/unauthorized': {
            if (request.headers.accept == "text/xml") {
                response.writeHead(401, { 'Content-Type': 'text/xml' });
                response.write("<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>");
            } else {

                const json = {
                    message: 'Missing loggedIn query parameter set to yes',
                    id: 'unauthorized'
                };

                response.writeHead(401, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(json));
            }

            response.end();
            break;
        }
        case '/forbidden': {

            if (request.headers.accept == "text/xml") {
                response.writeHead(403, { 'Content-Type': 'text/xml' });
                response.write("<response><message>You do not have access to this content</message><id>forbidden</id></response>");
            } else {

                const json = {
                    message: 'You do not have access to this content',
                    id: 'forbidden'
                };

                response.writeHead(403, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(json));
            }

            response.end();
            break;
        }
        case '/internal': {

            if (request.headers.accept == "text/xml") {
                response.writeHead(500, { 'Content-Type': 'text/xml' });
                response.write("<response><message>Internal Server Error. Something went wrong.</message><id>internalError</id></response>");
            } else {

                const json = {
                    message: 'Internal Server Error. Something went wrong.',
                    id: 'internalError'
                };

                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(json));
            }

            response.end();
            break;
        }
        case '/notImplemented': {

            if (request.headers.accept == "text/xml") {
                response.writeHead(501, { 'Content-Type': 'text/xml' });
                response.write("<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>");
            } else {

                const json = {
                    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
                    id: 'notImplemented'
                };

                response.writeHead(501, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(json));
            }

            response.end();
            break;
        }
        default: {

            if (request.headers.accept == "text/xml") {
                response.writeHead(404, { 'Content-Type': 'text/xml' });
                response.write("<response><message>The page you are looking for was not found.</message><id>notFound</id></response>");
            } else {

                const json = {
                    message: 'The page you are looking for was not found.',
                    id: 'notFound'
                };

                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(json));
            }

            response.end();
            break;
        }

    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});