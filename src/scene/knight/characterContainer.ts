import imgkey from '@/config/knight/imgkey';
import { bulma } from '@/until/constChracter';
import { GameObjects, Scene, Types } from 'phaser';

class CharacterContainer extends GameObjects.Container {
  spriteHead!: Types.Physics.Arcade.SpriteWithDynamicBody;
  spriteBody!: Types.Physics.Arcade.SpriteWithDynamicBody;
  spriteFoot!: Types.Physics.Arcade.SpriteWithDynamicBody;
  name: string = '';

  constructor(scene: Scene, x: number, y: number, name: string) {
    super(scene, x, y);
    scene.add.existing(this);

    // this.spriteBody.
    // Thêm các logic và đối tượng của container tại đây
    this.createCustomObjects(x, y, name);
  }
  createCustomObjects(x: number, y: number, name: string) {
    // Tạo các đối tượng con tùy chỉnh của container
    this.name = name;
    this.spriteBody = this.scene.physics.add.sprite(x, y, imgkey.bodyStationary + '0');
    this.spriteHead = this.scene.physics.add.sprite(x, y, imgkey.headStationary + '0');
    this.spriteFoot = this.scene.physics.add.sprite(x, y, imgkey.footStationary + '0');

    this.spriteHead.y -= this.spriteBody.height - (2 / 10) * this.spriteBody.height;
    this.spriteFoot.y += this.spriteBody.height - (4 / 10) * this.spriteBody.height;
    this.spriteFoot.x += (1 / 10) * this.spriteBody.width;

    this.spriteBody.setCollideWorldBounds(true);
    this.spriteHead.setCollideWorldBounds(true);
    this.spriteFoot.setCollideWorldBounds(true);

    this.add(this.spriteHead);
    this.add(this.spriteBody);
    this.add(this.spriteFoot);

    // spriteHead.anims.create
  }
  customMethod() {
    // Các logic tùy chỉnh ở đây
  }
  action = {
    Stationary: () => {
      this.spriteHead.anims.play(this.name + `HeadStationary`);
      this.spriteBody.anims.play(this.name + 'BodyStationary');
      this.spriteFoot.anims.play(this.name + 'FootStationary');
    },
  };
}

export default CharacterContainer;
