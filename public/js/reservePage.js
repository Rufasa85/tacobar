$("#resForm").on("submit",function(event){
    event.preventDefault();
    const newResObj= {
        name: $("#customerName").val(),
        phoneNumber: $("#customerPhone").val(),
        email: $("#customerEmail").val()
    }
    $.post("/api/tables",newResObj).then(function(data){
        if(data){
            alert("you got a table!")
        } else {
            alert("too slow!")
        }
        window.location.href = "/"
    })
    console.log(newResObj);
})