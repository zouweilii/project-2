/**
 * Created by asus on 2019/10/10.
 */
    //自调用函数----食物的
(function () {
    //用来保存每个小方块食物的
    var elements = [];
    //食物就是一个对象,有宽,有高,有颜色,有横纵坐标,先定义构造函数,然后创建对象
    //食物构造函数
    function Food(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";
    }

    //食物动作 初始化----即 方法
    Food.prototype.init = function (map) {

        //先删除这个小食物
        //外部无法访问的函数----只能自己删除
        remove();

        //先创建食物元素
        var div = document.createElement("div");
        //将食物加到地图中
        map.appendChild(div);
        //为食物添加样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        div.style.position = "absolute";
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";

        //把div加入到数组elements中
        elements.push(div);
    }


    //私有的函数---删除食物的
    function remove() {
        //elements数组中有这个食物
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            //找到这个子元素的父级元素,然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //再次把elements中的这个子元素也要删除
            elements.splice(i, 1);//从索引为 i 的地方开始删除 1 个元素
        }
    }

    //把Food暴露给Window,外部可以使用
    window.Food = Food;
}());