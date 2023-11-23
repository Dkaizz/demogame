'use client';

import { Game as GameType } from 'phaser';
import { useState, useEffect } from 'react';

function Game() {
  const isDevelopment = true;
  const [game, setGame] = useState(Object);
  const dialogMessages = useState([]);
  const menuItems = useState([]);
  const gameTexts = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // effect
    async function initPhaser() {
      const Phaser = await import('phaser');
      const { default: GridEngine } = await import('grid-engine');

      const { default: Preloader } = await import('./scenes/Preloader');
      const { default: TestScene } = await import('./scenes/TestScene');
      const phaserGame = new Phaser.Game({
        type: Phaser.WEBGL,
        title: 'demo',
        parent: 'game-content',
        width: 600,
        height: 300,
        pixelArt: true,
        scale: {
          zoom: 1,
        },
        scene: [Preloader, TestScene],
        physics: {
          default: 'arcade',
          arcade: {
            debug: isDevelopment,
          },
        },
        plugins: {
          scene: [
            {
              key: 'gridEngine',
              plugin: GridEngine,
              mapping: 'gridEngine',
            },
          ],
        },
        backgroundColor: '#000',
      });

      setGame(phaserGame);
    }
    initPhaser();
    return () => {
      // cleanup
    };
  }, []);
  return (
    <div className="min-h-screen">
      <div id="game-content"></div>
    </div>
  );
}

export default Game;
