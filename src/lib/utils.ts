import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Height, Force, Jump, Weight, Gender } from "./type";
import {
  Age,
  highHeight,
  highJump,
  highWeight,
  lowForce,
  lowHeight,
  lowJump,
  lowWeight,
  mapResult,
  middleForce,
  middleHeight,
  middleJump,
  middleWeight,
} from "./constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const calculateLow = (value: number, w1: number, w2: number) => {
  let result = 1;
  if (value < w1) {
    result = 1;
  } else if (w1 <= value && value <= w2) {
    result = (w2 - value) / (w2 - w1);
  } else if (value > w2) {
    result = 0;
  }

  return result;
};

const calculateMiddle = (value: number, w1: number, w2: number, w3: number, w4: number) => {
  let result = 1;
  if (value < w1) {
    result = 0;
  } else if (w1 <= value && value <= w2) {
    result = (value - w1) / (w2 - w1);
  } else if (w2 <= value && value < w3) {
    result = 1;
  } else if (w3 <= value && value < w4) {
    result = (w4 - value) / (w4 - w3);
  } else if (value >= w4) {
    result = 1;
  }

  return result;
};

const calculateHigh = (value: number, w1: number, w2: number) => {
  let result = 1;
  if (value < w1) {
    result = 0;
  } else if (w1 <= value && value < w2) {
    result = (value - w1) / (w2 - w1);
  } else if (value >= w2) {
    result = 0;
  }

  return result;
};

export const makeHeight = ({ value, age, gender }: { value: number; age: Age; gender: Gender }) => {
  const height: Height = { l: 0, m: 0, h: 0 };

  const low = lowHeight[gender][age];
  const middle = middleHeight[gender][age];
  const high = highHeight[gender][age];

  height.l = calculateLow(value, low.w1, low.w2);
  height.m = calculateMiddle(value, middle.w1, middle.w2, middle.w3, middle.w4);
  height.h = calculateHigh(value, high.w1, high.w2);

  return height;
};

export const makeWeight = ({ value, age, gender }: { value: number; age: Age; gender: Gender }) => {
  const weight: Weight = { l: 0, m: 0, h: 0 };

  const low = lowWeight[gender][age];
  const middle = middleWeight[gender][age];
  const high = highWeight[gender][age];

  weight.l = calculateLow(value, low.w1, low.w2);
  weight.m = calculateMiddle(value, middle.w1, middle.w2, middle.w3, middle.w4);
  weight.h = calculateHigh(value, high.w1, high.w2);

  return weight;
};

export const makeForce = ({
  value,
  age,
  gender,
}: {
  value: number;
  age: Exclude<Age, "1" | "2" | "3" | "4" | "5">;
  gender: Gender;
}) => {
  const force: Force = { y: 0, d: 0, t: 0 };

  const low = lowForce[gender][age];
  const middle = middleForce[gender][age];
  const high = highWeight[gender][age];

  force.y = calculateLow(value, low.w1, low.w2);
  force.d = calculateMiddle(value, middle.w1, middle.w2, middle.w3, middle.w4);
  force.t = calculateHigh(value, high.w1, high.w2);

  return force;
};

export const makeJump = ({
  value,
  age,
  gender,
}: {
  value: number;
  age: Exclude<Age, "1" | "2" | "3" | "4" | "5">;
  gender: Gender;
}) => {
  const jump: Jump = { y: 0, d: 0, t: 0 };

  const low = lowJump[gender][age];
  const middle = middleJump[gender][age];
  const high = highJump[gender][age];

  jump.y = calculateLow(value, low.w1, low.w2);
  jump.d = calculateMiddle(value, middle.w1, middle.w2, middle.w3, middle.w4);
  jump.t = calculateHigh(value, high.w1, high.w2);

  return jump;
};

export const makeRules = ({
  height,
  weight,
  force,
  jump,
}: {
  height: Height;
  weight: Weight;
  force: Force;
  jump: Jump;
}) => ({
  pty: [
    [height.l, weight.l, force.y, jump.y],
    [height.l, weight.l, force.y, jump.d],
    [height.l, weight.l, force.d, jump.y],
    [height.l, weight.l, force.d, jump.d],
    [height.l, weight.m, force.y, jump.d],
    [height.l, weight.m, force.y, jump.t],
    [height.l, weight.m, force.d, jump.y],
    [height.l, weight.m, force.t, jump.y],
  ],
  ktc: [
    [height.l, weight.l, force.y, jump.t],
    [height.l, weight.l, force.d, jump.t],
    [height.l, weight.l, force.t, jump.y],
    [height.l, weight.l, force.t, jump.d],
    [height.l, weight.l, force.t, jump.t],
    [height.l, weight.m, force.y, jump.y],
    [height.l, weight.m, force.d, jump.d],
    [height.l, weight.m, force.d, jump.t],
    [height.l, weight.m, force.t, jump.d],
    [height.l, weight.m, force.t, jump.t],
    [height.m, weight.l, force.y, jump.y],
    [height.m, weight.l, force.y, jump.d],
    [height.m, weight.l, force.y, jump.t],
    [height.m, weight.l, force.d, jump.y],
    [height.m, weight.l, force.t, jump.y],
    [height.m, weight.m, force.y, jump.y],
    [height.m, weight.m, force.y, jump.d],
    [height.m, weight.m, force.y, jump.t],
    [height.m, weight.h, force.y, jump.y],
    [height.m, weight.h, force.y, jump.d],
    [height.m, weight.h, force.d, jump.y],
    [height.m, weight.h, force.d, jump.d],
    [height.h, weight.l, force.y, jump.y],
    [height.h, weight.l, force.y, jump.d],
    [height.h, weight.l, force.d, jump.y],
    [height.h, weight.m, force.y, jump.y],
    [height.h, weight.m, force.y, jump.d],
    [height.h, weight.m, force.d, jump.y],
    [height.h, weight.h, force.y, jump.y],
    [height.h, weight.h, force.y, jump.d],
    [height.h, weight.h, force.d, jump.y],
  ],
  ptbt: [
    [height.m, weight.l, force.d, jump.d],
    [height.m, weight.l, force.d, jump.t],
    [height.m, weight.l, force.t, jump.d],
    [height.m, weight.l, force.t, jump.t],
    [height.m, weight.m, force.d, jump.y],
    [height.m, weight.m, force.d, jump.d],
    [height.m, weight.m, force.d, jump.t],
    [height.m, weight.m, force.t, jump.y],
    [height.m, weight.m, force.t, jump.d],
    [height.m, weight.m, force.t, jump.t],
    [height.m, weight.h, force.y, jump.t],
    [height.m, weight.h, force.d, jump.t],
    [height.m, weight.h, force.t, jump.y],
    [height.m, weight.h, force.t, jump.d],
    [height.m, weight.h, force.t, jump.t],
    [height.h, weight.l, force.y, jump.t],
    [height.h, weight.l, force.d, jump.d],
    [height.h, weight.l, force.d, jump.t],
    [height.h, weight.l, force.t, jump.y],
    [height.h, weight.l, force.t, jump.d],
    [height.h, weight.l, force.t, jump.t],
    [height.h, weight.m, force.y, jump.t],
    [height.h, weight.m, force.d, jump.d],
    [height.h, weight.m, force.d, jump.t],
    [height.h, weight.m, force.t, jump.y],
    [height.h, weight.m, force.t, jump.d],
  ],
  tc: [
    [height.l, weight.h, force.y, jump.y],
    [height.l, weight.h, force.y, jump.d],
    [height.l, weight.h, force.y, jump.t],
    [height.l, weight.h, force.d, jump.y],
    [height.l, weight.h, force.d, jump.d],
    [height.l, weight.h, force.d, jump.t],
    [height.l, weight.h, force.t, jump.y],
    [height.l, weight.h, force.t, jump.d],
    [height.l, weight.h, force.t, jump.t],
  ],
  ptm: [
    [height.h, weight.m, force.t, jump.t],
    [height.h, weight.h, force.y, jump.t],
    [height.h, weight.h, force.d, jump.d],
    [height.h, weight.h, force.d, jump.t],
    [height.h, weight.h, force.t, jump.y],
    [height.h, weight.h, force.t, jump.d],
    [height.h, weight.h, force.t, jump.t],
  ],
});

type Rules = ReturnType<typeof makeRules>;

function calculateMedium(obj: { [key in keyof Rules]: number }) {
  let sumValues = 0;
  let sumIndicesTimesValues = 0;

  for (const key in obj) {
    const value = obj[key as keyof Rules];
    const index = Object.keys(obj).indexOf(key) + 1;

    const currentIndex = 2 * value - (value ^ 2);
    sumValues += currentIndex;
    sumIndicesTimesValues += index * currentIndex;
  }

  const result = sumIndicesTimesValues / sumValues || 0;
  return Math.round(result);
}

export const calculate = ({
  weightValue,
  heightValue,
  forceValue,
  jumpValue,
  age,
  gender,
}: {
  weightValue: number;
  heightValue: number;
  forceValue: number;
  jumpValue: number;
  age: Age;
  gender: Gender;
}) => {
  const height = makeHeight({ value: heightValue, age, gender });
  const weight = makeWeight({ value: weightValue, age, gender });
  let force = { y: 1, d: 1, t: 1 };
  let jump = { y: 1, d: 1, t: 1 };

  if (Number(age) >= 6) {
    force = makeForce({ value: forceValue, age: age as Exclude<Age, "1" | "2" | "3" | "4" | "5">, gender });
    jump = makeJump({ value: jumpValue, age: age as Exclude<Age, "1" | "2" | "3" | "4" | "5">, gender });
  }

  const rules = makeRules({ height, weight, force, jump });
  const result: { [key in keyof Rules]: number } = { pty: 0, ktc: 0, ptbt: 0, tc: 0, ptm: 0 };

  for (const [key, value] of Object.entries(rules)) {
    result[key as keyof Rules] = Math.max(...value.map((item) => Math.min(...item)));
  }

  const medium = calculateMedium(result) as keyof typeof mapResult;

  console.log(result, medium);

  return mapResult[medium];
};
