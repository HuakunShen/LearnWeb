---
title: Cloudflare Tunnel
---

> Cloudflare Tunnel provides you with a secure way to connect your resources to Cloudflare without a publicly routable IP address.
>
> With Tunnel, you do not send traffic to an external IP — instead, a lightweight daemon in your infrastructure (cloudflared) creates outbound-only connections to Cloudflare’s edge. Cloudflare Tunnel can connect HTTP web servers, SSH servers, remote desktops, and other protocols safely to Cloudflare. This way, your origins can serve traffic through Cloudflare without being vulnerable to attacks that bypass Cloudflare.

[Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)

## Introduction

This diagram explains how tunnels works. The logic is very simple, like a VPN, but without even need to expose a port.

![](https://developers.cloudflare.com/cloudflare-one/static/documentation/connections/connect-apps/handshake.jpg)

I usually use reverse proxy (nginx) to host services at home and expose to public internet with SSL certificate.

After trying Cloudflare Tunnel, it feels like it's on another dimension. It's so easy to set up. Simply run a docker container (one line) to run `Cloudflared`, and use Cloudflare web interface to add 2 urls.

![](https://i.imgur.com/opiGimH.png)

The first one is where you intend to expose to. The second one is the service how `Cloudflared` runner will connect to.

## Benefit

- No need to port forward
- Traffic Analytics by Cloudflare
- Security Provided by Cloudflare
- Easy to deploy

## Reference

- https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/
