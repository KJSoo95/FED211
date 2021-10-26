// 파일럿 PJ 메인 JS - main.js

$(function () {

    ///// 모바일일때 메인페이지 등장액션 클래스 지우기
    if(mob)$(".act").removeClass("act");
    // mob는 autoScroll.js에서 모바일일때 1을 넣어줌

    ///////////////////////////////////////////////////////////////////////
    //// 상단메뉴 클릭시 페이지 이동하기//////////
    //////////////////////////////////////////////////////////////////////
    // 대상 : .gnb a
    $(".gnb a").click(function (e) {
        e.preventDefault

        // 2. 클릭된 a의 부모 li순번 알아내기
        // 유의사항 :  첫번째 li가 안보이도록 있어서
        // 페이지 순번과 정확히 일치함!
        let idx = $(this).parent().index();
        console.log("순번 : " + idx);

        // 중요!!
        //pno에 idx sjgrl
        pno = idx;

        ////////////////////////////////////////////////////
        // 새로운 페이지 위치값 : 윈도우 높이값 * 페이지순번 //
        let pos = $(window).height() * pno;
        ///////////////////////////////////////////////////

        //console.log("이동위치:" + pos);

        //////////////////////////////////////////////
        // 4. 실제 이동위치로 스크롤 애니메이션 하기 ////
        //////////////////////////////////////////////

        $("html,body").stop().animate({
            scrollTop: pos + "px"
        }, 1200, "easeOutQuint");

        // animate 콜백함수가 아닌 바깥에서 호출하면
        // 페이지액션이 출발과 동시에 작동된다!
        pageAction();


        ///////////////////////////////////////////////
        // 5. 페이지번호(pno)에 맞는 GNB 메뉴 변경하기 //
        ///////////////////////////////////////////////
        // 변경대상: .gnb li, .indic li
        $(".gnb li").eq(pno).addClass("on")
            .siblings().removeClass("on");
        $(".indic li").eq(pno).addClass("on")
            .siblings().removeClass("on");
        // 선택된 li 이외의 li형제들 class="on"제거하기
    });



    ////// 배너 드래그 기능 구현하기 ///////////

    //드래그 대상 : .slide
    let slide = $(".slide");

    // 드래그 기능주기 -> jQuery UI 기능
    slide.draggable({
        axis: "x" // x축 고정  
    }); //// draggable ////

    /* 
        배너 드래그 이동의 기준
        1. 현재 슬라이드의 left -100%값을 기준으로 판단함
        2. 오른쪽에서 들어오는 이동 -> left : -110% 보다 작을때
        3. 왼쪽에서 들어오는 이동 -> left : -90% 보다 클때
        4. 제자리로 돌아가는 이동 -> left : -110보다 크고 -90보다 작을때

        -> 구현상 유의사항 : 실제로 이동시엔 px단위로 이동함
        따라서 %를 px로 변환해 줘야한다.!
        예시) 가로크기 : 1000px -> left : -100% -> left : -1000px
            left : -110% -> left : -(1000*1.1) + "px"
            left : -90% -> left : -(1000*0.9) + "px"
    */

    /// 윈도우 가로크기 구하는 함수
    let awin = () => $(window).width();
    //////////////////// awin 함수 ///////////////////
    /// 화살표함수 뒤에 중괄호 없이 명령문 하나만 있으면
    // 그게 바로 return 문이다! -> 함수호출한 곳으로 가져감!

    // 윈도우 가로크기
    let win = awin();

    // 화면 크기변경(resize)시 윈도우 가로크기 업데이트
    $(window).resize(() => {
        win = awin();
        console.log("윈도우 가로 : " + win);
    }); /////////////////////////// resize 함수 /////////////////////////////

    // 현재 슬라이드 위치값 구하기
    // 슬라이드 위치값
    let spos;
    //이징변수
    let easing = "easeOutQuint";
    // 화면커버(광드래그막기)
    let cover = $(".cover");
    // 슬라이드 순번 변수
    let sno = 0; // 첫 슬라이드는 0번(블릿li순번도 0번부터!)
    // 블릿요소
    let indic = $(".bindic li");
    // 슬라이드 개스
    let scnt = slide.find("li").length;
    console.log(scnt);

    // 자동넘김지우기는 드래그 시작 이벤트(dragstart)에서
    // 해줘야 미리 끊어줄 수 있다~!
    slide.on("dragstart", () => {
        clearAuto();
    });


    // 대상 : .slide - > slide변수
    // 이벤트 : dragstop -> 드래그가 끝날때
    slide.on("dragstop", function () {

        clearAuto();

        // 광드래그 막기 커버보임
        cover.show();

        // 슬라이드 위치값 구하기
        spos = slide.offset().left;
        // offset().left 화면 왼쪽기준선 left위치
        console.log("슬위 : " + spos);

        //////////////////////////// 이동구현하기 ///////////////////////////////////
        // 2. 오른쪽에서 들어오는 이동 -> left : -110% 보다 작을때
        // -110% 구하기 -> -win*1.1
        if (spos < -win * 1.1) {

            /// 슬라이드가  -200% 위치로 이동
            // stop() 메서드는 animate가 큐에 쌓이는 것을 막는다!
            slide.stop().animate({
                left: -win * 2 + "px"
            }, 700, easing, function () { // 콜백함수(이동 후)
                // 첫번째 슬라이드 맨뒤로 보내기
                slide.append(slide.find("li").first())
                    // 이때 left값을 -100%위치로 고정해야함!
                    .css({
                        left: -win + "px"
                    });

                // 광드래그 커버 지우기
                cover.hide();

                // 배너글자 등장함수 호출!
                showTxt();
                // 아랫쪽의 sno변경이 먼저 이루어짐!

            }); ////////////// animate //////////////

            // 블릿순번변경하기 : 오른쪽이동은 증가!
            sno++;
            // 한계수 : 슬라이드 수와 같아지면 첫번호로!
            if (sno === 6) sno = 0;

            chgIndic();

        } ////////////////////////// if문 : -100%보다 작을때 ///////////////////////

        // 2. 왼쪽에서 들어오는 이동 -> left : -90% 보다 클때
        // -90% 구하기 -> -win*0.9
        else if (spos > -win * 0.9) {

            /// 슬라이드가  0 위치로 이동
            slide.stop().animate({
                left: "0px"
            }, 700, easing, function () { // 콜백함수
                slide.prepend(slide.find("li").last())
                    // left값을 원래 위치인 -100%값으로 바꿔준다
                    .css({
                        left: -win + "px"
                    });
                cover.hide();

                // 배너글자 등장함수 호출!
                showTxt();
                // 아랫쪽의 sno변경이 먼저 이루어짐!

            }); ////////////// animate //////////////

            // 블릿순서변경하기 : 왼쪽이동

            sno--;
            if (sno === -1) sno = scnt - 1;

            chgIndic();

        } ////////////////////////// if문 : -90%보다 클때 ///////////////////////

        // 3. 사이범위 일때 제자리로 돌아오기
        // -110% < 범위 < -90%
        else {
            slide.stop().animate({
                left: -win + "px"
            }, 300, function () {
                cover.hide();

            }); ////////////// animate //////////////

        } /////////////////////////// else 문 : 사이범위





    }); //////////////////////////// drag ///////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////


    // 블릿변경함수
    let chgIndic = () => {
        // 블릿변경하기 : .blindic li -> indic변수
        indic.eq(sno).addClass("on").siblings().removeClass("on");
    };


    ///// 배너등장 텍스트 /////
    let banTxt = [
        "Men's Season<br>Collection",
        "2021 Special<br>Collection",
        "GongYoo<br>Collection",
        "T-shirt<br>Collection",
        "Shoes<br>Collection",
        "Wind Jacket<br>Collection",
    ];
    ///// 배너글자 등장 함수 ///////
    let showTxt = () => {

        // 0. 있을 수 있는 .btit 박스 지우기
        $(".btit").remove();

        // 1. 배너글자 박스 넣기
        // 대상 : .slide li -> 항상 두번째 슬라이드임!
        slide.find("li").eq(1).append('<h2 class ="btit"></h2>')

        // 배너화면 구성상 왼쪽과 오른쪽으로 글자위치조정
        // sno 순번 1, 2 만 오른쪽
        // left value 즉, left값을 변수로 처리!
        let lval = "30%"; // 왼쪽설정값
        if (sno === 1 || sno === 2) lval = "70%"; // 오른쪽 설정값

        // 2. 배너글자박스 CSS
        $(".btit").css({
                position: "absolute",
                top: "55%", // 아래쪽으로 살짝 내려감 
                left: lval,
                transform: "translate(-50%, -50%)",
                font: "bold 4.5vmax Verdana",
                color: "#fff",
                textShadow: "1px 1px 3px #777",
                whiteSpace: "nowrap",
                opacity: 0
            }) /////////////////// css //////////////////

            // 3. 글자넣기
            .html(banTxt[sno])
            // 4. 애니메이션 등장하기 - 주인공에서 이어짐!
            .animate({
                top: "50%",
                opacity: 1
            }, 1000, "easeInOutQuart");

    }; ////////////// showTxt함수 //////////////////////



    // 배너텍스트 등장함수 최초호출
    showTxt();

    //////////////////////////////////////////////////////////////////////////////////
    /////// 배너자동 넘기기 함수 : 오른쪽에서 들어옴!/////
    ///////////////////////////////////////////////////////////////////////////////////
    let goSlide = () => {

        // 광드래그 막기 커버보임
        cover.show();

        /// 슬라이드가  -200% 위치로 이동
        // stop() 메서드는 animate가 큐에 쌓이는 것을 막는다!
        slide.stop().animate({
            left: -win * 2 + "px"
        }, 700, easing, function () { // 콜백함수(이동 후)
            // 첫번째 슬라이드 맨뒤로 보내기
            slide.append(slide.find("li").first())
                // 이때 left값을 -100%위치로 고정해야함!
                .css({
                    left: -win + "px"
                });

            // 광드래그 커버 지우기
            cover.hide();

            // 배너글자 등장함수 호출!
            showTxt();
            // 아랫쪽의 sno변경이 먼저 이루어짐!

        }); ////////////// animate //////////////

        // 블릿순번변경하기 : 오른쪽이동은 증가!
        sno++;
        // 한계수 : 슬라이드 수와 같아지면 첫번호로!
        if (sno === 6) sno = 0;

        chgIndic();

    }; ////////////////////////  goSlide 함수 ////////////////////////////


    // 인터발용 함수
    let autoI; // 지우기용

    ///////////////////////////////////////////////////////////////////////////
    ////////// 자동인터벌 호출 함수 /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    let autoSlide = () => {
        autoI = setInterval(goSlide, 2500);
        // 2.5초 간격으로 goSlide함수를 호출!
    };

    // 인터발 최초호출
    autoSlide();

    // 타임아웃용변수
    let autoT; // 지우기용

    /////////////////////////////////////////////////////////////////////////////////
    ///////////// 인터발 지우기함수 + 안걸들면 재실행/////
    /////////////////////////////////////////////////////////////////////////////////
    let clearAuto = () => {
        /// 1. 인터벌 지우기
        clearInterval(autoI);
        // 2. 타임아웃지우기(실행쓰나미 방지!)
        clearTimeout(autoT);
        // 3. 일정시간뒤 다시 호출
        autoT = setTimeout(autoSlide, 3000);
        // 3초동안 기다렸다가 다시 인터발 함수호출

    }; ///////////////////////////// clearAuto 함수 ////////////////////////////


}); //////////////////jqb

/* /////////////////////////////////////////
    함수명 : pageAction
    기능 : 페이지 도착시 등장액션하기
    구현방법 : 클래스를 해당 요소에 주기!!!
    페이지구분 : pno페이지 번호 변수사용
    변경대상 .pno
*/ /////////////////////////////////////////
function pageAction() {

    $(".page").eq(pno).find(".act").addClass("on");
    // .act가 여러개여도 클래스를 모두에게 줌~!


} ////////////////////////////// pageAction