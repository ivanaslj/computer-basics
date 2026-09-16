-- The picture a learner picks for themselves.
--
-- display_name already existed; this adds its companion. Both are mirrored
-- here from the device's local settings, alongside streak_count and
-- lessons_done, and for the same reason: so a future "compare your streak with
-- a friend" screen is one indexed query rather than a scan over everyone's
-- progress JSON. The app never reads these columns back. The name and picture
-- a learner sees are always their own device's copy, which is what keeps the
-- Account screen honest with no network.

alter table public.profiles
  add column if not exists avatar_icon text;

-- The value is a name from src/components/icons/names.js.
--
-- Deliberately a length cap rather than an enum or a CHECK listing the valid
-- names: that list belongs to the app and grows whenever an icon is drawn, and
-- a copy of it here would drift out of date silently and then start rejecting
-- writes. Icon() already falls back to a neutral mark for a name it does not
-- recognise, so the worst a bad value can do is render a plain dot.
alter table public.profiles drop constraint if exists profiles_avatar_icon_len;
alter table public.profiles
  add constraint profiles_avatar_icon_len
  check (avatar_icon is null or char_length(avatar_icon) <= 32);
