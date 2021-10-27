// 보그 코리아 링크 시스템 JS - linksys.js

$(function(){

    console.log("링크시스템 로딩구역");

    /// 1. 로고 클릭시 첫페이지로 가기!
    // 대상: .logo a
    $(".logo a").click(function(){
        location.href = "index.html";
    }); /////////// click ////////////


    // 1. GNB 메뉴 링크 연결하기
    // 대상 : .gnb a
    // 이벤트 : click -> click() 메서드 사용
    $(".gnb a, .mognb a").click(function(e){
        // e- 이벰트 전달변수 : 여러가지 이벤트 관련 설정 가능!
        // 기본이동속성 막기
        e.preventDefault();
        // preventDefault() 기본이벤트 발생을 막아준다!
        // e라는 이벤트 전달변수를 꼭 써야함!

        // 2. 클릭된 요소의 텍스트 읽어오기
        let mtxt = $(this).text().toLowerCase().trim();
        // toLowerCase() -> 소문자 변환 메서드
        // 비교) toUpperCase() -> 대문자 변환 메서드
        // -> 메뉴가 대문자인데 Get방식으로 넘길때
        // 소문자로 넘기고자함. 그래서 변환함
        // -> sub 페이지에서 소문자로 넘긴 파라미터를 활용함!

        // trim() 메서드 : 문자데이터 앞뒤공백제거
        // -> 마지막 검색아이콘 클릭시 앞뒤공백있는 "search"라는
        // 글자가 나온다! 이것의 앞뒤공백을 제거한다!

        // 3. 페이지 이동하기 :
        if(mtxt !=="search")
            location.href = "sub.html?cat=" + mtxt;
        //url뒤에 ?(물음표) 키 = 값 쌍으로 보냄
        // cat 이라는 키이름은 사용자가 지은것이다.
        // 키 = 값 을 맞추기 위함!

    });

    




});///////////jqb////////////