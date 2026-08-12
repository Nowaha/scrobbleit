import { State, useState } from "./state.js";
import { numberFormat, trackToId } from "./util.js";

export const byId = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;

export const withState = (id: string, initialValue?: string) => {
  const element = byId<HTMLInputElement>(id);
  const state = useState(initialValue ?? "");
  const attached = attachState(element, state);
  return {
    element,
    value: state.get,
    setValue: state.set,
    listen: state.listen,
    detach: attached.detach,
  };
};

export const attachState = (
  element: HTMLInputElement,
  state: State<string>,
) => {
  const onInput = () => state.set(element.value);
  element.addEventListener("input", onInput);
  const unlisten = state.listen((value) => (element.value = value));
  return {
    detach: () => {
      unlisten();
      element.removeEventListener("input", onInput);
    },
  };
};

export const createRecommendationElement = (
  artist: string,
  track: string,
  listeners: number,
  imageUrlFetcher: () => Promise<string>,
) => {
  const div = document.createElement("div");
  div.classList.add("recommendation");
  div.id = trackToId(track, artist);
  div.setAttribute("role", "option");
  div.setAttribute("aria-selected", "false");

  const image = document.createElement("div");
  image.style.display = "flex";
  image.style.alignItems = "center";
  image.style.justifyContent = "center";
  image.style.width = "30px";
  image.style.height = "30px";
  image.classList.add("image");
  image.classList.add("no-image");

  const cpi = document.createElement("div");
  cpi.style.width = "16px";
  cpi.style.height = "16px";
  cpi.classList.add("cpi");
  image.appendChild(cpi);
  div.appendChild(image);

  imageUrlFetcher().then((imageUrl) => {
    const newImage = document.createElement("img");
    newImage.width = 30;
    newImage.height = 30;
    newImage.src = imageUrl;
    newImage.classList.add("image");
    image.replaceWith(newImage);
  });

  const trackArtistContainer = document.createElement("div");
  if (track) {
    const trackSpan = document.createElement("span");
    trackSpan.innerText = track;
    trackSpan.classList.add("track");
    trackArtistContainer.appendChild(trackSpan);
  }

  if (artist) {
    const artistSpan = document.createElement("span");
    artistSpan.innerText = artist;
    artistSpan.classList.add("artist");
    trackArtistContainer.appendChild(artistSpan);
  }
  trackArtistContainer.classList.add("trackArtistContainer");
  div.appendChild(trackArtistContainer);

  const listenersSpan = document.createElement("span");
  listenersSpan.innerHTML = numberFormat.format(listeners);
  listenersSpan.classList.add("listeners");
  div.appendChild(listenersSpan);

  return div;
};
