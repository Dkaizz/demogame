import { Scene } from 'phaser';

export default class TestScene extends Scene {
  private gridEngine!: any;

  constructor() {
    super('testscene');
  }

  preload() {}

  create() {
    const map = this.make.tilemap({ key: 'testmap', height: 300, width: 600 });
    const tileset = map.addTilesetImage('entrance', 'entrance');
    console.log('tileset: ', tileset);
    map.layers.forEach((layer, index) => {
      console.log('layer: ', layer);
      map.createLayer(index, 'entrance', 0, 0);
    });
    const heroSprite = this.physics.add.sprite(0, 0, 'hero');
    this.cameras.main.startFollow(heroSprite, true);
    this.cameras.main.setFollowOffset(-heroSprite.width, -heroSprite.height);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); // Đặt giới hạn của camera
    const canvasWidth: any = Number(this.sys.game.config.width);
    const canvasHeight: any = Number(this.sys.game.config.height);

    const zoomX: any = Number(canvasWidth / map.widthInPixels) * 1.5;
    const zoomY = (canvasHeight / map.heightInPixels) * 1.5;

    this.cameras.main.setZoom(Math.min(zoomX, zoomY));
    const gridEngineConfig = {
      characters: [
        {
          id: 'hero',
          sprite: heroSprite,
          startPosition: { x: 0, y: 0 },
        },
      ],
    };
    this.gridEngine.create(map, gridEngineConfig);
  }
  update() {
    const cursors = this.input.keyboard?.createCursorKeys();
    if (cursors?.left.isDown) {
      this.gridEngine.move('hero', 'left');
    } else if (cursors?.right.isDown) {
      this.gridEngine.move('hero', 'right');
    } else if (cursors?.up.isDown) {
      this.gridEngine.move('hero', 'up');
    } else if (cursors?.down.isDown) {
      this.gridEngine.move('hero', 'down');
    }
  }
}
