/*
一个food实例就是地图上一个ikunShit
food需要的特征：
	坐标
需要的行为：
	被吃了之后消失并且更换位置
*/
class Food {
	//map是食物出现的div
	constructor(map) {

		//绑定食物出现的div
		this.map = document.querySelector(map);

		//我们需要先知道map的大小，根据map的大小随机生成food的坐标,这里坐标单位是格子数,不是像素
		//记横向向右为x轴，竖向向下为y轴
		this.x = Math.floor((Math.random() * (this.map.clientWidth / 20) + 1));
		this.y = Math.floor((Math.random() * (this.map.clientHeight / 20) + 1));
		//创造food元素并完善相关属性
		this.food = document.createElement('div');
		//添加样式属性,food样式里设置了绝对定位,然后下面可以通过left属性和top属性设置food的位置
		this.food.className = "food";
		//设置food位置
		this.food.style.left = (this.x-1) * 20 + "px";
		this.food.style.top = (this.y -1)* 20 + "px";
		//把我们构造的food添加到map中
		this.map.appendChild(this.food);
	}
	//新生成一个食物：remove方法先清除（在dom结构中）原本的food，然后在重新设置x，y并生成新的dom元素food
	newFood() {
		this.food.remove();
		this.x = Math.floor((Math.random() * (this.map.clientWidth / 20) + 1));
		this.y = Math.floor((Math.random() * (this.map.clientHeight / 20) + 1));
		//创造food元素并完善相关属性
		this.food = document.createElement('div');
		//添加位置属性，map需要是一个定位元素，我们给food_div添加left和top相当于把食物放在了map的某个位置
		this.food.style.left = (this.x -1) * 20 + "px";
		this.food.style.top = (this.y -1)* 20 + "px";
		this.food.className = "food";
		//把我们构造的food添加到map中
		this.map.appendChild(this.food);
	}
}
