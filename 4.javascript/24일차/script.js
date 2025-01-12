/*
기능:회원가입 및 로그인을 위한 유효성검사
*/
function loginCheck(){
    if(document.login.mem_id.value==""){
        alert("아이디를 먼저 입력하세요.");
        document.login.mem_id.focus();
        return;
    }
    if(document.login.mem_pwd.value==""){
        alert("비밀번호를 먼저 입력하세요.");
        document.login.mem_pwd.focus();
        return;
    }
    document.login.submit();//document.폼객체명.submit(); input 타입이 button일때만 사용  
}
//중복id 체크해주는 자바스크립트 함수 선언
function idCheck(id){
    if(id==""){
        alert("아이디를 입력하세요.");
        document.regForm.mem_id.focus();
    }else{//window.open(1.불러올 문서명 2.창의 제목 3.창의 옵션)
        open('idCheck.html','w','left=350,top=150,width=300,height=150');
    }
}