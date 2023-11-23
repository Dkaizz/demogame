import { GameObjects } from 'phaser';
import ScenePlayGame from './ScenePlayGame';

export default class Explosion extends GameObjects.Sprite {
  constructor(scene: ScenePlayGame, x: number, y: number) {
    super(scene, x, y, 'explosion');
    scene.add.existing(this);
    this.play('explode');
  }
}
