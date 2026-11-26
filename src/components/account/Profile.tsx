import { onCleanup, onMount, Show } from "solid-js";
import { authTimeStamp, lastFmImage, lastFmName } from "../../state/auth.ts";
import { dateFormat } from "../../util/util.ts";
import Icon from "../basic/Icon.tsx";
import SpinningCircle from "../SpinningCircle.tsx";

const Profile = () => {
  let imageElement!: HTMLImageElement;

  onMount(() => {
    const onMouseMove = (e: MouseEvent) => {
      const rect = imageElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const radius = 300;
      const mouseX = Math.max(-1, Math.min(1, (e.clientX - centerX) / radius));
      const mouseY = Math.max(-1, Math.min(1, (e.clientY - centerY) / radius));

      const maxDegree = 20;
      const rotateX = -mouseY * maxDegree;
      const rotateY = mouseX * maxDegree;

      imageElement.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    window.addEventListener("mousemove", onMouseMove);
    onCleanup(() => window.removeEventListener("mousemove", onMouseMove));
  });

  return (
    <a class="group" href={`https://last.fm/user/${lastFmName() ?? ""}`} target="_blank">
      <div class="flex gap-4">
        <div class="relative size-16">
          <Show
            when={lastFmImage()}
            fallback={
              <div class="flex size-full items-center justify-center">
                <SpinningCircle size="lg" />
              </div>
            }
          >
            {(image) => (
              <img
                class="absolute rounded-xl shadow-lg shadow-ctp-mantle transition-[scale] group-hover:scale-105"
                src={image()}
                ref={imageElement}
              />
            )}
          </Show>
        </div>
        <div class="flex flex-col justify-evenly">
          <span class="flex items-center text-lg leading-0 font-bold text-ctp-text no-underline group-hover:text-ctp-mauve group-hover:underline">
            {lastFmName()}
            <Icon class="mb-auto ml-1 text-[10px]" icon="fa-external-link" />
          </span>
          <span class="text-md leading-0 text-ctp-subtext0">{dateFormat.format(Number(authTimeStamp()))}</span>
        </div>
      </div>
    </a>
  );
};

export default Profile;
