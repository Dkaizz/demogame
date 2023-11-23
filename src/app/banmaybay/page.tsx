'use client';

import SceneBootGame from '@/scene/banmaybay/SceneBootGame';
import ScenePlayGame from '@/scene/banmaybay/ScenePlayGame';
import { Game } from 'phaser';
import { useEffect, useState } from 'react';

function GameBanMayBay() {
  const [gameStart, setGameStart] = useState<Game>();
  useEffect(() => {
    // effect
    async function initGame() {
      console.log('mở game');
      const game = new Game({
        width: 256,
        height: 272,
        backgroundColor: 0x000000,
        parent: 'game',
        scene: [SceneBootGame, ScenePlayGame],
        pixelArt: true,
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
            debugShowVelocity: false,
          },
        },
      });
      setGameStart(game);
    }
    initGame();
    return () => {
      // cleanup
      gameStart?.destroy(true);
    };
  }, []);
  return <div className="flex justify-center items-center" id="game"></div>;
}

export default GameBanMayBay;
