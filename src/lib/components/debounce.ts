export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number,
): F => {
  // Создаем переменную для хранения идентификатора таймера
  let timerId: ReturnType<typeof setTimeout> | null = null;
  // Возвращаем новую функцию с тем же типом, что и исходная
  return function (this: any, ...args: Parameters<F>) {
    // Если таймер уже запущен, то отменяем его
    if (timerId) {
      clearTimeout(timerId);
    }
    // Запускаем новый таймер с задержкой
    timerId = setTimeout(() => {
      // Вызываем исходную функцию с переданными аргументами и контекстом
      func.apply(this, args);
      // Очищаем переменную таймера
      timerId = null;
    }, delay);
  } as F;
};
