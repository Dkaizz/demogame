export interface character {
  player: {
    name: string;
  };
  img: { head: head; body: bodyfoot; foot: bodyfoot; action: action };
}

interface head {
  stationary: Array<number>;
  action: object;
}

interface bodyfoot {
  stationary: Array<number>;
  action: object;
}

interface action {
  punch: Array<number>;
}
export const bulma: character = {
  player: { name: 'bulma' },
  img: {
    head: { stationary: [5617], action: {} },
    body: {
      stationary: [5619],
      action: {},
    },
    foot: {
      stationary: [5635],
      action: {},
    },
    action: { punch: [] },
  },
};
