Templates (EJS): Each page (index.ejs, about.ejs, etc.) uses values passed from shopData (e.g., shopName, categories, shops) to render dynamic HTML.
Routes (routes/main.js):
GET / → index.ejs
GET /about → about.ejs (lists shops)
GET /search → search.ejs (shows a single form with two fields)
GET /search_result → returns { search_text, category } as JSON (matches lab task)
GET /register → register.ejs
POST /registered → validates email and returns a confirmation message
Validation:
Email input uses HTML5 type="email" and a pattern.
Server repeats the check with a regex; if invalid, responds 400 Bad Request.

Features
Pages
Home – welcome page using the shared shopName and categories.
About – renders a list of shops with manager and address pulled from app data.
Search – a single form with Name and Category fields; submits via GET and echoes both values on /search_result as JSON (matches the lab screenshot).
Register – form posts First, Last, Email to /registered; includes client-side and server-side email validation.
Form Handling
Uses express.urlencoded() to parse form bodies.
GET query parameters for /search_result: ?search_text=...&category=...
POST body for /registered.
Email Validation
Client-side: type="email" + a simple pattern on the input.
Server-side: regex check before responding—prevents invalid emails reaching the server logic.
Static Assets
Serves /public/styles.css for a simple but colourful UI (gradient background, tidy cards, chips).
Configurable Port
Runs on PORT env var or defaults to 8000.
VM “Run Forever”
Start with forever so the app keeps running after you disconnect.
Technologies Used
Node.js + Express
EJS (server-side templates)
CSS (no frameworks; custom stylesheet in /public/styles.css)
forever (simple VM process runner)
Built-in path module and express.urlencoded for middleware


Troubleshooting
CSS not showing?
Confirm the folder exists: public/styles.css
Ensure this line is in each page’s <head>:
<link rel="stylesheet" href="/styles.css?v=1">
Hit http://localhost:8000/styles.css directly—should display raw CSS.
Restart server and hard-refresh browser.
“Failed to lookup view …”
The .ejs file is missing or mis-named in /views.
Ensure app.set('view engine', 'ejs') is in index.js.
If you moved the views folder, set:
app.set('views', path.join(__dirname, 'views'));
Form fields not appearing in /search_result
Both inputs must be inside one <form>.
Names must differ: name="search_text" and name="category".
