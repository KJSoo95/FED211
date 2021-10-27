// 보그코리아 로그인 페이지 JS - login.js //

$(function(){

    // 서브밋 버튼 클릭시 아이디, 비번 입력 확인하기
    // 대상 : #sbtn
    // 체크대상 : #mid, #mpw

    // 아이디요소
    let mid = $("#mid");
    // 비번요소
    let mpw = $("#mpw");

    $("#sbtn").click(function(e){

        // 기본기능막기 : 서브밋 기능막기!
        e.preventDefault();

        // 두값이 모두 빈 값인지 체크함
        // val()은 선택요소의 값을 읽는 메서드
        // trim()은 문자앞뒤의 공백을 제거하는 메서드
        if(mid.val().trim() === "" || mpw.val().trim() ===""){
            alert("아이디와 비밀번호 모두 입력해야 합니다!");
            mid.val("");//기존값 지우기
            mpw.val("");//기존값 지우기
            mid.focus();//아이디 입려강에 포커스 주기
        }
        else{
            // 아이디와 비번을 모두 입력한 경우
            // 원래는 DB에 회원정보를 조회하여 
            // 로그인을 해야함!
            alert("로그인에 성공하였습니다!");// 임시
        }


    });/// click

}); /////jqb