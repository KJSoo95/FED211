// 파일럿 PJ 메인 JS - main.js

$(function(){

    ////// 배너 드래그 기능 구현하기 ///////////

    //드래그 대상 : .slide
    let slide = $(".slide");

    // 드래그 기능주기 -> jQuery UI 기능
    slide.draggable({
        axis : "x" // x축 고정  
    });//// draggable ////

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
    $(window).resize(()=>{
        win = awin();
        console.log("윈도우 가로 : " + win);
    });/////////////////////////// resize 함수 /////////////////////////////

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
    // 대상 : .slide - > slide변수
    // 이벤트 : dragstop -> 드래그가 끝날때
    slide.on("dragstop", function(){

        // 광드래그 막기 커버보임
        cover.show();

        // 슬라이드 위치값 구하기
        spos = slide.offset().left;
        // offset().left 화면 왼쪽기준선 left위치
        console.log("슬위 : " + spos);

        //////////////////////////// 이동구현하기 ///////////////////////////////////
        // 2. 오른쪽에서 들어오는 이동 -> left : -110% 보다 작을때
        // -110% 구하기 -> -win*1.1
        if(spos < -win*1.1){

            /// 슬라이드가  -200% 위치로 이동
            // stop() 메서드는 animate가 큐에 쌓이는 것을 막는다!
            slide.stop().animate({
                left : -win*2 + "px"
            }, 700, easing, function(){ // 콜백함수(이동 후)
                // 첫번째 슬라이드 맨뒤로 보내기
                slide.append(slide.find("li").first())
                // 이때 left값을 -100%위치로 고정해야함!
                .css({left : -win + "px"});

                // 광드래그 커버 지우기
                cover.hide();
            }); ////////////// animate //////////////

            // 블릿순번변경하기 : 오른쪽이동은 증가!
            sno++;
            // 한계수 : 슬라이드 수와 같아지면 첫번호로!
            if(sno === 6) sno =0;

            chgIndic();
            
        } ////////////////////////// if문 : -100%보다 작을때 ///////////////////////
        
        // 2. 왼쪽에서 들어오는 이동 -> left : -90% 보다 클때
        // -90% 구하기 -> -win*0.9
        else if(spos >  -win*0.9){

            /// 슬라이드가  0 위치로 이동
            slide.stop().animate({
                left :  "0px"
            }, 700, easing, function(){ // 콜백함수
                slide.prepend(slide.find("li").last())
                // left값을 원래 위치인 -100%값으로 바꿔준다
                .css({left : -win + "px" });
                cover.hide();

            }); ////////////// animate //////////////

            // 블릿순서변경하기 : 왼쪽이동

            sno--;
            if(sno ===-1) sno=scnt-1;
            
            chgIndic();

        } ////////////////////////// if문 : -90%보다 클때 ///////////////////////
        
        // 3. 사이범위 일때 제자리로 돌아오기
        // -110% < 범위 < -90%
        else{
            slide.stop().animate({
                left : -win + "px"
            }, 300, function(){
                cover.hide();

            }); ////////////// animate //////////////
            
        } /////////////////////////// else 문 : 사이범위
        
       
       


    });//////////////////////////// drag ///////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////

    
 // 블릿변경함수
        let chgIndic = () => {
            // 블릿변경하기 : .blindic li -> indic변수
            indic.eq(sno).addClass("on").siblings().removeClass("on");
        };











});//////////////////jqb