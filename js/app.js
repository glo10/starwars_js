(function() {
  $(document).ready(function() {
    const game$ = $('#game')
    const ship$ = $('#ship');
    const lifeDOM = $('#life');
    const scoreDOM = $('#score');
    const levelDOM = $('#level');
    let asteroids$ = $('.asteroid');
    let bullets$ = $('.bullet');

    let configGame = {
      postionY : 2,
      width : 500,
      height : 400
    };

    let configShip = {
      life:3,
      score:0,
      level:1,
      speed:10,
      shift:20,
      width:50,
      height:50,
      bulletWidth:8,
      bulletHeight:8,
      positionXinit:425
    };

    let configAsteroid = {
      speed:5,
      width:30,
      height:30
    };

    levelDOM.text('Niveau : ' + configShip.level);
    scoreDOM.text('Score : ' + configShip.score);
    animBg();
    generateAsteroid();

    $('button').on('click', function() {
      location.reload();
    });

    $(document).on('keyup', function(e) {
      if (e.key == 'ArrowRight') {

        ship$.css('left','+=' + configShip.shift);

      }

      if (e.key == 'ArrowLeft') {

        ship$.css('left','-=' + configShip.shift)

      }
      if (e.key == ' ') {
        generateBullet();
      }

    })

    function animBg() {
      setInterval(() => {
        game$.css({
          'background-position-y': '+=' + configGame.postionY
        });

        asteroids$.css('top','+=' + configAsteroid.speed);

        bullets$.css('top','-=' + configShip.speed);

        asteroids$.each(function() {
          let ast = $(this);
          let asteroidY = $(this).offset().top;
          let asteroidX = $(this).offset().left;
          if (asteroidY > 425) {
            let shipX = ship$.offset().left;
            if ((asteroidX + 40 >= shipX) && (asteroidX <= shipX + 50)) {
              $(this).css('background-image', 'url("../img/fire.png');
              $(this).remove();

              configShip.life--;
            }
          }
          if (asteroidY > 500) {
            $(this).remove();
          }

          bullets$.each(function() {
            let shoot = $(this);
            let shootY = shoot.offset().top;
            let shootX = shoot.offset().left;

            if(shootY <= 0)
              shoot.remove();

            let contactX = ((asteroidX + 40) >= shootX) && (asteroidX <= (shootX + 8));
            let contactY = ((asteroidY + 40) >= shootY) && (asteroidY <= (shootY + 8));

            if (contactX && contactY) {
              ast.remove();
              shoot.remove();
              scoreDOM.text(showScore(++configShip.score));
            }
          });
          bullets$ = $('.bullet');
        });

        showLife();
      }, 1000 / 60)
    }

    function generateAsteroid() {

      setInterval(() => {

        let style = 'left:' + getRandomValue() + 'px';

        game$.append('<div class="asteroid" style="' + style + '"></div>')

        asteroids$ = $('.asteroid');
      }, 5 * 1000)
    }

    function getRandomValue() {

      return Math.floor(Math.random() * configGame.height - configAsteroid.width);

    }

    function showLife() {
      lifeDOM.empty();
      if (configShip.life == 0) {
        game$.html('<h1 class="text-danger">GAME OVER</h1><button class="btn btn-primary">Rejouer</button>');
      } else {
        for (let i = 0; i < configShip.life; i++)
          lifeDOM.append('<span class="text-success glyphicon glyphicon-heart"></span>');
      }
    }

    function generateBullet() {
      let shipX = ship$.offset().left;
      let shipY = ship$.offset().top;
      let style = `top:${shipY}px;left:${shipX + 21}px;`

      game$.append('<div class="bullet" style="' + style + '"></div>');
      //bullets$ = $('.bullet');
    }

    function showScore(val){
      let content = 'Score : ';
      switch(val){
        case 10 :
          configShip.level = 2;
        break;
        case 20 :
          content += val + ' Bien joué';
          configShip.level = 3;
        break;
        case 30 :
          content += val + ' Tu es très fort';
          configShip.level = 4;
        break;
        case 40 :
          content += val + ' Tu es au niveau de Glodie';
          configShip.level = 5;
        break;
        default :
          content += val;
        break;
      }
      return content;
    }
  })
})()
