document.addEventListener("DOMContentLoaded", () => {
  let clickCount = 0;
  let thresholds = [100, 1000, 10000, 1000000];
  let currentStage = 0;
  let bgmUnmuted = false;

  const popupText = document.getElementById("popup-text");
  const popupButton = document.getElementById("popup-button");
  const popupBox = document.getElementById("mini-popup");

  popupButton.addEventListener("click", () => {
    clickCount++;
    popupButton.textContent = `클릭 (${clickCount})`;

    if (clickCount >= thresholds[currentStage]) {
      if (currentStage < thresholds.length - 1) {
        currentStage++;
      } else {
        // 조건 초과 시 계속 증가시켜서 무한 루프 느낌
        thresholds.push(thresholds[currentStage] * 10);
        currentStage++;
      }

      popupText.textContent = `ㅋㅋ 아니지롱~ 이번엔 ${thresholds[currentStage]}번! 🤪`;

      // 조건 달성 시 팝업 위치를 랜덤으로 이동
      const randomX = Math.random() * (window.innerWidth - popupBox.offsetWidth);
      const randomY = Math.random() * (window.innerHeight - popupBox.offsetHeight);
      popupBox.style.position = "absolute";
      popupBox.style.left = `${randomX}px`;
      popupBox.style.top = `${randomY}px`;
    }

    // 브금 언뮤트 (최초 1회만)
    if (!bgmUnmuted) {
      const iframe = document.getElementById("bgm");
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"unMute","args":""}',
        "*"
      );
      bgmUnmuted = true;
    }
  });

  // 고양이 움직임
  let offTop = 50;
  let offLeft = 50;

  // 상하좌우 모두 랜덤하게 움직이도록 보장
  let speed_x = (Math.random() * 3 + 2) * (Math.random() < 0.5 ? 1 : -1);
  let speed_y = (Math.random() * 3 + 2) * (Math.random() < 0.5 ? 1 : -1);

  function anim() {
    offTop += speed_y;
    offLeft += speed_x;

    const w = window.innerWidth;
    const h = window.innerHeight;

    if (offTop >= h - 100 || offTop < 0) speed_y *= -1;
    if (offLeft >= w - 100 || offLeft < 0) speed_x *= -1;

    $(".flying-cat").css({ top: `${offTop}px`, left: `${offLeft}px` });
  }

  $(".flying-cat").css("position", "absolute");
  setInterval(anim, 10);
});
