import Phaser, { Geom } from "phaser";
let blockWidth = 100; // 블록 가로 크기
let blockHeight = 100; // 블록 세로 크기
let ground: Phaser.Physics.Arcade.Image;
let groundY = 1500;
let direction = 1;
let spaceresult = true;
let currentBlock: Phaser.Physics.Arcade.Image; // 현재 블록
let blockStack: Phaser.Physics.Arcade.Group; // 블록 스택 (쌓인 블록들)

export default class SugerScene extends Phaser.Scene {
  constructor() {
    super({
      key: "PhysicsScene",
      active: true,
      physics: {
        arcade: {
          gravity: {
            y: 0,
          },
          debug: true,
        },
      },
    });
  }
  preload = () => {
    // this.load.image("block", "path/to/block.png");
  };
  create = () => {
    blockStack = this.physics.add.group();
    this.createNewBlock(400);
    ground = this.physics.add.image(500, groundY, "block");
    ground.setScale(25, 3);
    ground.setImmovable(); // 바닥은 움직이지 않도록 설정
  };
  update = () => {
    if (spaceresult) {
      currentBlock.x += 2 * direction;
      if (currentBlock.x >= 780) {
        direction = -1;
      } else if (currentBlock.x <= 200) {
        direction = 1;
      }
    }
    this.physics.world.collide(currentBlock, ground, () => {
      currentBlock.setVelocity(0, 0);
      // Add the current block to the stack
      blockStack.add(currentBlock);
      // Create a new block and check if the game should end
      this.createNewBlock(currentBlock.x);
      this.checkGameEnd();
    });
    this.physics.world.collide(currentBlock, blockStack, () => {
      currentBlock.setVelocity(0, 0);
      blockStack.setVelocity(0, 0);
      // Add the current block to the stack
      blockStack.add(currentBlock);
      // Create a new block and check if the game should end
      this.createNewBlock(currentBlock.x);
      this.checkGameEnd();
    });
    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey("SPACE"))) {
      spaceresult = false;
      currentBlock.setVelocityY(2000);
    }
  };
  checkGameEnd = () => {
    const topBlock = blockStack.getFirst(true); // Get the topmost block
    console.log(topBlock);
    const distanceX = Math.abs(currentBlock.x - topBlock.x);
    // Check if the distance between the current block and the top block is too great on the x-axis
    if (distanceX > blockWidth / 2) {
      // Game over logic here (e.g., console.log("Game Over") or other actions)
      console.log("Game Over");
      // You can reset the game or perform other actions as needed.
      this.scene.restart();
    }
  };
  createNewBlock = (x: number) => {
    currentBlock = this.physics.add.image(x, 300, "block");
    currentBlock.setScale(
      blockWidth / currentBlock.width,
      blockHeight / currentBlock.height
    );
    currentBlock.setCollideWorldBounds(true);
    spaceresult = true;
  };
}