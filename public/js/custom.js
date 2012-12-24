$(document).ready(function() {
  $('#login_form').submit(function() {
      var username = $('#username').val();
      var password = $('#password').val();

      dpd.users.login({"username": username, "password": password, "blocked": false}, function(session, error) {
        if (error) {
			$('#error_msg').html("<label style='color:red'>Wrong Password</label>");
          //alert(error.message);
        }
		else 
		{
			console.log(session);
			var query = {"id":session.uid};
			dpd.users.get(query, function (result) {
				if(result.blocked == true)
				{
					$('#error_msg').html("<label style='color:red'> Sorry you are a blocked user</label>");
					//location.href = "/index.html";
				}
				else
				{
					if(result.role == 'Administrator')
					{
						location.href = "/add_user.html";
					}
					else if(result.role == 'Sales manager')
					{
						location.href = "/welcome.html";
					}
				}
				console.log(result);
			});
          //location.href = "/add_user.html";
        }
      });

      return false;
    });
	
	$('#add_user').submit(function() {
	//alert("m here");
	//alert($('#username').val());
      var username = $('#username').val();
      var password = $('#password').val();
	  //alert($('#role').val());
	  var role = $('#role').val();
	  var blocked = $('#blocked').is(':checked');
	  var uId = '';
	  //alert(blocked);
       created = new Date();
	 // alert(username+"  :  "+password+"  :  "+role+"  :  "+blocked);

      if (!username) {
        alert("Username is required");
      } else if (!password) {
        alert("Password is required");
      } else {
		//alert("done");
        dpd.users.post({"username": username, "password": password, "DateCreated":created, "role":role, "blocked":blocked}, function(user, error) {
          if (error) {
            alert(JSON.stringify(error));
          } else {
			uId = user.id;
			alert(uId);
            
          }
        });
		dpd.email.post({
		  to: username,
		  subject: "MyApp registration",
		  text: username + ",\n\n" + "Thank you for registering for MyApp!",
		  html: "<a href='http://localhost:2403/reset_password.html?"+uId+"'>Click here to add your password</a>"
		}, function(error) {
			 if (error) {
				//alert(JSON.stringify(error));
			} else {
				location.href = "/add_user.html";
			}
			});
      }

      return false;
    });
	
	$('#logout-btn').click(function() {
      dpd.users.logout(function(res, err) {
        location.href = "/";
      });
    });
	
	$('#reset_pass').click(function() {
	  alert($('#uId').val());
	  alert($('#sent_time').val());
	  uId = $('#uId').val();
	  
      var confirmPassword = $('#confirm-password').val();
      var password = $('#password').val();
	  var usernm = '';
	  up_date = new Date();
	  if (!password) {
        alert("Password is required");
      } else if (!confirmPassword) {
        alert("Confirm Password is required");
      } else if(confirmPassword !== password)
	  {
		alert("Passwords do not match");
      } else {
		dpd.users.put(uId, {"password":password, "DateUpdated":up_date}, function(result, err) {
			if(err) return console.log(err);
		    console.log(result, result.id);
			usernm = result.username;
			//console.log(result);
			alert("done : "+result.username);
        });
		//alert(usernm);
		if(usernm == '')
		{
		}
		else 
		{
			dpd.users.login({"username": usernm, "password": password, "blocked": false}, function(session, error) {
				if (error) {
					$('#error_msg').html("<label style='color:red'>Wrong Password</label>");
				  alert(error.message);
				}
				else 
				{
					console.log(session);
					var query = {"id":session.uid};
					dpd.users.get(query, function (res) {
						if(res.blocked == true)
						{
							$('#error_msg').html("<label style='color:red'> Sorry you are a blocked user</label>");
							//location.href = "/index.html";
						}
						else
						{
							if(res.role == 'Administrator')
							{
								location.href = "/add_user.html";
							}
							else if(res.role == 'Sales manager')
							{
								location.href = "/welcome.html";
							}
						}
						console.log(res);
					});
				  //location.href = "/add_user.html";
				}
			  });
           // location.href = "/index.html";
			//alert(res);
		}
	  }
	});
	
	$('#forgot_pass').click(function() {
		if($('#username').val() == '')
		{
			alert('Please enter Username');
		}
		else
		{
		  username = $('#username').val();
		  var query = {"username":username};
			dpd.users.get(query, function (res) {
				//alert(res[0].id);
				uId = res[0].id;
				dpd.email.post({
				  to: username,
				  subject: "MyApp registration",
				  html: "<a href=''>Click here to add your password</a>"
				}, function(error) {
					 if (error) {
						//alert(JSON.stringify(error));
					} else {
						location.href = "/index.html";
					}
				});
			});
		}
	});
	
	$('#add_category').submit(function() {
	//alert("m here");
      var title = $('#title').val();
	  var published = $('#published').is(':checked');
	  //alert(published);
	  if(published == true)
		publish = "Yes";
	  else
		publish = "No";
       created = new Date();
      if (!title) {
        alert("Title is required");
      } else {
		//alert("done");
        dpd.categories.post({"title": title, "published":publish, "dateCreated":created, "dateUpdated":created}, function(cateory, error) {
          if (error) {
            alert(JSON.stringify(error));
          } else {
			//alert(cateory.id);
            location.href = "/add_category.html";
          }
        });
      }
      return false;
    });
	
	$('#add_tag').submit(function() {
	//alert("m here");
      var title = $('#title').val();
	  var published = $('#published').is(':checked');
	  //alert(published);
	  if(published == true)
		publish = "Yes";
	  else
		publish = "No";
       created = new Date();
      if (!title) {
        alert("Title is required");
      } else {
		//alert("done");
        dpd.tags.post({"title": title, "published":publish, "dateCreated":created, "dateUpdated":created}, function(cateory, error) {
          if (error) {
            alert(JSON.stringify(error));
          } else {
			//alert(cateory.id);
            location.href = "/add_tag.html";
          }
        });
      }
      return false;
    });
	
	$('#add_presentation').submit(function() {
	//alert("m here");
      var title = $('#title').val();
	  var desc = $('#desc').val();
	  var cat = $('#cat').val();
	  var sub_cat = $('#sub_cat').val();
	  var category = new Array();
	  category[0] = cat;
	  category[0] = sub_cat;
	  var published = $('#published').is(':checked');
	  //alert(published);
	  if(published == true)
		publish = "Yes";
	  else
		publish = "No";
       created = new Date();
      if (!title) {
        alert("Title is required");
      } else {
		//alert("done");
        dpd.presentation.post({"title": title, "description":desc, "category":category, "published":publish, "dateCreated":created, "dateUpdated":created}, function(cateory, error) {
          if (error) {
            alert(JSON.stringify(error));
          } else {
			//alert(cateory.id);
            location.href = "/add_presentation.html";
          }
        });
      }
      return false;
    });
	
	$('#reset_form').submit(function() {
	//alert("m here");
	var uId = '';
	var old_pass = '';
	var username = '';
	  dpd.users.me(function(me) {
		uId = me.id;
		username = me.username;
		old_pass = me.password;
		console.log(me);
	  });
	  alert(uId);
	  alert(old_pass);
	  alert(username);
	  var usnm = username;
	  dpd.users.login({"username": username, "password": old_pass}, function(session, error) {
        if (error) {
		  alert(error.message);
			dpd.users.logout(function(res, err) {
				alert("Please login again");
				location.href = "/";
			  });
        }
		else 
		{
			alert("logged in");
		}
	});
      var old_password = $('#old_password').val();
	  var new_password = $('#new_password').val();
	  var confirm_password = $('#confirm_password').val();
	  up_date = new Date();
	  if (!old_password) {
        alert("Old Password is required");
      } else if (!new_password) {
        alert("Password is required");
      }else if (!confirm_password) {
        alert("Confirm Password is required");
      }else if(confirmPassword !== password)
	  {
		alert("Passwords do not match");
      } else {
		dpd.users.put(uId, {"password":password, "DateUpdated":up_date}, function(result, err) {
			if(err) return console.log(err);
		    console.log(result, result.id);
			usernm = result.username;
			//console.log(result);
			alert("done : "+result.username);
        });
	  }
    });
});


var blked = '';
function preEdit(uId, collection)
		{
			if(collection == 'user')
			{
				dpd.users.get(uId, function (result) {
				  console.log(result);
				  var dta = '';
				  var my_date = new Date(result.DateCreated);
				  var month = my_date.getMonth() + 1;
				  var day = my_date.getDate();
				  var year = my_date.getFullYear();
				  //alert(result.DateCreated);
				  dta += '<td>'+result.username+'</td><td>'+month + '-' + day + '-' + year+'</td><td><input id="'+result.id+'_blocked" type="text" value="'+result.blocked+'"  onChange="updatevariable(this.value)"/></td>';
				  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:SaveEdit(\''+result.id+'\', \'user\')">Save</a></div></div></td>';
				  $('#'+uId).html(dta);
				});
				//alert(dta);
			}
			else if(collection == 'cat')
			{
				dpd.categories.get(uId, function (result) {
				  console.log(result);
				  var dta = '';
				  dta += '<td><input type="text" value="--" id="'+result.id+'_order"/></td><td><input type="text" value="'+result.title+'" id="'+result.id+'_title"/></td><td><input id="'+result.id+'_published" type="text" value="'+result.published+'" onChange="document.getElementById(\''+result.id+'_published\').value=this.value"/></td>';
				  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:SaveEdit(\''+result.id+'\', \'cat\')">Save</a></div></div></td>';
				  $('#'+uId).html(dta);
				});
				
			}
			else if(collection == 'tag')
			{
				dpd.tags.get(uId, function (result) {
				  console.log(result);
				  var dta = '';
				  dta += '<td><input type="text" value="--" id="'+result.id+'_order"/></td><td><input type="text" value="'+result.title+'" id="'+result.id+'_title"/></td><td><input id="'+result.id+'_published" type="text" value="'+result.published+'" onChange="document.getElementById(\''+result.id+'_published\').value=this.value"/></td>';
				  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:SaveEdit(\''+result.id+'\', \'tag\')">Save</a></div></div></td>';
				  $('#'+uId).html(dta);
				});
				
			}
		}	
		
		function updatevariable(data) { 
			blked = data;
			//alert(blked);
		} 
		
		function SaveEdit(uId, collection)
		{
			if(collection == 'user')
			{
				var blocked = new Boolean();
				if(blked == 'false')
					blocked = false;
				else if(blked == 'true')
					blocked = true;
				up_date = new Date();
				dpd.users.put(uId, {"DateUpdated":up_date, "blocked":blocked}, function(result, err) {
				  if(err) return console.log(err);
				  console.log(result, result.id);
				  var dta = '';
				  var my_date = new Date(result.DateCreated);
				  var month = my_date.getMonth() + 1;
				  var day = my_date.getDate();
				  var year = my_date.getFullYear();
				  dta += '<td id="'+result.id+'_username">'+result.username+'</td><td>'+month + '-' + day + '-' + year+'</td><td>'+result.blocked+'</td>';
				  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:preEdit(\''+result.id+'\')"><i class="icon-pencil"></i></a></div></div></td>';
				  $('#'+uId).html(dta);
				});
			}
			else if(collection == 'cat')
			{
				alert($('#'+uId+'_published').val());
				var pulishd = $('#'+uId+'_published').val();
				var order = $('#'+uId+'_order').val();
				var title = $('#'+uId+'_title').val();
				var up_date = new Date();
				dpd.categories.put(uId, {"title":title, "published":pulishd, "order":order, "DateUpdated":up_date, "blocked":blocked}, function(result, err) {
				  if(err) return console.log(err);
				  console.log(result, result.id);
				  var dta = '';
				  dta += '<td>--</td><td id="'+result.id+'_username">'+result.title+'</td><td>'+result.published+'</td>';
				  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:preEdit(\''+result.id+'\', \'cat\')"><i class="icon-pencil"></i></a></div></div></td>';

				  $('#'+uId).html(dta);
				});
			}
			else if(collection == 'tag')
			{
				alert($('#'+uId+'_published').val());
				var pulishd = $('#'+uId+'_published').val();
				var order = $('#'+uId+'_order').val();
				var title = $('#'+uId+'_title').val();
				var up_date = new Date();
				dpd.tags.put(uId, {"title":title, "published":pulishd, "order":order, "DateUpdated":up_date, "blocked":blocked}, function(result, err) {
				  if(err) return console.log(err);
				  console.log(result, result.id);
				  var dta = '';
				  dta += '<td>--</td><td id="'+result.id+'_username">'+result.title+'</td><td>'+result.published+'</td>';
				  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:preEdit(\''+result.id+'\', \'cat\')"><i class="icon-pencil"></i></a></div></div></td>';

				  $('#'+uId).html(dta);
				});
			}
		}