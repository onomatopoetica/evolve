$(document).ready(function () {
    // entriesContainer holds all of our posts
    var entriesContainer = $(".entries-container");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);
    // Variable to hold our posts
    var posts;

    // The code below handles the case where we want to get entries for a specific exercise
    // Looks for a query param in the url for exercise_id
    var url = window.location.search;
    var exerciseId;
    if (url.indexOf("?exercise_id=") !== -1) {
        exerciseId = url.split("=")[1];
        getPosts(exerciseId);
    }
    // If there's no exerciseId we just get all entries as usual
    else {
        getPosts();
    }

    // This function grabs posts from the database and updates the view
    function getPosts(exercise) {
        exerciseId = exercise || "";
        if (exerciseId) {
            exerciseId = "/?exercise_id=" + exerciseId;
        }
        $.get("/api/posts" + exerciseId, function (data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty(exercise);
            }
            else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete posts
    function deletePost(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/posts/" + id
        })
            .then(function () {
                getPosts(postCategorySelect.val());
            });
    }

    // InitializeRows handles appending all of our constructed entries HTML inside entriesContainer
    function initializeRows() {
        entriesContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts[i]));
        }
        entriesContainer.append(postsToAdd);
    }

    // This function constructs an entry's HTML
    function createNewRow(post) {
        var formattedDate = new Date(post.createdAt).toLocaleDateString();
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var editBtn = $("<button>");
        editBtn.text("Edit");
        editBtn.addClass("edit btn btn-info");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-info");
        var newPostTitle = $("<h2>");
        var newPostDate = $("<small>");
        var newPostExercise = $("<h5>");
        newPostExercise.text("Exercise Category: " + post.Exercise.name);
        newPostExercise.css({
            float: "right",
            color: "black",
            "margin-top":
                "-10px"
        });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(post.title + " ");
        newPostBody.text(post.body);
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);
        var buttonContainer = $("<div>");
        buttonContainer.append(editBtn);
        buttonContainer.addClass("buttonContainer");
        buttonContainer.append(deleteBtn);
        newPostCardHeading.append(buttonContainer);
        newPostCardHeading.append(newPostTitle);
        newPostCardHeading.append(newPostExercise);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("post", post);
        return newPostCard;
    }

    // This function figures out which entry we want to delete and then calls deletePost
    function handlePostDelete() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handlePostEdit() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        window.location.href = "/journal?post_id=" + currentPost.id;
    }

    // This function displays a message when there are no posts
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for Exercise #" + id;
        }
        entriesContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No entries yet" + partial + ", navigate <a href='/entries" + query +
            "'>here</a> in order to get started.");
        entriesContainer.append(messageH2);
    }

});
