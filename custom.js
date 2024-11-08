$(document).ready(function(){$('#upload_profile').change(function(){const file=this.files[0];if(file){let reader=new FileReader();reader.onload=function(event){$('#profile_image').attr('src',event.target.result);}
reader.readAsDataURL(file);}});$("#register-form").validate({rules:{name:{required:true,},phone_number:{required:true,number:true,remote:{type:'get',url:'/validate_user_phone/',data:{'phone':function(){return $('#phone_number').val();},},dataType:'json'},},email:{required:true,},syllabus:{required:true,},class:{required:true,},batch:{required:true,},},messages:{name:{required:"Please enter name.",},phone_number:{required:"Please enter phone number.",number:'Please enter valid phone number.',remote:'User already exist'},email:{required:"Please enter email.",},syllabus:{required:"Please enter syllabus.",},class:{required:"Please enter class.",},batch:{required:"Please enter batch.",},}});})
$(document).on('change','#syllabus',function(){var board=$(this).val()
$.ajax({url:'/get_class_list',type:'GET',data:{board:board},error:function(){},success:function(data){$("#class-section").html(data.template)}});});$(document).on('change','#class',function(){var class_id=$(this).val()
$.ajax({url:'/get_batch_list',type:'GET',data:{class_id:class_id},error:function(){},success:function(data){$("#batch-section").html(data.template)}});});$(document).on('click','#btn_login , .resend-otp',function(){$(".otp-field").val('');var phone=$("#phone").val()
$.ajax({url:'/send_otp',type:'GET',data:{phone:phone},error:function(){},success:function(data){if(data.status){console.log('otp send successfully')
$('#otp').val(data.otp)
$('#otp-msg-s').css('display','block');$('#otp-msg-s').css('color','green');setInterval(function(){$('#otp-msg-s').css('display','none');},5000)}}});});$(document).on('click','#otp-Verify',function(){var otp_list=[]
var form_otp=$(".otp-field");var phone=$("#phone").val()
for(var i=0;i<form_otp.length;i++){otp_list.push($(form_otp[i]).val())}
$.ajax({url:'/otp_confirm',type:'GET',data:{otp_list:otp_list.toString(),phone:phone},error:function(){},success:function(data){console.log(data)
if(data.status){window.location.href=data.url}
else{console.log('otp confirmation failed !')
$('#otp-msg').css('display','block');$('#otp-msg').css('color','red');setInterval(function(){$('#otp-msg').css('display','none');},5000)}}});});$(document).on('change','#class-s',function(){var class_id=$(this).val()
$("#batch-s").empty();$.ajax({url:'/getbatch',type:'GET',data:{'class_id':class_id},success:function(dataresp){$("#batch-s").append('<option value="">Select Batch</option>');for(i=0;i<dataresp.batches.length;i++){$("#batch-s").append('<option value="'+dataresp.batches[i].id+'">'+dataresp.batches[i].title+'</option>');}}});});$(document).on('click','#change_req',function(){var class_id=$('#class-s').val()
var batch_id=$('#batch-s').val()
$.ajax({url:'/get_banner_subj',type:'GET',data:{class_id:class_id,batch_id:batch_id},error:function(){},success:function(data){$('#req-msg').css('display','block')
$('#req-msg').css('color','green')
$('#req-msg').html('Successfully changed');window.location.href=window.location.origin+'/home';setTimeout(function(){$('#req-msg').css('display','none')},1000);}});});$(document).on('click','.lesson_tab',function(){var tab_id=$(this).attr('data-id')
var chapter_id=$(this).attr('data-name')
$.ajax({url:'/get_lesson_tab',type:'GET',data:{tab_id:tab_id,chapter_id:chapter_id},error:function(){},success:function(data){$("#v-pills-tabContent").html(data.template)}});})
$(document).on('input','#phone',function(){var phoneNumber=$(this).val()
var pattern=/^([+]?91|0)?[789]\d{9}$/;if(phoneNumber.length==10){$('#btn_login').prop('disabled',false);}else{$('#btn_login').prop('disabled',true);}})
$(document).on('click','#pinned_chat',function(){var room=$(this).attr('data-room')
$.ajax({url:'/get_pin_chat',type:'GET',data:{room:room},error:function(){},success:function(data){$("#demo").html(data.template)}});})
$(document).on('click','#chat-section',function(){var room=$(this).attr('data-room')
$.ajax({url:'/get_chat',type:'GET',data:{room:room},error:function(){},success:function(data){$("#demo").html(data.template)}});})
$(document).on('click','.plyr__control--forward',function(){$.ajax({url:'/create_token_user',type:'GET',data:{},error:function(){},success:function(data){}});})
$(document).on('change','#all_checkbox',function(){alert("jkm,l.;'")
if($('#all_checkbox').prop('checked')){$('.user_bulk_id').prop('checked',true);}else{$('.user_bulk_id').prop('checked',false);}})
$(document).on('click','#play_player',function(){player.play();$(this).attr('id','play_playerpos');$(this).html('<i class="fa fa-pause"></i>')})
$(document).on('click','#play_playerpos',function(){player.pause();$(this).attr('id','play_player');$(this).html('<i class="fa fa-play"></i>')})
$(document).on('click','.quality_sec',function(){player.pause();$('.quality_sec').removeClass('active')
$(this).addClass('active')
setTimeout(function(){player.play();},1000);$('.play-cent').html('<i class="fa fa-pause"></i>')})
$(document).on('click','.plyr__controls__item',function(){var scrn=$(this).attr('data-plyr')
var status=$(this).attr('aria-pressed')
if(scrn=='play'&&status=='true'){$('.play-cent').attr('id','play_playerpos');$('.play-cent').html('<i class="fa fa-pause"></i>')}
if(scrn=='play'&&status=='false'){$('.play-cent').attr('id','play_player');$('.play-cent').html('<i class="fa fa-play"></i>')}})
$(document).on('change','#speed-select',function(){var scrn=$(this).attr('data-plyr')
var status=$(this).attr('aria-pressed')
if(scrn=='play'&&status=='true'){$('.play-cent').attr('id','play_playerpos');$('.play-cent').html('<i class="fa fa-pause"></i>')}
if(scrn=='play'&&status=='false'){$('.play-cent').attr('id','play_player');$('.play-cent').html('<i class="fa fa-play"></i>')}})