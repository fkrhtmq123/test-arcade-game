import Phaser, { Geom } from "phaser";
let blockWidth = 100; // 블록 가로 크기
let blockHeight = 100; // 블록 세로 크기
let ground: Phaser.Physics.Arcade.Image;
let direction = 1;
let spaceresult = true;
let currentBlock: Phaser.Physics.Arcade.Image; // 현재 블록
let blockStack: Phaser.Physics.Arcade.Group; // 블록 스택 (쌓인 블록들)
export default class PhysicsScene extends Phaser.Scene {
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
    this.load.image("ground", "/img/block.png");
    this.load.image("block", "/img/square.png");
  };
  create = () => {
    blockStack = this.physics.add.group({});
    ground = this.physics.add.image(500, 1850, "ground");
    ground.setScale(25, 3);
    ground.setImmovable();
    this.createNewBlock(400);
  };
  update = () => {
    if (spaceresult) {
      currentBlock.x += 10 * direction;
      if (currentBlock.x >= 780) {
        direction = -1;
      } else if (currentBlock.x <= 200) {
        direction = 1;
      }
    }
    const blocks = blockStack.getChildren();
    const topBlock: any = blocks.length > 0 ? blocks[blocks.length - 1] : null;
    const secondBlock: any =
      blocks.length > 0 ? blocks[blocks.length - 2] : null;
    blockStack.getChildren().forEach((block) => {
      block.body.setAllowGravity(block === topBlock);
    });
    this.physics.world.collide(currentBlock, ground, () => {
      currentBlock.setVelocity(0, 0);
      if (topBlock) {
        topBlock.setImmovable(false);
      }
      if (secondBlock) {
        secondBlock.setImmovable(false);
      }
      if (this.checkCollapse(currentBlock, topBlock)) {
        this.blockFallMotion(currentBlock);
      } else {
        blockStack.add(currentBlock);
        this.createNewBlock(currentBlock.x);
      }
    });
    this.physics.world.collide(currentBlock, blockStack, () => {
      currentBlock.setVelocity(0, 0);
      blockStack.setVelocity(0, 0);
      if (topBlock) {
        topBlock.setImmovable(false);
      }
      if (secondBlock) {
        secondBlock.setImmovable(false);
      }
      if (this.checkCollapse(currentBlock, topBlock)) {
        this.blockFallMotion(currentBlock);
      } else {
        blockStack.add(currentBlock);
        this.createNewBlock(currentBlock.x);
      }
    });
    // if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey("SPACE"))) {
    //   spaceresult = false;
    //   currentBlock.setVelocityY(1000);
    // }
    this.input.on("pointerdown", () => {
      spaceresult = false;
      currentBlock.setVelocityY(1000);
    });
  };
  blockFallMotion = (block: any) => {
    const fallDistance = 100; // 원하는 떨어지는 거리
    this.tweens.add({
      targets: block,
      y: block.y + fallDistance, // Y 좌표를 아래로 이동
      duration: 200, // 애니메이션의 지속 시간 (밀리초)
      ease: "Linear", // 애니메이션 이징 설정
      onComplete: () => {
        this.time.delayedCall(2000, () => {
          this.scene.restart();
        });
      },
    });
  };
  checkCollapse = (currentBlock: any, topBlock: any) => {
    if (topBlock) {
      const distanceX = Math.abs(currentBlock.x - topBlock.x);
      if (distanceX > blockWidth / 2) {
        return true;
      }
    }
    return false; // 맨 위에 블록이 없으면 무너지지 않음
  };
  createNewBlock = (x: number) => {
    const newBlockY = this.cameras.main.scrollY + 1000;
    currentBlock = this.physics.add.image(x, newBlockY, "block");
    currentBlock.setScale(
      blockWidth / currentBlock.width,
      blockHeight / currentBlock.height
    );
    currentBlock.setCollideWorldBounds(false);
    currentBlock.setImmovable(false);
    spaceresult = true;
    this.cameras.main.scrollY -= blockHeight / 2;
    console.log(this.cameras.main.scrollY);
    console.log(this.cameras.main.scrollY + 1000);
    this.physics.world.collide(currentBlock, ground, () => {
      currentBlock.setVelocity(0, 0);
      currentBlock.y = ground.y - blockHeight / 2 - this.cameras.main.scrollY;
      blockStack.add(currentBlock);
      this.createNewBlock(currentBlock.x);
    });
  };
}