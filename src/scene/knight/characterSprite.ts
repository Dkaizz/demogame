import spriteKey from '@/config/knight/spriteKey';
import { character } from '@/until/constChracter';
import { GameObjects, Scene } from 'phaser';

export default class CharacterSprite extends GameObjects.Sprite {
  constructor(scene: Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
    super(scene, x, y, texture, frame);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    this.setOrigin(0.5, 0.5);
  }

  preload() {}

  create() {}
}
