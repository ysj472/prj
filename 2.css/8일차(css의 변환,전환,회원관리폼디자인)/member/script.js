//로그인 페이지
function logincheck(){
    if(document.loginform.id.value==""){
        alert("아이디를 입력하세요");   
        document.loginform.id.focus();
        return;
    }
    if(document.loginform.pwd.value==""){
        alert("비밀번호를 입력하세요");
        document.loginform.pwd.focus();
        return;
    }
    document.loginform.subject();
}
//회원가입
function register(){
    if(document.registerform.mem_id.value==""){
        alert("아이디를 입력하세요.");
        document.registerform.mem_id.focus();
    return;
    }
    if(document.registerform.mem_passwd.value==""){
        alert("비밀번호를 입력하세요.");
        document.registerform.mem_passwd.focus();
    return;
    }
    if(document.registerform.mem_repasswd.value==""){
        alert("비밀번호를 확인하세요.");
        document.registerform.mem_repasswd.focus();
    return;
    }
    if(document.registerform.mem_passwd.value!=document.registerform.mem_repasswd.value){
        alert("비밀번호가 맞지 않습니다.");
        document.registerform.mem_repasswd.focus();
    return;
    }
    if(document.registerform.mem_name.value==""){
        alert("이름을 입력하세요.");
        document.registerform.mem_name.focus();
    return;
    }
    if(document.registerform.mem_email.value==""){
        alert("이메일을 입력하세요.");
        document.registerform.mem_email.focus();
    return;
    }
    if(document.registerform.mem_phone.value==""){
        alert("전화번호를 입력하세요.");
        document.registerform.mem_phone.focus();
    return;
    }
    if(document.registerform.mem_zipcode.value==""){
        alert("우편번호를 입력하세요.");
        document.registerform.mem_zipcode.focus();
    return;
    }
    if(document.registerform.mem_address.value==""){
        alert("주소를 입력하세요.");
        document.registerform.mem_address.focus();
    return;
    }
}

