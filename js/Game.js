//游戏类，说白了就是运用Food类和Kunkun类实例的行为，完成游戏数据更新以及开始结束等逻辑
//核心逻辑就是：游戏开始之后用setInterval把游戏分解为一帧一帧的情景，静态的考察每一帧的情况，每一帧开始时先让kun进行移动，然后逻辑判断现在是否吃食或者死亡或者正常行进，准备进行下一帧
class Game {
	constructor(select) {
		//绑定游戏进行的div
		this.map = document.querySelector(select);
		//创建本次游戏的kun和shit
		this.food = new Food(select);
		this.kunkun = new Kunkun(select);
		//保存游戏计时器，清除计时器可以做到游戏结束
		this.timer = 0;
		//游戏分数
		this.score = 0;
	}
	start() {
		//吃到食物时的音效
		let audio = document.querySelector("audio");
		//开启计时器，即为开始逐帧进行游戏
		this.timer = setInterval(() => {
			//每一帧的开始，kun先移动
			this.kunkun.move();
			//移动完判断是不是吃屎了
			//food里的x和y是指第几个格子，需要转化为像素
			if (this.kunkun.isEat((this.food.x-1)*20, (this.food.y-1)*20)) {
				//吃屎则长大
				this.kunkun.grow();
				//更新食物
				this.food.newFood();
				//增加分数
				this.score += 0.05;
				//播放音乐
				audio.play();
				audio.currentTime = 0;
			//判断是否撞墙死亡	
			} else if (this.kunkun.isDie()) {
				//游戏结束
				this.gameOver();
			}
		}, 500);
	}
	gameOver() {
		clearInterval(this.timer);
	}
}
