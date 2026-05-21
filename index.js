// Imports and Initializations
import express from "express";

const app = express();
const port = 3000;

let blogs = [];

const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
};

// Functions
function Blog(title, content) {
    this.date = new Date().toLocaleDateString("en-US", options);
    this.title = title;
    this.content = content;
}

function addBlog(title, content) {
    let blog = new Blog(title, content);
    blogs.push(blog);
}

function deleteBlog(index) {
    blogs.splice(index, 1);
}

function editBlog(index, title, content) {
    blogs[index] = new Blog(title, content);
}

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));


// Paths
app.get("/", (req, res) => {
    res.render("home.ejs", {blogs: blogs});
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let blog = blogs[index];
    res.render("create.ejs", {index: index, blogDate: blog.date, blogTitle: blog.title, blogContent: blog.content});
});

app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    addBlog(title, content);
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    let index = req.body["index"];
    deleteBlog(index);
    res.redirect("/");
});

app.post("/update", (req, res) => {
    let index = req.body["index"];
    let title = req.body["title"];
    let content = req.body["content"];
    editBlog(index, title, content);
    res.redirect("/");
});

app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let blog = blogs[index];
    res.render("view.ejs", {index: index, blogDate: blog.date, blogTitle: blog.title, blogContent: blog.content});
});

app.listen(port, () => {
    addBlog("The Seven O'Clock Sneeze of a Galaxy", "Quadratic strawberries marched through the halls of a hollow flute, wearing capes made of expired lightning. They were looking for the square root of a Tuesday, which had recently been stolen by a group of rebellious shadows. The floor became a liquid symphony, splashing against the ankles of time until the clocks turned into sourdough bread. Without a single word of warning, the gravity pivoted forty-five degrees and started smelling like a very expensive secret.");
    addBlog("The Symphonic Calculus of a Wet Feather", "The subterranean bicycles held a meeting inside a hollowed-out grape to discuss the rising cost of transparency. Every member wore a tuxedo crafted from frozen laughter and spoke only in the dialect of unbaked cookies. Outside, the grass turned into a collection of vintage radio dials, tuning themselves to the frequency of a sleeping mountain. A cloud shaped like a recursive question mark descended to offer the bicycles a bucket of dehydrated shadows, but the deal fell through when the local gravity refused to sign the paperwork. Suddenly, the sky peeled back like an orange to reveal a choir of sentient toothbrushes singing a lullaby to the concept of Tuesday.");
    console.log(`Listening on port ${port}.`);
});