import { authTimeStamp, lastFmImage, lastFmName } from "../../state/auth.js";
import { dateFormat } from "../../util/util.js";
import Icon from "../basic/Icon.js";

const Profile = () => {
  let imageElement!: HTMLImageElement;

  window.addEventListener("mousemove", (e) => {
    const rect = imageElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const radius = 300;
    const deltaX = (e.clientX - centerX) / radius;
    const deltaY = (e.clientY - centerY) / radius;

    const mouseX = Math.max(-1, Math.min(1, deltaX));
    const mouseY = Math.max(-1, Math.min(1, deltaY));

    const maxDegree = 20;
    const rotateX = -mouseY * maxDegree;
    const rotateY = mouseX * maxDegree;

    imageElement.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  return (
    <a class="group" href={() => `https://last.fm/user/${() => lastFmName()}`} target="_blank">
      <div class="flex gap-4">
        <div class="relative size-16">
          <img
            class="absolute rounded-xl shadow-lg shadow-ctp-mantle transition-[scale] group-hover:scale-105"
            src={() => lastFmImage()}
            ref={(el: HTMLImageElement) => (imageElement = el)}
          />
        </div>
        <div class="flex flex-col justify-evenly">
          <a class="flex items-center text-lg leading-0 font-bold text-ctp-text no-underline group-hover:text-ctp-mauve group-hover:underline">
            {() => lastFmName()}
            <Icon class="mb-auto ml-1 text-[10px]" icon="fa-external-link" />
          </a>
          <span class="text-md leading-0 text-ctp-subtext0">{() => dateFormat.format(Number(authTimeStamp()))}</span>
        </div>
      </div>
    </a>
  );
};

export default Profile;
