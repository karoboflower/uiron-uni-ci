/**
 * A Vue composable for countdown functionality
 * @param {number} seconds - Initial number of seconds for the countdown
 * @param {() => void} [onEnd] - Optional callback function to execute when countdown reaches zero
 * @returns {object} An object containing count, start, stop, and reset functions
 */
export function useCountDown(seconds: number, onEnd?: () => void) {
  const initialSeconds = seconds;
  const count = ref(seconds);
  let timerId: number | undefined;

  const start = () => {
    if (timerId) {
      clearInterval(timerId);
    }

    timerId = setInterval(() => {
      if (count.value > 0) {
        count.value--;
      } else {
        clearInterval(timerId);
        onEnd && onEnd();
      }
    }, 1000);
  };

  const stop = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = undefined;
    }
  };

  const reset = () => {
    stop();
    count.value = initialSeconds;
  };

  watch(count, (newValue) => {
    if (newValue === 0) {
      stop();
    }
  });

  onUnmounted(stop);

  return { count, start, stop, reset };
}
