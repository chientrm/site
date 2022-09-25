---
title: Secure Ubuntu HTTP server with Cloudflare Tunnel
description: Proxy HTTP server with HTTPS with Cloudflare Tunnel
authors: chientrm
img: /img/secure.jpg
tag: [secure, proxy, cloudflare, https, http, tunnel]
---

![Secure Ubuntu HTTP server with Cloudflare Tunnel](secure.jpg)

## Abstract

Firstly, deploy a server on port `80` or `443` is usually blocked by firewall.
Secondly, issuing and applying an SSL certificate is costly and complicated.
Thirdly, exposing a server's IP to the internet is a bad practice.
Thus, this article will show you how to secure your server with CF Tunnel.

## Introduction

### Cloudflare Tunnel

Tunnel requires a daemon named `cloudflared` to run on your server.
This daemon creates an outbound-only access to Cloudflare Networks.
It also registers a subdomain in the form of `*.cfargotunnel.com`.
However, this default subdomain is not secured.
So that, we create a DNS record to proxy to it.

## Requirements

- [Add a website to Cloudflare](
    https://developers.cloudflare.com/fundamentals/get-started/setup/add-site/
  )
- [Change your domain name servers to Cloudflare](
    https://developers.cloudflare.com/dns/zone-setups/full-setup/setup
  )

## Steps

### Install daemon

```bash
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

### Authenticate to Cloudflare

```bash
cloudflared tunnel login
```

The credentials file `$HOME/.cloudflared/cert.pem` is generated.

### Create tunnel

```bash
cloudflared tunnel create <NAME>
```

Copy tunnel UUID from the output.

### Configurations file

#### **`$HOME/.cloudflared/config.yml`**

```txt
url: http://localhost:8080
tunnel: <UUID>
credentials-file: /root/.cloudflared/<UUID>.json
```

Replace `8080` with your port.
Replace `<UUID>` with your tunnel UUID,
replace `/root` with your home directory.

### Create DNS record

```bash
cloudflared tunnel route dns <Tunnel-UUID> <hostname>
```

Replace `<hostname>` with your desired subdomain.

### Start the tunnel

```bash
cloudflared service install
```

## Results

Browse to `<hostname>.yourwebsite.com`.
Your server is now secured with HTTPS at port `443`.

## Q&A

Is my HTTP server required to be exposed to the Internet?

> Your server only need to serve `localhost`, Tunnel will expose it for you.

Am I required to create an SSL certificate?

> Tunnel will use the default certificates from Cloudflare.

Is my server required to listen to a specified port?

> Your server can listen on any port. That port is specified in `config.yml`.

Is my server safe from DDoS?

> Tunnel now protect your server from attacks.

## References

- [Cloudflare Tunnel](
    https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/
  )
