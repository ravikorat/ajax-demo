// form validation method and define rule of validation.
function formValidation(form) {
    //console.log(form);
    var valid = true;
    var form=$("#frm");
    var formData = form.serializeObject();
    form.find(".border-danger").removeClass("border-danger");
    form.find(".error-msg").remove();

    if (formData.name == '' || formData.name.length < 3) {
        valid = false;
        form.find("input[name=name]").addClass("border-danger").after('<span class="error-msg text-danger"> Name is required with minmum 3 character.</span>');
        
    }

    var email = formData.email;
    var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (emailPattern.test(email) == false) {
        valid = false;
        form.find("input[name=email]").addClass("border-danger").after('<span class="error-msg text-danger">Proper email required.</span>');
    }

    
    if(formData.gender==''){
        valid = false;
        form.find("input[name=gender]").parents(':eq(0)').after('<span class="error-msg text-danger mr-3">Select your gender.</span>');
    }
    var hobbies = formData["hobbies[]"];
    if(hobbies.length < 2 || !Array.isArray(hobbies))
    {
        valid = false;
        form.find('input[name="hobbies[]"]').parents(':eq(2)').append('<span class="error-msg text-danger " style="margin-left:130px;">Select minmum 2 hobbies.</span>');
    }
    var formAllSelects = form.find('select');
    if (formData.country == undefined || formData.country == '') {
        valid = false;
        formAllSelects.eq(0).addClass("border-danger").after('<span class="error-msg text-danger" style="margin-left:130px;">Select country.</span>');
    } 
    if (formData.state == undefined || formData.state == '') {
        valid = false;
        formAllSelects.eq(1).addClass("border-danger").after('<span class="error-msg text-danger" style="margin-left:130px;">Select state.</span>');
    }

    if (formData.city == undefined || formData.city == '') {
        valid = false;
        formAllSelects.eq(2).addClass("border-danger").after('<span class="error-msg text-danger" style="margin-left:130px;">Select city.</span>');
    } 
    return valid;
}
