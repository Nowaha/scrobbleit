import { createResource, Match, onCleanup, onMount, Switch, type JSX } from "solid-js";
import { authTimeStamp, fetchProfileImage, lastFmName } from "../../state/auth.ts";
import { dateFormat } from "../../util/util.ts";
import Icon from "../basic/Icon.tsx";
import SpinningCircle from "../basic/SpinningCircle.tsx";

const TILT_RADIUS_PX = 300;
const TILT_MAX_DEGREES = 20;
const TILT_PERSPECTIVE_PX = 600;

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

const Profile = (): JSX.Element => {
  let imageElement: HTMLImageElement | undefined;

  const [image] = createResource(lastFmName, fetchProfileImage);

  onMount(() => {
    const onMouseMove = (e: MouseEvent): void => {
      if (!imageElement) {
        return;
      }
      const rect = imageElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = clamp((e.clientX - centerX) / TILT_RADIUS_PX, -1, 1);
      const mouseY = clamp((e.clientY - centerY) / TILT_RADIUS_PX, -1, 1);

      const rotateX = -mouseY * TILT_MAX_DEGREES;
      const rotateY = mouseX * TILT_MAX_DEGREES;

      imageElement.style.transform = `perspective(${TILT_PERSPECTIVE_PX}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    window.addEventListener("mousemove", onMouseMove);
    onCleanup(() => window.removeEventListener("mousemove", onMouseMove));
  });

  return (
    <a class="group" href={`https://last.fm/user/${lastFmName() ?? ""}`} target="_blank">
      <div class="flex gap-4">
        <div class="relative flex size-16 items-center justify-center">
          <Switch fallback={<Icon class="text-3xl text-ctp-subtext0" icon="fa-user" />}>
            <Match when={image.loading}>
              <SpinningCircle size="lg" />
            </Match>
            <Match when={image()}>
              {(src) => (
                <img
                  class="absolute rounded-xl shadow-lg shadow-ctp-mantle transition-[scale] group-hover:scale-105"
                  src={src()}
                  ref={imageElement}
                />
              )}
            </Match>
          </Switch>
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
