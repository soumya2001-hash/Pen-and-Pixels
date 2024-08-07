import express from "express";
// import axios from "axios";
import bodyParser from "body-parser";
// import {addPost,posts} from "./script.js";
const port = 3000;

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



let posts = [];
let postCounter = 0;
class Posts {
    constructor(title, content, author) {
        this.title = title;
        this.content = content;
        this.rawDate = new Date();
        this.author = author;
        this.id = postCounter++;
        // Fixing the date formatting issue
        this.date = `${this.rawDate.getDate()}-${this.rawDate.getMonth() + 1}-${this.rawDate.getFullYear()} ${this.rawDate.getHours()}:${this.rawDate.getMinutes()}`;
    }
}

function addPost(title, content, author) {
    let post = new Posts(title, content, author);
    posts.push(post);
}





app.get("/",(req,res)=>{
    res.render("home.ejs" ,{posts:posts});
})

app.get('/post/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const index = posts.findIndex(p => p.id === postId);
    if(index !== -1){
        posts.splice(index,1);
        console.log(posts.length);
        res.render("view_all.ejs", {blogs: posts});
    }
    else{
        res.redirect("/",{posts:posts});
    }
});

app.get("/post/edit/:id" , (req,res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);
    const id = posts.findIndex(p => p.id === postId)
    if(post){
        posts.splice(id,1);
        res.render("create.ejs",{post:post}); 
    }
    else{
        res.redirect("/");
    }
})
app.get("/create",(req,res) => {
    res.render("create.ejs");
})

app.post("/create-post",(req,res) => {
    const {author, title, content} = req.body;
    addPost(title,content,author);
    res.redirect("/");
})

app.get("/show-all",(req,res) => {
    res.render("view_all.ejs", {blogs: posts});
})

app.get("/post/:id", (req,res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render('view.ejs', {blog:post });
    } else {
        res.status(404).send('Post not found');
    }
})

app.get("/contact", (req,res) => {
    res.render("contact.ejs");
})

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
    addPost("Your neglected inner child ","It is the process of life to be dependent.  This is the paradox of life – you are first taught to look outside for validation and love and then later told, that is not how it works.  It is here that we require a giant paradigm shift in wanting love, attention and approval. \n\n We need to arrive at a place of ‘knowing’ that these are all internal resources and are supplied from within. \n\n But the method of learning this, is to first learn to be dependent and riddled with heavy emotions of neglect, shame, unworthiness and a skewed sense of self and finally to awaken the truth of your sense of self and ‘see your strengths and heal.’ \n\n his article focuses on toxic and narcissistic relationships and how an understanding of the connection of your neglected inner child and the narcissistic manipulations done on you, leads you to heal and release your trauma. \n\n Every parent, caregiver and authority figure needs to instil in their children, “You are the Source of love; I am the vessel that provides it for you for now; but it resides deep within you.  I have no power or right or authority to define your notion of love.  It is within.  Go. Connect within and be the supplier of this validation and love and attention for yourself.  I cannot supply fully, I can add to your internal reservoir and that too, is a grace for me that I have learned to respect. No one outside can give you what is within.” \n\n Our biggest trauma is that – we are waiting to be loved.  Like that child.  Alone.  We are waiting to be filled and to be supplied.  We have not been taught any other way. \n\n A toxic relationship is a re-enactment by the narcissist of every child’s attachment injury (the way you waited, what you received and what remained unmet) in adulthood. It is a replay of the child waiting for permission from the parent or someone else to feel accepted, loved, and seen. As an adult, when the toxic individual devalues and discards you, it resonates with that same neglect and lack of love and recognition that you experienced as a child.  All human beings yearn for acceptance and believe it will come, hoping our caregivers will eventually understand how to love us. When they don’t, it gets stored (consciously or unconsciously), as a deep rejection in our psyche and we internalize it, creating a direct correlation to our sense of self-worth.", "Sara Duglas");
    addPost("Why we must prune our flawed identities", "Who am I? If we ask ourselves this question, multiple answers might pop up: a man, a woman, or a transgender; a traditionalist or a modernist; a believer or an atheist; an achiever, a struggler, or a complete failure; a techie or a neophyte; a dreamer, an idealist or a realist. The list could go on covering different aspects, stages and zones of our life. A large part of our existence goes by in searching for such potential identities, nurturing them, working hard to shape them and once they are formed, we let ourselves be defined and guided by these identities. \n\n Our identity is a complex set of physical, cognitive, emotional, social and cultural attributes that define us in a unique manner. Psychologists believe that there are some benefits to having a clear and strong sense of identity. First and foremost, it gives us some idea of our likes and dislikes and what we want from our life. Based on this we can create aspirations, set our long-term goals, get down to achieving them and consequently derive some sense of fulfilment, meaning and self-worth. When we are firmly rooted in our identity, we develop efficient interpersonal and social relationships based on our preferences and values. Identity also gives us a sense of constancy and continuity. There are times when things around us turn chaotic, but even then, our sense of self remains somewhat stable. At the level of civilisation, our identities help us in cherishing our regional, linguistic, religious, cultural and historical heritage and motivate us in preserving and rebuilding them. \n\n But there is also a flip side to our identity, which is neither well understood nor talked about. Our identity can limit us, confine us, make us biased and cause immense suffering. When we identify with something, we get deeply attached to it and if that thing were to change or become meaningless, some of us are unable to cope with the loss. Consequently, we either lose our self-confidence or sacrifice our self-growth in order to maintain a false sense of identity. Think of a man who believes that being a CEO of a blue-chip company is his identity. As long as the company thrives and he is successful, he feels confident, elated and relevant. But if the company heads to a decline or if he encounters a series of setbacks and has to resign from the job, he may lose all his self-worth, happiness and start feeling like a nonentity.", "Jacob Felch");
    addPost("The fragile cycle of hope and heartbreak: A sparrow’s tale" , " Every year around this time, little sparrows seek a place to lay their eggs and fill the small opening in the ceiling on my terrace with bits of hay, straw, and strips of cloth. This hole has an iron hook fixed in the ceiling, from two rings dangle with the help of ropes. My two daughters during their growing years used these rings to stretch themselves. \n\n The round head of the hook serves as the only foundation for the nest. Each day, I look up to see the hole being slowly and laboriously filled, straw by straw, by the industrious birds. I sigh at the naivety of their efforts. Every year, it’s the same tragic story, and I wonder when they will realize the futility of building their abode in this precarious spot, where their future depends on the fragile balance of their nest. \n\n My despondency arises from years of witnessing the same tragic cycle. Every year, a pair of sparrows, in their quest for a cosy place, fixates on this small hole. Diligently, they work day and night to build their nest. When the time is right, the female sparrow lays eggs in what they consider a safe space. But then tragedy strikes. On many mornings, I have found their broken eggs and shattered hopes scattered on the terrace. The sparsely built, unstable nest, delicately balanced on the curve of the hook, proves unfit to safeguard the eggs, which fall and crash. As a parent, I can empathize with the sparrows who visit my house with hopes of seeing their little ones take flight, only to leave broken-hearted with their dreams crushed. Each year, I watch a new pair choose the same spot and I am driven by an instinctive hope that this time, things will be different. Perhaps this pair will succeed where others have not. I find myself silently cheering them on, admiring their hardiness and dedication. It’s a small, almost irrational hope, but it’s a powerful one. " , "Anna Turner");
})
