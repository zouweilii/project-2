/**
 * Created by asus on 2019/10/10.
 */

    //自调用函数---游戏对象
(function () {
    //该变量的目的就是为了保存游戏Game的实例对象
    var that = null;

    //游戏的构造函数
    function Game(map) {
        this.food = new Food();//食物对象
        this.snake = new Snake();//小蛇对象
        this.map = map;//地图
        that = this;//保存当前的实例对象到that变量中----此时that就是this
    }

    //游戏初始化
    Game.prototype.init = function () {
        //食物初始化
        this.food.init(this.map);
        //小蛇初始化
        this.snake.init(this.map);

        //调用自动移动小蛇的方法========================||调用了小蛇自动移动的方法
        this.runSnake(this.food, this.map);
        this.bindKey();
    };

    //添加原型方法---设置小蛇可以自动的跑起来----跑出地图则游戏结束
    Game.prototype.runSnake = function (food, map) {

        //自动的去移动
        var timeId = setInterval(function () {
            //此时的this是window
            //移动小蛇
            this.snake.move(food, map);
            //初始化小蛇
            this.snake.init(map);
            var maxX = map.offsetWidth / this.snake.width;
            var maxY = map.offsetHeight / this.snake.height;
            var headx = this.snake.body[0].x;
            var heady = this.snake.body[0].y;
            if (headx < 0 || headx >= maxX) {
                clearInterval(timeId);
                alert("游戏结束")
            }
            ;
            if (heady < 0 || heady >= maxY) {
                clearInterval(timeId);
                alert("游戏结束")
            }
            ;
        }.bind(that), 150);
    };

    //添加原型方法---设置用户按键,改变小蛇移动的方向
    Game.prototype.bindKey = function () {
        //获取用户的按键,改变小蛇的方向
        //为document绑定按下事件
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = "left";
                    break;
                case 38:
                    this.snake.direction = "top";
                    break;
                case 39:
                    this.snake.direction = "right";
                    break;
                case 40:
                    this.snake.direction = "bottom";
                    break;
            }
            ;
        }.bind(that), false)
    };
    window.Game = Game;
}());