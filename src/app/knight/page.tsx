'use client';

import ScenePlayGame from '@/scene/knight/ScenePlayGame';
import ScenePreLoad from '@/scene/knight/ScenePreLoad';
import { Game } from 'phaser';
import { useEffect } from 'react';

function GameKnight() {
  useEffect(() => {
    // effect
    const game = new Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game',
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 500 },
          debug: true,
        },
      },
      scene: [ScenePreLoad, ScenePlayGame],
    });
    return () => {
      // cleanup
      game.destroy(true);
    };
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div id="game"></div>
    </div>
  );
}

export default GameKnight;
