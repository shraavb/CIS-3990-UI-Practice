window.addEventListener("load", function() {
    document.body.style.backgroundColor = "lightblue";

    console.log("hello!");

    // makeCodeMirror();

    // demonstrateMouseEvents();
});

function makeCodeMirror() {
    var myTextArea = document.querySelector(".textarea");
    var myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
        mode: "javascript",
        lineNumbers: true,
    });

    var myCodeEditorContainer = document.querySelector(".code-editor-container");
    myCodeEditorContainer.style = "left: 100px; top: 400px;"

    console.log(myCodeEditorContainer);
}

// function demonstrateMouseEvents() {
//     var myCodeHandle = document.querySelector(".code-editor-handle");
//     myCodeHandle.addEventListener("mousedown", function (event) {
//         function mouseMoveHandler(event) {
//             console.log(`X: ${event.clientX}, Y: ${event.clientY}`);
//         }

//         function mouseUpHandler() {
//             window.removeEventListener("mousemove", mouseMoveHandler);
//             window.removeEventListener("mouseup", mouseUpHandler);
//         }

//         window.addEventListener("mousemove", mouseMoveHandler);
//         window.addEventListener("mouseup", mouseUpHandler);
//     })
// }

function newEditor() {
    var newTextArea = document.createElement("textarea");
    var container = document.createElement("div");
    container.className = "code-editor-container";
    var handle = document.createElement("div");
    handle.className = "code-editor-handle";
    container.appendChild(handle);
    container.appendChild(newTextArea);

    var myCodeMirror = CodeMirror.fromTextArea(newTextArea, {
         mode: "javascript",
         lineNumbers: true,
     });
     document.body.appendChild(container);

    container.style = "left: 100px; top: 400px;";

    console.log(container);

    handle.addEventListener("mousedown", function(event) {

        const rect = container.getBoundingClientRect();
        const xGap = event.clientX - rect.left;
        const yGap = event.clientY - rect.top;

        function mouseMoveHandler(event) {
            const x = event.clientX;
            const y = event.clientY;

            console.log(`X: ${event.clientX}, Y: ${event.clientY}`);
            console.log('you have moved your mouse');
            //let getStyle = window.getComputedStyle(container);
            // let left = parseInt(getStyle.left);
            // let top = parseInt(getStyle.top);
            container.style.left = x - xGap + "px";
            container.style.top = y - yGap + "px";
        }

        function mouseUpHandler() {
            console.log('you have lifted your mouse');
            console.log(`X: ${event.clientX}, Y: ${event.clientY}`);
        
            window.removeEventListener("mousemove", mouseMoveHandler);
            console.log('mouse move event listener has been removed');
        
            window.removeEventListener("mouseup", mouseUpHandler);
            console.log('mouse up event listener has been removed');
        }

        window.addEventListener("mousemove", mouseMoveHandler);
        window.addEventListener("mouseup", mouseUpHandler);
        
    });
    
}