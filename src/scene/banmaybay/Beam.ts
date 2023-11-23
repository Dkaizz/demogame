import { GameObjects } from 'phaser';
import ScenePlayGame from './ScenePlayGame';

export default class Beam extends GameObjects.Sprite {
  constructor(scene: ScenePlayGame) {
    var x = scene.player.x;
    var y = scene.player.y - 16;

    super(scene, x, y, 'beam');

    scene.add.existing(this);

    this.play('beam_anim');
    scene.physics.world.enableBody(this);
    const body = this.body;
    console.log('body:', body);
    if (this.body !== null && this.body !== undefined) {
      this.body.velocity.y = -250;
    }

    scene.projectiles.add(this);
  }

  update() {
    if (this.y < 32) {
      this.destroy();
    }
  }
}
