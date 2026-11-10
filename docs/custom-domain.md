# Custom domain and contact address

How to move the portfolio from `https://gagaismo.github.io` to your own domain, and how to receive mail at `contacto@<your-domain>` while you keep reading it in Gmail. Do the steps in order; each one says how to check it worked.

## 1. Claim the domain with the GitHub Student Developer Pack

1. Open <https://education.github.com/pack> while signed in as `Gagaismo` and filter the offers by "Domains".
2. Pick one registrar offer. The pack has historically included a free first year from registrars such as Namecheap (`.me`), Name.com or get.tech (`.tech`); the list changes, so take whatever the pack shows today.
3. Choose a short name you can say out loud, for example `lautaroguebel.<tld>`. Avoid hyphens.
4. Note the renewal price: the free year ends, and an expired domain can be bought by someone else.

Check: the registrar's dashboard lists the domain as active.

## 2. Move DNS to Cloudflare (free plan)

Cloudflare will hold the DNS records and give you Email Routing in step 5.

1. Create a free account at <https://dash.cloudflare.com>, choose "Add a domain", enter the domain and pick the Free plan.
2. Cloudflare shows two nameservers. In the registrar's dashboard, replace the domain's nameservers with those two.
3. Wait until Cloudflare marks the domain "Active" (minutes to a few hours).

Check: `nslookup -type=ns <your-domain>` returns the two Cloudflare nameservers.

## 3. Point the domain at GitHub Pages

In Cloudflare → DNS → Records, add these records. Set every record to **DNS only** (grey cloud) so GitHub can issue the HTTPS certificate.

| Type | Name | Content |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `gagaismo.github.io` |

These are GitHub's published Pages addresses; confirm them at <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site> before you add them.

Check: `nslookup <your-domain>` returns the four `185.199.x.153` addresses.

## 4. Turn the domain on in GitHub

1. Verify the domain for your account first, so nobody else can attach it to their Pages site: GitHub → Settings → Pages → "Add a domain", then add the TXT record GitHub shows in Cloudflare DNS and press "Verify".
2. Open the repository `Gagaismo/Gagaismo.github.io` → Settings → Pages → Custom domain, enter the domain (without `www`) and save. The site deploys with GitHub Actions, so no `CNAME` file is needed in the repository.
3. Wait for the DNS check to pass, then tick **Enforce HTTPS** (the certificate can take up to an hour).
4. In the repository, change `site` in `astro.config.mjs` from `https://gagaismo.github.io` to `https://<your-domain>` so canonical and hreflang links use the new address, commit and push to `main`.

Check: `https://<your-domain>/es/` and `/en/` load with a padlock, and `https://gagaismo.github.io` redirects to the domain.

## 5. Receive mail at contacto@ with Cloudflare Email Routing

1. Cloudflare → your domain → Email → Email Routing → "Get started". Let it add its MX and TXT records.
2. Add `lautarocontactof@gmail.com` as a destination address and confirm the email Cloudflare sends there.
3. Create the custom address `contacto@<your-domain>` → action "Send to an email" → `lautarocontactof@gmail.com`.

Check: send a message from another account to `contacto@<your-domain>`; it arrives in Gmail.

Email Routing only receives. To reply *as* `contacto@`, add it in Gmail → Settings → Accounts → "Send mail as" through an SMTP service that allows it (for example a free tier of a transactional mail provider); without that, replies come from the Gmail address, which is fine to start.

## 6. Switch the site to the new address

1. In `src/i18n/home.ts`, change `email` to `contacto@<your-domain>`.
2. Run `npm run check`, `npm test` and `npm run test:build`, commit and push to `main`.

Check: the contact section and the footer show `contacto@<your-domain>`, and "Escribime por email" opens a message to it.
