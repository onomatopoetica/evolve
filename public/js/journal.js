$(document).ready(function () {
    // Getting jQuery references to the post body, title, form, and exercise select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    // ??? WHICH IS #cms
    var cmsForm = $("#cms");
    var exerciseSelect = $("#exercise");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = window.location.search;
    var postId;
    var authorId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the post id from the url
    // In '?post_id=1', postId is 1
    if (url.indexOf("?post_id=") !== -1) {
        postId = url.split("=")[1];
        getPostData(postId, "post");
    }
    // Otherwise if we have an exercise_id in our url, preset the exercise select box to be our Exercise
    else if (url.indexOf("?exercise_id=") !== -1) {
        authorId = url.split("=")[1];
    }

    // Getting the exercises, and their related posts
    getExercises();

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body, title, or exercise
        if (!titleInput.val().trim() || !bodyInput.val().trim() || !exerciseSelect.val()) {
            return;
        }
        // Constructing a newPost object to hand to the database
        var newPost = {
            title: titleInput
                .val()
                .trim(),
            body: bodyInput
                .val()
                .trim(),
            ExerciseId: exerciseSelect.val()
        };

        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if (updating) {
            newPost.id = postId;
            updatePost(newPost);
        }
        else {
            submitPost(newPost);
        }
    }

    // Submits a new post and brings user to blog page upon completion
    function submitPost(post) {
        $.post("/api/posts", post, function () {
            window.location.href = "/entries";
        });
    }

    // Gets post data for the current post if we're editing, or if we're adding to an exercise's existing posts
    function getPostData(id, type) {
        var queryUrl;
        switch (type) {
            case "post":
                queryUrl = "/api/posts/" + id;
                break;
            case "exercise":
                queryUrl = "/api/exercises/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function (data) {
            if (data) {
                console.log(data.ExerciseId || data.id);
                // If this post exists, prefill our cms forms with its data
                titleInput.val(data.title);
                bodyInput.val(data.body);
                exerciseId = data.ExerciseId || data.id;
                // If we have a post with this id, set a flag for us to know to update the post
                // when we hit submit
                updating = true;
            }
        });
    }

    // A function to get Exercises and then render our list of Exercises
    function getExercises() {
        $.get("/api/exercises", renderExerciseList);
    }
    // Function to either render a list of exercises, or if there are none, direct the user to the page
    // to create an exercise first
    function renderExerciseList(data) {
        if (!data.length) {
            window.location.href = "/exercises";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createExerciseRow(data[i]));
        }
        exerciseSelect.empty();
        console.log(rowsToAdd);
        console.log(exerciseSelect);
        exerciseSelect.append(rowsToAdd);
        exerciseSelect.val(exerciseId);
    }

    // Creates the exercise options in the dropdown
    function createExerciseRow(exercise) {
        var listOption = $("<option>");
        listOption.attr("value", exercise.id);
        listOption.text(exercise.name);
        return listOption;
    }

    // Update a given post, bring user to the entries page when done
    function updatePost(post) {
        $.ajax({
            method: "PUT",
            url: "/api/posts",
            data: post
        })
            .then(function () {
                window.location.href = "/entries";
            });
    }
});
