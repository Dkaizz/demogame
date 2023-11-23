import imgkey from '@/config/knight/imgkey';
import { bulma } from '@/until/constChracter';
import { Scene } from 'phaser';

export default class ScenePreLoad extends Scene {
  constructor() {
    super('preload');
  }
  preload() {
    // this.load.image('knight', '/Knight/120x80_gifs/__Run.gif');
    this.load.spritesheet('knight', '/adventurer-Sheet.png', {
      frameWidth: 50,
      frameHeight: 37,
    });

    bulma.img.head.stationary.forEach((item, index) => {
      this.load.image(imgkey.headStationary + index, `/nro/icon/x3/${item}.png`);
    });
    bulma.img.body.stationary.forEach((item, index) => {
      this.load.image(imgkey.bodyStationary + index, `/nro/icon/x3/${item}.png`);
    });
    bulma.img.foot.stationary.forEach((item, index) => {
      this.load.image(imgkey.footStationary + index, `/nro/icon/x3/${item}.png`);
    });
  }

  create() {
    this.anims.create({
      key: `HeadStationary`,
      frames: bulma.img.head.stationary.map((item, index) => {
        return { key: imgkey.headStationary + index, frame: index };
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${bulma.player.name}BodyStationary`,
      frames: bulma.img.body.stationary.map((item, index) => {
        return { key: imgkey.bodyStationary + index, frame: index };
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${bulma.player.name}FootStationary`,
      frames: bulma.img.foot.stationary.map((item, index) => {
        return { key: imgkey.footStationary + index, frame: index };
      }),
      frameRate: 10,
      repeat: -1,
    });

    //test
    this.anims.create({
      key: `${bulma.player.name}HeadStationary`,
      frames: bulma.img.head.stationary.map((item, index) => {
        return { key: imgkey.headStationary + index, frame: 0 };
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'stationary',
      frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'sit-down',
      frames: this.anims.generateFrameNumbers('knight', { start: 4, end: 7 }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('knight', { start: 8, end: 13 }),
      frameRate: 20,
    });
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('knight', { start: 14, end: 23 }),
      frameRate: 40,
      repeat: 2,
    });
    this.anims.create({
      key: 'xoai',
      frames: this.anims.generateFrameNumbers('knight', { start: 24, end: 28 }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'tancong1',
      frames: this.anims.generateFrameNumbers('knight', { start: 41, end: 52 }),
      frameRate: 30,
    });
    this.anims.create({
      key: 'tancong2',
      frames: this.anims.generateFrameNumbers('knight', { start: 53, end: 58 }),
      frameRate: 30,
    });
    this.scene.start('playGame');
  }
}
