// GNB 링크 이동 셋팅하기 - linksys.js

// 원페이지 이므로 GNB메뉴는 한 페이지 안에서
// 페이지의 위치 이동을 애니메이션 한다!
// 동시에 페이지 위치표시자를 사용하여 
// 페이지의 현재 위치를 표시해 준다!
// 현재 페이지에 해당하는 GNB는 클래스를
// 사용하여 마우스오버시와 동일한 디자인을 준다!

$(function () {

    // 대상 : .gnb a
    $(".gnb a").click(function (e) {

        // 1. 기본이동 막기
        e.preventDefault();

        // 2. 클릭된 a의 부모 li의 순번 알아낵
        // index() 메서드 사용! -> 선택요소의 순번을 리턴
        // parent() 메서드는 a요소의 부모인 li로 올라간다!
        // li는 순번이 0부터 읽어옴!
        let idx = $(this).parent().index();

        console.log("메뉴클릭!" + idx);

        pno = idx;

        // 페이지 이동을 위한 페이지 번호(pno)는
        // 메뉴클릭시의 순번인 idx와 같다!!!

        ///// 3. 전체윈도우 화면 높이값 단위로 이동위치 만들기
        // .page의 top값으로 구하면 되지만 새로운버전의
        // 제이쿼리에서 씽크 불일치가 발생함!
        let pos = $(window).height() * pno;

        console.log("이동위치 : " + pos);

        ///// 4. 실제 위치로 페이지 이동하기 /////

        // 전체 스크롤 이동대상 : html, body -> 두개 다 잡는게 브라우저 공통임

        $("html, body").animate({
            scrollTop: pos + "px"
        }, 800, "easeOutCubic");

        ///// 5. 현재 페이지에 해당하는 메뉴에 클래스 on넣기!
        // 대상 : .gnb li
        // 해당 li에 클래스를 넣으면 css에서 셋팅된 디자인적용!
        $(this).parent().addClass("on")
        .siblings().removeClass("on");


    });

});