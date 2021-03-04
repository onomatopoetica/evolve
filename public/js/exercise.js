$(document).ready(function () {
    // Getting references to the name input and exercise container, as well as the table body
    var nameInput = $("#exercise-name");
    var exerciseList = $("tbody");
    var exerciseContainer = $(".exercise-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an Exercise
    $(document).on("submit", "#exercise-form", handleExerciseFormSubmit);
    $(document).on("click", ".delete-exercise", handleDeleteButtonPress);

    // Getting the initial list of Exercises
    getExercises();

    // A function to handle what happens when the form is submitted to create a new Exercise
    function handleExerciseFormSubmit(event) {
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out
        if (!nameInput.val().trim().trim()) {
            return;
        }
        // Calling the upsertExercise function and passing in the value of the name input
        upsertExercise({
            name: nameInput
                .val()
                .trim()
        });
    }

    // A function for creating an exercise. Calls getExercises upon completion
    function upsertExercise(exerciseData) {
        $.post("/api/exercise", exerciseData)
            .then(getExercises);
    }

    // Function for creating a new list row for exercises
    function createExerciseRow(exerciseData) {
        var newTr = $("<tr>");
        newTr.data("exercise", exerciseData);
        newTr.append("<td>" + exerciseData.name + "</td>");
        if (exerciseData.Posts) {
            newTr.append("<td> " + exerciseData.Posts.length + "</td>");
        } else {
            newTr.append("<td>0</td>");
        }
        newTr.append("<td><a href='/entries?exercise_id=" + exerciseData.id + "'>Create a Post</a></td>");
        newTr.append("<td><a href='/journal?exercise_id=" + exerciseData.id + "'>Go to Post</a></td>");
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-exercise'>Delete Exercise</a></td>");
        return newTr;
    }

    // Function for retrieving exercises and getting them ready to be rendered to the page
    function getExercises() {
        $.get("/api/exercise", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createExerciseRow(data[i]));
            }
            renderExerciseList(rowsToAdd);
            nameInput.val("");
        });
    }

    // A function for rendering the list of exercises to the page
    function renderExerciseList(rows) {
        exerciseList.children().not(":last").remove();
        exerciseContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            exerciseList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    }

    // Function for handling what to render when there are no exercises
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create an Exercise before you can create a Post.");
        exerciseContainer.append(alertDiv);
    }

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        var listItemData = $(this).parent("td").parent("tr").data("exercise");
        var id = listItemData.id;
        $.ajax({
            method: "DELETE",
            url: "/api/exercise/" + id
        })
            .then(getExercises);
    }
});
