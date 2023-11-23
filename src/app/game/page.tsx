'use client';

import Demo from '@/scene/Demo';
import { Game as GameType } from 'phaser';

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#0000',
  width: 800,
  height: 600,
  scene: Demo,
  parent: 'game-content',
};

const game = new GameType(config);

function Game() {
  return (
    <div className="min-h-screen">
      Ok
      <div className="h-1/2" id="game-content"></div>
    </div>
  );
}

export default Game;
