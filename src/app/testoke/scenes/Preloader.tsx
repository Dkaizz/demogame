import { Scene } from 'phaser';

export default class Preloader extends Scene {
  constructor() {
    super('preloader');
  }
  preload() {
    const self = this;
    this.load.image('entrance', '/entrance.png');
    const img = this.load.tilemapTiledJSON('testmap', '/mapEP.json');
    console.log('img: ', img);

    this.load.spritesheet('hero', '/character.png', {
      frameWidth: 30,
      frameHeight: 100,
    });

    this.load.on('complete', function () {
      console.log('Tải hình ảnh hoàn tất');

      if (self.cache.tilemap.exists('testmap')) {
        console.log('Tilemap "testmap" đã được tải thành công');
      } else {
        console.log('Tilemap "testmap" không thể tải');
      }
      if (self.textures.exists('entrance')) {
        console.log('Hình ảnh "entrance" đã được tải thành công');
      } else {
        console.log('Hình ảnh "entrance" không thể tải');
      }
    });
  }
  create() {
    this.scene.start('testscene');
  }
}
