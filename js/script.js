//show data
function showData(searchall = null) {
    var html = "<tr>";
    $.each(searchall == null ? myArray : searchall, function (key, std) {
        html += "<td>" + std.name + "</td>";
        html += "<td>" + std.email + "</td>";
        html += "<td>" + std.gender + "</td>";
        html += "<td>" + std.hobbies + "</td>";
        html += "<td>" + std.country + "</td>";
        html += "<td>" + std.state + "</td>";
        html += "<td>" + std.city + "</td>";
        html +=
            '<td><input type="button" class="btn btn-secondary mr-2" value="Edit" onclick="updateData(' + key +
            ');">&nbsp;<input type="button" class="btn btn-danger ml-2" value="Delete" onclick="deleteData(' + key +
            '); "></td>';
        html += "</tr>";
    })
    $("#tbl tbody").html(html);
}

function updateData(i) {
    const frm= $("form[name=frm]");
    frm.find("input[name=name]").val(myArray[i]["name"]);
    frm.find("input[name=email]").val(myArray[i]["email"]);
    frm.find("input[name=gender]").filter('[value=' + myArray[i]["gender"] + ']').prop('checked', true);
    //console.log(myArray[i]["gender"]);
    frm.find("input[name='hobbies[]']").val(myArray[i]['hobbies']);
   
    getCountries(frm.find("select[name=country]"),myArray[i]["country"],myArray[i]["state"],myArray[i]["city"]);
    getStateByCountry(frm.find("select[name=state]"),myArray[i]["country"],myArray[i]["state"],myArray[i]["city"]);
    getCityByState(frm.find("select[name=city]"),myArray[i]["state"],myArray[i]["city"]);
    frm.find("input[name=hidden]").val(i);
    $('.btn-primary').text('Update').val('Update').removeClass('btn-primary').addClass('btn-success');
    frm.find(".btn-dark").show();
    
    
}
function deleteData(i){
    if(confirm("Are you sure!! You want to delete this record")){
        myArray.splice(i,1);
    }
    showData();
}

function resetData(){   
    $('form select').not(':eq(0)').find('option').remove();
}

