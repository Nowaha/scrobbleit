import { dateFormat } from "../../util/util.js";
import Icon from "../basic/Icon.js";
import Link from "../basic/Link.js";

type ProfileProps = {
  avatar: string;
  username: string;
  authenticatedAt: number;
};

const Profile = ({ avatar, username, authenticatedAt }: ProfileProps) => (
  <a class="group" href={`https://last.fm/user/${username}`} target="_blank">
    <div class="flex gap-4">
      <img class="w-16 rounded-xl shadow-sm shadow-ctp-mantle" src={avatar} />
      <div class="flex flex-col justify-evenly">
        <a class="flex items-center text-lg leading-0 font-bold text-ctp-text no-underline group-hover:text-ctp-mauve group-hover:underline">
          {username}
          <Icon class="mb-auto ml-1 text-[10px]" icon="fa-external-link" />
        </a>
        <span class="text-md leading-0 text-ctp-subtext0">Since {dateFormat.format(authenticatedAt)}</span>
      </div>
    </div>
  </a>
);

export default Profile;
