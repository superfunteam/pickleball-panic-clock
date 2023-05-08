document.addEventListener('DOMContentLoaded', () => {
  let clock1 = document.querySelector('.clock1');
  let clock2 = document.querySelector('.clock2');
  let activeClock = null;
  let timer = null;
  let settings = document.querySelector('.settings');
  let modal = document.querySelector('.modal');
  let tickingSound = new Audio('tick.mp3');
  let buzzerSound = new Audio('buzzer.mp3');

  function startClock(clock) {
    if (timer) {
      clearInterval(timer);
    }

    activeClock = clock;
    clock1.classList.remove('active');
    clock2.classList.remove('active');
    activeClock.classList.add('active');

    timer = setInterval(() => {
      let time = activeClock.textContent.split(':');
      let minutes = parseInt(time[0]);
      let seconds = parseInt(time[1]);

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          activeClock.classList.remove('active');
          activeClock.classList.add('loser');
          activeClock.textContent = 'OUT';
          activeClock = null;

          // Stop the ticking sound and play the buzzer sound
          tickingSound.pause();
          buzzerSound.currentTime = 0;
          buzzerSound.play();

          // Wait for 10 seconds, then reset both clocks and stop all sound effects
          setTimeout(() => {
            resetClocks(2); // Reset clocks to the default time (e.g., 2 minutes)
            tickingSound.pause();
            buzzerSound.pause();
            clock1.classList.remove('loser');
            clock2.classList.remove('loser');
          }, 10000);
          return;
        } else {
          minutes -= 1;
          seconds = 59;
        }
      } else {
        seconds -= 1;
      }

      activeClock.textContent = `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(1, '0')}`;

      // Play the ticking sound effect
      tickingSound.currentTime = 0;
      tickingSound.play();
    }, 1000);
  }

  function pauseClocks() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    if (activeClock) {
      activeClock.classList.remove('active');
      activeClock = null;
    }

    tickingSound.pause();
  }

  clock1.addEventListener('click', () => {
    if (activeClock !== clock1) {
      startClock(clock1);
    }
  });

  clock2.addEventListener('click', () => {
    if (activeClock !== clock2) {
      startClock(clock2);
    }
  });

  settings.addEventListener('click', () => {
    pauseClocks();
    modal.style.display = 'flex';
  });

  modal.addEventListener('click', () => {
    modal.style.display = 'none';
  });


  let settingsElements = document.querySelectorAll('.setting');

  function resetClocks(minutes) {
    pauseClocks();

    let formattedTime = `${minutes.toString().padStart(1, '0')}:00`;
    clock1.textContent = formattedTime;
    clock2.textContent = formattedTime;
  }

  settingsElements.forEach(setting => {
    setting.addEventListener('click', () => {
      let minutes = parseInt(setting.dataset.minutes);
      resetClocks(minutes);
      modal.style.display = 'none';
    });
  });

});
