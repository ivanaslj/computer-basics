// Attacks the database through the real REST API, with the real publishable
// key, as a real signed-in user. If any of these succeed, shipping that key in
// the bundle is unsafe. Run this after touching any policy.
//
// It needs two fixture users, which are deliberately NOT left in the database.
// Recreate them in the SQL editor first:
//
//   insert into auth.users (
//     instance_id, id, aud, role, email, encrypted_password,
//     email_confirmed_at, created_at, updated_at,
//     raw_app_meta_data, raw_user_meta_data,
//     confirmation_token, recovery_token, email_change_token_new,
//     email_change_token_current, email_change, phone_change,
//     phone_change_token, reauthentication_token)
//   values
//     ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated',
//      'authenticated', 'test-alice@example.invalid',
//      crypt('test-fixture-password-a', gen_salt('bf')), now(), now(), now(),
//      '{"provider":"email","providers":["email"]}', '{}',
//      '', '', '', '', '', '', '', ''),
//     ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated',
//      'authenticated', 'test-bob@example.invalid',
//      crypt('test-fixture-password-b', gen_salt('bf')), now(), now(), now(),
//      '{"provider":"email","providers":["email"]}', '{}',
//      '', '', '', '', '', '', '', '');
//
//   insert into public.progress (user_id, state)
//   select id, '{"secret":"bob-private-progress"}'::jsonb
//   from auth.users where email = 'test-bob@example.invalid';
//   update public.profiles set display_name = 'Bob Secret'
//   where id = (select id from auth.users where email = 'test-bob@example.invalid');
//
// Afterwards:  delete from auth.users where email like 'test-%@example.invalid';
import { createClient } from '@supabase/supabase-js'

// Reads the same .env the app uses. Needs network and the two test users
// described in README ("Checking row-level security"), so this is deliberately
// NOT part of `npm run check` / the build — run it after touching any policy.
import { readFileSync } from 'node:fs'

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()])
)
const URL_ = env.VITE_SUPABASE_URL
const KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY
if (!URL_ || !KEY) {
  console.log('No Supabase config in .env — nothing to check.')
  process.exit(0)
}
const ids = {}

let pass = 0, fail = 0
const ok   = (n, d='') => { pass++; console.log('  BLOCKED ', n, d) }
const bad  = (n, d='') => { fail++; console.log('  LEAK !!! ', n, d) }
const good = (n, d='') => { pass++; console.log('  ok      ', n, d) }

const anon = createClient(URL_, KEY)

console.log('\n--- signed OUT (just the publishable key, as any stranger) ---')
{
  const { data } = await anon.from('progress').select('*')
  ;(data?.length ? bad : ok)('read all progress', `rows=${data?.length ?? 0}`)
  const { data: p } = await anon.from('profiles').select('*')
  ;(p?.length ? bad : ok)('read all profiles', `rows=${p?.length ?? 0}`)
  const { error } = await anon.from('progress').insert({ user_id: ids.bob, state: { hacked: true } })
  ;(error ? ok : bad)('insert into someone else', error?.code ?? 'NO ERROR')
}

console.log('\n--- signed IN as Alice ---')
const alice = createClient(URL_, KEY)
const { data: session, error: signInErr } = await alice.auth.signInWithPassword({
  email: 'test-alice@example.invalid', password: 'test-fixture-password-a',
})
if (signInErr) {
  // Missing fixtures is "cannot run", not "security is broken" — say so
  // clearly rather than exiting like a failed check.
  console.log(`\n  Cannot run the signed-in half: ${signInErr.message}`)
  console.log('  The two fixture users are not in this project. See the header of')
  console.log('  this file for the SQL that recreates them.')
  console.log(`\n  ${pass} anonymous-access checks passed.`)
  process.exit(0)
}
ids.alice = session.user.id
good('Alice signed in', ids.alice ? 'got id' : 'NO ID')
{
  const b = createClient(URL_, KEY)
  const { data: bs } = await b.auth.signInWithPassword({ email: 'test-bob@example.invalid', password: 'test-fixture-password-b' })
  ids.bob = bs?.user?.id
}

{
  const { error } = await alice.from('progress').upsert({ user_id: ids.alice, state: { mine: 'alice' } })
  ;(error ? bad : good)('Alice can write her OWN progress', error?.message ?? '')
  const { data } = await alice.from('progress').select('*').eq('user_id', ids.alice)
  ;(data?.length === 1 ? good : bad)('Alice can read her OWN progress', `rows=${data?.length ?? 0}`)
}

console.log('\n  ...now Alice tries to reach Bob:')
{
  const { data } = await alice.from('progress').select('*').eq('user_id', ids.bob)
  ;(data?.length ? bad : ok)("read Bob's progress by id", `rows=${data?.length ?? 0}`)

  const { data: all } = await alice.from('progress').select('*')
  const leaked = (all ?? []).filter(r => r.user_id !== ids.alice)
  ;(leaked.length ? bad : ok)('read ALL progress rows', `own=${(all??[]).length} others=${leaked.length}`)

  const { data: profs } = await alice.from('profiles').select('*')
  const otherProfiles = (profs ?? []).filter(r => r.id !== ids.alice)
  ;(otherProfiles.length ? bad : ok)('read other profiles (names/streaks)', `others=${otherProfiles.length}`)

  const { error: e1 } = await alice.from('progress').update({ state: { hacked: true } }).eq('user_id', ids.bob)
  const { data: after } = await alice.from('progress').select('state').eq('user_id', ids.bob).maybeSingle()
  ;(after === null || after === undefined ? ok : bad)("overwrite Bob's progress", e1?.code ?? 'silently no-op')

  const { error: e2 } = await alice.from('progress').insert({ user_id: ids.bob, state: { hacked: true } })
  ;(e2 ? ok : bad)("insert a row owned by Bob", e2?.code ?? 'NO ERROR')

  await alice.from('profiles').update({ display_name: 'pwned' }).eq('id', ids.bob)
  await alice.from('progress').delete().eq('user_id', ids.bob)

  const { error: e5 } = await alice.rpc('handle_new_user')
  ;(e5 ? ok : bad)('call the SECURITY DEFINER trigger function', e5?.code ?? 'NO ERROR')

  const { data: users, error: e6 } = await alice.from('users').select('*')
  ;(users?.length ? bad : ok)('read auth.users through the API', e6?.code ?? `rows=${users?.length ?? 0}`)
}

console.log('\n--- confirm Bob is untouched (checked as Bob himself) ---')
{
  const bob = createClient(URL_, KEY)
  const { error } = await bob.auth.signInWithPassword({
    email: 'test-bob@example.invalid', password: 'test-fixture-password-b',
  })
  if (error) { console.log('  could not sign in as Bob:', error.message); fail++ }
  else {
    const { data: prog } = await bob.from('progress').select('state').eq('user_id', ids.bob).maybeSingle()
    ;(prog?.state?.secret === 'bob-private-progress' ? good : bad)(
      "Bob's progress survived Alice's overwrite + delete", JSON.stringify(prog?.state?.secret))
    ;(prog?.state?.hacked === undefined ? good : bad)("no 'hacked' flag was written", '')
    const { data: prof } = await bob.from('profiles').select('display_name').eq('id', ids.bob).maybeSingle()
    ;(prof?.display_name === 'Bob Secret' ? good : bad)("Bob's name was not changed", prof?.display_name)
  }
}

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
