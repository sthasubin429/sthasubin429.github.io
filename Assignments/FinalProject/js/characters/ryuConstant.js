const RYU_WIDTH = 100;
const RYU_HEIGHT = 250;
const RYU_IDLE_ANIMATION_TIME = 10;
const RYU_SPRITE_POSITION = {
   idle: [
      {
         width: 43,
         height: 81,
         x: 6,
         y: 18,
      },
      {
         width: 43,
         height: 81,
         x: 55,
         y: 19,
      },
      {
         width: 43,
         height: 81,
         x: 105,
         y: 18,
      },
      {
         width: 43,
         height: 82,
         x: 154,
         y: 17,
      },
   ],
   moveRight: [
      {
         width: 43,
         height: 75,
         x: 205,
         y: 24,
      },
      {
         width: 43,
         height: 80,
         x: 252,
         y: 19,
      },
      {
         width: 43,
         height: 81,
         x: 301,
         y: 18,
      },
      {
         width: 43,
         height: 80,
         x: 351,
         y: 19,
      },
      {
         width: 43,
         height: 80,
         x: 401,
         y: 19,
      },
   ],
   moveLeft: [
      {
         width: 43,
         height: 75,
         x: 205,
         y: 24,
      },
      {
         width: 43,
         height: 80,
         x: 252,
         y: 19,
      },
      {
         width: 43,
         height: 81,
         x: 301,
         y: 18,
      },
      {
         width: 43,
         height: 80,
         x: 351,
         y: 19,
      },
      {
         width: 43,
         height: 80,
         x: 401,
         y: 19,
      },
   ],
   jump: [
      {
         width: 43,
         height: 75,
         x: 452,
         y: 24,
      },
      {
         width: 43,
         height: 90,
         x: 498,
         y: 9,
      },
      {
         width: 36,
         height: 78,
         x: 540,
         y: 17,
      },
      {
         width: 36,
         height: 67,
         x: 579,
         y: 19,
      },
      {
         width: 36,
         height: 78,
         x: 616,
         y: 17,
      },
      {
         width: 36,
         height: 90,
         x: 656,
         y: 9,
      },
      {
         width: 43,
         height: 75,
         x: 696,
         y: 24,
      },
   ],
   crouch: [
      {
         width: 43,
         height: 75,
         x: 1113,
         y: 24,
      },
      {
         width: 43,
         height: 55,
         x: 1160,
         y: 44,
      },
      {
         width: 43,
         height: 55,
         x: 1160,
         y: 44,
      },
      {
         width: 43,
         height: 75,
         x: 1113,
         y: 24,
      },
   ],
   frontFlip: [
      {
         width: 43,
         height: 75,
         x: 747,
         y: 24,
      },
      {
         width: 34,
         height: 90,
         x: 795,
         y: 9,
      },
      {
         width: 61,
         height: 37,
         x: 835,
         y: 40,
      },
      {
         width: 31,
         height: 67,
         x: 902,
         y: 24,
      },
      {
         width: 72,
         height: 40,
         x: 942,
         y: 36,
      },
      {
         width: 43,
         height: 74,
         x: 1021,
         y: 25,
      },
      {
         width: 34,
         height: 90,
         x: 1070,
         y: 9,
      },
      {
         width: 43,
         height: 75,
         x: 747,
         y: 24,
      },
   ],
   backFlip: [
      {
         width: 43,
         height: 75,
         x: 747,
         y: 24,
      },
      {
         width: 34,
         height: 90,
         x: 795,
         y: 9,
      },

      {
         width: 43,
         height: 74,
         x: 1021,
         y: 25,
      },
      {
         width: 72,
         height: 40,
         x: 942,
         y: 36,
      },
      {
         width: 31,
         height: 67,
         x: 902,
         y: 24,
      },

      {
         width: 61,
         height: 37,
         x: 835,
         y: 40,
      },

      {
         width: 34,
         height: 90,
         x: 1070,
         y: 9,
      },
      {
         width: 43,
         height: 75,
         x: 747,
         y: 24,
      },
   ],
   standingBlock: [
      {
         width: 43,
         height: 81,
         x: 6,
         y: 18,
      },
      {
         width: 43,
         height: 83,
         x: 1211,
         y: 16,
      },
      {
         width: 43,
         height: 83,
         x: 1211,
         y: 16,
      },
      {
         width: 43,
         height: 81,
         x: 6,
         y: 18,
      },
   ],

   crouchingBlock: [
      {
         width: 43,
         height: 81,
         x: 6,
         y: 18,
      },
      {
         width: 43,
         height: 61,
         x: 1260,
         y: 38,
      },
      {
         width: 43,
         height: 61,
         x: 1260,
         y: 38,
      },
      {
         width: 43,
         height: 81,
         x: 6,
         y: 18,
      },
   ],
   lowPuch: [
      {
         width: 43,
         height: 81,
         x: 6,
         y: 18,
      },
      {
         width: 43,
         height: 81,
         x: 3,
         y: 134,
      },
      {
         width: 57,
         height: 81,
         x: 52,
         y: 134,
      },
      {
         width: 43,
         height: 81,
         x: 117,
         y: 134,
      },
      {
         width: 43,
         height: 81,
         x: 6,
         y: 18,
      },
   ],
   punch: [
      {
         width: 43,
         height: 81,
         x: 170,
         y: 134,
      },
      {
         width: 51,
         height: 85,
         x: 218,
         y: 130,
      },
      {
         width: 72,
         height: 85,
         x: 274,
         y: 130,
      },
      {
         width: 51,
         height: 85,
         x: 353,
         y: 130,
      },
      {
         width: 43,
         height: 81,
         x: 411,
         y: 134,
      },
   ],
   forwardLowPunch: [
      {
         width: 43,
         height: 81,
         x: 170,
         y: 134,
      },
   ],
};
// const RYU_SPRITE_POSITION = {
//    idle: [
//       {
//          width: 132,
//          height: 239,
//          x: 8970,
//          y: 423,
//       },
//       {
//          width: 132,
//          height: 242,
//          x: 9102,
//          y: 421,
//       },
//       {
//          width: 132,
//          height: 247,
//          x: 9234,
//          y: 415,
//       },
//       {
//          width: 128,
//          height: 252,
//          x: 9366,
//          y: 410,
//       },
//    ],
//    moveRight: [
//       {
//          width: 139,
//          height: 239,
//          x: 11565,
//          y: 88,
//       },
//       {
//          width: 117,
//          height: 245,
//          x: 11705,
//          y: 83,
//       },
//       {
//          width: 107,
//          height: 241,
//          x: 11823,
//          y: 86,
//       },
//       {
//          width: 114,
//          height: 239,
//          x: 11930,
//          y: 88,
//       },
//    ],
//    moveLeft: [
//       {
//          width: 124,
//          height: 229,
//          x: 1496,
//          y: 98,
//       },
//       {
//          width: 122,
//          height: 239,
//          x: 1621,
//          y: 88,
//       },
//       {
//          width: 103,
//          height: 241,
//          x: 1743,
//          y: 86,
//       },
//       {
//          width: 108,
//          height: 245,
//          x: 1851,
//          y: 83,
//       },
//       {
//          width: 126,
//          height: 239,
//          x: 2082,
//          y: 88,
//       },
//    ],
//    jump: [
//       {
//          width: 128,
//          height: 227,
//          x: 3294,
//          y: 435,
//       },
//       {
//          width: 122,
//          height: 180,
//          x: 3422,
//          y: 482,
//       },
//       {
//          width: 122,
//          height: 167,
//          x: 3544,
//          y: 495,
//       },
//       {
//          width: 128,
//          height: 221,
//          x: 3666,
//          y: 441,
//       },
//       {
//          width: 122,
//          height: 167,
//          x: 3544,
//          y: 495,
//       },

//       {
//          width: 122,
//          height: 180,
//          x: 3422,
//          y: 482,
//       },
//    ],
//    crouch: [
//       {
//          width: 125,
//          height: 229,
//          x: 2209,
//          y: 98,
//       },
//       {
//          width: 125,
//          height: 185,
//          x: 2333,
//          y: 142,
//       },
//       {
//          width: 125,
//          height: 167,
//          x: 2458,
//          y: 160,
//       },
//       {
//          width: 125,
//          height: 185,
//          x: 2333,
//          y: 142,
//       },
//       {
//          width: 125,
//          height: 229,
//          x: 2209,
//          y: 98,
//       },
//    ],
//    frontFlip: [
//       {
//          width: 122,
//          height: 274,
//          x: 7410,
//          y: 54,
//       },
//       {
//          width: 122,
//          height: 180,
//          x: 3422,
//          y: 482,
//       },
//       {
//          width: 186,
//          height: 119,
//          x: 7532,
//          y: 208,
//       },
//       {
//          width: 110,
//          height: 195,
//          x: 7718,
//          y: 129,
//       },
//       {
//          width: 230,
//          height: 136,
//          x: 7828,
//          y: 192,
//       },
//       {
//          width: 122,
//          height: 180,
//          x: 3422,
//          y: 482,
//       },
//       {
//          width: 122,
//          height: 274,
//          x: 7410,
//          y: 54,
//       },
//    ],
//    backFlip: [
//       {
//          width: 122,
//          height: 274,
//          x: 7410,
//          y: 54,
//       },
//       {
//          width: 122,
//          height: 180,
//          x: 3422,
//          y: 482,
//       },
//       {
//          width: 230,
//          height: 136,
//          x: 7828,
//          y: 192,
//       },
//       {
//          width: 110,
//          height: 195,
//          x: 7718,
//          y: 129,
//       },
//       {
//          width: 186,
//          height: 119,
//          x: 7532,
//          y: 208,
//       },
//       {
//          width: 122,
//          height: 180,
//          x: 3422,
//          y: 482,
//       },
//       {
//          width: 122,
//          height: 274,
//          x: 7410,
//          y: 54,
//       },
//    ],
//    lowPuch: [
//       {
//          width: 149,
//          height: 242,
//          x: 7628,
//          y: 420,
//       },
//       {
//          width: 149,
//          height: 242,
//          x: 7628,
//          y: 420,
//       },
//       {
//          width: 204,
//          height: 244,
//          x: 7776,
//          y: 418,
//       },
//       {
//          width: 204,
//          height: 244,
//          x: 7776,
//          y: 418,
//       },
//    ],
// };
