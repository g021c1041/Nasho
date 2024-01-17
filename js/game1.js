$(function(){
    //名前を設定
    var name1=localStorage.getItem("name1");
    var name2=localStorage.getItem("name2");
    $(".name1").text(name1);
    $(".name2").text(name2);
    //月を設定
    var date=localStorage.getItem("date");
    if(date==null){
        localStorage.setItem("date",4)
        window.location.reload();
    }else{
        $(".date-data").text(date);
    }
    //社員を設定
    var employee1=localStorage.getItem("employee1");
    var employee2=localStorage.getItem("employee2");
    var maxEmployee1=localStorage.getItem("maxEmployee1");
    var maxEmployee2=localStorage.getItem("maxEmployee2");
    var employee1Int=parseInt(employee1);
    var employee2Int=parseInt(employee2);
    var maxEmployee1Int=parseInt(maxEmployee1);
    var maxEmployee2Int=parseInt(maxEmployee2);
    if(employee1==null){
        localStorage.setItem("employee1",2);
        localStorage.setItem("employee2",2);
        localStorage.setItem("maxEmployee1",2);
        localStorage.setItem("maxEmployee2",2);
        window.location.reload();
    }else if(employee1==0&&employee2==0){
        turnChange();
    }else if(employee1==0){
        playerChange();
    }else if(maxEmployee1>=5){
        $(".work-button3").prop("disabled",true);
    }
    for(i=1;i<=employee1Int;i++){
        var a=".contents1 .employee"+i;
        $(a).text("●");
    }
    for(i=1;i<=employee2Int;i++){
        var a=".contents2 .employee"+i;
        $(a).text("●");
    }
    for(i=1;i<=maxEmployee1Int-employee1Int;i++){
        var a=".contents1 .employee"+(employee1Int+i);
        $(a).text("○");
        $(a).css("font-size","17px")
    }
    for(i=1;i<=maxEmployee2Int-employee2Int;i++){
        var a=".contents2 .employee"+(employee2Int+i);
        $(a).text("○");
        $(a).css("font-size","10px")
    }
    //手札を設定
    sessionStorage.removeItem("hidden-card");
    const handCard = localStorage.getItem("handCard1");
    const b=JSON.parse(handCard);
    $(b).each(function(index,cardData){
        var card=document.getElementsByClassName("card")[0];
        let clone_card=card.cloneNode(true);
        clone_card.id=index;
        if(cardData==0){
            clone_card.className="card"+cardData;
            $(clone_card).find(".cost").text(1);
            $(clone_card).find(".contents").text("鉄工所");
            $(clone_card).find(".value").text(8);
            $(clone_card).find(".p").text("あなたの労働者が鉱山にいればカードを2枚引く");
        }
        if(cardData==1){
            clone_card.className="card"+cardData;
            $(clone_card).find(".cost").text(1);
            $(clone_card).find(".contents").text("食堂");
            $(clone_card).find(".value").text(8);
            $(clone_card).find(".p").text("手札を捨てて家計から8円を得る");
        }
        if(cardData==2){
            clone_card.className="card"+cardData;
            $(clone_card).find(".cost").text(2);
            $(clone_card).find(".contents").text("菜園");
            $(clone_card).find(".value").text(10);
            $(clone_card).find(".p").text("消費財を2枚引く。勝利点トークンを得る");
        }
        if(cardData==3){
            clone_card.className="card"+cardData;
            $(clone_card).find(".cost").text(2);
            $(clone_card).find(".contents").text("食品工場");
            $(clone_card).find(".value").text(12);
            $(clone_card).find(".p").text("○を所有していれば建築コスト-1。手札を2枚捨てて4枚引く");
        }
        if(cardData==4){
            clone_card.className="card"+cardData;
            $(clone_card).find(".cost").text(3);
            $(clone_card).find(".contents").text("研究所");
            $(clone_card).find(".value").text(16);
            $(clone_card).find(".p").text("カードを2枚引く。勝利点トークンを得る");
        }
        if(cardData==5){
            clone_card.className="card"+cardData;
            $(clone_card).find(".cost").text(4);
            $(clone_card).find(".contents").text("造船所");
            $(clone_card).find(".value").text(20);
            $(clone_card).find(".p").text("手札を3枚捨てて6枚引く");
        }
        if(cardData==6){
            clone_card.className="card"+cardData;
            $(clone_card).find(".cost").text(5);
            $(clone_card).find(".contents").text("遊園地");
            $(clone_card).find(".value").text(24);
            $(clone_card).find(".p").text("手札を2枚捨てて家計から25円を得る");
        }
        if(cardData==7){
            clone_card.className="card"+cardData;
            $(clone_card).find(".cost").text(5);
            $(clone_card).find(".contents").text("工業団地");
            $(clone_card).find(".value").text(22);
            $(clone_card).find(".p").text("所有する○1つにつき建築コスト-1。カードを3枚引く");
        }
        if(cardData==8){
            clone_card.className="card"+cardData;
            $(clone_card).find(".cost").text(6);
            $(clone_card).find(".contents").text("石油コンビナート");
            $(clone_card).find(".value").text(28);
            $(clone_card).find(".p").text("カードを4枚引く");
        }
        $($(clone_card).find(".button")).hover(function(){
            show($(clone_card).find(".p"));
        },function(){
            hide($(clone_card).find(".p"));
        })
        var cloneButton=$(clone_card).find(".button");
        if(b.length-1<cloneButton.find(".cost").text()){
            const hiddenCard=sessionStorage.getItem("hidden-card");
            var a=JSON.parse(hiddenCard);
            let b=[];
            if(a){
                b=a;
            }
            b.push(clone_card.className);
            let c=JSON.stringify(b,undefined,1);
            sessionStorage.setItem("hidden-card",c);
        }
        $(cloneButton).click(function(){
            if($(".build-text1").is(":visible")){
                handCardCss()
                cloneButton.css("border","2px solid red");
                cloneButton.css("margin","0px")
                sessionStorage.setItem("card-cost",cloneButton.find(".cost").text());
                sessionStorage.setItem("stage-card",clone_card.id);
            }else if($(".build-text2").is(":visible")){
                if(cloneButton.css("margin-top")=="10px"){
                    cloneButton.css("border","2px solid blue");
                    cloneButton.css("margin","0px")
                    // var cost=sessionStorage.getItem("use-cost");
                    // if(cost==null){
                    //     cost=1;
                    // }else{
                    //     cost=parseInt(cost)+1;
                    // }
                    // sessionStorage.setItem("use-cost",cost);
                }else if(cloneButton.css("border")=="2px solid rgb(0, 0, 255)"){
                    // var cost=parseInt(sessionStorage.getItem("use-cost"));
                    // cost--;
                    // sessionStorage.setItem("use-cost",cost);
                    cloneButton.css("border","0px");
                    cloneButton.css("margin","10px");
                }
            }
        })
        card.after(clone_card);
        show(clone_card);
    })
    //不使用カード設定
    var disabled=localStorage.getItem("disabled");
    var c=JSON.parse(disabled);
    $(c).each(function(index,cardData){
        $(cardData).prop("disabled",true);
    })
    var card4=$(".work-button4").prop("disabled");
    if(handCard==null&&card4==false){
        $(".work-button4").prop("disabled",true);
    }
    //ステージカード設定
    var test=localStorage.getItem("stage-card1");
    var test2=JSON.parse(test);
    $(test2).each(function(index,data){
        var remove="#"+data+" button";
        var card=$(remove).get(0);
        var card_button=$(".stage-button");
        let clone_card=card.cloneNode(true);
        card_button.after(clone_card);
        show(clone_card);
        hide("#"+data);
    })
})
$(".clear").click(function(){
    localStorage.removeItem("handCard1");
    localStorage.removeItem("handCard2");
    localStorage.removeItem("employee1");
    localStorage.removeItem("employee2");
    localStorage.removeItem("maxEmployee1");
    localStorage.removeItem("maxEmployee2");
    localStorage.removeItem("date");
    localStorage.removeItem("disabled");
    localStorage.removeItem("startPlayer");
    localStorage.removeItem("stage-card1");
    window.location.reload();
})
$(".work-button button").hover(function(){
    var thisClass=$(this).attr("class");
    if(thisClass==="work-button1 button"){
        show(".button1-text");
    }else if(thisClass==="work-button2 button"){
        show(".button2-text");
    }else if(thisClass==="work-button3 button"){
        show(".button3-text");
    }else if(thisClass==="work-button4 button"){
        show(".button4-text");
    }
},function(){
    hide(".p");
})
$("button").click(function(){
    var thisClass=$(this).attr("class");
    if(thisClass==="work-button1 button"){
        if($(".use1").is(":visible")){
            hide(".use1");
        }else{
            hide(".use");
            show(".use1");
        }
    }else if(thisClass==="work-button2 button"){
        if($(".use2").is(":visible")){
            hide(".use2");
        }else{
            hide(".use");
            show(".use2");
        }
    }else if(thisClass==="work-button3 button"){
        if($(".use3").is(":visible")){
            hide(".use3");
        }else{
            hide(".use");
            show(".use3");
        }
    }else if(thisClass==="work-button4 button"){
        if($(".use4").is(":visible")){
            hide(".use4");
        }else{
            hide(".use");
            show(".use4");
        }
    }else if(thisClass==="cancel"){
        hide(".use");
    }else if(thisClass==="process1"){
        buttonDisabled(".work-button1");
        minusEmployee();
        DrawCard();
        localStorage.setItem("startPlayer",1);
        playerChange();
    }else if(thisClass==="process2"){
        minusEmployee();
        DrawCard();
        playerChange();
    }else if(thisClass==="process3"){
        buttonDisabled(".work-button3");
        minusEmployee();
        plusEmployee();
        playerChange();
    }else if(thisClass==="process4"){
        build();
    }
})
function show(num){
    $(num).show();
}function hide(num){
    $(num).hide();
}
function handCardCss(){
    $(".hand-card .button").css("border","0px");
    $(".hand-card .button").css("margin-top","10px");
}
function build(){
    $(".work-button .button").prop("disabled",true);
    sessionStorage.removeItem("card-cost");
    sessionStorage.removeItem("use-cost");
    var hidden=JSON.parse(sessionStorage.getItem("hidden-card"));
    $(hidden).each(function(index,cardData){
        var hiddenCard="."+cardData+" .button";
        $(hiddenCard).prop("disabled",true);
    })
    hide(".use");
    show(".build-text1");
    show(".build-button1");
    show(".build-button2");
    $(".build-button1").click(function(){
        if($(".build-text1").is(":visible")){
            window.location.reload();
        }else{
            $(hidden).each(function(index,cardData){
                var hiddenCard="."+cardData+" .button";
                $(hiddenCard).prop("disabled",true);
            })        
            sessionStorage.removeItem("card-cost");
            sessionStorage.removeItem("use-cost");
            handCardCss();
            hide(".build-text2");
            show(".build-text1");
            hide(".error");
        }
    })
    $(".build-button2").click(function(){
        var card_cost=sessionStorage.getItem("card-cost");
        var use_cost=sessionStorage.getItem("use-cost");
        if(card_cost!=null){
            if($(".build-text1").is(":visible")){
                $(".hand-card .button").prop("disabled",false)
                hide(".build-text1");
                show(".build-text2");
            }else{
                if(use_cost!=card_cost){
                    show(".error");
                }else{
                    var stage=sessionStorage.getItem("stage-card");
                    const stageCard=localStorage.getItem("stage-card1");
                    var a=JSON.parse(stageCard);
                    let b=[];
                    if(a){
                        b=a;
                    }
                    b.push(stage);
                    let c=JSON.stringify(b,undefined,1);
                    localStorage.setItem("stage-card1",c);  
                    window.location.reload();
                }
            }
        }
    })
}
function buttonDisabled(num){
    const disabled=localStorage.getItem("disabled");
    var a=JSON.parse(disabled);
    let b=[];
    if(a){
        b=a;
    }
    b.push(num);
    let c=JSON.stringify(b,undefined,1);
    localStorage.setItem("disabled",c);
    window.location.reload();
}
function turnChange(){
    var firstPlayer=localStorage.getItem("startPlayer");
    var maxEmployee1=localStorage.getItem("maxEmployee1");
    var maxEmployee2=localStorage.getItem("maxEmployee2");
    localStorage.setItem("employee1",maxEmployee1);
    localStorage.setItem("employee2",maxEmployee2);
    localStorage.removeItem("disabled");
    if(firstPlayer==2){
        playerChange();
    }else{
        var a=parseInt(localStorage.getItem("date"))+1;
        localStorage.setItem("date",a);
        window.location.reload();
    }
}
function minusEmployee(){
    var employeeValue=localStorage.getItem("employee1");
    var employee=parseInt(employeeValue)-1;
    localStorage.setItem("employee1",employee);
    window.location.reload();
}
function plusEmployee(){
    var employeeValue=localStorage.getItem("maxEmployee1");
    var employee=parseInt(employeeValue)+1;
    localStorage.setItem("maxEmployee1",employee);
    window.location.reload();
}
function DrawCard(){
    const handCard=localStorage.getItem("handCard1");
    let a=[];
    if(handCard){
        a=JSON.parse(handCard);
    }
    var random=Math.floor(Math.random()*9);
    a.push(random);
    localStorage.setItem("handCard1",JSON.stringify(a));
    window.location.reload();
}
function playerChange(){
    window.location.href="./game2.html";
}