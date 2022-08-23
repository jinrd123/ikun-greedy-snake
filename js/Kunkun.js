/*kunkun需要的特征：
	坤坤用一个数组存储，数组每项为一个dom元素，数组的首项存放坤头，坤头和身体的区别在于className不同，则样子不同
	Kunkun的运动方向
kun需要的行为：
	初始化时需要构造一个kun，用createKun函数(就是连续调用createBody函数)
	移动
	吃屎
	死亡
	改变运动方向
*/


class Kunkun {
	constructor(map) {
		//map绑定坤坤出没的篮球场
		this.map = document.querySelector(map);
		//创建kunkun_body数组,存放kun的身体组成，方便构造kun以及增长时获取dom元素
		this.kunkun_body = [];
		//kunkun的运球方向
		this.direction = 'right';
		this.createKun();
	}
	createKun() {
		for (let i = 0; i < 3; i++) {
			this.createBody();
		}
	}
	createBody() {
		//newItem保存新创建的dom的位置信息
		let newItem = {
			x: 100,
			y: 100
		};
		const head = this.kunkun_body[0];
		//如果kunkun有头，在行进方向的正前方创建一个dom，追加在数组的首项，且把以前的坤头变成篮球，把新dom变成kun头
		if (head) {
			//根据行进方向确定新头的生成位置
			switch (this.direction) {
				case 'right':
					//这里的x和y存放的就是像素值
					newItem.x = head.offsetLeft + 20;
					newItem.y = head.offsetTop;
					break;
				case 'left':
					newItem.x = head.offsetLeft - 20;
					newItem.y = head.offsetTop;
					break;
				case 'top':
					newItem.x = head.offsetLeft;
					newItem.y = head.offsetTop - 20;
					break;
				case 'bottom':
					newItem.x = head.offsetLeft;
					newItem.y = head.offsetTop + 20;
					break;
				default:
					break;
			};
			//把原来的头改成身体
			head.className = "body";
		}
		//创建坤头
		const div = document.createElement("div");
		div.className = "head";
		div.style.left = newItem.x + 'px';
		div.style.top = newItem.y + 'px';
		//新dom放进数组与map中（放进数组进行记录方便以后操作，放进map进行展示）
		this.kunkun_body.unshift(div);
		this.map.appendChild(div);
	}
	//坤坤移动:利用createBody函数，createBody就是增加了一个坤头，我们只需要在createBody的基础上删除数组最后一个元素即可
	move() {
		const body = this.kunkun_body.pop();
		//remove方法：清除调用此方法的dom元素
		body.remove();
		this.createBody();
	}
	isEat(foodX, foodY) {
		const head = this.kunkun_body[0];
		//offset属性获得相对于父元素（map）的位置
		const headX = head.offsetLeft;
		const headY = head.offsetTop;
		if (foodX === headX && foodY === headY) {
			return true;
		}
		return false;
	}
	isDie() {
		//判断kun头有没有到边界
		const head = this.kunkun_body[0];
		const headX = head.offsetLeft;
		const headY = head.offsetTop;
		if (headX < 0 || headY < 0 || headX >= this.map.clientWidth || headY >= this.map.clientHeight) {
			return true;
		}
		return false;
	}
	//改变kunkun运动方向
	change(direction) {
		this.direction = direction;
	}
	//Kunkun吃屎长大函数:创建一个最后一个元素的拷贝放到数组最后，下一次调用移动函数时清除最后一个元素就会清除这个元素，相当于替死元素
	grow() {
		const div = document.createElement("div");
		div.className = 'body';
		//以下两句bug：修改div位置总是在添加div元素到map之后才生效，所以总是在左上角生成一个篮球
		div.style.left = this.kunkun_body[this.kunkun_body.length - 1].offsetLeft;
		div.style.top = this.kunkun_body[this.kunkun_body.length - 1].offsetTop;
		console.log(div);
		this.kunkun_body.push(div);
		this.map.appendChild(div);
	}
}
