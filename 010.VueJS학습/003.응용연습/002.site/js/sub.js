// 보그코리아 서브페이지 JS - sub.js //

// 파라미터 받기 -> Get방식으로 데이터 받기 //////
let pm = location.href;
// location.href 를 이퀄 오른쪽에 쓰면 url을 읽어옴

// console.log("원본:"+pm);

/// 물음표로 넘어오는 파라미터 체크하기
// 왜 체크하나? 없으면 에러나니까!!!
// 무엇으로 체크하나? indexOf(문자열) -> 없으면 -1
// 원래 idexOf(문자열)은 찾는 문자열 우치 순번을 리턴함
if(pm.indexOf("?")=== -1){
    alert("비정상적인 접근입니다")
    location.href = "index.html";


}

// 파라미터값 가공하기 
// -> ?로 자르고 뒤엣것, =로 자르고 뒤엣것
pm = pm.split("?");
// console.log(pm);

pm = pm[1];
// console.log(pm);


pm = pm.split("=");
// console.log(pm);

pm = pm[1];
// console.log(pm);


$(function(){ /////////////////////// jqb ////////////////////////

    //////// VUE JS 데이터 바인딩 코드 /////////////////
    new Vue({
        el: "#cont", /// 바인딩 할 대상( 변경요소 포함 부모요소)
        data: {
            items: {},// json데이터 종류(빈배열형 셋팅)
            catName: pm 
        },
        mounted: function () {
            axios.get("./js/real.json").then(Response => (this.items = Response))
            //axios는 외부파일을 읽어올 수 있는 라이브러리
            // get() 메서드는 가져올 파일 경로를 셋팅함
            // then 메서드는  가져온 후 셋팅내용을 코딩함
            // 해석: 가져온 파일 내용을 response 변수로
            // 함수내부에 전달하여 이 값을 Vue JS에 셋팅된 this.items 
            // 즉, 현재변수 items에 집어넣어라!
            // ()=>{} 화살표 함수를 줄여쓴 것!
        },
        // mounted 속성은 "읽어들여진"의 뜨승로
        //오부파일을 가져와서 셋팅하는 기능!
        methods:{
            chgTit : function(tit){
                document.querySelector("title").innerText = tit + "  | 보그 코리아 (Vogue Korea)";
            }///////////chgTit 함수 ////////////
        }////////////// methods //////////////
    }); ///////////////Vue ////////////////

});//////jqb


 