function attachEvents() {
    const postsURL = "http://localhost:3030/jsonstore/blog/posts";
    const commentsURL = "http://localhost:3030/jsonstore/blog/comments";

    const loadPostsBtn = document.getElementById("btnLoadPosts");
    const selectMenu = document.getElementById("posts");
    const viewPostBtn = document.getElementById("btnViewPost");
    const postTitleElement = document.getElementById("post-title");
    const postBodyElement = document.getElementById("post-body");
    const commentsListElement = document.getElementById("post-comments");

    loadPostsBtn.addEventListener("click", loadAllPosts);
    viewPostBtn.addEventListener("click", loadPostDetails);

    async function loadAllPosts() {
        selectMenu.innerHTML = "";
        const arrayOfPosts = await getAllPostsAsArray();

        arrayOfPosts.forEach(post => {
            const optionElement = document.createElement("option");
            optionElement.value = post.id;
            optionElement.textContent = post.title;
            selectMenu.appendChild(optionElement);
        });
    }

    async function loadPostDetails() {
        commentsListElement.innerHTML = "";
        postTitleElement.textContent = "";
        postBodyElement.textContent = "";

        const commentsRequest = await fetch(commentsURL);
        const commentsJson = await commentsRequest.json();
        const arrayOfComments = Object.values(commentsJson);

        const selectedPostId = selectMenu.value;
        const arrayOfPosts = await getAllPostsAsArray();
        const selectedPost = arrayOfPosts.find(p => p.id === selectedPostId);

        postTitleElement.textContent = selectedPost.title;
        postBodyElement.textContent = selectedPost.body;
        const correspondingComments = arrayOfComments.filter(c => c.postId === selectedPostId);

        correspondingComments.forEach(comment => {
            const liElement = document.createElement("li");
            liElement.setAttribute("id", comment.id);
            liElement.textContent = comment.text;
            commentsListElement.appendChild(liElement);
        });
    }

    async function getAllPostsAsArray() {
        const postsRequest = await fetch(postsURL);
        const postsAsJson = await postsRequest.json();
        const arrayOfPosts = Object.values(postsAsJson);
        return arrayOfPosts;
    }
}

attachEvents();