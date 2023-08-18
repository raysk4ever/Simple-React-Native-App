export const delay = (time: number = 1000) =>
  new Promise(resolve => {
    setTimeout(() => resolve(0), time);
  });
