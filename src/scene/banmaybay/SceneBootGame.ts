import { Scene } from 'phaser';

export default class SceneBootGame extends Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('background', 'assets/banmaybay/images/background.png');
    //
    this.load.spritesheet('ship', 'assets/banmaybay/spritesheets/ship.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('ship2', 'assets/banmaybay/spritesheets/ship2.png', {
      frameWidth: 32,
      frameHeight: 16,
    });
    this.load.spritesheet('ship3', 'assets/banmaybay/spritesheets/ship3.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('explosion', 'assets/banmaybay/spritesheets/explosion.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('power-up', 'assets/banmaybay/spritesheets/power-up.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('player', 'assets/banmaybay/spritesheets/player.png', {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet('beam', 'assets/banmaybay/spritesheets/beam.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('knight', '/noBKG_KnightAttack_strip.png', {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.bitmapFont('pixelFont', 'assets/banmaybay/font/font.png', 'assets/banmaybay/font/font.xml');

    // 1.1 load sounds in both formats mp3 and ogg
    this.load.audio('audio_beam', ['assets/banmaybay/sounds/beam.ogg', 'assets/banmaybay/sounds/beam.mp3']);
    this.load.audio('audio_explosion', ['assets/banmaybay/sounds/explosion.ogg', 'assets/banmaybay/sounds/explosion.mp3']);
    this.load.audio('audio_pickup', ['assets/banmaybay/sounds/pickup.ogg', 'assets/banmaybay/sounds/pickup.mp3']);
    this.load.audio('music', ['assets/banmaybay/sounds/sci-fi_platformer12.ogg', 'assets/banmaybay/sounds/sci-fi_platformer12.mp3']);
    const self = this;

    this.load.on('complete', function () {
      console.log('Tải hình ảnh hoàn tất');

      // if (self.cache.tilemap.exists('testmap')) {
      //   console.log('Tilemap "testmap" đã được tải thành công');
      // } else {
      //   console.log('Tilemap "testmap" không thể tải');
      // }
      if (self.textures.exists('knight')) {
        console.log('Hình ảnh "knight" đã được tải thành công');
      } else {
        console.log('Hình ảnh "knight" không thể tải');
      }
    });
  }

  create() {
    this.add.text(20, 20, 'Loading game...');
    this.scene.start('playGame');

    this.anims.create({
      key: 'ship1_anim',
      frames: this.anims.generateFrameNumbers('ship'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'ship2_anim',
      frames: this.anims.generateFrameNumbers('ship2'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'ship3_anim',
      frames: this.anims.generateFrameNumbers('ship3'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });
    // POWER UPS

    //2.1 Two Animations for the power ups

    this.anims.create({
      key: 'red',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 0,
        end: 1,
      }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gray',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 2,
        end: 3,
      }),
      frameRate: 20,
      repeat: -1,
    });
    //end 2.1
    this.anims.create({
      key: 'thrust',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'knight',
      frames: this.anims.generateFrameNumbers('knight'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'beam_anim',
      frames: this.anims.generateFrameNumbers('beam'),
      frameRate: 20,
      repeat: -1,
    });
  }
}
