//제이쿼리 기본 JS-main.js

/// 제이쿼리 로드구역 /////
$(function(){

    // 타이틀 오버시 글자색, 배경색 변경
    // 대상 : .tit
    let tit = $(".tit");
    // mouseover()메서드
    tit.mouseover(function(){
        // 변경대상 : .tit -> 나 자신 this키워드
        $(this).css({
            color : "red",
            background : "yellow"
        });/// css ///
    });///mouseover/////
    //mouseout()메서드
    tit.mouseout(function(){
        // 변경대상 : .tit -> 나 자신 this키워드
        $(this).css({
            color : "yellow",
            background : "pink"
        });/// css ///
    });///mouseover/////


    //////////////////////////////////
    /// 1. 대상선정 변수할당 ///////////
    
    // 대상1 : 버튼 - .btns button
    let btns = $(".btns button");

    // 대상2 : 미니언즈 - .mi
    let mi = $(".mi");

    // 대상3: 빌딩 - .building li
    let bd = $(".building li");

    // 대상4: 메시지 - .msg
    let msg = $(".msg");

    // 좀비 태그 셋업
    let mz1 = '<img src = "images/mz1.png" alt = "좀비1" class = "mz">';
    let mz2 = '<img src = "images/mz2.png" alt = "좀비2" class = "mz">';
    let zom = '<img src = "images/zom.png" alt = "좀비들" class = "mz">';

    // 주사기 태그 셋업
    let inj = '<img src = "images/inj.png" alt = "주사기" class = "inj">';

    // 미니언즈 가로크기 보정값
    // 윈도우 가로크기의 5%
    let win5 = $(window).width()*0.05;
    // console.log("가로크기 : " + win5);
    // width() 선택요소의 가로크기 구하기
    // height() 선택요소의 세로크기 구하기
    // -> 단위없는 px값

    ////////////////////////////////
    // 2. 초기화 셋팅 ///////////////

    // 2-1. 모든 버튼 숨기고 첫번째만 보이게하기
    btns.hide().first().show();
    // 버튼들을 숨겨 첫번째는 보여
    // 주어는 하나! 뒤에 메서드 체인!

    // 2-2. 모든 빌딩li를 순서대로 돌면서 순번넣기 + 좀비넣기
    // each(function(idx, ele){구현부})
    // -> 선택요소를 순서대로 돌면서 구현부를 실행하는 메서드
    // -> idx 전달변수는 순번이 전달됨(0부터)
        //(idx -> index 에서 나온말로 변수명 사용)
    // -> ele 전달변수는 요소자신 (this키워드와 동일)
        //(ele -> element 에서 나온말로 변수명 사용)
    // - 참고로 idx, ele 변수명은 변경가능. 변수의 순서중요!
    // - 이 메서드를 사용하면 for문을 안써도 됨!
    bd.each(function(idx ,ele){
        //console.log(idx);
        // 1. 각 li요소에 글자넣기(순번)
        $(ele).text(idx);

        // 2. 좀비 + 주사기넣기
        if(idx===9)
            $(ele).append(mz1);
        else if(idx===7)
            $(ele).append(mz2);
        else if(idx===1)
            $(ele).append(zom);
        else if(idx===2)
            $(ele).append(inj);
    });//////each ///////

    // 2-3. 모든 좀비 숨기기
    $(".mz").hide();
    // 선택요소가 여러개이면 for문을 돌듯이 모두 셋팅됨

    /////////////////////////////////////////////
    // 3. 버튼별 순서대로 클릭 이벤트 함수 만들기//

    // 3-1. '들어가기' 버튼 
    btns.first().click(function(){

        // console.log("들어가기 버튼;")

        // 자기자신 버튼 없애기
        $(this).slideUp(300);

        // 메시지 지우기
        msg.fadeOut(200);
        // fadeOut(시간) - opacity로 서서히 사라짐

        // 이동할 빌딩 li의 위치정보 알아내기!
        // offset() 메서드 위치나 크기정보를 알려줌
        // offset().top - top값
        // offset().left -left값

        // 이동할 li타겟 -> bd변수에 할당(.building li)
        let tg = bd.eq(8);
        let tval = tg.offset().top; // 화면에서의 top값
        let lval = tg.offset().left; // 화면에서의 left값
        console.log(tval + "/" + lval);

        // 미니언즈 이동하기
        // 대상 .mi -> mi변수에 할당
        // animate({CSS설정}, 시간, 이징, 함수)
        mi.animate({
            top : tval +"px",
            left : lval + win5 + "px"
        }, 1000, function(){// 콜백함수(애니후 실행!)
            //메시지 변경하기
            msg.text("와~! 아늑하다! 옆방으로 가보자!")
            // 나타나기
            .fadeIn(200);
            // 한번 선택하고 이어서 베서드를 계속 쓰는 방법을 메서드 체인이라고 함!

            // 다음변경버튼 보이기
            btns.eq(1).slideDown(400);
        });/// animate ///

    });///3-1 들어가기 버튼

    // 3-2. 옆방으로! 버튼
    btns.eq(1).click(function(){

        // 자기자신 버튼 없애기
        $(this).slideUp(300);

        // 메시지 지우기
        msg.fadeOut(200);

        // 이동할 li타겟 -> bd변수에 할당(.building li)
        let tg = bd.eq(9);
        let tval = tg.offset().top; // 화면에서의 top값
        let lval = tg.offset().left; // 화면에서의 left값
        console.log(tval + "/" + lval);

        // 미니언즈 이동하기
        // 대상 .mi -> mi변수에 할당
        // animate({CSS설정}, 시간, 이징, 함수)
        mi.animate({
            top : tval +"px",
            left : lval + win5 + "px"
        }, 1000, function(){// 콜백함수(애니후 실행!)

            // 좀비 나타나기 (콜백에서 2초 후)
            setTimeout(() => {
                // 현재 li에 있는 좀비만 보여라!
                tg.find(".mz").fadeIn(300);
                // find(요소) 하위 중 자손요소 찾기!

                //메시지 변경하기
                msg.html("악! 좀비 <br> 어서 피하자~!")
                // .css({left : "-120%"})
                .attr("style", "left : -120%")
                .delay(400)//0.4초 후
                // 나타나기
                .fadeIn(200)
                // 한번 선택하고 이어서 베서드를 계속 쓰는 방법을 메서드 체인이라고 함!
    
                // 다음변경버튼 보이기
                btns.eq(2).delay(700).slideDown(400);

            }, 1000);


        });/// animate ///
        


    });// 3-2. 옆방으로! 버튼

    // 3-2. 윗층으로 도망가! 버튼
    btns.eq(2).click(function(){

        // 자기자신 버튼 없애기
        $(this).slideUp(300);

        // 메시지 지우기
        msg.fadeOut(200);

        // 이동할 li타겟 -> bd변수에 할당(.building li)
        let tg = bd.eq(7);
        let tval = tg.offset().top; // 화면에서의 top값
        let lval = tg.offset().left; // 화면에서의 left값
        console.log(tval + "/" + lval);

        // 미니언즈 이동하기
        // 대상 .mi -> mi변수에 할당
        // animate({CSS설정}, 시간, 이징, 함수)
        mi.animate({
            top : tval +"px",
            left : lval + win5 + "px"
        }, 1000, function(){// 콜백함수(애니후 실행!)

            msg.text("여긴없겠지?")
            .delay(500).fadeIn(200);

            // 좀비 나타나기 (콜백에서 2초 후)
            setTimeout(() => {
                // 현재 li에 있는 좀비만 보여라!
                tg.find(".mz").fadeIn(300);
                // find(요소) 하위 중 자손요소 찾기!

                //메시지 변경하기
                msg.text("헉! 여기도!")
                .delay(400)//0.4초 후
                // 나타나기
                .fadeIn(200)
                // 한번 선택하고 이어서 베서드를 계속 쓰는 방법을 메서드 체인이라고 함!
    
                // 다음변경버튼 보이기
                btns.eq(3).delay(700).slideDown(400);

            }, 1000);


        });/// animate ///
        


    });// 3-3. 윗층으로 도망가 버튼


});////////////////////jQB////////////////