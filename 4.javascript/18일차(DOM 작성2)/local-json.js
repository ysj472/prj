/*
     jQuery(local-json.js)
*/
$(function(){// window.onload=function(){} 초기화 작업

    //로컬스토러지 객체 생성:DB내용:프로파일러 목적(개정별로 서로 다른 환경설정 불러옴)
    let storage=localStorage;//로컬스토러지 객체명
    let body=document.querySelector("body");//배경색상 때문에(body태그)
    let nameField=document.getElementById("name");//이름
    let colorField=document.getElementById("color");//색상
    let fontSizeField=document.getElementById("fontSize");//폰트크기

    // 맨 처음에 로그인 했을때 기본배경색상,글자크기
    let defaultBackground="#ffffff";
    let defaultFontSize=15;


    //1.storage에 저장
    $('#save').click(function(){//save.onclick=function(){}
        // 로컬스토러지.setItem("키명",저장할값)<->로컬스토러지.getItem("키명")
        let user={
            name:nameField.value, /*키명:입력받은값*/
            color:colorField.value,
            size:fontSizeField.value
        }
        // 로컬스토러지에 저장하기 위해서는 객체=>문자열로 변환 JSON.stringfy(객체명)
        storage.setItem(nameField.value,JSON.stringify(user))
        // 화면에 반영
        updateUserInfo(nameField.value,colorField.value,fontSizeField.value);
    })
    
    //2.storage에 저장된 데이터 삭제
    $('#remove').click(function(){
        // 형식) 로컬스토러지객체명.clear() 모두 삭제
        // 형식2) 로컬스토러지객체명.removeItem(키명)<->setItem(키명,저장할값(user))
        storage.removeItem(nameField.value);
        //화면도 기본화면으로 다시 초기화작업
        updateUserInfo("",defaultBackground,defaultFontSize);
    })
    // 3.id,color,size 설정해주는 함수: 사용자 정의 함수
    function updateUserInfo(id,color,size){
        nameField.value=id;//사용자 id
        colorField.value=color;
        fontSizeField.value=size;
        // 화면에 반영(최상위 속성명.하위 속성명=저장할 것.)
        body.style.background=color;//배경색
        body.style.fontSize=size+"px";//단위 설정(html5)
    }
    // 4.처음 로그인시 반영할 초기화 설정해주는 함수
    $('#login').click(function(){
        //1.로컬스토리지객체명.getItem("불러올 키명")<->~setItem(키명,저장할값)
        let userStr=storage.getItem(nameField.value);//계정명
        if(userStr){
            //저장된 문자열: 객체로 다시 변환시켜서 화면에 반영
            //형식) JSON.parse(문자열)=> 객체로 변환
            let userObj=JSON.parse(userStr);
            updateUserInfo(userObj.name,userObj.color,userObj.size);//꺼내온 객체명.키명(저장된 값 불러옴.)
        }else{//저장된값이 없다면 초기설정지정
            updateUserInfo("".defaultBackground,defaultFontSize);//계정없고,흰색,15px
        }
    })
})