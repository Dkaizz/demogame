import { GameObjects, Input, Math as MathPhaser, Physics, Scene, Types } from 'phaser';
import Beam from './Beam';
import Explosion from './Explosion';

const gameSettings = {
  playerSpeed: 200,
  maxPowerups: 2,
  powerUpVel: 50,
};
export default class ScenePlayGame extends Scene {
  //   private background!: GameObjects.Image;
  private ship1!: GameObjects.Sprite;
  private ship2!: GameObjects.Sprite;
  private ship3!: GameObjects.Sprite;

  private background!: GameObjects.TileSprite;
  private powerUps!: Physics.Arcade.Group;

  private canvasWidth!: number;
  private canvasHeight!: number;
  player!: Types.Physics.Arcade.SpriteWithDynamicBody;
  knight!: Types.Physics.Arcade.SpriteWithDynamicBody;
  cursorKeys: Types.Input.Keyboard.CursorKeys | undefined;
  spacebar: Input.Keyboard.Key | undefined;
  projectiles!: GameObjects.Group;
  enemies!: Physics.Arcade.Group;
  score!: number;
  scoreLabel!: GameObjects.BitmapText;
  beamSound!: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  explosionSound!: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  pickupSound!: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  music!: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  constructor() {
    super('playGame');
  }

  create() {
    this.canvasWidth = Number(this.sys.game.config.width);
    this.canvasHeight = Number(this.sys.game.config.height);
    this.background = this.add.tileSprite(0, 0, this.canvasWidth, this.canvasHeight, 'background');
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.sprite(this.canvasWidth / 2 - 50, this.canvasHeight / 2, 'ship');
    this.ship2 = this.add.sprite(this.canvasWidth / 2, this.canvasHeight / 2, 'ship2');
    this.ship3 = this.add.sprite(this.canvasWidth / 2 + 50, this.canvasHeight / 2, 'ship3');

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    this.ship1.play('ship1_anim');
    this.ship2.play('ship2_anim');
    this.ship3.play('ship3_anim');

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this);

    // 3.1
    if (!!this.physics) {
      this.physics?.world.setBoundsCollision();

      this.powerUps = this.physics?.add.group();

      // 2.2 Add multiple objects
      for (var i = 0; i < gameSettings.maxPowerups; i++) {
        var powerUp = this.physics.add.sprite(16, 16, 'power-up');
        this.powerUps.add(powerUp);
        powerUp.setRandomPosition(0, 0, this.canvasWidth, this.canvasHeight);

        if (Math.random() > 0.5) {
          powerUp.play('red');
        } else {
          powerUp.play('gray');
        }

        powerUp.setVelocity(gameSettings.powerUpVel, gameSettings.powerUpVel);
        powerUp.setCollideWorldBounds(true);
        powerUp.setBounce(1);
      }
      //player
      this.player = this.physics.add.sprite(this.canvasWidth / 2 - 8, this.canvasHeight - 64, 'player');
      this.player.play('thrust');

      //cursorKeys player
      this.cursorKeys = this.input.keyboard?.createCursorKeys();

      //va chạm với map
      this.player.setCollideWorldBounds(true);

      //setup nút tân công
      this.spacebar = this.input.keyboard?.addKey(Input.Keyboard.KeyCodes.SPACE);

      this.projectiles = this.add.group();

      //va chạm vật thể
      this.physics.add.collider(this.projectiles, this.powerUps, function (projectile, powerUp) {
        projectile.destroy();
      });
      //hàm xử lý khi vật thể chồng chéo lên nhau
      this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, undefined, this);
      this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, undefined, this);
      this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, undefined, this);

      //điểm
      this.score = 0;
      var scoreFormated = this.zeroPad(this.score, 6);
      this.scoreLabel = this.add.bitmapText(10, 5, 'pixelFont', 'SCORE ' + scoreFormated, 16);

      // 1.2 create the sounds to be used
      this.beamSound = this.sound.add('audio_beam');
      this.explosionSound = this.sound.add('audio_explosion');
      this.pickupSound = this.sound.add('audio_pickup');

      // 2.1 create music
      this.music = this.sound.add('music');

      var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0,
      };

      this.music.play(musicConfig);
    }
  }

  zeroPad(number: number, size: number) {
    var stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = '0' + stringNumber;
    }
    return stringNumber;
  }
  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    this.background.tilePositionY -= 0.5;

    this.movePlayerManager();

    if (!!this.spacebar)
      if (Input.Keyboard.JustDown(this.spacebar)) {
        if (this.player.active) {
          this.shootBeam();
        }
      }
    //duyệt và update trạng thái của từng viên đạn
    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
      const beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }

  hurtPlayer: Types.Physics.Arcade.ArcadePhysicsCallback = (player, enemy): void => {
    const _player = player as Types.Physics.Arcade.SpriteWithDynamicBody;

    this.resetShipPos(enemy as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody);

    if (this.player.alpha < 1) {
      return;
    }

    var explosion = new Explosion(this, _player.x, _player.y);

    _player.disableBody(true, true);

    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false,
    });
  };

  resetPlayer() {
    var x = this.canvasWidth / 2 - 8;
    var y = this.canvasHeight + 64;
    this.player.enableBody(true, x, y, true, true);

    this.player.alpha = 0.5;

    const seft = this;
    var tween = this.tweens.add({
      targets: this.player,
      y: this.canvasHeight - 64,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete: function () {
        seft.player.alpha = 1;
      },
      callbackScope: this,
    });
  }

  hitEnemy: Types.Physics.Arcade.ArcadePhysicsCallback = (projectile, enemy): void => {
    const _enemy = enemy as Types.Physics.Arcade.SpriteWithDynamicBody;

    var explosion = new Explosion(this, _enemy.x, _enemy.y);

    projectile.destroy();
    this.resetShipPos(enemy as Types.Physics.Arcade.SpriteWithDynamicBody);
    this.score += 15;

    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = 'SCORE ' + scoreFormated;

    // 1.4 play sounds
    this.explosionSound.play();
  };

  pickPowerUp: Types.Physics.Arcade.ArcadePhysicsCallback = (_player, powerUp): void => {
    (powerUp as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody).disableBody(true, true);
    this.pickupSound.play();
  };

  shootBeam() {
    const beam = new Beam(this);
    // 1.3 play sounds
    this.beamSound.play();
  }
  movePlayerManager() {
    if (!!this.cursorKeys) {
      if (this.cursorKeys.left.isDown) {
        this.player.setVelocityX(-gameSettings.playerSpeed);
      } else if (this.cursorKeys.right.isDown) {
        this.player.setVelocityX(gameSettings.playerSpeed);
      }
      if (this.cursorKeys.up.isDown) {
        this.player.setVelocityY(-gameSettings.playerSpeed);
      } else if (this.cursorKeys.down.isDown) {
        this.player.setVelocityY(gameSettings.playerSpeed);
      }

      this.input.keyboard?.on('keyup', () => {
        this.player.setVelocity(0, 0);
      });
    }
  }

  moveShip(ship: GameObjects.Sprite, speed: number) {
    ship.y += speed;
    if (ship.y > this.canvasHeight) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship: GameObjects.Sprite) {
    ship.y = 0;
    var randomX = MathPhaser.Between(0, this.canvasWidth);
    ship.x = randomX;
  }

  destroyShip(pointer: Input.Pointer, gameObject: GameObjects.Sprite) {
    gameObject.setTexture('explosion');
    gameObject.play('explode');
  }
}
