const fs = require('fs'); // file system, used for reading data writting data
const  http = require('http') // used for to create server
const url = require('url'); // used for routing
const slugify = require('slugify');

const returntype = require('./modules/replaceTemplate')

// const hello = 'Hello world';
// console.log(hello);

// Blocking or syncronus way
const txt = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(txt);

const txtOut = `This is avacodo message: ${txt} \n created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', txtOut)
// console.log(txtOut);



// non-blocking or asyncronus way section 10
// fs.readFile('./txt/start.txt', 'UTF-8', (err, data) => {
//     console.log(data)

//     fs.writeFile('./txt/final.txt',`${123}\n${456}`, 'utf-8', err => {
//         console.log(err)
//     })
// })

//// section 11
///////////////////////////  Server   ///////////////////////////////////////

// note: this peice of code will be executed only once during the start of application and next we time we can read the data instead of calling

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`./dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const slugs = dataObj.map(el  => slugify(el.productName, {lower: true}))


const server = http.createServer((req,res) => {
    console.log(req.url)
    console.log(url.parse(req.url, true))
    const {query, pathname} = url.parse(req.url, true)
    // const pathname = req.url;

    // secction 15


    //overview
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type' : 'text/html',
        })

        const cardHtml = dataObj.map((el => returntype(templateCard, el))).join('');
        const output = templateOverview.replace('{%product_cards%}', cardHtml)
        res.end(output)

    // product details
    } else if(pathname === '/product') {
        const product = dataObj[query.id]
        const output = returntype(templateProduct, product)
        res.writeHead(200, {
            'Content-type' : 'text/html',
        })
        res.end(output)


    // API
    } else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type' : 'application/json'
        })
        res.end(data)


    // not found
    } else {
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-own-custom-header': 'hello world'
        })
        res.end('<h1>hello from the server this is not the right path</h1>')
    }
})

// port, ip address, callback function
//127.0.0.1:8000
server.listen(8000, '127.0.0.1', () => {
    console.log('Listing to the server on port 8000')
})



// Section 12
//////////////////////////  Routing   ///////////////////