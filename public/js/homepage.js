$.get("/api/tables").then(function(data){
    console.log('API TABLE DATA:')
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        const newCard = $("<div>");
        newCard.addClass("card");

        const nameHeader = $("<h3>")
        nameHeader.text(`${data[i].id} ${data[i].name}`)
        newCard.append(nameHeader)

        const phoneHeader = $("<h4>")
        phoneHeader.text(`phone: ${data[i].phoneNumber}`)
        newCard.append(phoneHeader)

        const emailHeader = $("<h4>")
        emailHeader.text(`phone: ${data[i].email}`)
        newCard.append(emailHeader)

        const doneButton = $("<button>");
        doneButton.text("Done Eating!");
        doneButton.addClass("done-btn")
        doneButton.attr("data-id",data[i].id);
        newCard.append(doneButton);
        
        $("#tableCards").append(newCard);  
    }
})
$.get("/api/waitlist").then(function(data){
    console.log('API WAITLIST DATA:')
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        const newCard = $("<div>");
        newCard.addClass("card");

        const nameHeader = $("<h3>")
        nameHeader.text(`${data[i].id} ${data[i].name}`)
        newCard.append(nameHeader)

        const phoneHeader = $("<h4>")
        phoneHeader.text(`phone: ${data[i].phoneNumber}`)
        newCard.append(phoneHeader)

        const emailHeader = $("<h4>")
        emailHeader.text(`phone: ${data[i].email}`)
        newCard.append(emailHeader)

        $("#waitlistCards").append(newCard);  
    }
})

$(document).on("click",".done-btn",function(){
    const tableId = $(this).attr("data-id")
    $.ajax({
        method:"PUT",
        url:`/api/tables/${tableId}`
    }).then(function(data){
        window.location.reload();
    })
})