var stateDetail = {
    "INDIA": {
        "Gujarat": ["Ahmedabad", "Rajkot", "Surat", "Vadodara"],
        "Maharastra": ["Mumbai", "Nagpur", "Nasik"],
        "Rajsthan": ["Jaipur", "Jodhpur", "Bikaner"]
    },
    "CANADA": {
        "Alberta": ["Brooks", "Jasper", "Red Deer"],
        "Nova Scotia": ["Baddeck", "Digby", "Pictou"],
        "Ontario": ["Cambridge", "Hamilton", "Niagara Falls"]
    },
    "USA": {
        "California": ["San Francisco", "Los Angeles", "Oakland"],
        "Florida": ["Miami", "Jacksonville", "St. Petersburg"],
        "Txas": ["Austin", "Dallas", "San Antonio"]
    },
}
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJyYXZpay50YWdsaW5lQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6Ink4MkRCS1NaOHkzM0Q4eDR4alQyeVl5aW9HSkpXNDFxZUtPT3JiQ2tiUjMtVHQ5YnNzYXpPQmp6dWVEWl9OeGU2d0UifSwiZXhwIjoxNjE2NjY3NDY5fQ.RbwLsxSbOoDUdFri5-exUAQIeoi4btOgdYcWkziTMRc"

$(document).ready(function () {
    const frm = $("form[name=frm]");
    frm.submit(function (e) {
        e.preventDefault();
        if (formValidation(this)) {
            var form=$("#frm");
            var frmData=form.serializeObject()
            //console.log(frmData);
            var name = frmData.name;
            var email = frmData.email;
            var gender = frmData.gender;
            var hobbies = frmData["hobbies[]"];
            //console.log(values);
            var country = frmData.country;
            var state = frmData.state;
            var city = frmData.city;

            var form_hidden = $("input").eq(7).val();
            if (form_hidden == undefined || form_hidden == '') {
                myArray.push({name,email,gender,hobbies,country,state,city});
            } else {
                myArray[form_hidden] = {name,email,gender,hobbies,country,state,city};
            }
            console.log(myArray);
            $(this).find("input[name=hidden]").val('');
            $(this).find("input[type=reset]").trigger('click');
            $(".btn-success").text("Save").val('Save').removeClass('btn-success').addClass('btn-primary');
            $(this).find('.btn-dark').text("Reset");
            showData();
        }

    });
    showData();

    
    //country select
     const selectField=$("select");
     getCountries(selectField.eq(0));
    // //state select
    selectField.first().on("change", function () {
            getStateByCountry(selectField.eq(1),selectField.eq(0).val());
    });
    // //city select
     selectField.eq(1).on("change", function () {
        getCityByState(selectField.eq(2),selectField.eq(1).val());
    });
    $("input[name=nameSearch]").on("keyup", function (event) {
        event.preventDefault();
        var searchName = $(this).val() != '' ? myArray.filter(data => data.name.toLowerCase().startsWith($.trim($(this).val()).toLowerCase())) : myArray;
        
        showData(searchName);
    })
    $('select[name=sortName]').on("change", function () {
        var srt = $(this).val();
        myArray.sort(function (a, b) {
            let x = a.name.toUpperCase();
            let y = b.name.toUpperCase();
            return srt == 'Asc' ? x < y ? -1 : 1 : x > y ? -1 : 1;
        });
        showData(myArray)
    });
    $("button[name=clear]").on("click", function () {
        $("input[name=nameSearch]").val('');
        showData();
    })

});

const BASE_API=`https://www.universal-tutorial.com`
const HEADERS={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJyYXZpay50YWdsaW5lQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6Ink4MkRCS1NaOHkzM0Q4eDR4alQyeVl5aW9HSkpXNDFxZUtPT3JiQ2tiUjMtVHQ5YnNzYXpPQmp6dWVEWl9OeGU2d0UifSwiZXhwIjoxNjE2NjY3NDY5fQ.RbwLsxSbOoDUdFri5-exUAQIeoi4btOgdYcWkziTMRc",
            "Accept": "application/json"}
function getCountries(element,country=undefined,state=undefined,city=undefined){
    $.ajax({
        url:`${BASE_API}/api/countries/`,
        headers: HEADERS,

        type:'GET',
         success:function(response){
            //console.log(response);
             $.each(response,function(key, region){
                 element.html();
                 element.append(`<option value="${region['country_name']}">${region['country_name']}</option>`);
             })
            if(country){
                element.val(country);
                getStateByCountry($($('select').get(1)),country,state,city);
            }
         }
    });
}
function getStateByCountry(element,country,state=undefined,city=undefined){
    //console.log(country);
    $.ajax({
        url:`${BASE_API}/api/states/${country}`,
        headers: HEADERS,
        type:'GET',
         success:function(response){
             //console.log(response);
            element.html('');
             $.each(response,function(key, region){
                 element.html();
                 element.append(`<option value="${region['state_name']}"> ${region['state_name']}</option>`);
             })
            //
            if(state){
                element.val(state);
                getCityByState($($('select').get(2)),state,city); 
                
            }
         }
    });
}
function getCityByState(element,state,city=undefined){
console.log(state);
    $.ajax({
        url:`${BASE_API}/api/cities/${state}`,
        headers: HEADERS,
        type:'GET',
         success:function(response){
             //console.log(response);
            element.html('');
             $.each(response,function(key, region){
                 element.html();
                 element.append(`<option value="${region['city_name']}"> ${region['city_name']}</option>`);
             })
            
            if(city){
               element.val(city);               
            }
         }
    });
}
var myArray = [];
myArray.push({name: "Ravi",email: "ravikorat6@gmail.com",gender: "Male",hobbies: ["Cricket", "Singing"],country: "India",state: "Gujarat",city: "Ahmedabad"}, 
{name: "Yadav",email: "ravikorat6@gmail.com",gender: "Male",hobbies: ["Cricket", "Singing"],country: "India",state: "Gujarat",city: "Ahmedabad"});