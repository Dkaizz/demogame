import { gameSettings } from '@/setting/gameSettings';
import { GameObject } from 'grid-engine/dist/src/GridCharacter/GridCharacter';
import { GameObjects, Geom, Physics, Scene, Types } from 'phaser';
import CharacterContainer from './characterContainer';
import { bulma } from '@/until/constChracter';

export default class ScenePlayGame extends Scene {
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  canvasWidth!: number;
  canvasHeight!: number;
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  isAttack: boolean = false;
  isJumb: boolean = false;
  isRun: boolean = false;
  players!: Physics.Arcade.Group;
  testContainer!: CharacterContainer;
  //   tes:Types.Physics.Arcade.cont

  constructor() {
    super('playGame');
  }
  create() {
    this.canvasWidth = Number(this.sys.game.config.width);
    this.canvasHeight = Number(this.sys.game.config.height);
    this.player = this.physics.add.sprite(this.canvasWidth / 2 - 8, this.canvasHeight / 2, 'knight');
    this.player.setSize(22, 32);

    this.testContainer = new CharacterContainer(this, 100, 100, bulma.player.name);

    this.testContainer.action.Stationary();

    var damageRect = new Geom.Rectangle(this.player.x + 50, this.player.y, 32, 50);
    var graphics = this.add.graphics();
    graphics.fillStyle(0xff0000, 0.5);
    graphics.fillRectShape(damageRect);
    // objectLayer.renderDebug(graphics);
    // Tạo vùng sát thương (circle)
    //  var damageCircle = new Phaser.Geom.Circle(x, y, radius);

    // Gán vùng sát thương cho player
    //  damageZone = damageRect; // hoặc damageZone = damageCircle;

    // Khởi tạo hệ thống vật lý
    //  this.physics.world.enable([this.player, damageRect]);
    this.player.anims.play('stationary');
    //map va chạm
    this.physics.world.setBoundsCollision();

    //người chơi va chạm với map
    this.player.setCollideWorldBounds(true);

    this.cursorKeys = this.input.keyboard?.createCursorKeys();
  }

  update(time: number, delta: number): void {
    this.attack();

    this.movePlayerManager();

    if (this.player.body.touching.down) {
      this.isJumb = false;
    }

    if (!this.player.anims.isPlaying) {
      this.isAttack = false;
      this.isJumb = false;

      this.player.anims.play('stationary', true);
    }
  }

  attack() {
    const xKey = this.input.keyboard?.addKey('x');
    const zKey = this.input.keyboard?.addKey('z');
    if (!this.isAttack)
      if (xKey?.isDown) {
        this.isAttack = true;

        const atk = this.player.anims.play('tancong1');
        console.log('atk');
      } else if (zKey?.isDown) {
        this.isAttack = true;

        const atk = this.player.anims.play('tancong2');
      }
  }

  movePlayerManager() {
    if (!!this.cursorKeys) {
      const seft = this;
      if (this.cursorKeys.left.isDown) {
        this.player.setVelocityX(-gameSettings.playerSpeed);
        this.player.flipX = true;
        !this.isAttack && !this.isJumb && this.player.anims.play('run', true);
        // this.isRun = true;
      } else if (this.cursorKeys.right.isDown) {
        this.player.setVelocityX(gameSettings.playerSpeed);
        // this.isRun = true;
        !this.isAttack && !this.isJumb && this.player.anims.play('run', true);
        this.player.flipX = false;
      }
      if (this.cursorKeys.up.isDown && !this.isJumb) {
        this.player.setVelocityY(-gameSettings.jumpPower);
        const jump = this.player.anims.play('jump', true);
        this.isJumb = true;
      } else if (this.cursorKeys.down.isDown) {
        this.player.setVelocityY(gameSettings.playerSpeed);
        this.player.anims.play('sit-down', true);
      }

      if (this.cursorKeys.left.isUp && this.cursorKeys.right.isUp) {
        this.player.setVelocityX(0);
        this.isRun = false;
      }
    }
  }
}
