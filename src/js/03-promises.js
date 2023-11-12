import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;

    for (let i = 0; i < amount.value; i++) {
      let position = i + 1;
      const delays = Number(delay.value) + step.value * i;

      createPromise(position, delays)
        .then(({ position, delay }) => {
          iziToast.show({
            message: `✅ Fulfilled promise ${position} in ${delay}ms`,
            position: 'topRight',
            color: '#00ff00',
          });
        })
        .catch(({ position, delay }) => {
          iziToast.show({
            message: `❌ Rejected promise ${position} in ${delay}ms`,
            position: 'topRight',
            color: '#ff0000',
          });
        }); 
  }

  event.currentTarget.reset();
}