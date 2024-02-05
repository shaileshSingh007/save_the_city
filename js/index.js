/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

$(document).ready(function() {
    
    const clicksound = document.getElementById("clicksound");
    let isSound = false;
    const fireburst = document.getElementById("burstsound");
    const lifeloose = document.getElementById("lifeloose");
    const gameover = document.getElementById("gameoversound");
    const bgsound = document.getElementById("bgsound");
    
  var playInt;
  var speedInt1;
  var speedInt2;
  var speedInt3;

   
  let wind_w = window.innerWidth;
  let wind_h = window.innerHeight;
  if(wind_h<wind_w){ $('#Mcontainer').css({'width':'30%'}); } else { $('#Mcontainer').css({'width':'100%'}); }
  
  // function to speed-Up
  function speedblock(){
   speedInt1 = setInterval(function(){
   const speedbY = $("#speedUp").position().top;
   const speedRN = Math.floor(Math.random() * 205);
          $("#speedUp").css({top:(speedbY+1)+"px"});
          if( $("#speedUp").position().top > $("#container").height()){
              clearInterval(speedInt1);
              $("#speedUp").css({top:-speedRN+"px",left:speedRN+"px"});}
    },1);
  }
// calling the speed block function
  
// end of speed Up block function

// function to speed-Down
function slowblock(){
  speedInt2 = setInterval(function(){
     const speedbY = $("#speedDown").position().top;
      $("#speedDown").css({top:(speedbY+1)+"px"});
      if( $("#speedDown").position().top > $("#container").height()){
        clearInterval(speedInt2);
        $("#speedDown").css({top:"-20px",left:"100px"});}
   },1);}
// calling the speed-slow block function

// end of speed-Down block function

// function to score-Up
function scoreblock(){
  speedInt3 = setInterval(function(){
    const scorebY = $("#scoreUp").position().top;
    $("#scoreUp").css({top:(scorebY+2.5)+"px"});
  if( $("#scoreUp").position().top > $("#container").height()){ clearInterval(speedInt3); $("#scoreUp").css({top:"-20px",left:"100px"});} },1);}
// calling the score-Up block function
 
// end of speed-Down block function



// saving game data to local storage
function savescores(gamescore, gamecity){
var HS = parseInt(localStorage.getItem('score'),0);
    if(HS<(gamescore*10)){
      localStorage.setItem('score', gamescore*10);
    }
    localStorage.setItem('cityCondition', gamecity);
}

// taking data from local storage
function getdata(){
    if (localStorage.getItem('score') === null) { localStorage.setItem('score', 0); }
    if (localStorage.getItem('cityCondition') === null) { localStorage.setItem('cityCondition', 100);}
    var highSCR = parseInt(localStorage.getItem('score'),0);
    var currCH = parseInt(localStorage.getItem('cityCondition'),0); 
    
    $("#SOC_HSN").text(highSCR);
    if(currCH<40){  $("#SOC_CH").css({"background":"green"}); }else if(currCH>40 && currCH<80){  $("#SOC_CH").css({"background":"blue"});
       }else if(currCH>80 && currCH<120){ $("#SOC_CH").css({"background":"yellow"});  }else if(currCH>120 && currCH<160){ $("#SOC_CH").css({"background":"orange"});
        }else if(currCH>160){ $("#SOC_CH").css({"background":"red"}); }   
}
// calling the saved data in local storage
setTimeout(function(){ getdata();},1);

  //collision with hero

  function collision(BX, BY, blockW, blockH, heroX, heroY, heroW, heroH) {
    if (
      heroY + heroH >= BY &&
      heroY <= BY + blockH &&
      heroX + heroW >= BX &&
      heroX <= BX + blockW
    ) { return true; }
  }

  function Heroblink(){  $("#MyHero").fadeOut(100);  setTimeout(function(){  $("#MyHero").fadeIn(100);  },100);  }

  function gifplay(b, c) {
    var gif = $("#burst");
    gif.attr("src", "./img/fireburst.gif");
    gif.css({ left: b + "px", top: c + "px" }).show();
    setTimeout(function () {
      gif.hide();
    }, 500);
  }
 
  //code for red block
  function Gplay(){
    var x = 1;
    var y = 0;
    var z = 0;
   bgsound.play({numberOfLoops: 999});
    playInt = setInterval(function () {
    //for red block 1
    let red1b = $("#red1");
    const red1P = red1b.position();
    const red1Y = red1P.top;
    const red1X = red1P.left;
    red1b.css({ top: red1Y + x + "px" });

    //code for red block2
    let red2b = $("#red2");
    const red2P = red2b.position();
    const red2Y = red2P.top;
    const red2X = red2P.left;
    red2b.css({ top: red2Y + x + "px" });

    //for black block 1
    let black1b = $("#black1");
    const black1P = black1b.position();
    const black1Y = black1P.top;
    const black1X = black1P.left;
    black1b.css({ top: black1Y + x + "px" });

    //for black block 2
    let black2b = $("#black2");
    const black2P = black2b.position();
    const black2Y = black2P.top;
    const black2X = black2P.left;
    black2b.css({ top: black2Y + x + "px" });

    //random length for both
    const red1rand = Math.floor(Math.random() * 205);
    const red2rand = Math.floor(Math.random() * 205);
    const black1rand = Math.floor(Math.random() * 205);
    const black2rand = Math.floor(Math.random() * 205);

    //random top for both
    const topR1 = Math.floor(Math.random() * 500);
    const topR2 = Math.floor(Math.random() * 500);
    const topB1 = Math.floor(Math.random() * 500);
    const topB2 = Math.floor(Math.random() * 500);

    //common details
    const blockH = red1b.height();
    const blockW = red1b.width();
    const contaH = $("#container").height() - 10;
    let heroX = $("#MyHero").position().left;
    let heroY = $("#MyHero").position().top;
    let heroH = $("#MyHero").height();
    let heroW = $("#MyHero").width();
    let LiveL = $("#Hlevel").height();
    
    let scoreL = $("#Slevel").height();
    
  // getting position of all power blocks
    const PB1Y = $("#speedUp").position().top;
    const PB1X = $("#speedUp").position().left;
    const PB2Y = $("#speedDown").position().top;
    const PB2X = $("#speedDown").position().left;
    const PB3Y = $("#scoreUp").position().top;
    const PB3X = $("#scoreUp").position().left;
    const powerW = $("#speedUp").width(); const powerH = $("#speedUp").height();

    // collision of power blocks with hero
    if (collision(PB1X, PB1Y, powerW, powerH, heroX, heroY, heroW, heroH)) {
      x=4;
      setTimeout(function(){ x=1; },10000); 
      clearInterval(speedInt1); 
      $("#speedUp").css({ left:"100px", top:"-100px" }); 
    }

    if (collision(PB2X, PB2Y, powerW, powerH, heroX, heroY, heroW, heroH)) {
      x=x-0.5;
      setTimeout(function(){x=x+0.5;},10000);
      clearInterval(speedInt2);
      $("#speedDown").css({ left:"100px", top:"-100px" }); 
    }

    if (collision(PB3X, PB3Y, powerW, powerH, heroX, heroY, heroW, heroH)) {
      z=z+10;
      $("#score").text(z*10);
      $("#Slevel").css({ height: scoreL + 1 + "px" });
      clearInterval(speedInt3); 
      $("#scoreUp").css({ left:"100px", top:"-100px" });
    }

    // increasing speed based on the score
    if(y===50){
      x = 1.5;
    } else if(y===100){
      x = 2;
    } else if(y===500){
      x = 2.5;
    } else if(y===800){
      x = 3;
    } else if(y===1500){
      x = 3.5;
    } 

    //collision control

    if (red1Y >= contaH) {
      red1b.css({ left: red1rand + "px", top: -topR1 + "px" });
      
      y++;
      
      
    }

    if (red2Y >= contaH) {
      red2b.css({ left: red2rand + "px", top: -topR2 + "px" });
     
      y++;
      
      
    }

    if (black1Y >= contaH) {
      black1b.css({ left: black1rand + "px", top: -topB1 + "px" });
      y++;
      gifplay(black1X, contaH);
     
      
    }

    if (black2Y >= contaH) {
      black2b.css({ left: black2rand + "px", top: -topB2 + "px" });
      y++;
      gifplay(black2X, contaH);
      
      
    }

    //collision with red1 & hero
    if (collision(red1X, red1Y, blockW, blockH, heroX, heroY, heroW, heroH)) {
      red1b.css({ left: red1rand + "px", top: -topR1 + "px" });
      lifeloose.play();
      y++;
      const blinkInt = setInterval(Heroblink,200);
      setTimeout(function(){clearInterval(blinkInt)},1000);
      //lifeloose.play();
      $("#Hlevel").css({ height: LiveL - 50 + "px" });
    }

    //collision with red2 & hero
    if (collision(red2X, red2Y, blockW, blockH, heroX, heroY, heroW, heroH)) {
      red2b.css({ left: red2rand + "px", top: -topR2 + "px" });
      lifeloose.play();
      y++;
      const blinkInt = setInterval(Heroblink,200); setTimeout(function(){clearInterval(blinkInt)},1000);
      $("#Hlevel").css({ height: LiveL - 50 + "px" });
      //lifeloose.play();
    }

    //collision with black1 & hero
    if (
      collision(black1X, black1Y, blockW, blockH, heroX, heroY, heroW, heroH)
    ) {
      black1b.css({ left: black1rand + "px", top: -topB1 + "px" });
      if(!isSound){ fireburst.play(); isSound = true; setTimeout(function(){ isSound=false; },1);}
      y++;
      gifplay(black1X, heroY);
      z++;
      $("#score").text(z*10);
      $("#Slevel").css({ height: scoreL + 0.1 + "px" });
      //fireburst.play();
    }

    //collision with black2 & hero
    if (
      collision(black2X, black2Y, blockW, blockH, heroX, heroY, heroW, heroH)
    ) {
      black2b.css({ left: black2rand + "px", top: -topB2 + "px" });
      if(!isSound){ fireburst.play(); isSound = true; setTimeout(function(){ isSound=false; },1);}
      y++;
      gifplay(black2X, heroY);
      z++;
      $("#score").text(z*10);
      $("#Slevel").css({ height: scoreL + 0.1 + "px" });
      //fireburst.play();
    }

  //  game over conditions
   
  if(LiveL <= 0){
    gameover.play();
    //bgsound.pause();
    $("#STC_GameOver").show();
    $("#STC_GO_HC").text(z*10);
    

    red1b.css({ left: red1rand + "px", top: -topR1 + "px" });
    red2b.css({ left: red2rand + "px", top: -topR2 + "px" });
    black1b.css({ left: black1rand + "px", top: -topB1 + "px" });
    black2b.css({ left: black2rand + "px", top: -topB2 + "px" });
    
    clearInterval(playInt);
    clearInterval(speedInt1);
    clearInterval(speedInt2);
    clearInterval(speedInt3);
    $("#speedDown").css({top:"-100px",left:"100px"});
    $("#speedUp").css({top:"-100px",left:"100px"});
    $("#scoreUp").css({top:"-100px",left:"100px"});

    x=1;
    y=0;
    $("#Hlevel").css({height:"100%"});
    $("#Slevel").css({height:"4px"});
    
    return;
  }

  }, 1);
}

$("#gameback").click(function(){
    clicksound.play();
    bgsound.pause();
    $("#mainpage").show();
    
  });


$("#SOC_start,#STC_GO_Play").click(function(){
  clicksound.play();
  $("#Playtimer").fadeIn(500);
  $("#score").text(0);
  $("#mainpage,#STC_GameOver").hide();
  setTimeout(function(){
    $("#Playtimer").fadeOut(500);
    Gplay();
  },3000);
  // calling powerblocks
  setInterval(function(){
    const speedRN1 = Math.floor(Math.random() * 205);
    $("#speedDown").css({top:-(speedRN1)+"px",left:(speedRN1)+"px"});
    slowblock();
  },35000);
  
    setInterval(function(){
    const speedRN0 = Math.floor(Math.random() * 205);
     $("#speedUp").css({top:-(speedRN0)+"px",left:(speedRN0)+"px"});
     speedblock(); },22000);

    setInterval(function(){
      const speedRN2 = Math.floor(Math.random() * 205);
      $("#scoreUp").css({top:-(speedRN2)+"px",left:(speedRN2)+"px"});
      scoreblock();
    },10000);
    // end of calling power blocks

});

$("#STC_exit").click(function(){
    $("#STC_GameOver").hide();
    clicksound.play();
    getdata();
    $("#mainpage").show();
    clearInterval(speedInt1);
    clearInterval(speedInt2);
    clearInterval(speedInt3);
    $("#speedDown").css({top:"-300px",left:"100px"});
    $("#speedDown").css({top:"-500px",left:"180px"});
    $("#speedDown").css({top:"-600px",left:"50px"});

  });




  $(function () {
    let lastX = 0;

    $("#dragaro").draggable({
      axis: "x",
      drag: function (event, ui) {
        const deltaX = ui.position.left - lastX;
        
        const hero = $("#MyHero");
        const heroLeft = parseInt(hero.css("left")) + deltaX;
        const container = $("#container");
        if (heroLeft >= 0 && heroLeft + hero.width() <= container.width()) {
          hero.css("left", heroLeft + "px");
          
        }
        lastX = ui.position.left;
      },
    });
  });
});
