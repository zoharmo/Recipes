/**
 * Created by user9 on 6/25/2016.
 */

///////////////////////////////////////////////////AppUser/////////////////////////////////////////////////////////////
// // create new user - if try to change all columns excpet email it will throw an error
// var path = "/api/dataservice/PostAppUser";
// var c = {'userName': "Gal Cohen"// nameGenderHost[0]
//     , 'password': "1234"// nameGenderHost[1]
//     , 'email': "galcohen92@gmail.com2"//nameGenderHost[0] + '.' + nameGenderHost[1] + '@' + nameGenderHost[3]
//     , 'isAdmin': true// addresses[i]
//     , 'gender': "M"//cityState[0]
//
// };
//
// $.ajax({
//     type: "POST",
//     url: path,
//     data: c,
//     success: function () {
//         alert("success");
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });


// // get specific user
// var path = "/api/dataservice/GetAppUser/" + "galcohen92@gmail.com1";
// $.ajax({
//     type: "GET",
//     url: path,
//     success: function (data) {
//         alert(data);
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });

// // get all users
// var path = "/api/dataservice/GetAppUsers";
// $.ajax({
//     type: "GET",
//     url: path,
//     success: function (data) {
//         alert(data);
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });


// // edit specific user
// var c = {'userName': "Gal Cohen"// nameGenderHost[0]
//     , 'password': "12345"// nameGenderHost[1]
//     , 'email': "galcohen92@gmail.com1"//nameGenderHost[0] + '.' + nameGenderHost[1] + '@' + nameGenderHost[3]
//     , 'isAdmin': true// addresses[i]
//     , 'gender': "M"//cityState[0]
//
// };
// var path = "/api/dataservice/EditAppUser";
// $.ajax({
//     type: "PUT",
//     url: path,
//     data: c,
//     success: function () {
//         alert("success");
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });

// var path = "/api/dataservice/DeleteAppUser/" + "galcohen92@gmail.com1";
// $.ajax({
//     type: "DELETE",
//     url: path,
//     success: function () {
//         alert("success");
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });

///////////////////////////////////////////////////Category/////////////////////////////////////////////////////////////
// create new
// var path = "/api/dataservice/createCategory";
// var c = {'name': "CANDIES123"
// };
//
// $.ajax({
//     type: "POST",
//     url: path,
//     data: c,
//     success: function () {
//         alert("success");
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });
//

//delete
// var path = "/api/dataservice/DeleteCategory/" + "1";
// $.ajax({
//     type: "DELETE",
//     url: path,
//     success: function () {
//         alert("success");
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });
//
// //edit Category
// var c = {'name': "Milk1", "id" : 6, "image":""
// };
// var path = "/api/dataservice/EditCategory";
// $.ajax({
//     type: "PUT",
//     url: path,
//     data: c,
//     success: function () {
//         alert("success");
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });


///////////////////////////////////////////////////Recipe/////////////////////////////////////////////////////////////
// create new user - if try to change all columns excpet email it will throw an error
// var path = "/api/dataservice/createRecipe";
// var c = {'title': "special milk1123",
//     'content': "bla bla",'likeAmount': 2,'categories': [6],'user': "galcohen92@gmail.com"
//     //'content': "bla bla",'likeAmount': 2
//
// };
//
// $.ajax({
//     type: "POST",
//     url: path,
//     data: c,
//     success: function () {
//         alert("success");
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });

//edit recipe
// var c = {'title': "very milk1","id":5,
//     'content': "bla bla",'likeAmount': 3,'categories': [],'user': "galcohen92@gmail.com"
//     //'content': "bla bla",'likeAmount': 2
//
// };
// var path = "/api/dataservice/EditRecipe";
// $.ajax({
//     type: "PUT",
//     url: path,
//     data: c,
//     success: function () {
//         alert("success");
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });

// //Get all recipes by category
// var path = "/api/dataservice/GetRecipesByCategory/" + "6";
//
// $.ajax({
//     type: "GET",
//     url: path,
//     success: function (data) {
//         alert(data);
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });


///////////////////////////////////////////////////Ingredient/////////////////////////////////////////////////////////////
// var path = "/api/dataservice/createIngredient";
// var c = {'name': "coc cola1",
//     'calories': 120.5,'fat': 10.0,'user': "galcohen92@gmail.com1"
//     //'content': "bla bla",'likeAmount': 2
// };
//
// $.ajax({
//     type: "POST",
//     url: path,
//     data: c,
//     success: function () {
//         alert("success");
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });

//was milk, and user 1
// edit Ingredient
// var path = "/api/dataservice/createIngredient";
// var c = {'name': "new milk",'id':3,
//     'calories': 12.5,'fat': 0.2,'user': "galcohen92@gmail.com"
//     //'content': "bla bla",'likeAmount': 2
// };
// var path = "/api/dataservice/EditIngredient";
// $.ajax({
//     type: "PUT",
//     url: path,
//     data: c,
//     success: function () {
//         alert("success");
//     },
//     fail: function () {
//         alert("fail");
//     },
//     dataType: "json"
// });