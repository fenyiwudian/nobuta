var taskId = -1;
document.body.addEventListener('click', function(){
    clearTimeout(taskId);
    var assignedAt = new Date().getTime();
    taskId = setTimeout(function(){
        var executedAt = new Date().getTime();
        console.log('range: ', executedAt - assignedAt);
    }, 150)
})